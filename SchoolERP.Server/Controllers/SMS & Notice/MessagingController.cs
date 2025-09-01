using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Faculty;
using SchoolERP.Server.Models.SMS;

namespace SchoolERP.Server.Controllers.SMS
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagingController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<MessagingController> _logger;
        public MessagingController(ILogger<MessagingController> logger,SchoolERPContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("get-composed-sms")]
        public async Task<IActionResult> getComposedSMS(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            var smsGateway = await _context.sMS_Gateway_Settings.Where(sm => sm.school_id == school_id).FirstOrDefaultAsync();

            var smsLogs = await _context.sMSLogs.Where(sl => sl.school_id == school_id)
                .Include(sl => sl.SMSRecipients).ToListAsync();

            var data = smsLogs.Select(log => new SMSLogDTOsnew
            {
                sms_id = log.sms_id,
                template_id = log.template_id,
                sentby = log.sentby,
                sentTo = log.sentTo,
                message = log.message,
                sent_At = log.sent_At,
                status = log.status,
                school_id = log.school_id,
                created_by = log.created_by,
                updated_by = log.updated_by,
                sms_count = log.SMSRecipients.Count,
                SMSRecipients = log.SMSRecipients.Select(r => new SMSRecipientsDTOs
                {
                    recipient_id = r.recipient_id,
                    sms_id = r.sms_id,
                    sent_to = r.sent_to,
                    user_id = r.user_id,
                    user_type = r.user_type,
                    status = r.status,
                    message = r.message,
                    delivered_at = r.delivered_at
                }).ToList()
            }).ToList();

            var data1 = new
            {
                smsGateway,
                data
            };

            return Ok(data1);
        }


        [HttpPost("post-sms")]
        public async Task<IActionResult> insertSMS(string school_id,string session, [FromBody] smsLogDtos smsDtos)
        {
             
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            var template = await _context.sMS_Templates
                .FirstOrDefaultAsync(sch => sch.school_id == school_id && sch.id == smsDtos.id);

            if (template == null)
                return NotFound("Template not found");

            var smsLog = new SMSLog
            {
                template_id = template.template_id,
                sentby = smsDtos.sentby,
                sentTo = smsDtos.messageTo,
                message = template.template_Content,
                sent_At = DateTime.Now,
                status = "Pending",
                school_id = school_id,
                created_by = smsDtos.sentby,
                updated_by = smsDtos.sentby
            };

            _context.sMSLogs.Add(smsLog);
            await _context.SaveChangesAsync();

            // Step 2: Get recipient phone numbers
            List<string> mobileNumbers = GetMobileListFromDto(smsDtos);
            List<string> macros = await MacrosFuns();

            if (smsDtos.messageTo == "students")
            {
                var studentUids = await _context.tb_studentmasters
                    .Where(sm => sm.school_id == school_id && sm.session == session && sm.status == "Registered")
                    .Select(sm => sm.uid).ToListAsync();

                mobileNumbers = await _context.student_Other_Infos
                    .Where(s => s.school_id == school_id && studentUids.Contains(s.uid))
                    .Select(s => s.contact_no ?? s.alt_contact).Where(m => !string.IsNullOrWhiteSpace(m))
                    .Distinct().ToListAsync();
            }
            else if (smsDtos.messageTo == "multipleClass")
            {
                var classIds = ParseIds(smsDtos.class_ids);

                var studentUids = await _context.tb_studentmasters
                    .Where(sm => sm.school_id == school_id && sm.session == "2024 - 2025" &&
                                 sm.status == "Registered" && classIds.Contains(sm.class_id ?? 0))
                    .Select(sm => sm.uid)
                    .ToListAsync();

                mobileNumbers = await _context.student_Other_Infos
                    .Where(s => s.school_id == school_id && studentUids.Contains(s.uid))
                    .Select(s => s.contact_no ?? s.alt_contact)
                    .Where(m => !string.IsNullOrWhiteSpace(m))
                    .Distinct()
                    .ToListAsync();
            }

            mobileNumbers = mobileNumbers
                .Where(m => !string.IsNullOrWhiteSpace(m))
                .Distinct()
                .ToList();

            var smsRecipients = new List<SMSRecipients>();

            if (new[] { "singleClass", "students", "custom", "multipleClass" }.Contains(smsDtos.messageTo))
            {
                var students = await _context.student_Other_Infos
                    .Where(soi => mobileNumbers.Contains(soi.contact_no) || mobileNumbers.Contains(soi.alt_contact))
                    .ToListAsync();

                foreach (var stu in students)
                {
                    var phone = !string.IsNullOrWhiteSpace(stu.contact_no) ? stu.contact_no : stu.alt_contact;
                    if (string.IsNullOrWhiteSpace(phone)) continue;

                    string t = stuTemplate(template.template_Content, stu, macros);

                    smsRecipients.Add(new SMSRecipients
                    {
                        sms_id = smsLog.sms_id,
                        sent_to = phone,
                        user_id = stu.uid,
                        user_type = "student",
                        status = "Pending",
                        message = t,
                        delivered_at = DateTime.Now
                    });
                }
            }
            else if (smsDtos.messageTo == "teachers")
            {
                var teachers = await _context.TbFacultymasters
                    .Where(t => mobileNumbers.Contains(t.phone))
                    .ToListAsync();

                foreach (var teacher in teachers)
                {
                    string t = facTemplate(template.template_Content, teacher, macros);
                    smsRecipients.Add(new SMSRecipients
                    {
                        sms_id = smsLog.sms_id,
                        sent_to = teacher.phone,
                        user_id = teacher.faculty_id,
                        user_type = "teacher",
                        status = "Pending",
                        message = t,
                        delivered_at = DateTime.Now
                    });
                }
            }

            try
            {
                if (smsRecipients.Any())
                {
                    _context.sMSRecipients.AddRange(smsRecipients);
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    message = "SMS sent log created",
                    sms_id = smsLog.sms_id,
                    totalRecipients = smsRecipients.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving SMS recipients.");
                return StatusCode(500, $"Error saving recipients: {ex.Message}");
            }
        }

        private List<int> ParseIds(string ids)
        {
            return ids?
                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                .Select(id => int.TryParse(id.Trim(), out var val) ? val : 0)
                .Where(val => val > 0)
                .Distinct()
                .ToList() ?? new List<int>();
        }

        private List<string> GetMobileListFromDto(smsLogDtos dto)
        {
            return dto.mobileNos?
                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                .Select(m => m.Trim())
                .Where(m => !string.IsNullOrWhiteSpace(m))
                .Distinct()
                .ToList() ?? new List<string>();
        }


        private async Task<List<string>> MacrosFuns()
        {
            var macroList = await (from tt in _context.template_Types
                                   join tmu in _context.template_Macro_Usages
                                       on tt.typeid equals tmu.template_type_id
                                   join tm in _context.macros
                                       on tmu.macro_id equals tm.marco_id into macroGroup
                                   from tm in macroGroup.DefaultIfEmpty()
                                   where tt.typename == "General"
                                   select tm.macro_name)
                                   .ToListAsync();

            return macroList;
        }

        private string stuTemplate(string template, Student_Other_info stu, List<string> macros)
        {
            if (string.IsNullOrWhiteSpace(template)) return template; 

            foreach(var macro in macros)
            {
                switch (macro)
                {
                    case "__NAME__":
                        template = template.Replace(macro, stu.first_name + "" + stu.last_name);
                        break;
                    case "__CLASS__":
                        template = template.Replace(macro, "");
                        break;
                    case "__FNAME__":
                        template = template.Replace(macro, stu.father_name);
                        break;
                    case "__USERNAME__":
                        template = template.Replace(macro, stu.userid);
                        break;
                    case "__PASSWORD__":
                        template = template.Replace(macro, stu.password);
                        break;
                    case "__MONTH__":
                        template = template.Replace(macro, "");
                        break;
                    case "__AMOUNT__":
                        template = template.Replace(macro, "");
                        break;
                    case "__DUES__":
                        template = template.Replace(macro, "");
                        break;
                    default:
                        template = template.Replace(macro, "");
                        break; 
                } 
            } 
            return template;
        }
        private string facTemplate(string template, TbFacultymaster fac, List<string> macros)
        {
            if (string.IsNullOrWhiteSpace(template)) return template; 

            foreach(var macro in macros)
            {
                switch (macro)
                {
                    case "__NAME__":
                        template = template.Replace(macro, fac.first_name + "" + fac.last_name);
                        break;
                    case "__CLASS__":
                        template = template.Replace(macro, "");
                        break;
                    case "__FNAME__":
                        template = template.Replace(macro, fac.father_name);
                        break;
                    case "__USERNAME__":
                        template = template.Replace(macro, fac.username);
                        break;
                    case "__PASSWORD__":
                        template = template.Replace(macro, fac.password);
                        break; 
                } 
            } 
            return template;
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Controllers.SMS_Setting;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Notice;
using System.Diagnostics;
using System.Linq;

namespace SchoolERP.Server.Controllers.SMS___Notice
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<CommunicationController> _logger;

        public CommunicationController(SchoolERPContext context, ILogger<CommunicationController> logger)
        {
            _context = context;
            _logger = logger;
        }
         

        [HttpGet("get-faculties")]
        public async Task<IActionResult> GetFaculties(string school_id, string session)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");
            var desig = new List<int> { 7, 8 };

            var desigDict = await _context.TbDesignations.ToDictionaryAsync(td => td.designation_id, td => td.designation_name);

            // Step 1: Get all faculties
            var faculties = await _context.TbFacultymasters
                .Where(tf => tf.school_id == school_id && !desig.Contains(tf.designation ?? 0))
                .Select(tf => new FacultyDTO
                {
                    faculty_id = tf.faculty_id,
                    name = tf.first_name + " " + tf.last_name,
                    designation = tf.designation ?? 0,
                    designation_name = desigDict.ContainsKey(tf.designation ?? 0) ? desigDict[tf.designation ?? 0] : "",
                    phone = tf.phone,
                    image = tf.image,
                    read_count = 0,
                    unread_count = 0
                })
                .ToListAsync();

            // Step 2: Get communication counts grouped by faculty
            var communicationCounts = await _context.communications
                .Where(c => c.school_id == school_id && session == session && c.isActive)
                .GroupBy(c => c.asked_to)
                .Select(g => new
                {
                    facultyId = g.Key,
                    totalCount = g.Count(),
                    unreadCount = g.Count(x => string.IsNullOrEmpty(x.answer))  
                })
                .ToListAsync(); 
            foreach (var faculty in faculties)
            {
                var comm = communicationCounts.FirstOrDefault(c => c.facultyId == faculty.faculty_id);
                if (comm != null)
                {
                    faculty.read_count = comm.totalCount - comm.unreadCount;
                    faculty.unread_count = comm.unreadCount;
                }
            }

            return Ok(faculties);
        }


        [HttpGet("get-faculties-classwise")]
        public async Task<IActionResult> GetFacultiesClassWise(string school_id,string session,int uid,int class_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            List<int> fac_ids = await _context.faculty_Classes.Where(s => s.school_id == school_id && s.class_id == class_id &&
            s.isActive == true).Select(s => s.faculty_id).ToListAsync();

            var faculties = await _context.TbFacultymasters
                .Where(tf => tf.school_id == school_id && (fac_ids.Contains(tf.faculty_id) || tf.designation == 2))
                .Select(tf => new FacultyDTO
                {
                    faculty_id = tf.faculty_id,
                    name = tf.first_name + " " + tf.last_name,
                    designation = tf.designation ?? 0,
                    phone = tf.phone,
                    image = tf.image,
                    read_count = 0,
                    unread_count = 0
                })
                .ToListAsync();

            // Step 2: Get communication counts grouped by faculty
            var communicationCounts = await _context.communications
                .Where(c => c.school_id == school_id && c.session == session && c.created_by == uid && c.isActive)
                .GroupBy(c => c.asked_to)
                .Select(g => new
                {
                    facultyId = g.Key,
                    totalCount = g.Count(),
                    unreadCount = g.Count(x => string.IsNullOrEmpty(x.answer))
                })
                .ToListAsync();
            foreach (var faculty in faculties)
            {
                var comm = communicationCounts.FirstOrDefault(c => c.facultyId == faculty.faculty_id);
                if (comm != null)
                {
                    faculty.read_count = comm.totalCount - comm.unreadCount;
                    faculty.unread_count = comm.unreadCount;
                }
            }

            return Ok(faculties); 
        }

        #region Communication Actios

        [HttpGet("get-communications")]
        public async Task<IActionResult> getCommunications(string school_id, string session)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id not found.");

            var comms = await _context.communications
                .Where(c => c.school_id == school_id && c.isActive)
                .ToListAsync();

            var result = await BuildCommunicationDTOs(comms, school_id, session);

            return Ok(result);
        }


        [HttpGet("get-communication-by-id")]
        public async Task<IActionResult> getCommunicationbyId(string school_id, string session, int com_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id not found.");

            var comm = await _context.communications
                .Where(c => c.school_id == school_id && c.communication_id == com_id)
                .ToListAsync();

            if (!comm.Any()) return NotFound("Communication not found.");

            var result = await BuildCommunicationDTOs(comm, school_id, session);
            return Ok(result.FirstOrDefault());
        }


        [HttpGet("get-comm-by-fid")]
        public async Task<IActionResult> getCommunicationbyFId(string school_id, string session, int f_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            var comms = await _context.communications
                .Where(c => c.school_id == school_id && c.asked_to == f_id)
                .ToListAsync();

            var result = await BuildCommunicationDTOs(comms, school_id,session);
            return Ok(result);
        }

        [HttpGet("get-comm-by-stu")]
        public async Task<IActionResult> getCommunicationbystuId(string school_id, string session, int f_id, int stu_uid)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            var comms = await _context.communications
                .Where(c => c.school_id == school_id && c.asked_to == f_id && c.created_by == stu_uid && c.created_role == "Student")
                .ToListAsync();

            var result = await BuildCommunicationDTOs(comms, school_id,session);
            return Ok(result);
        }


        [HttpPost("post-communication")]
        public async Task<IActionResult> insertCommunication(string school_id,string request, 
            communication comm)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");
            
            if(request == "Ask")
            {
                _context.Add(comm);
                await _context.SaveChangesAsync();
                return Ok(comm);
            }
            else if(request=="Add Response")
            {
                var com = await _context.communications.Where(com => com.school_id == school_id
                && com.communication_id == comm.communication_id).FirstOrDefaultAsync();

                com.answer = comm.answer;
                com.answered_at = DateTime.Now;
                com.answered_by = comm.answered_by;
                com.answered_role = comm.answered_role;
                com.isOpen = true;
                await _context.SaveChangesAsync();
                 
                return Ok(com);
            }
            else
            {
                return Ok();
            }
            

        }

        [HttpDelete("delete-communication")]
        public async Task<IActionResult> deleteCommunication(string school_id, int com_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            var comm = await _context.communications.Where(cm => cm.school_id == school_id &&
            cm.communication_id == com_id).FirstOrDefaultAsync();

            comm.isActive = false;
            _context.SaveChangesAsync();
            return Ok(comm);
        }

        #endregion

        private async Task<List<communicationDTOs>> BuildCommunicationDTOs(List<communication> communications, string school_id, string session = null)
        {
            var classIds = communications.Select(c => c.class_id).Distinct().ToList();
            var stuIds = communications.Where(c => c.created_role == "Student").Select(c => c.created_by).Distinct().ToList();

            var facultyIds = communications.Select(c => c.asked_to)
                .Union(communications.Where(c => c.created_role != "Student").Select(c => c.created_by))
                .ToHashSet();

            if (!string.IsNullOrEmpty(session))
            {
                var studentUids = stuIds.ToHashSet();
                var studentData = await (from sm in _context.tb_studentmasters
                                         join soi in _context.student_Other_Infos
                                         on new { sm.uid, sm.school_id } equals new { soi.uid, soi.school_id }
                                         where sm.school_id == school_id && sm.session == session && studentUids.Contains(sm.uid)
                                         select new
                                         {
                                             sm.uid,
                                             full_name = soi.first_name + " " + soi.last_name
                                         }).ToDictionaryAsync(x => x.uid, x => x.full_name);
                classIds = classIds.Where(c => c != 0).ToList();
                var className = await _context.classNames
                    .Where(c => classIds.Contains(c.class_id) && c.school_id == school_id)
                    .ToDictionaryAsync(c => c.class_id, c => c.class_name);

                var faculties = await _context.TbFacultymasters
                    .Where(f => f.school_id == school_id)
                    .ToDictionaryAsync(f => f.faculty_id, f => f.first_name + " " + f.last_name);

                return communications.Select(comm => new communicationDTOs
                {
                    communication_id = comm.communication_id,
                    subject = comm.subject,
                    created_by = comm.created_by,
                    created_by_name = comm.created_role == "Student" ?
                        (studentData.ContainsKey(comm.created_by) ? studentData[comm.created_by] : "") :
                        faculties.ContainsKey(comm.created_by) ? faculties[comm.created_by] : "",
                    created_role = comm.created_role,
                    class_id = comm.class_id,
                    class_name = className.ContainsKey(comm.class_id) ? className[comm.class_id] : "",
                    question = comm.question,
                    answer = comm.answer,
                    asked_at = comm.asked_at,
                    asked_to = comm.asked_to,
                    asked_to_name = faculties.ContainsKey(comm.asked_to) ? faculties[comm.asked_to] : "",
                    answered_by = comm.answered_by,
                    answered_by_name = int.TryParse(comm.answered_by, out int ansById) && faculties.ContainsKey(ansById)
                        ? faculties[ansById] : "",
                    answered_role = comm.answered_role,
                    answered_at = comm.answered_at,
                    isOpen = comm.isOpen,
                    isActive = comm.isActive,
                    school_id = comm.school_id
                }).ToList();
            }

            return new List<communicationDTOs>(); // fallback
        }


        private class FacultyDTO
        {
            public int faculty_id { get; set; }
            public string name { get; set; }
            public int designation { get; set; }
            public string designation_name { get; set; }
            public string phone { get; set; }
            public string image { get; set; }
            public int read_count { get; set; }
            public int unread_count { get; set; }
        }

        //faculty_id = tf.faculty_id,
        //            name = tf.first_name + " " + tf.last_name,
        //            designation = tf.designation,
        //            phone = tf.phone,
        //            read_count = 0,
        //            unread_count = 0
    }
}

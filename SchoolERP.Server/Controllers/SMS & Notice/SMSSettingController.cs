using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.SMS;

namespace SchoolERP.Server.Controllers.SMS_Setting
{
    [Route("api/[controller]")]
    [ApiController]
    public class SMSSettingController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SMSSettingController> _logger;
        
        public SMSSettingController(SchoolERPContext context,ILogger<SMSSettingController> logger)
        {
            _context = context;
            _logger = logger;
        }


        #region Macros operation

        [HttpGet("get-all-macros")]
        public async Task<IActionResult> getAllMacros()
        { 
            var macros = await _context.macros.ToListAsync(); 
            return Ok(macros);
        }
        
        [HttpGet("template-types")]
        public async Task<IActionResult> templateType()
        { 
            var template_Types = await _context.template_Types.Where(tt => tt.isActive == true).ToListAsync(); 
            return Ok(template_Types);
        }
        
        [HttpGet("template-macro-usage")]
        public async Task<IActionResult> templateMacroUsage()
        {
            var usage = await _context.template_Macro_Usages
        .Include(u => u.Macro)
        .Include(u => u.TemplateType)
        .Select(u => new
        {
            u.id,
            macroId = u.macro_id,
            macroName = u.Macro.macro_name,
            templateTypeId = u.template_type_id,
            templateTypeName = u.TemplateType.typename
        }).ToListAsync();

            return Ok(usage);
        }
        
        
        [HttpGet("macro-usage-by-template-id")]
        public async Task<IActionResult> macroUsagebyTemplateId(int template_type_id)
        {
            var usage = await _context.template_Macro_Usages.Where(tm => tm.template_type_id == template_type_id)
        .Include(u => u.Macro)
        .Include(u => u.TemplateType)
        .Select(u => new
        {
            u.id,
            macroId = u.macro_id,
            macroName = u.Macro.macro_name,
            description = u.Macro.description,
            templateTypeId = u.template_type_id,
            templateTypeName = u.TemplateType.typename
        })
        .ToListAsync();

            return Ok(usage);
        }

        #endregion

        #region SMS Template 

        [HttpGet("get-templates")]
        public async Task<IActionResult> getTemplates(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }

            var templates = await _context.sMS_Templates.Where(st => st.school_id == school_id &&
            st.isActive == true).ToListAsync();

            return Ok(templates); 
        }

        [HttpGet("get-template-by-id")]
        public async Task<IActionResult> getTemplatebyId(string school_id,int id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }

            var template = await _context.sMS_Templates.Where(st => st.school_id == school_id && 
            st.id == id).FirstOrDefaultAsync();

            return Ok(template); 
        }

        
        [HttpPost("post-templates")]
        public async Task<IActionResult> postTemplates(string school_id,string create_by, [FromBody] SMS_templates_DTOs _dTOs)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                {
                    return BadRequest("School Id is null. ");
                }
                if(_dTOs.id == 0)
                {
                    SMS_templates sMS_ = new SMS_templates
                    {
                        template_id = _dTOs.template_id,
                        template_Name = _dTOs.template_Name,
                        template_type_id = _dTOs.template_type_id,
                        template_Content = _dTOs.template_Content,
                        isDLTApproved = _dTOs.isDLTApproved,
                        DLT_submissionDate = DateTime.Now,
                        approval_Status = "Approved",
                        remarks = "",
                        isActive = true,
                        school_id = school_id,
                        created_At = DateTime.Now,
                        updated_At = DateTime.Now,
                        created_by = create_by,
                        updated_by = create_by,
                    };

                    _context.Add(sMS_);
                    await _context.SaveChangesAsync();
                    await InsertVersionAsync(sMS_);
                    return Ok(sMS_);
                }
                else
                {
                    var existingTemplate = await _context.sMS_Templates.Where(st => st.school_id == school_id && st.id == _dTOs.id).FirstOrDefaultAsync();
                    if (existingTemplate == null)
                    {
                        return NotFound("Template not found.");
                    }

                    await InsertVersionAsync(existingTemplate); 

                    existingTemplate.template_id = _dTOs.template_id;
                    existingTemplate.template_Name = _dTOs.template_Name;
                    existingTemplate.template_type_id = _dTOs.template_type_id;
                    existingTemplate.template_Content = _dTOs.template_Content;
                    existingTemplate.isDLTApproved = _dTOs.isDLTApproved;
                    existingTemplate.updated_At = DateTime.Now;
                    existingTemplate.updated_by = create_by;
                    await _context.SaveChangesAsync();
                    return Ok(existingTemplate);
                }
                
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }

        private async Task InsertVersionAsync(SMS_templates sms)
        {
            var version = new SMS_template_versions
            {
                template_id = sms.template_id,
                version_number = DateTime.Now.ToString("yyyyMMddHHmmss"),
                template_Content = sms.template_Content,
                updated_at = DateTime.Now,
                updated_by = sms.updated_by
            };

            _context.Add(version);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("delete-template")]
        public async Task<IActionResult> deleteTemplatebyId(string school_id, int id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }

            var template = await _context.sMS_Templates.Where(st => st.school_id == school_id &&
            st.id == id).FirstOrDefaultAsync();
            template.isActive = false;

            await _context.SaveChangesAsync();

            return Ok(template);
        }


        #endregion

        #region SMS Gateway Setting

        [HttpGet("get-gateway-setting")]
        public async Task<IActionResult> getGatewaySetting(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            } 
            var gateway = await _context.sMS_Gateway_Settings.Where(sg => sg.school_id == school_id).FirstOrDefaultAsync();

            return Ok(gateway ?? new SMS_Gateway_Settings());
        }

        [HttpPost("post-gateway-setting")]
        public async Task<IActionResult> postGatewaySetting(string school_id, SMS_Gateway_Settings sMS_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }
            if(sMS_.setting_id == 0)
            {
                _context.Add(sMS_);
                await _context.SaveChangesAsync();
                return Ok(sMS_);
            }
            else
            {
                var sms = await _context.sMS_Gateway_Settings.Where(sg => sg.school_id == school_id).FirstOrDefaultAsync();
                sms.sms_enabled = sMS_.sms_enabled;
                sms.sms_service = sMS_.sms_service;
                sms.voice_sms_enabled = sMS_.voice_sms_enabled;
                sms.forget_password_sms_enabled = sMS_.forget_password_sms_enabled;
                sms.sms_username = sMS_.sms_username;
                sms.sms_password = sMS_.sms_password;
                sms.primary_sender_id = sMS_.primary_sender_id;
                sms.secondary_sender_id = sMS_.secondary_sender_id;
                sms.api_url = sMS_.api_url;
                sms.delivery_api_url = sMS_.delivery_api_url;
                sms.check_balance_api_url = sMS_.check_balance_api_url;
                sms.route_id = sMS_.route_id;
                sms.api_status = sMS_.api_status;
                sms.updated_at = DateTime.Now;
                sms.updated_by = sMS_.updated_by;

                await _context.SaveChangesAsync();

                return Ok(sms);
            }
             
        }

        #endregion

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GlobalSettingsController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<GlobalSettingsController> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalSettingsController(SchoolERPContext context, ILogger<GlobalSettingsController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }


        [HttpGet("getSettings")]
        public async Task<IActionResult> getSettings(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) school_id = "All";

            var header = await _context.globalheaders.Where(gh => (gh.school_id == school_id || gh.school_id == "All") &&
            gh.is_active == true).OrderByDescending(gh => gh.setting_id).FirstOrDefaultAsync();

            var signature = await _context.signatureSettings.Where(gh => gh.school_id == school_id
            ).OrderByDescending(gh => gh.setting_id).FirstOrDefaultAsync();

            var applicationTheme = await _context.applicationThemeSettings.Where(gh => (gh.school_id == school_id || gh.school_id == "All"))
                .OrderByDescending(gh => gh.setting_id).FirstOrDefaultAsync();

            var result = new
            {
                global_header = header ?? new object(),
                signature_settings = signature ?? new object(),
                application_theme = applicationTheme ?? new object()
            };

            return Ok(result);
        }

        #region Global Header Settings

        [HttpGet("getHeaderSettings")]
        public async Task<IActionResult> getHeaderSettings(string school_id)
        {
            if(string.IsNullOrEmpty(school_id)) school_id = "All";

            var header = await _context.globalheaders.Where(gh => (gh.school_id == school_id || gh.school_id == "All") && 
            gh.is_active == true).OrderByDescending(gh => gh.setting_id).FirstOrDefaultAsync();

            return Ok(header);
        }

        [HttpPost("postHeaderSetting")]
        public async Task<IActionResult> postHeaderSettings(string school_id, string created_by, [FromForm] globalheader_Settings_DTOs _Settings)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id not found!");

            // If setting_id is 0, we are creating a new global header setting
            globalheaderSettings globalheader_;
            if (_Settings.setting_id == 0 || _Settings.school_id == "All")
            {
                globalheader_ = new globalheaderSettings
                {
                    school_id = school_id,
                    global_header = _Settings.global_header,
                    header_bgcolor = _Settings.header_bgcolor,
                    header_text_color = _Settings.header_text_color,
                    font_family = _Settings.font_family,
                    last_updated = DateTime.Now,
                    created_by = created_by
                };
                _context.Add(globalheader_);
            }
            else
            {
                // Otherwise, we're updating an existing record
                globalheader_ = await _context.globalheaders
                    .Where(gh => gh.school_id == school_id && gh.setting_id == _Settings.setting_id)
                    .FirstOrDefaultAsync();

                if (globalheader_ == null)
                {
                    return NotFound("Header settings not found for the given school_id and setting_id.");
                }

                // Update existing record
                globalheader_.global_header = _Settings.global_header;
                globalheader_.header_bgcolor = _Settings.header_bgcolor;
                globalheader_.header_text_color = _Settings.header_text_color;
                globalheader_.font_family = _Settings.font_family;
                globalheader_.is_active = true;
                globalheader_.last_updated = DateTime.Now;
            }

            // Check if image has changed and upload files if necessary
            if (_Settings.image_change)
            {
                string uploadsFolder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "settings");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Handle header image upload
                if (_Settings.header_image != null)
                {
                    string headerImageFileName = await SaveFileAsync(_Settings.header_image, uploadsFolder);
                    globalheader_.header_image = headerImageFileName;
                }

                // Handle logo image upload
                if (_Settings.logo_url != null)
                {
                    string logoImageFileName = await SaveFileAsync(_Settings.logo_url, uploadsFolder);
                    globalheader_.logo_url = logoImageFileName;
                }
            }

            // Save changes to database
            await _context.SaveChangesAsync();

            return Ok(new { message = "Header settings saved successfully", data = _Settings });
        }

        #endregion

        #region Global Signature Settings
         

        [HttpGet("getSignatureSettings")]
        public async Task<IActionResult> getSignatureSettings(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found! ");
            var header = await _context.signatureSettings.Where(gh => gh.school_id == school_id).FirstOrDefaultAsync();

            return Ok(header);
        }

        [HttpPost("posSignatureSetting")]
        public async Task<IActionResult> posSignatureSetting(string school_id, string created_by, string type, IFormFile file)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id not found!");

            if(file != null && file.Length != 0)
            {
                string uploadFolder = Path.Combine(_env.WebRootPath,"api","uploads",school_id,"settings");
                if (!Directory.Exists(uploadFolder))
                {
                    Directory.CreateDirectory(uploadFolder);
                }
                string ImageName = await SaveFileAsync(file, uploadFolder);

                var signature = await _context.signatureSettings.Where(ss => ss.school_id == school_id).FirstOrDefaultAsync();
                if (signature == null)
                {
                    signatureSettings s = new signatureSettings();
                    if(type == "Examination")
                    {
                        s.examination_controller_signature = ImageName;
                    }
                    else if(type == "CenterControl")
                    {
                        s.center_controller_signature = ImageName;
                    }
                    else if(type == "Director")
                    {
                        s.director_signature = ImageName;
                    }
                    else if(type == "ICard")
                    {
                        s.icard_signature = ImageName;
                    }

                    s.last_updated_date = DateTime.Now;
                    s.school_id = school_id;

                    _context.Add(s);
                    await _context.SaveChangesAsync();

                }
                else
                {
                    if (type == "Examination")
                    {
                        signature.examination_controller_signature = ImageName;
                    }
                    else if (type == "CenterControl")
                    {
                        signature.center_controller_signature = ImageName;
                    }
                    else if (type == "Director")
                    {
                        signature.director_signature = ImageName;
                    }
                    else if (type == "ICard")
                    {
                        signature.icard_signature = ImageName;
                    }
                    signature.last_updated_date = DateTime.Now;

                    await _context.SaveChangesAsync();
                } 
            }
             
        
            return Ok(new { message = "Header settings saved successfully" });
        }

        #endregion


        #region Support Contact Settings

        [HttpGet("getSupportContact")]
        public async Task<IActionResult> getSupportContactSetting(string school_id)
        {
            if(string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            var supportC = await _context.supportContactSettings.Where(sch => sch.school_id == school_id).FirstOrDefaultAsync();
            if (supportC != null)
            {
                return Ok(supportC);
            }
            return NotFound(supportC);
        }

        [HttpPost("postSupportSetting")]
        public async Task<IActionResult> postSupportContantSettings(string school_id, supportContactSettings supportContact)
        {
            if(string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            if(supportContact.setting_id == 0)
            {
                _context.Add(supportContact);
                await _context.SaveChangesAsync();
                return Ok(supportContact);
            }
            else
            {
                var support = await _context.supportContactSettings.Where(sc => sc.school_id == school_id).FirstOrDefaultAsync();
                support.support_email = supportContact.support_email;
                support.support_phone = supportContact.support_phone;
                support.grievance_cell = supportContact.grievance_cell;
                support.accountdepartment = supportContact.accountdepartment;
                support.examcell = supportContact.examcell;
                support.admissioncell = supportContact.admissioncell;
                support.support_address = supportContact.support_address;
                await _context.SaveChangesAsync();
                return Ok(support);
            }
             
        }

        #endregion

        #region Application Theme Settings

        [HttpGet("getApplicationTheme")]
        public async Task<IActionResult> applicationTheme(string? school_id)
        {
            if (string.IsNullOrEmpty(school_id)) school_id = "All";

            var applicationTheme = await _context.applicationThemeSettings.Where(aT => (aT.school_id == school_id || aT.school_id == "All"))
                .OrderByDescending(aT => aT.setting_id).FirstOrDefaultAsync();

            if (applicationTheme == null)
                return NotFound("Data is null. ");

            return Ok(applicationTheme);
        }

        [HttpPost("postApplicationTheme")]
        public async Task<IActionResult> postApplicationTheme(string school_id, string created_by, applicationThemeSettingsDTOs themeSettings)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            if(themeSettings.setting_id == 0 || themeSettings.school_id == "All")
            {
                applicationThemeSettings settings = new applicationThemeSettings
                {
                    school_id = school_id,
                    appTheme_website_url = themeSettings.appTheme_website_url,
                    youtube_url = themeSettings.youtube_url,
                    primary_color = themeSettings.primary_color,
                    secondary_color = themeSettings.secondary_color,
                    button_color = themeSettings.button_color,
                    sidebar_bgcolor = themeSettings.sidebar_bgcolor,
                    sidebar_color = themeSettings.sidebar_color,
                    favicon_url = themeSettings.favicon_url,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    created_by = created_by,
                    updated_by = created_by
                };
                _context.Add(settings);
                await _context.SaveChangesAsync();
                return Ok(settings);
            }
            else
            {
                var theme = await _context.applicationThemeSettings.Where(at => (at.school_id == school_id || at.school_id == "All") && at.setting_id == themeSettings.setting_id).FirstOrDefaultAsync();
                theme.appTheme_website_url = themeSettings.appTheme_website_url;
                theme.youtube_url = themeSettings.youtube_url;
                theme.primary_color = themeSettings.primary_color;
                theme.secondary_color = themeSettings.secondary_color;
                theme.button_color = themeSettings.button_color;
                theme.sidebar_bgcolor = themeSettings.sidebar_bgcolor;
                theme.sidebar_color = themeSettings.sidebar_color;
                theme.favicon_url = themeSettings.favicon_url;
                theme.updated_at = DateTime.Now;
                theme.updated_by = created_by;
                await _context.SaveChangesAsync();
                return Ok(theme);
            }
             
        }

        #endregion

        private async Task<string> SaveFileAsync(IFormFile file, string folderPath)
        {
            // Ensure file is not null
            if (file == null) return null;

            string extension = Path.GetExtension(file.FileName);
            string cleanFileName = Path.GetFileNameWithoutExtension(file.FileName);
            string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
            string filePath = Path.Combine(folderPath, fileName);

            // Save file to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }




    }
}

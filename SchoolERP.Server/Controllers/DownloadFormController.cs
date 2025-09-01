using DocumentFormat.OpenXml.Drawing.Charts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadFormController : ControllerBase
    { 
        private readonly SchoolERPContext _context;
        private readonly ILogger<DownloadFormController> _logger;
        private readonly IWebHostEnvironment _env;

        public DownloadFormController(SchoolERPContext context, ILogger<DownloadFormController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet("get-download-forms")]
        public async Task<IActionResult> getDownloadForms(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var forms = await _context.download_Forms.Where(df => df.school_id == school_id && df.isActive == true).ToListAsync();

            return Ok(forms);
        }
        

        [HttpGet("get-download-forms-by-id")]
        public async Task<IActionResult> getDownloadFormsbyId(string school_id,int form_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var form = await _context.download_Forms.Where(df => df.school_id == school_id && df.form_id == form_id && df.isActive == true).FirstOrDefaultAsync();

            return Ok(form);
        }

        [HttpGet("get-download-forms-by-type")]
        public async Task<IActionResult> getDownloadFormsbyType(string school_id,string form_type)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            download_forms form = await _context.download_Forms.Where(df => df.school_id == school_id && df.form_type == form_type && df.isActive == true).OrderByDescending(df => df.form_id).FirstOrDefaultAsync();

            return Ok(form);
        }

        [HttpPost("post-download-form")]
        public async Task<IActionResult> postDownloadForm(string school_id, download_forms_DTOs _Forms)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            string folder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "forms");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string fileName = string.Empty;
             
            if (_Forms.form_id == 0)
            { 
                if (_Forms.form_url == null)
                {
                    return BadRequest("Image not found.");
                }

                string extension = Path.GetExtension(_Forms.form_url.FileName);
                string cleanFileName = Path.GetFileNameWithoutExtension(_Forms.form_url.FileName);
                fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";

                var filePath = Path.Combine(folder, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await _Forms.form_url.CopyToAsync(stream);
                }
                 
                download_forms forms = new download_forms
                {
                    form_id = 0,
                    form_name = _Forms.form_name,
                    form_url = fileName,
                    form_type = _Forms.form_type,
                    isActive = true,
                    created_at = DateTime.Now,
                    school_id = school_id,
                };

                _context.Add(forms);
                await _context.SaveChangesAsync();
                return Ok(forms);
            }
            else
            { 
                var form = await _context.download_Forms
                    .Where(sch => sch.school_id == school_id && sch.form_id == _Forms.form_id)
                    .FirstOrDefaultAsync();

                if (form == null)
                {
                    return NotFound("Form not found.");
                }
                 
                form.form_name = _Forms.form_name;
                form.form_type = _Forms.form_type;
                 
                if (_Forms.form_url != null)
                {
                    string extension = Path.GetExtension(_Forms.form_url.FileName);
                    string cleanFileName = Path.GetFileNameWithoutExtension(_Forms.form_url.FileName);
                    fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";

                    var filePath = Path.Combine(folder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await _Forms.form_url.CopyToAsync(stream);
                    }

                    form.form_url = fileName;  
                }
                 
                _context.Update(form);
                await _context.SaveChangesAsync();
                return Ok(form);
            }
        }


        //[HttpPut("update-download-form")]
        //public async Task<IActionResult> updateDownloadForm(string school_id,download_forms_DTOs _Forms)
        //{
        //    if (string.IsNullOrEmpty(school_id))
        //    {
        //        return BadRequest("School Id is null.");
        //    }

        //    _context.Update(_Forms);
        //    await _context.SaveChangesAsync();

        //    return Ok(_Forms);
        //}

        [HttpDelete("delete-form")]
        public async Task<IActionResult> deleteDownloadForm(string school_id,int form_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            download_forms form = await _context.download_Forms.Where(df => df.school_id == school_id && df.form_id == form_id && df.isActive == true).FirstOrDefaultAsync();
            form.isActive = false;
            _context.Update(form);

            await _context.SaveChangesAsync();

            return Ok(form);
        }


    }
     
}

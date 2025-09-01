using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Controllers.Online_Exam;
using SchoolERP.Server.Controllers.SMS___Notice;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Certificate;
using SchoolERP.Server.Models.Notice;
using System.Reflection.Metadata.Ecma335;
using System.Text.RegularExpressions;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<CertificateController> _logger;
        private readonly IWebHostEnvironment _env;

        public CertificateController(SchoolERPContext context, ILogger<CertificateController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }


        [HttpGet("get-certificate")]
        public async Task<IActionResult> getCertificate(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found. ");

            var certificates = await _context.certificate_Templates.Where(ct => ct.school_id == school_id && ct.isActive == true).ToListAsync();
             
            return Ok(certificates);
        }

        [HttpGet("get-certificate-by-id")]
        public async Task<IActionResult> getCertificatebyId(string school_id,int template_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found. ");

            var certificates = await _context.certificate_Templates.Where(ct => ct.school_id == school_id && ct.template_id == template_id).FirstOrDefaultAsync();
             
            return Ok(certificates);
        }


        [HttpPost("post-certificate")]
        public async Task<IActionResult> postCertificate(string school_id, [FromForm] certificate_Dtos _Dtos)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            certificate_templates certificate_;

            string folder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "certificates");
            if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

            // 🟡 Update logic
            if (_Dtos.template_id > 0)
            {
                certificate_ = await _context.certificate_Templates.FindAsync(_Dtos.template_id);
                if (certificate_ == null) return NotFound("Template not found.");
                certificate_.updated_at = DateTime.Now;
            }
            else
            {
                certificate_ = new certificate_templates
                {
                    created_at = DateTime.Now,
                    school_id = school_id,
                    isActive = true
                };
                _context.certificate_Templates.Add(certificate_);
            }

            // Header Upload
            if (_Dtos.header != null && _Dtos.header.Length > 0)
            {
                string extension = Path.GetExtension(_Dtos.header.FileName);
                string cleanFileName = Path.GetFileNameWithoutExtension(_Dtos.header.FileName);
                string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await _Dtos.header.CopyToAsync(stream);
                }

                certificate_.header = fileName;
            }
             
            if (_Dtos.footer != null && _Dtos.footer.Length > 0)
            {
                string extension = Path.GetExtension(_Dtos.footer.FileName);
                string cleanFileName = Path.GetFileNameWithoutExtension(_Dtos.footer.FileName);
                string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await _Dtos.footer.CopyToAsync(stream);
                }

                certificate_.footer = fileName;
            }

            // Common fields
            certificate_.title = _Dtos.title;
            certificate_.template_body = _Dtos.templateBody;
            certificate_.macros_used = "";
            certificate_.background_image = "";

            string macrosUsed = Regex.Matches(_Dtos.templateBody, @"__\w+__")
                         .Cast<Match>().Select(m => m.Value).Distinct().Aggregate((a, b) => $"{a}, {b}");

            certificate_.macros_used = macrosUsed;

            await _context.SaveChangesAsync();
            return Ok(certificate_);
        }


        [HttpPost("issue-certificate")]
        public async Task<IActionResult> issueCertificate(string school_id,[FromBody] issued_certificates _Dtos)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");

            _context.Add(_Dtos);
            await _context.SaveChangesAsync();
            return Ok(_Dtos);
        }


        //ebacd 
        //fghij 
        //olmkn 
        //trpqs 
        //xywuv 
     
       

    }
}

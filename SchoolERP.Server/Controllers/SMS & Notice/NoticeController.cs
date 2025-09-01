using DocumentFormat.OpenXml.ExtendedProperties;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Notice;

namespace SchoolERP.Server.Controllers.SMS___Notice
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<NoticeController> _logger;
        private readonly IWebHostEnvironment _env;

        public NoticeController(SchoolERPContext context,ILogger<NoticeController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        #region Notices

        [HttpGet("get-notices")]
        public async Task<IActionResult> getNotices(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            var notices = await _context.notices.Where(nt => nt.school_id == school_id && nt.isActive == true).ToListAsync();
            if (notices == null) return NotFound();

            return Ok(notices);

        }

        [HttpGet("get-notice-by-id")]
        public async Task<IActionResult> getNoticebyId(string school_id,int notice_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            var notice = await _context.notices.Where(nt => nt.school_id == school_id && nt.notice_id == notice_id).FirstOrDefaultAsync();
            if (notice == null) return NotFound();

            return Ok(notice); 
        }

    [HttpPost("post-notices")]
        public async Task<IActionResult> InsertNotice([FromQuery] string school_id, [FromForm] notices notices, [FromForm] IFormFile? file)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            string folder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "notices");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            if (file != null && file.Length != 0)
            {
                string folderName = "";
                string extension = Path.GetExtension(file.FileName);
                string cleanFileName = Path.GetFileNameWithoutExtension(file.FileName);
                string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                notices.file_path = fileName;
                var filePath = Path.Combine(folder,fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

            }
            if(notices.notice_id == 0)
            {
                notices.created_At = DateTime.Now;
                _context.Add(notices);
            }
            else
            {
                var n = await _context.notices.Where(n => n.notice_id == notices.notice_id).FirstOrDefaultAsync();
                n.subject = notices.subject;
                n.notice = notices.notice;
                n.notice_for = notices.notice_for;
                n.notice_type = notices.notice_type;
                n.class_ids = notices.class_ids;
                n.sec_id = notices.sec_id;
                n.video_link = notices.video_link;
                n.file_path = notices.file_path ?? n.file_path;
                n.created_By = notices.created_By;
                _context.Update(n);
            }
            
            await _context.SaveChangesAsync();

            return Ok(notices);
        }


        [HttpDelete("delete-notices")]
        public async Task<IActionResult> deleteNotice(string school_id,int notice_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            var notice = await _context.notices.Where(n => n.notice_id == notice_id).FirstOrDefaultAsync();
            notice.isActive = false;
            _context.SaveChangesAsync();
            return Ok(notice);
        }

        #endregion

        #region Programs

        [HttpGet("get-programs")]
        public async Task<IActionResult> getPrograms(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            var programs = await _context.important_Programs.Where(ip => ip.school_id == school_id && ip.isActive == true).ToListAsync();

            return Ok(programs); 
        }

        [HttpGet("get-program-by-id")]
        public async Task<IActionResult> getSingleProgram(string school_id,int program_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            var program = await _context.important_Programs.Where(ip => ip.school_id == school_id && ip.program_id == program_id).FirstOrDefaultAsync();

            return Ok(program);
        }


        [HttpPost("post-programs")]
        public async Task<IActionResult> insertPrograms(string school_id,[FromForm] important_Programs _Programs, [FromForm] IFormFile? file)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

            string folder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "programs");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            if(file != null)
            {
                if (file.Length != 0 && file != null)
                {
                    string extension = Path.GetExtension(file.FileName);
                    string cleanFileName = Path.GetFileNameWithoutExtension(file.FileName);
                    string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                    _Programs.filePath = fileName;
                    var filePath = Path.Combine(folder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
            }
            

            if(_Programs.program_id == 0)
            {
                _context.Add(_Programs);
                await _context.SaveChangesAsync();
                return Ok(_Programs);
            }
            else
            {
                var program = await _context.important_Programs.Where(ip => ip.school_id == school_id && ip.program_id == _Programs.program_id).FirstOrDefaultAsync();
                program.title = _Programs.title;
                program.description = _Programs.description;
                program.program_For = _Programs.program_For;
                if (file != null && file.Length > 0)
                {
                    program.filePath = _Programs.filePath;
                }
                _context.Update(program);
                await _context.SaveChangesAsync();
                return Ok(program);
            } 

        }

        #endregion



    }

}

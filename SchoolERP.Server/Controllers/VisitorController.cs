using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitorController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<VisitorController> _logger;
        private readonly IWebHostEnvironment _env;

        public VisitorController(SchoolERPContext context, ILogger<VisitorController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet("get-visitors")]
        public async Task<IActionResult> getVisitors(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            List<visitor> visitors = await _context.visitors.Where(vs => vs.school_id == school_id).ToListAsync();
            return Ok(visitors);

        }

        [HttpGet("get-visitor-by-id")]
        public async Task<IActionResult> getVisitorbyId(string school_id,int visitor_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            visitor visitor = await _context.visitors.Where(vs => vs.school_id == school_id && 
            vs.visitor_id == visitor_id).FirstOrDefaultAsync();
            return Ok(visitor);
        }


        [HttpPost("post-visitor")]
        public async Task<IActionResult> postVisitor([FromQuery] string school_id, [FromQuery] IFormFile file,[FromForm] string addres,
                                             [FromForm] string meeting_with, [FromForm] DateTime appointment_date, [FromForm] DateTime check_in_time, [FromForm] DateTime check_out_time,
                                             [FromForm] string purpose_of_visit,[FromForm] string visitor_contact,
                                             [FromForm] string visitor_email,[FromForm] string? visitor_image,
                                             [FromForm] string visitor_name,[FromForm] string visitor_status
                                             )
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var folder = Path.Combine(_env.WebRootPath,"api","uploads",school_id,"visitors");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string extension = Path.GetExtension(file.FileName);
            string cleanFilePath = Path.GetFileNameWithoutExtension(file.FileName);
            string fileName = $"{cleanFilePath}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
            var filepath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

                var visitor = new visitor
                {
                    visitor_name = visitor_name,
                    visitor_contact = visitor_contact,
                    visitor_email = visitor_email,
                    meeting_with = meeting_with,
                    purpose_of_visit = purpose_of_visit,
                    appointment_date = appointment_date,
                    check_in_time = check_in_time,
                    check_out_time = check_out_time,
                    visitor_status = "In Progress",
                    addres = addres,
                    visitor_image = fileName, 
                    school_id = school_id,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                };
            _context.Add(visitor);
            await _context.SaveChangesAsync();
    
            return Ok(visitor);
        }

        [HttpPut("update-visitor")]
        public async Task<IActionResult> UpdateVisitor([FromQuery] string school_id, [FromForm] IFormFile? file,
                                               [FromForm] int visitor_id, [FromForm] string visitor_name,
                                               [FromForm] string visitor_contact, [FromForm] string visitor_email,
                                               [FromForm] string meeting_with, [FromForm] string purpose_of_visit,
                                               [FromForm] DateTime appointment_date, [FromForm] DateTime check_in_time,
                                               [FromForm] DateTime check_out_time, [FromForm] string addres,
                                               [FromForm] string visitor_status)
        {
            // Validate school_id
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
             
            var visitor = await _context.visitors.FirstOrDefaultAsync(v => v.visitor_id == visitor_id && v.school_id == school_id);
            if (visitor == null)
            {
                return NotFound("Visitor not found.");
            }
             
            visitor.visitor_name = visitor_name;
            visitor.visitor_contact = visitor_contact;
            visitor.visitor_email = visitor_email;
            visitor.meeting_with = meeting_with;
            visitor.purpose_of_visit = purpose_of_visit;
            visitor.appointment_date = appointment_date;
            visitor.check_in_time = check_in_time;
            visitor.check_out_time = check_out_time;
            visitor.addres = addres;
            visitor.visitor_status = visitor_status;
            visitor.updated_at = DateTime.Now;

            // If a new file (image) is uploaded
            if (file != null && file.Length > 0)
            { 
                var oldImagePath = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "visitors", visitor.visitor_image);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
                 
                var folder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "visitors");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string extension = Path.GetExtension(file.FileName);
                string cleanFilePath = Path.GetFileNameWithoutExtension(file.FileName);
                string fileName = $"{cleanFilePath}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                var filepath = Path.Combine(folder, fileName);
                 
                using (var stream = new FileStream(filepath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                 
                visitor.visitor_image = fileName;
            }
             
            _context.visitors.Update(visitor);
            await _context.SaveChangesAsync();

            // Return success
            return Ok(visitor);
        }


        [HttpDelete("delete-visitor")]
        public async Task<IActionResult> deleteVisitor(string school_id, int visitor_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            visitor visitor = await _context.visitors.Where(v => v.school_id == school_id &&
            v.visitor_id == visitor_id).FirstOrDefaultAsync();
            if(visitor != null)
            {
                _context.Remove(visitor);
                await _context.SaveChangesAsync();
            }
            return Ok(visitor);

        }
         

    }
}

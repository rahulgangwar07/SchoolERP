using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers.Student_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SAcademicController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SAcademicController> _logger;

        public SAcademicController(SchoolERPContext context, ILogger<SAcademicController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("get-syllabus")]
        public async Task<IActionResult> getSyllabus(string school_id, int class_id, int subject_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id may not be null! ");
            }
             
            var chapterId = await _context.chapters
                .Where(c => c.school_id == school_id && c.class_id == class_id && c.subject_id == subject_id && c.isDeleted == false)
                .ToDictionaryAsync(c => c.chapter_id, c => c.chapter_name);
             
            var syllabus = await _context.syllabus
                .Where(c => c.school_id == school_id && c.isDeleted == false && chapterId.Keys.Contains(c.chapter_id))
                .Select(s => new
                {
                    s.syllabus_id,
                    s.chapter_id,
                    s.class_id,
                    s.topic_name,
                    s.document,
                    s.document_type,
                    chapter_name = chapterId.ContainsKey(s.chapter_id) ? chapterId[s.chapter_id] : null // Fetch chapter_name from the dictionary
                })
                .ToListAsync();

            return Ok(syllabus);
        }


    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Subjects;
using System.Collections.Generic;
using System.Linq;

namespace SchoolERP.Server.Controllers.Subjects
{
    [Route("api/[controller]")]
    [ApiController]
    public class SyllabusController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SyllabusController> _logger;
        private readonly IWebHostEnvironment _env;
        public SyllabusController(ILogger<SyllabusController> logger,SchoolERPContext context, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet("get-chapter")]
        public async Task<IActionResult> getChapters(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null! ");
            }
            var chapters = await _context.chapters.Where(c => c.school_id == school_id && c.isDeleted == false).ToListAsync();
            return Ok(chapters);
        }

        [HttpGet("get-chapterbyClass")]
        public async Task<IActionResult> getChaptersbyClass(string school_id, int class_id, int subject_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null! ");
            }
            var chapters = await _context.chapters.Where(c => c.school_id == school_id && c.class_id == class_id && (subject_id == 0 || c.subject_id == subject_id) && c.isDeleted == false).ToListAsync();
            return Ok(chapters);
        }

        [HttpPost("add-chapter")]
        public async Task<IActionResult> addChapter(string school_id, [FromBody] chapterRequest1 chapter)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null! ");
            }

            chapters chapters = new chapters
            {
                subject_id = chapter.subject_id,
                class_id = chapter.class_id,
                chapter_name = chapter.chapter_name,
                isDeleted = false,
                school_id = school_id,
                created_at = DateTime.Now,
                updated_at = DateTime.Now
            };
            _context.chapters.Add(chapters);
            await _context.SaveChangesAsync();

            return Ok(chapters);
        }



        [HttpGet("get-syllabus")]
        public async Task<IActionResult> GetSyllabus(string school_id, int class_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null!");
            }

            // Fetching chapters based on the school_id and class_id
            var chapters = await _context.chapters
               .Where(c => c.school_id == school_id && (c.class_id == class_id || class_id == 0) && c.isDeleted == false)
               .ToListAsync();

            // Fetching class names based on school_id
            var classNames = await _context.classNames.Where(cn => cn.school_id == school_id)
                .ToDictionaryAsync(cn => cn.class_id, cn => cn.class_name);


            var subjectNames = await _context.subjects.Where(sub => sub.school_id == school_id && sub.IsActive == true)
                .ToDictionaryAsync(sub => sub.subject_id, sub => sub.subject_name);

            // Fetching all syllabus entries
            var syllabus = await _context.syllabus
                .Where(syl => syl.school_id == school_id && syl.isDeleted == false).ToListAsync();

            var filteredSyllabus = syllabus
                .Where(syl => chapters.Any(ch => ch.chapter_id == syl.chapter_id && ch.class_id == syl.class_id))
                .Select(x => new
                {
                    x.syllabus_id,
                    x.chapter_id,
                    x.topic_name,
                    x.document,
                    x.document_type,
                    x.created_at,
                    x.updated_at,

                    ChapterName = chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.chapter_name ?? "Unknown",

                    class_id = chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.class_id ?? 0,
                    subject_id = chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.subject_id ?? 0,

                    // Get class name from classNames dictionary
                    class_name = classNames.ContainsKey(chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.class_id ?? 0)
                        ? classNames[chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.class_id ?? 0] : "Unknown",

                    subject_name = subjectNames.ContainsKey(chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.subject_id ?? 0)
                        ? subjectNames[chapters.FirstOrDefault(c => c.chapter_id == x.chapter_id)?.subject_id ?? 0]
                        : "Unknown"
                }).ToList();

            var groupedSyllabus = filteredSyllabus.GroupBy(syl => syl.class_name)
    .Select(classGroup => new
    {
        ClassName = classGroup.Key,
        Subjects = classGroup
            .GroupBy(syl => syl.subject_name)
            .Select(subjectGroup => new
            {
                SubjectName = subjectGroup.Key,
                Topics = subjectGroup.Select(g => new
                {
                    g.syllabus_id,
                    g.chapter_id,
                    g.topic_name,
                    g.ChapterName,
                    g.created_at,
                    g.document,
                    g.document_type
                }).ToList()
            }).ToList()
    }).ToList();


            return Ok(groupedSyllabus);
        }




        //[HttpGet("get-syllabus")]
        //public async Task<IActionResult> GetSyllabus(string school_id, int class_id)
        //{
        //    if (string.IsNullOrEmpty(school_id))
        //    {
        //        return BadRequest("School Id is null!");
        //    }

        //    // Fetching classes and subjects based on school_id
        //    Dictionary<int, string> classes = await _context.classNames
        //        .Where(s => s.school_id == school_id && s.status == true)
        //        .ToDictionaryAsync(s => s.class_id, s => s.class_name);

        //    Dictionary<int, string> subjects = await _context.subjects
        //        .Where(s => s.school_id == school_id && s.IsActive == true)
        //        .ToDictionaryAsync(s => s.subject_id, s => s.subject_name);

        //    // Fetching syllabus and chapter data based on the provided conditions
        //    var data = await (from s in _context.syllabus
        //                      join c in _context.chapters
        //                      on new { s.school_id, s.chapter_id,s.class_id, s.isDeleted } equals new { c.school_id, c.chapter_id,c.class_id, c.isDeleted }
        //                      where s.school_id == school_id && s.isDeleted == false
        //                      select new
        //                      {
        //                          s.syllabus_id,s.chapter_id,c.class_id,
        //                          class_name = classes.ContainsKey(c.class_id) ? classes[c.class_id] : "Unknown",
        //                          c.subject_id,
        //                          subject_name = subjects.ContainsKey(c.subject_id) ? subjects[c.subject_id] : "Unknown",
        //                          s.topic_name,s.document,s.document_type,s.updated_at,c.chapter_name
        //                      }).ToListAsync();

        //    if (data == null || !data.Any())
        //    {
        //        return NotFound("No syllabus found for the provided school ID.");
        //    }

        //    // Grouping data by class_name and then by subject_name
        //    var groupedData = data
        //        .GroupBy(d => d.class_name)
        //        .Select(classGroup => new
        //        {
        //            ClassName = classGroup.Key,
        //            Subjects = classGroup
        //                .GroupBy(d => d.subject_name)
        //                .Select(subjectGroup => new
        //                {
        //                    SubjectName = subjectGroup.Key,
        //                    Topics = subjectGroup.Select(topic => new
        //                    {
        //                        topic.syllabus_id,
        //                        topic.chapter_id,
        //                        topic.topic_name,
        //                        topic.chapter_name,
        //                        topic.updated_at,
        //                        topic.document,
        //                        topic.document_type,
        //                        Action = new
        //                        {
        //                            DownloadLink = $"/path/to/document/{topic.document}", // Adjust the document URL
        //                            topic.document_type
        //                        }
        //                    }).ToList()
        //                }).ToList()
        //        }).ToList();

        //    return Ok(groupedData);
        //}





        [HttpPost("add-syllabus")]
        public async Task<IActionResult> addSyllabus(string school_id, [FromForm] syllabusRequest1 syllabus)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null! ");
            }

            if (syllabus.document == null || syllabus.document.Length == 0)
            {
                return BadRequest("No file uploaded!");
            }

            var folder = Path.Combine(_env.WebRootPath,"api","uploads",school_id,"syllabus");

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string extension = Path.GetExtension(syllabus.document.FileName);
            string cleanFileName = Path.GetFileNameWithoutExtension(syllabus.document.FileName);
            string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
            var filePath = Path.Combine(folder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await syllabus.document.CopyToAsync(stream);
            }


                Syllabus syll = new Syllabus
                {
                    chapter_id = syllabus.chapter_id,
                    class_id = syllabus.class_id,
                    topic_name = syllabus.topic_name,
                    document = fileName,
                    document_type = extension,
                    isDeleted = false,
                    school_id = school_id,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                };
            _context.syllabus.Add(syll);
            await _context.SaveChangesAsync();

            return Ok(syll);
        }

        [HttpDelete("delete-syllabus")]
        public async Task<IActionResult> deleteSyllabus(string school_id,int syllabus_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found! ");
            }

            var syllabus = await _context.syllabus.Where(syl => syl.school_id == school_id && syl.syllabus_id == syllabus_id).FirstOrDefaultAsync();
            syllabus.isDeleted = true;
            await _context.SaveChangesAsync();

            return Ok(syllabus_id);
        }

    }
}

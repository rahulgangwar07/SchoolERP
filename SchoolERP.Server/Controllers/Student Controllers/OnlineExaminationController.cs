using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Online_Exam;
using SchoolERP.Server.Models.Student_Models;
using SchoolERP.Server.Services;

namespace SchoolERP.Server.Controllers.Student_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnlineExaminationController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly bussinessLogic _bussinessLogic;
        private readonly ILogger<OnlineExaminationController> _logger;

        public OnlineExaminationController(SchoolERPContext context,bussinessLogic bussinessLogic,ILogger<OnlineExaminationController> logger)
        {
            _context = context;
            _bussinessLogic = bussinessLogic;
            _logger = logger;
        }

        [HttpGet("get-exams")]
        public async Task<IActionResult> getExams([FromQuery] examRequestDTOs ex)
        {
            try
            {
                if (string.IsNullOrEmpty(ex.school_id) || string.IsNullOrEmpty(ex.session) || ex.class_id == 0 || ex.uid == 0)
                {
                    return BadRequest("Something missing school_id or session or class_id or su_id. ");
                }

                int stu_id = await _bussinessLogic.getStuID(ex.school_id, ex.session, ex.class_id, ex.uid);

                Dictionary<int, string> subjectList = await _bussinessLogic.getSubjects(ex.school_id);

                var student_exams = await _context.student_Exams.Where(se => se.school_id == ex.school_id && se.stu_id == stu_id)
                    .ToListAsync();
                List<int> exam_id = student_exams.Select(s => s.exam_id).Distinct().ToList();
                List<int> today_exam_id = student_exams.Where(s => s.exam_date.HasValue && DateOnly.FromDateTime(s.exam_date.Value)
                    == DateOnly.FromDateTime(DateTime.Now)).Select(s => s.exam_id).ToList();

                var exams = await _context.exams.Where(ex => ex.school_id == ex.school_id && ex.session == ex.session &&
                ex.class_id == ex.class_id && exam_id.Contains(ex.exam_id)
                 && ((DateOnly.FromDateTime(ex.exam_start_date) <= DateOnly.FromDateTime(DateTime.Now) && DateOnly.FromDateTime(ex.exam_end_date) >= DateOnly.FromDateTime(DateTime.Now)) || today_exam_id.Contains(ex.exam_id))
                ).Select(s => new
                {
                    s.exam_id,
                    s.type,
                    s.exam_name,
                    s.subject_id,
                    s.exam_title,
                    s.exam_start_date,
                    s.exam_end_date,
                    s.duration_type,
                    s.start_time,
                    s.end_time,
                    s.duration,

                }).ToListAsync();

                if (exams == null)
                {
                    return NotFound("Exams are not avaiable! ");
                }

                return Ok(exams);
            }
            catch(Exception exx)
            {
                return StatusCode(500, exx.Message);
            }
        }

        [HttpGet("get-exam-instruction")]
        public async Task<IActionResult> getExamInstruction([FromQuery] examRequestDTOs exe)
        {
            if (string.IsNullOrEmpty(exe.school_id))
            {
                // Return a BadRequest response when school_id is null or empty
                return BadRequest("SchoolId is null here.");
            }

            // Fetch student ID based on the provided details
            int stu_id = await _bussinessLogic.getStuID(exe.school_id, exe.session, exe.class_id, exe.uid);

            // Find the student exam record
            var student_exams = await _context.student_Exams
                .Where(se => se.school_id == exe.school_id && se.stu_id == stu_id && exe.exam_id == se.exam_id)
                .FirstOrDefaultAsync();

            if (student_exams == null)
            {
                // Handle the case where no student exam record is found
                return NotFound("Student exam not found.");
            }

            int exam_id = student_exams.exam_id;
            int student_exam_id = student_exams.student_exam_id;
             
            var today_exam_ids = await _context.student_Exams
                .Where(s => s.exam_date.HasValue && DateOnly.FromDateTime(s.exam_date.Value) == DateOnly.FromDateTime(DateTime.Now))
                .Select(s => s.exam_id)
                .ToListAsync();
             
            var exams = await _context.exams
                .Where(ex => ex.school_id == exe.school_id && ex.session == exe.session && ex.class_id == exe.class_id &&
                            ex.exam_id == exe.exam_id &&
                            ex.exam_id == exam_id &&
                            (
                                (DateOnly.FromDateTime(ex.exam_start_date) <= DateOnly.FromDateTime(DateTime.Now) &&
                                 DateOnly.FromDateTime(ex.exam_end_date) >= DateOnly.FromDateTime(DateTime.Now)) ||
                                 today_exam_ids.Contains(ex.exam_id)
                            ))
                .Select(s => new
                {
                    s.exam_id,
                    s.exam_title,
                    s.instruction_to_condidate,
                    s.description,
                    student_exam_id
                })
                .FirstOrDefaultAsync();

            if (exams == null)
            {
                return NotFound("Exam details not found.");
            }

            // Return the exam details if found
            return Ok(exams);
        }

  
        public class examRequestDTOs
        {
            public int? exam_id { get; set; }
            public int class_id { get; set; }
            public int uid { get; set; }
            public string session { get; set; }
            public string school_id { get; set; }
        }
    }
}

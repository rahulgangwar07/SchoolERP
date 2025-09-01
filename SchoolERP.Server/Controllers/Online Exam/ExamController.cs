using DocumentFormat.OpenXml.Office.SpreadSheetML.Y2023.MsForms;
using DocumentFormat.OpenXml.Office2013.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SchoolERP.Server.Controllers.Student_Controllers;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Online_Exam;
using System.Data;

namespace SchoolERP.Server.Controllers.Online_Exam
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<ExamController> _logger;

        public ExamController(SchoolERPContext context, ILogger<ExamController> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Exams

        [HttpGet("get-exams")]
        public async Task<IActionResult> getExams(string school_id, string session)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
                {
                    return BadRequest("School Id and Session are mandatory fields!");
                }
                 

                var exams = await _context.exams
                    .Where(ex => ex.school_id == school_id && ex.session == session && ex.isActive == true)
                    .Select(ex => new
                    {
                        ex,
                        question_count = _context.questions.Where(q => q.exam_id == ex.exam_id).Count(),
                        result_count = _context.student_Exams.Where(q => q.exam_id == ex.exam_id && q.status == "Attempted").Count(),
                    })
                    .ToListAsync();

                return Ok(exams);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
                Console.WriteLine("Exception is: " + ex.Message);
            }
        }


        [HttpGet("get-exam-by-id")]
        public async Task<IActionResult> getExamById(string school_id, string session,int exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session are mendatory fields! ");
            }

            var exams = await _context.exams.Where(ex => ex.school_id == school_id && ex.session == session && ex.exam_id == exam_id).FirstOrDefaultAsync();

            return Ok(exams);
        }

        [HttpPost("post-exams")]
        public async Task<IActionResult> postExams(string school_id, string session, ExamsDTOs examsDTOs )
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session are mendatory fields! ");
            }
            examsDTOs.sec_id = examsDTOs.sec_id ?? 0;

            if(examsDTOs.exam_id == 0)
            {
                Exams exams = new Exams
                {
                    type = examsDTOs.type,
                    exam_name = examsDTOs.exam_name,
                    class_id = examsDTOs.class_id,
                    sec_id = examsDTOs.sec_id,
                    session = session,
                    subject_id = examsDTOs.subject_id,
                    exam_title = examsDTOs.exam_title,
                    faculty_id = examsDTOs.faculty_id,
                    exam_start_date = Convert.ToDateTime(examsDTOs.exam_start_date),
                    exam_end_date = Convert.ToDateTime(examsDTOs.exam_end_date),
                    duration_type = examsDTOs.duration_type,
                    start_time = string.IsNullOrEmpty(examsDTOs.start_time) ? TimeSpan.Zero : TimeSpan.Parse(examsDTOs.start_time),
                    end_time = string.IsNullOrEmpty(examsDTOs.end_time) ? TimeSpan.Zero : TimeSpan.Parse(examsDTOs.end_time),
                    duration = examsDTOs.duration,
                    instruction_to_condidate = examsDTOs.instruction_to_condidate,
                    description = examsDTOs.description,
                    //result_restriction = false,
                    //exam_restriction = false,
                    ans_sheet_status = false,
                    status = "Pending",
                    school_id = school_id,
                    isActive = true,
                    created_date = DateTime.Now
                };

                _context.Add(exams);
                await _context.SaveChangesAsync();
                if(exams != null)
                {
                    using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
                    {
                        await con.OpenAsync();
                        string proc = "Create_Student_Exams";
                        using (SqlCommand cmd = new SqlCommand(proc, con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@exam_id", exams.exam_id); 
                            cmd.Parameters.AddWithValue("@school_id", school_id);
                            cmd.Parameters.AddWithValue("@session", session);
                            cmd.Parameters.AddWithValue("@class_id", examsDTOs.class_id);
                            cmd.Parameters.AddWithValue("@sec_id", examsDTOs.sec_id);
                            await cmd.ExecuteNonQueryAsync();
                        }
                        await con.CloseAsync();
                    }
                }
                return Ok(exams);
            }
            else
            { 
                var exam = await _context.exams.Where(ex => ex.school_id == school_id && ex.session == session && ex.exam_id == examsDTOs.exam_id).FirstOrDefaultAsync();
                if(exam != null)
                {
                    exam.exam_start_date = examsDTOs.exam_start_date;
                    exam.exam_end_date = examsDTOs.exam_end_date;
                    //exam.duration_type = examsDTOs.duration_type;
                    //exam.start_time = examsDTOs.start_time;
                    //exam.end_time = examsDTOs.end_time;
                    exam.duration = examsDTOs.duration;
                    exam.instruction_to_condidate = examsDTOs.instruction_to_condidate;
                    exam.description = examsDTOs.description;
                    await _context.SaveChangesAsync();
                }

                return Ok();
            } 
            
        }

        [HttpDelete("delete-exam")]
        public async Task<IActionResult> deleteExam(string school_id, string session, int exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session are mendatory fields! ");
            }

            var exam = await _context.exams.Where(ex => ex.school_id == school_id && ex.session == session && ex.exam_id == exam_id).FirstOrDefaultAsync();

            exam.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(exam);
        }

       
        [HttpPut("update-stu-result-date")]
        public async Task<IActionResult> updateStuResultDate(string school_id, updateStuDTO stuDTO)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("SchoolId is null");
            }
            var stuExam = await _context.student_Exams.Where(se => se.school_id == school_id && se.exam_id == stuDTO.exam_id
            && se.student_exam_id == stuDTO.student_exam_id).FirstOrDefaultAsync();
            if(stuDTO.exam_date != null)
            {
                stuExam.exam_date = stuDTO.exam_date ?? DateTime.MinValue;
            } 
            await _context.SaveChangesAsync();
            return Ok(stuExam);

        }

    
        [HttpPost("exam-permissions")]
        public async Task<IActionResult> examPermissions([FromBody] ExamPermissionDTOs dTOs)
        {

            if(string.IsNullOrEmpty(dTOs.school_id) || string.IsNullOrEmpty(dTOs.session))
            {
                return BadRequest("School Id and session is mendatory fields! ");
            }

            var exam = await _context.exams.Where(ex => ex.exam_id == dTOs.exam_id && ex.school_id == dTOs.school_id && ex.session == dTOs.session)
                .FirstOrDefaultAsync();

            //exam.result_restriction = dTOs.result_restriction;
            //exam.exam_restriction = dTOs.exam_restriction;
            if (!string.IsNullOrEmpty(dTOs.result_date))
            {
                exam.result_date = Convert.ToDateTime(dTOs.result_date);
            }
            if (!string.IsNullOrEmpty(dTOs.lock_date))
            {
                exam.lock_date = Convert.ToDateTime(dTOs.lock_date);
            } 
            exam.ans_sheet_status = dTOs.ans_sheet_status;

            await _context.SaveChangesAsync();

            return Ok(exam);
        }

        #endregion

        
    }
    public class updateStuDTO
    {
        public int exam_id { get; set; }
        public int student_exam_id { get; set; }
        public DateTime? exam_date { get; set; }
    }



}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Online_Exam;
using SchoolERP.Server.Services;
using System.Data;

namespace SchoolERP.Server.Controllers.Online_Exam
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentExamController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly bussinessLogic _bussinessLogic;
        private readonly ILogger<StudentExamController> _logger;

        public StudentExamController(SchoolERPContext context,bussinessLogic bussinessLogic, ILogger<StudentExamController> logger)
        {
            _context = context;
            _bussinessLogic = bussinessLogic;
            _logger = logger;
        }

        [HttpGet("get-stu-exams")]
        public async Task<IActionResult> getStuExams(string school_id, string session, int exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School ID and session is mendatory! ");
            }
            using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("getstudentExam", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@school_id", school_id);
                cmd.Parameters.AddWithValue("@session", session);
                cmd.Parameters.AddWithValue("@exam_id", exam_id);

                DataTable dt = new DataTable();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                await con.CloseAsync();

                if (dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                await con.CloseAsync();
            }


            return NotFound();

        }


        [HttpGet("get-student-exam-by-id")]
        public async Task<IActionResult> getStudentExambyID(string school_id, int stu_exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || stu_exam_id == 0)
            {
                return BadRequest("SChool Id and stu_exam_id is null.");
            }

            var studentExam = await _context.student_Exams.FirstOrDefaultAsync(se => se.school_id == school_id && se.student_exam_id == stu_exam_id);

            return Ok(studentExam);
        }

        [HttpGet("get-all-student-exam")]
        public async Task<IActionResult> getAllStudentExam(string school_id, string session, int uid)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("SChool Id and stu_exam_id is null.");
            }

            int stu_id = await _bussinessLogic.getStuID(school_id, session, 0, uid);

            var studentExam = await _context.student_Exams.Where(se => se.school_id == school_id && se.stu_id == stu_id).ToListAsync();
            return Ok(studentExam);
        }

        
        [HttpGet("get-student-result")]
        public async Task<IActionResult> getStudentResult(string school_id,string session,int exam_id,int stu_exam_id,int uid)
        {
            if(string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("Mandetory fields are not fill.");
            }
            if(uid == 0)
            {
                var result = await _bussinessLogic.GetStudentResult(school_id, exam_id, stu_exam_id);
                return Ok(result);
            }else
            {
                int stu_id = await _context.tb_studentmasters.Where(sm => sm.school_id == school_id && sm.session == session &&
                sm.uid == uid).Select(sm => sm.stu_id).FirstOrDefaultAsync();

                var exams = await _context.student_Exams.Where(sm => sm.school_id == school_id && sm.stu_id == stu_id).ToListAsync();
                Dictionary<int,string> subjects = await _context.subjects.Where(sub => sub.school_id == school_id && sub.IsActive == true).ToDictionaryAsync(sub => sub.subject_id,sub => sub.subject_name);
                var results = new List<object>();

                foreach(var exam in exams)
                {
                    var stuExams = await _context.exams.Where(ex => ex.school_id == school_id && ex.exam_id == exam.exam_id).FirstOrDefaultAsync();
                    StudentResult result = await _bussinessLogic.GetStudentResult(school_id, exam.exam_id, exam.student_exam_id);
                    var data = new
                    {
                        stuExams.exam_id,
                        exam.student_exam_id,
                        stuExams.exam_name,
                        stuExams.class_id,
                        stuExams.subject_id,
                        subject_name = subjects[stuExams.subject_id] ?? "",
                        stuExams.exam_title,
                        stuExams.faculty_id,
                        stuExams.result_restriction,
                        stuExams.exam_restriction,
                        stuExams.ans_sheet_status, 
                        result.question_count,
                        result.attempted,
                        result.correct,
                        result.wrong,
                        result.string_rate,
                        result.attempt_date
                    };
                    results.Add(data);
                }
                return Ok(results);
            }
             
        }

        [HttpGet("all-student-result")]
        public async Task<IActionResult> AllStudentResult(string school_id, int class_id, int sec_id)
        { 
            if (string.IsNullOrEmpty(school_id) || class_id == 0)
            {
                return BadRequest("Mandatory fields are not filled.");
            }
             
            List<int> examIds = await _context.exams
                .Where(ex => ex.school_id == school_id && ex.class_id == class_id
                            && (ex.sec_id == sec_id || sec_id == 0) && ex.isActive)
                .Select(ex => ex.exam_id)
                .ToListAsync();
             
            List<Student_Exams> student_Exams = await _context.student_Exams
                .Where(se => se.school_id == school_id && examIds.Contains(se.exam_id) && se.status == "Attempted")
                .ToListAsync();
             
            if (student_Exams == null || student_Exams.Count == 0)
            {
                return NotFound("No student results found for this exam.");
            }
             
            List<int> stuIds = student_Exams.Select(se => se.stu_id).ToList();
            var stu_data = await (from sm in _context.tb_studentmasters
                                  join so in _context.student_Other_Infos
                                  on new { sm.uid, sm.school_id } equals new { so.uid, so.school_id }
                                  where sm.school_id == school_id && stuIds.Contains(sm.stu_id) select new
                                  {
                                      sm.stu_id,
                                      sm.uid,
                                      stu_name = so.first_name + " " + so.last_name,
                                      so.father_name
                                  }).ToListAsync();
             
            var stuDataDict = stu_data.ToDictionary(s => s.stu_id,s => s); 
            var results = new List<object>();
             
            foreach (var studentExam in student_Exams)
            { 
                var result = await _bussinessLogic.GetStudentResult(school_id, studentExam.exam_id, studentExam.student_exam_id);

                if (result != null)
                { 
                    if (stuDataDict.TryGetValue(studentExam.stu_id, out var studentInfo))
                    { 
                        var resultWithStudentData = new
                        {
                            studentInfo.stu_id,
                            studentInfo.stu_name,
                            studentInfo.father_name, 
                            studentExam.exam_id,
                            studentExam.student_exam_id,
                            result.answer_sheet,
                            result.question_count,
                            result.attempted,
                            result.correct,
                            result.wrong,
                            result.string_rate
                        };
                         
                        results.Add(resultWithStudentData);
                    }
                }
            }
             
            return Ok(results);
        }


        [HttpDelete("delete-student-result")]
        public async Task<IActionResult> deleteStudentResult(string school_id,int stu_exam_id)
        {
            if(string.IsNullOrEmpty(school_id) || stu_exam_id == 0)
            {
                return BadRequest("school id and stu_exam_id is null");
            }
            var stu_exam = await _context.student_Exams.Where(se => se.school_id == school_id &&
            se.student_exam_id == stu_exam_id).FirstOrDefaultAsync();

            var stu_ans = await _context.student_Answers.Where(sa => sa.school_id == school_id && sa.student_exam_id == stu_exam_id).ToListAsync();
            _context.RemoveRange(stu_ans);
            stu_exam.status = "Pending";
            await _context.SaveChangesAsync();
            return Ok(stu_exam);
        }

        #region for Student 
        //[HttpGet("get-result-for-student")]
        //public async Task<IActionResult> getResultForStudent(string school_id, int class_id, int uid)
        //{
        //    int stu_id = await _context.tb_studentmasters.Where(sm => sm.class_id == class_id && sm.uid == uid).Select(sm => sm.stu_id).FirstOrDefaultAsync();

        //    return Ok();
        //}

        #endregion


    }
}



using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Online_Exam;

namespace SchoolERP.Server.Controllers.Online_Exam
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionAnswerController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<QuestionAnswerController> _logger;

        public QuestionAnswerController(SchoolERPContext context, ILogger<QuestionAnswerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Answer

        [HttpPost("update-stu-answer-by-id")]
        public async Task<IActionResult> updateStudentAnswer(string school_id,int stu_exam_id,int question_id)
        {
            if (string.IsNullOrEmpty(school_id) || stu_exam_id == 0 || question_id == 0)
            {
                return BadRequest("School Id or Student Exam id and question id is mendatory fields! ");
            }

            var stuExams = await _context.student_Exams.Where(se => se.school_id == school_id && se.student_exam_id == stu_exam_id).FirstOrDefaultAsync();
            var stuAns = await _context.student_Answers.Where(se => se.school_id == school_id && se.student_exam_id == stu_exam_id && se.question_id == question_id).FirstOrDefaultAsync();
            Dictionary<int,int?> question = await _context.questions.Where(se => se.school_id == school_id && se.question_id == question_id).ToDictionaryAsync(se => se.question_id,se => se.correct_option);
            return Ok();
        }


        #endregion

        [HttpPost("post-answers")]
        public async Task<IActionResult> postAnswers(string school_id, int stu_exam_id, List<Student_Answers> student_Answers)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School id should not be null.");
            } 

            List<int> ques_id = student_Answers.Select(sch => sch.question_id).ToList();
            var questions = await _context.questions.Where(qu => qu.school_id == school_id && ques_id.Contains(qu.question_id)).ToListAsync();
            var questionDictionary = questions.ToDictionary(q => q.question_id, q => q);
             foreach(var stu in student_Answers)
            {
                if(stu.selected_option != 0)
                {
                    if (questionDictionary.ContainsKey(stu.question_id))
                    {
                        var question = questionDictionary[stu.question_id];
                        if(question.correct_option == stu.selected_option)
                        {
                            stu.marks_awarded = question.marks;
                        }
                        else
                        {
                            stu.marks_awarded = 0;
                        }
                    }
                }
                
            }
            _context.AddRange(student_Answers);
            await _context.SaveChangesAsync();

            var stuexam = await _context.student_Exams.Where(s => s.school_id == school_id && s.student_exam_id == stu_exam_id).FirstOrDefaultAsync();
            stuexam.exam_date = DateTime.Now;
            stuexam.create_date = DateTime.Now;
            stuexam.status = "Attempted"; 
            await _context.SaveChangesAsync();

            return Ok(student_Answers);
        }

        [HttpPost("post-single-answer")]
        public async Task<IActionResult> postSingleAnswer(string school_id,Student_Answers quesAns)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }
            var question = await _context.questions.Where(qu => qu.school_id == school_id && qu.question_id == quesAns.question_id).FirstOrDefaultAsync();
            if(string.IsNullOrEmpty(quesAns.answer_text) && (question.correct_option == quesAns.selected_option))
            {
                quesAns.marks_awarded = question.marks;
            }
            _context.Add(quesAns);
            await _context.SaveChangesAsync();
            return Ok(quesAns);
        }

        [HttpPut("put-answers")]
        public async Task<IActionResult> updateAnswer(string school_id,int ans_id, [FromHeader] int option, [FromHeader] string? answer_text, [FromHeader] int marks)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            var ans = await _context.student_Answers.Where(sa => sa.school_id == school_id && sa.answer_id == ans_id).FirstOrDefaultAsync();
            var ques = await _context.questions.Where(qu => qu.school_id == school_id && qu.question_id == ans.question_id).FirstOrDefaultAsync();
            if (string.IsNullOrEmpty(answer_text))
            {
                ans.selected_option = option;
                if (ques.correct_option == option)
                {
                    ans.marks_awarded = ques.marks;
                }
                else
                {
                    ans.marks_awarded = 0;
                }
            }
            else
            {
                ans.answer_text = answer_text;
                ans.marks_awarded = marks;
            }
            
            await _context.SaveChangesAsync();
            return Ok(ans);
        }

        #region Question


        [HttpGet("get-question")]
        public async Task<IActionResult> getQuestion(string school_id, int exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || exam_id == 0)
            {
                return BadRequest("School Id and exam id are required.");
            }
            var questions = await _context.questions.Where(qu => qu.school_id == school_id && qu.exam_id == exam_id && qu.isActive == true).ToListAsync();
            return Ok(questions);

        }

        [HttpGet("get-question-with-ans")]
        public async Task<IActionResult> getQuestionwithAnswer(string school_id, int exam_id, int stu_exam_id)
        {
            if (string.IsNullOrEmpty(school_id) || exam_id == 0 || stu_exam_id == 0)
            {
                return BadRequest("School Id and exam id and stu id are required.");
            }

            var result = await (from q in _context.questions
                                join sa in _context.student_Answers
                                    on new { q.school_id, q.question_id } equals new { sa.school_id, sa.question_id } into saGroup
                                from sa in saGroup.DefaultIfEmpty()
                                where q.school_id == school_id
                                && q.exam_id == exam_id
                                && (sa.student_exam_id == stu_exam_id || sa.student_exam_id == null)
                                select new
                                {
                                    q.question_id,
                                    q.exam_id,
                                    q.question_text,
                                    q.question_type,
                                    q.marks,
                                    q.option_1,
                                    q.option_2,
                                    q.option_3,
                                    q.option_4,
                                    q.correct_option,
                                    answer_id = sa != null ? sa.answer_id : (int?)null,
                                    student_exam_id = sa != null ? sa.student_exam_id : (int?)null,
                                    selected_option = sa != null ? sa.selected_option : 0,
                                    answer_text = sa != null ? sa.answer_text : null,
                                    marks_awarded = sa != null ? sa.marks_awarded : (float?)null
                                }).ToListAsync();


            return Ok(result);
        }



        [HttpGet("get-single-question")]
        public async Task<IActionResult> getSingleQuestion(string school_id, int exam_id, int question_id)
        {
            if (string.IsNullOrEmpty(school_id) || exam_id == 0)
            {
                return BadRequest("School Id and exam id are required.");
            }
            var questions = await _context.questions.Where(qu => qu.school_id == school_id && qu.exam_id == exam_id && qu.question_id == question_id
            && qu.isActive == true).FirstOrDefaultAsync();
            return Ok(questions);

        }

        [HttpPost("add-question")]
        public async Task<IActionResult> addQuestions(string session, [FromBody] Questions question)
        {
            if (string.IsNullOrEmpty(question.school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session are required.");
            }

            if (question == null)
            {
                return BadRequest("Question data is null.");
            }

            if (question.question_id == 0)
            {
                _context.Add(question);
                await _context.SaveChangesAsync();
                return Ok(question);
            }
            else
            {
                if (question == null)
                {
                    return NotFound("Question not found for update.");
                }

                if (question.question_type == "subjective")
                {
                    question.option_1 = "";
                    question.option_2 = "";
                    question.option_3 = "";
                    question.option_4 = "";
                    question.option_5 = "";
                    question.correct_option = 0;
                    _context.Update(question);
                }
                else
                {
                    _context.Update(question);
                }


                await _context.SaveChangesAsync();
                return Ok(question);
            }


        }


        [HttpDelete("delete-question")]
        public async Task<IActionResult> deleteQuestion(string school_id, int exam_id, int question_id)
        {
            if (string.IsNullOrEmpty(school_id) || exam_id == 0 || question_id == 0)
            {
                return BadRequest("School Id or exam_id and question_id is null.");
            }

            var question = await _context.questions.Where(q => q.school_id == school_id && q.exam_id == exam_id && q.question_id == question_id)
                .FirstOrDefaultAsync();
            question.isActive = false;

            await _context.SaveChangesAsync();

            return Ok(question);

        }

        #endregion
    }
}

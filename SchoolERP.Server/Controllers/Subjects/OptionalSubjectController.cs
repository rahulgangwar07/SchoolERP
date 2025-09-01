using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Presentation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Subjects;

namespace SchoolERP.Server.Controllers.Subjects
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionalSubjectController : ControllerBase
    {
        private static SchoolERPContext _context;
        private static ILogger<SubjectsController> _logger;

        public OptionalSubjectController(ILogger<SubjectsController> logger,SchoolERPContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("optionalSubject")]
        public async Task<IActionResult> optionalSubject([FromHeader] string school_id, [FromHeader] string session, [FromHeader] int class_id, [FromHeader] int sec_id)
        { 
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School ID and Session must be provided.");
            }

            // Fetch student other info and handle empty result gracefully
            var studentOtherInfo = await (from sm in _context.tb_studentmasters
                                          join soi in _context.student_Other_Infos on new { sm.uid, sm.school_id } equals new { soi.uid, soi.school_id }
                                          where sm.class_id == class_id && (sec_id == 0 || sm.sec_id == sec_id)
                                                && sm.school_id == school_id && sm.session == session && sm.status == "Registered" && sm.isActive == true
                                          select new
                                          {
                                              sm.uid,
                                              sm.stu_id,
                                              sm.registration_no,
                                              sm.class_id,
                                              soi.first_name,
                                              soi.last_name,
                                              soi.father_name,
                                              contact = soi.contact_no ?? soi.alt_contact ?? ""
                                          }).ToListAsync();

            if (studentOtherInfo == null || !studentOtherInfo.Any())
            {
                return NotFound("No student records found.");
            }
             
            var classSubjects = await (from cs in _context.ClassSubjects
                                       join ss in _context.subjects on new { cs.subject_id, cs.school_id } equals new { ss.subject_id, ss.school_id }
                                       where cs.school_id == school_id && cs.session == session && cs.class_id == class_id && ss.IsActive == true && ss.optional == true
                                       select new
                                       {
                                           cs.subject_id,
                                           ss.subject_name,
                                           ss.subjectCode
                                       }).ToListAsync();

            if (classSubjects == null || !classSubjects.Any())
            {
                return NotFound("No optional subjects found.");
            }
             
            var optionalSubjects = await _context.student_Optional_Subjects
                                                 .Where(os => os.school_id == school_id && os.session == session && os.isActive == true && classSubjects.Select(cs => cs.subject_id).Contains(os.subject_id))
                                                 .ToListAsync();
             
            var optionalSubjectsHeader = new
            {
                roll_no = "Roll No",
                stu_name = "Stu Name",
                optSubjects = classSubjects.Select(cs => cs.subject_name).ToArray()
            };

            var optionalSubjectDtosList = new List<object>();
             
            foreach (var student in studentOtherInfo)
            {
                var studentSubjectDtos = new List<object>();

                // Loop through class subjects and check if the student is enrolled in them
                foreach (var classSubject in classSubjects)
                {
                    var isSubjectSelected = optionalSubjects.Any(os => os.stu_id == student.stu_id && os.subject_id == classSubject.subject_id && os.session == session);

                    var subjectDto = new
                    {
                        subject_id = classSubject.subject_id,
                        subject_name = classSubject.subject_name,
                        check = isSubjectSelected
                    };

                    studentSubjectDtos.Add(subjectDto);
                }

                // Create DTO for the student
                var studentDto = new
                {
                    roll_no = student.stu_id,
                    stu_name = $"{student.first_name} {student.last_name}",
                    father_name = student.father_name,
                    phone = student.contact,
                    subjectDtos = studentSubjectDtos
                };

                optionalSubjectDtosList.Add(studentDto);
            }

            return Ok(new { optionalSubjectsHeader, optionalSubjectDtosList });
        }

        [HttpPost("insertNdeleteOptSubject")]
        public async Task<IActionResult> insertNdeleteOptSubject([FromHeader] string school_id, [FromHeader] string session, [FromHeader] int subject_id, [FromHeader] int stu_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School ID and Session must be provided.");
            }

            var optSubject = await _context.student_Optional_Subjects.Where(so => so.stu_id == stu_id && so.subject_id == subject_id && so.school_id == school_id && so.session == session).FirstOrDefaultAsync();
            if(optSubject == null)
            {
                student_optional_subject sub = new student_optional_subject
                {
                    stu_id = stu_id,
                    subject_id = subject_id,
                    isActive = true,
                    session = session,
                    school_id = school_id
                };
                _context.Add(sub);
                await _context.SaveChangesAsync();
                return Ok(sub);
            }
            else
            {
                optSubject.isActive = !optSubject.isActive;
                await _context.SaveChangesAsync(); 
                return Ok(optSubject);
            } 
        }

    }
}

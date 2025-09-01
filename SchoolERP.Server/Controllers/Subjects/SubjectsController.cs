using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Subjects;

namespace SchoolERP.Server.Controllers.Subjects
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private static SchoolERPContext _context;
        private static ILogger<SubjectsController> _logger;

        public SubjectsController(ILogger<SubjectsController> logger, SchoolERPContext context)
        {
            _logger = logger;
            _context = context;
        }

        #region Get Subject Info

        [HttpGet("getSingleSubject")]
        public async Task<IActionResult> getSingleSubject(string school_id,int sub_id)
        {
            if(school_id == null)
            {
                return BadRequest("School id is null");
            }
            if(sub_id == 0)
            {
                return BadRequest("Subject id not found! ");
            }

            var subject = await _context.subjects.Where(sj => sj.school_id == school_id && sj.subject_id == sub_id && sj.IsActive == true).FirstOrDefaultAsync();
            if(subject == null)
            {
                return NotFound();
            } 
            return Ok(subject);
        }

        [HttpGet("getSubjects")]
        public async Task<IActionResult> Get(string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not Avaiable! ");
            }

            var subjects = await _context.subjects.Where(s => s.school_id == school_id && s.IsActive == true).ToListAsync();
            if (subjects == null)
            {
                return NotFound();
            }
            return Ok(subjects);
        }

        [HttpGet("getSubjectsforFaculty")]
        public async Task<IActionResult> getSubjectsforFaculty(string school_id,int teacherId)
        {
            if (school_id == null || teacherId == 0)
            {
                return BadRequest("School Id and Teacher Id is mendatory Fields! ");
            }

            List<int> getmappedSubjects = await _context.faculty_Subjects.Where(sch => sch.school_id == school_id && sch.faculty_id == teacherId && sch.isActive == true)
                .Select(s => s.subject_id).ToListAsync();

            var subjects = await _context.subjects.Where(s => s.school_id == school_id && s.IsActive == true && getmappedSubjects.Contains(s.subject_id)).ToListAsync();
            if (subjects == null)
            {
                return NotFound();
            }
            return Ok(subjects);
        }

        

        #endregion

        #region Delete Single Subject From Class
        [HttpDelete("deleteSubjectinCls")]
        public async Task<IActionResult> deleteSubjectinCls([FromHeader] string school_id, [FromHeader] string session, [FromHeader] int class_id, [FromHeader] int sub_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found: ");
            }
            if (session == null)
            {
                return BadRequest("Session not found: ");
            }
            var subject = await _context.ClassSubjects.Where(cs => cs.class_id == class_id && cs.subject_id == sub_id && cs.school_id == school_id && cs.session == session).FirstOrDefaultAsync();
            if(subject == null)
            {
                return NotFound();
            }
            subject.isActive = false;
            _context.SaveChangesAsync();

            return Ok(subject);
        }

        #endregion

        #region Get Subject by Class

        [HttpGet("getSubjectsbyClass")]
        public async Task<IActionResult> getSubjectsbyClass(string school_id, string session, int class_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not Found!");
            }
            if (session == null)
            {
                return BadRequest("Session Id not Found!");
            }
            var clsSubject = await _context.ClassSubjects.Where(cs => cs.school_id == school_id && cs.session == session && (cs.class_id == class_id || class_id == 0) && cs.isActive == true).ToListAsync();
            var subjectIds = clsSubject.Select(cs => cs.subject_id).ToList();

            List<Subject> subject = await _context.subjects.Where(ss => ss.school_id == school_id && ss.IsActive == true && subjectIds.Contains(ss.subject_id)).ToListAsync();

            return Ok(subject);
        }

        [HttpGet("getSubjectsbyClassforFaculty")]
        public async Task<IActionResult> getSubjectsbyClassforFaculty(string school_id, string session, int class_id,int teacherId)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and session is mendatory fields!");
            } 
            var clsSubject = await _context.ClassSubjects.Where(cs => cs.school_id == school_id && cs.session == session && (cs.class_id == class_id || class_id == 0) && cs.isActive == true).ToListAsync();
            var subjectIds = clsSubject.Select(cs => cs.subject_id).ToList();
            List<int> getmappedSubjects = await _context.faculty_Subjects.Where(sch => sch.school_id == school_id && sch.faculty_id == teacherId && sch.isActive == true)
                .Select(s => s.subject_id).ToListAsync();
            List<Subject> subject = await _context.subjects.Where(ss => ss.school_id == school_id && ss.IsActive == true && 
            subjectIds.Contains(ss.subject_id) && getmappedSubjects.Contains(ss.subject_id)).ToListAsync();

            return Ok(subject);
        }

        #endregion

        #region Insert subject 

        [HttpPost("postSubjects")]
        public async Task<IActionResult> Post(string school_id,SubjectInsert_Dtos subjectInsert_)
        {

            if(school_id == null)
            {
                return BadRequest("School Id not found!");
            }

            if(subjectInsert_.subject_id == 0 || subjectInsert_.subject_id == null)
            {
                Subject subject = new Subject
                            {
                                subject_name = subjectInsert_.subject_name,
                                subjectCode = subjectInsert_.subjectCode,
                                priority = subjectInsert_.priority,
                                IsActive = true,
                                optional = subjectInsert_.optional,
                                created_date = DateTime.Now,
                                school_id = school_id
                            };
                            _context.Add(subject);
                            await _context.SaveChangesAsync();
                return Ok(subject);
            }
            else
            {
                var subject = await _context.subjects.Where(ss => ss.school_id == school_id && ss.subject_id == subjectInsert_.subject_id).FirstOrDefaultAsync();
                subject.subject_name = subjectInsert_.subject_name; 
                subject.subjectCode = subjectInsert_.subjectCode; 
                subject.priority = subjectInsert_.priority; 
                subject.optional = subjectInsert_.optional;
                await _context.SaveChangesAsync();
                return Ok(subject);
            }

            

           
        }

        #endregion
          
        #region Delete Subject

        [HttpDelete("deleteSubjects")]
        public async Task<IActionResult> Delete(string school_id, int subject_id)
        {
            if (school_id == null)
            {
                return BadRequest("School id is null");
            }
            if (subject_id == 0)
            {
                return BadRequest("Subject id not found! ");
            }

            var subject = await _context.subjects.Where(s => s.school_id == school_id && s.subject_id == subject_id).FirstOrDefaultAsync();
            if (subject == null)
            {
                return NotFound();
            }
            subject.IsActive = false;
            await _context.SaveChangesAsync();


            var clsSubject = await _context.ClassSubjects.Where(cs => cs.school_id == school_id && cs.subject_id == subject_id).ToListAsync();
            foreach (var item in clsSubject)
            {
                item.isActive = false;
            }
            _context.UpdateRange(clsSubject);
            await _context.SaveChangesAsync();
            
            return Ok();
        }

        #endregion

        #region Class Wise Subject Insert

        [HttpPost("insertClassSubject")]
        public async Task<IActionResult> insertClassSubject([FromHeader] int class_id, [FromHeader] string school_id, [FromHeader] string session, [FromBody] List<classSubjectDTOs> dTOs)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found!");
            }

            if (class_id == 0)   
            {
                return BadRequest("Class id not found");
            }

            if (dTOs == null || dTOs.Count == 0)
            {
                return Ok(new { status = "Subject list is empty" });
            }
             
            var existingSubjects = await _context.ClassSubjects
                                                  .Where(cs => cs.school_id == school_id && cs.class_id == class_id)
                                                  .ToListAsync();

            if (existingSubjects != null && existingSubjects.Any())
            { 
                foreach (var subject in existingSubjects)
                {
                    subject.isActive = false; 
                }

                _context.UpdateRange(existingSubjects);  
                await _context.SaveChangesAsync();   
            }
             
            List<ClassSubjects> subjectsToInsert = new List<ClassSubjects>();

            foreach (var dt in dTOs)
            { 
                var existingSubject = existingSubjects
                                        .FirstOrDefault(cs => cs.subject_id == dt.sub_id);

                if (existingSubject == null)
                { 
                    var newSubject = new ClassSubjects
                    {
                        class_id = class_id,
                        subject_id = dt.sub_id,
                        isActive = true,
                        session = session,
                        school_id = school_id
                    };
                    subjectsToInsert.Add(newSubject);
                }
                else
                {
                    // If exists, set as active and no need to insert it again
                    existingSubject.isActive = true;
                }
            }

            if (subjectsToInsert.Any())
            {
                // Add new subjects to the context
                _context.AddRange(subjectsToInsert);
            }
            await _context.SaveChangesAsync();

            return Ok(new { status = "Subjects updated successfully!" });
        }


        #endregion
    }
}

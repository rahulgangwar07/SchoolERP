using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.OpenApi.Any;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Subjects;
using System.Security.Claims;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private SchoolERPContext _context;

        public ClassController(SchoolERPContext context)
        {
            _context = context;
        }
         

        #region Get Row Class data
        [HttpGet("getClass")]
        public async Task<IActionResult> getClass([FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found");
            }
            var classes = await _context.classNames.Where(cn => cn.school_id == school_id).ToListAsync();
            if (classes == null || !classes.Any())
            {
                return NotFound("Class not Found");
            }

            var classDTOs = new List<ClassDTOs>();

            foreach (var item in classes)
            {
                var secCount = _context.tbClasses.Where(tc => tc.class_id == item.class_id && tc.school_id == school_id).Count();
                var stuCount = _context.tb_studentmasters.Where(sm => sm.class_id == item.class_id && sm.school_id == school_id && sm.status == "Registered").Count();
                var subjCount = _context.ClassSubjects.Where(sm => sm.school_id == school_id && sm.isActive == true).Count();
                var cls = new ClassDTOs
                {
                    class_id = item.class_id,
                    class_name = item.class_name,
                    dis_name = item.dis_name,
                    subject = [],
                    opt_subject = [],
                    status = item.status,
                    school_id = item.school_id,
                    secCount = secCount,
                    stuCount = stuCount,
                    subjCount = subjCount
                };
                classDTOs.Add(cls);
            }

            return Ok(classDTOs);
        }
        #endregion

        #region get All Active Classes

        [HttpGet("getActiveClass")]
        public async Task<IActionResult> getActiveClass([FromQuery] string school_id, string session)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
                {
                    return BadRequest("School Id not found");
                }
                var classes = await _context.classNames.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync();
                if (classes.Count == 0)
                {
                    Ok(classes);
                }
                var classDTOs = new List<ClassDTOs>();

                foreach (var item in classes)
                {
                    var secCount = _context.tbClasses.Where(tc => tc.class_id == item.class_id && tc.school_id == school_id && tc.status == true).Count();
                    var stuCount = _context.tb_studentmasters.Where(sm => sm.class_id == item.class_id && sm.school_id == school_id && sm.session == session && sm.status == "Registered").Count();
                    var subjCount = _context.ClassSubjects.Where(sm => sm.school_id == school_id && sm.class_id == item.class_id && sm.session == session && sm.isActive == true).Count();
                    var cls = new ClassDTOs
                    {
                        class_id = item.class_id,
                        class_name = item.class_name,
                        dis_name = item.dis_name,
                        subject = [],
                        opt_subject = [],
                        status = item.status,
                        school_id = item.school_id,
                        session = session,
                        secCount = secCount,
                        stuCount = stuCount,
                        subjCount = subjCount
                    };
                    classDTOs.Add(cls);
                }

                return Ok(classDTOs);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }

        [HttpGet("getActiveClassforFaculty")]
        public async Task<IActionResult> getActiveClassforFaculty([FromQuery] string school_id, int teacherId,string session)
        {
            try
            {
                if (school_id == null || teacherId == 0)
                {
                    return BadRequest("School Id and teacher is mendatory field.");
                }
                List<int> mappedClasses = await _context.faculty_Classes.Where(fc => fc.school_id == school_id && fc.faculty_id == teacherId &&
                fc.isActive == true).Select(fc => fc.class_id).ToListAsync();
                var classes = await _context.classNames.Where(cn => cn.school_id == school_id && cn.status == true && mappedClasses.Contains(cn.class_id)).ToListAsync();
                if (classes.Count == 0 || !classes.Any())
                {
                    return Ok(classes);
                }

                var classDTOs = new List<ClassDTOs>();

                foreach (var item in classes)
                {
                    var secCount = _context.tbClasses.Where(tc => tc.class_id == item.class_id && tc.school_id == school_id && tc.session == session && tc.status == true).Count();
                    var stuCount = _context.tb_studentmasters.Where(sm => sm.class_id == item.class_id && sm.school_id == school_id && sm.session == session && sm.status == "Registered").Count();
                    var subjCount = _context.ClassSubjects.Where(sm => sm.school_id == school_id && sm.class_id == item.class_id && sm.session == session && sm.isActive == true).Count();
                    var cls = new ClassDTOs
                    {
                        class_id = item.class_id,
                        class_name = item.class_name,
                        dis_name = item.dis_name,
                        subject = [],
                        opt_subject = [],
                        status = item.status,
                        school_id = item.school_id,
                        session = session,
                        secCount = secCount,
                        stuCount = stuCount,
                        subjCount = subjCount
                    };
                    classDTOs.Add(cls);
                }

                return Ok(classDTOs);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        #endregion

        #region Get Class By ID
        [HttpGet("getClassbyId/{clsId}")]
        public async Task<IActionResult> getClassbyId(int clsId,[FromQuery] string school_id,string session)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found");
            }
            if(clsId == 0)
            {
                return BadRequest("Class Id not found");
            }

            var classs = await _context.classNames.Where(cn => cn.class_id == clsId && cn.school_id == school_id).ToListAsync();
            if (classs == null)
            {
                return NotFound("Class not Found");
            }
            var subjects = await _context.subjects.Where(sub => sub.school_id == school_id && sub.IsActive == true).ToListAsync();
            var clssubject = await _context.ClassSubjects.Where(sub => sub.school_id == school_id && sub.session == session && sub.class_id == clsId && sub.isActive == true).ToListAsync();
            if(subjects == null)
                 return Ok(classs);
            ClassDTOsforSubject classDT = new ClassDTOsforSubject
            {
                classes = classs,
                subjects = subjects.Where(s => s.optional == false).Select(s => new classSubjectDTOs
                {
                    sub_id = s.subject_id,
                    subject_name = s.subject_name,
                    check = clssubject.Any(cs => cs.subject_id == s.subject_id)

                }).ToList(),
                optsubjects = subjects.Where(s => s.optional == true).Select(s => new classSubjectDTOs
                {
                    sub_id = s.subject_id,
                    subject_name = s.subject_name,
                    check = clssubject.Any(cs => cs.subject_id == s.subject_id)
                }).ToList()
            };

            return Ok(classDT);
           
        }

        #endregion


        #region Insert Class
        [HttpPost("postClass")]
        public async Task<IActionResult> postClass(ClassDTOs classNameDTO)
        {
            if (classNameDTO == null)
            {
                return BadRequest("Data is not found");
            }
            if (classNameDTO.school_id == null)
            {
                return BadRequest("School Id is not found");
            }
            if (classNameDTO.session == null)
            {
                return BadRequest("Session is not found");
            }

            try
            {
                if (classNameDTO.class_id == 0)
                {
                    ClassName className = new ClassName
                    {
                        class_name = classNameDTO.class_name,
                        dis_name = classNameDTO.dis_name,
                        status = true,
                        school_id = classNameDTO.school_id
                    };
                    _context.classNames.Add(className);
                    await _context.SaveChangesAsync();


                }
                else
                {
                    var classdtl = await _context.classNames
                        .Where(cn => cn.class_id == classNameDTO.class_id && cn.school_id == classNameDTO.school_id)
                        .FirstOrDefaultAsync();

                    if (classdtl == null)
                    {
                        return BadRequest("Data not found in database");
                    }

                    // Update the properties of the existing classdtl object
                    classdtl.class_name = classNameDTO.class_name;
                    classdtl.dis_name = classNameDTO.dis_name;
                    classdtl.updated_at = DateTime.Now;
                    //_context.Entry(classdtl).Property(c => c.id).IsModified = false;
                    _context.Entry(classdtl).Property(c => c.id).IsModified = false;

                    // Since it's already being tracked, no need to create a new instance. Just save changes.
                    //_context.Update(classdtl);
                    await _context.SaveChangesAsync();
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error is {ex.Message}");
            }

            return Ok();
        }

        #endregion

        #region Delete Class by Class Id

        [HttpDelete("deleteClass")]
        public async Task<IActionResult> deleteClass([FromQuery] int clsId, [FromQuery] string school_id)
        {
            if(school_id == null)
            {
                return NotFound("School id not found");
            }
            var cls = await _context.classNames.Where(cn => cn.class_id == clsId && cn.school_id == school_id).FirstOrDefaultAsync();

            if (cls == null)
            {
                return NotFound("Data not found");
            }
            cls.status = !cls.status;
            _context.Update(cls);
            _context.Entry(cls).Property(c => c.id).IsModified = false;

            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #region Get Class Section by Class Id

        [HttpGet("getSection/{cls_id}")]
        public async Task<IActionResult> getSection(string school_id, string session, int cls_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("Schood and Session is mendatory! ");
            }
            if (cls_id == 0 || cls_id == null)
            {
                return BadRequest();
            }

            var section = _context.tbClasses.Where(ci => ci.school_id == school_id && ci.session == session && ci.class_id == cls_id && ci.status == true).ToList();
            if (section == null)
            {
                return BadRequest();
            }

            return Ok(section);
        }

        [HttpGet("getActiveSection/{cls_id}")]
        public async Task<IActionResult> getActiveSection(string school_id, string session, int cls_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("Schood and Session is mendatory! ");
            }
            if (cls_id == 0 || cls_id == null)
            {
                return BadRequest();
            }

            var section = _context.tbClasses.Where(ci => ci.school_id == school_id && ci.session == session && ci.class_id == cls_id && ci.status == true).ToList();
            if (section == null)
            {
                return BadRequest();
            }

            return Ok(section);
        }

        #endregion

        #region Insert Section

        [HttpPost("postSection")]
        public async Task<IActionResult> postSection(TbClassDTO tbClassDTO)
        {
            if (tbClassDTO.class_id == 0)
            {
                return BadRequest("Class Id not found");
            }
            if (tbClassDTO.school_id == null)
            {
                return BadRequest("School Id not found");
            } 
            if(tbClassDTO.sec_id == null)
            {
                return BadRequest("Data not found");
            }
            //  SecIdResult secId = await _context.Set<SecIdResult>()
            //.FromSqlRaw("EXEC getSecid @school_id = {0}, @class_id = {1}", tbClassDTO.school_id, tbClassDTO.class_id)
            //.FirstOrDefaultAsync();

           

            if (tbClassDTO.sec_id == 0)
            {
                int secId = await GetSecId(tbClassDTO.class_id, tbClassDTO.school_id);
                TbClass tbClass = new TbClass
                {
                    sec_id = secId,
                    class_id = tbClassDTO.class_id,
                    sec_name = tbClassDTO.sec_name,
                    sec_dis_name = tbClassDTO.sec_dis_name,
                    status = true,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    school_id = tbClassDTO.school_id,
                    session = tbClassDTO.session
                };

                _context.tbClasses.Add(tbClass);
                await _context.SaveChangesAsync();

                return Ok(tbClass);
            }
            else
            {
                var sec = await _context.tbClasses.Where(tc => tc.class_id == tbClassDTO.class_id &&
                tc.sec_id == tbClassDTO.sec_id && tc.school_id == tbClassDTO.school_id && tc.session == tbClassDTO.session).FirstOrDefaultAsync();

                if(sec == null)
                {
                    return BadRequest("Something went Wrong");
                }

                sec.sec_name = tbClassDTO.sec_name;
                sec.sec_dis_name = tbClassDTO.sec_dis_name;
                sec.status = tbClassDTO.status;
                sec.updated_at = DateTime.Now;

                _context.Update(sec);
                _context.Entry(sec).Property(s => s.id).IsModified = false;
                await _context.SaveChangesAsync();

                return Ok(sec);

            }

            
        }
        #endregion

        #region Delete Section
        [HttpDelete("deleteSection/{class_id}")]
        public async Task<IActionResult> deleteSection(int class_id,int sec_id,string school_id,string session)
        {

            if(sec_id == 0 || class_id == 0)
            {
                return BadRequest("Sec_id or Class Id not match Properly! ");
            }
            if(string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and session not Found! ");
            }

            var section = _context.tbClasses.Where(tc => tc.class_id == class_id && tc.sec_id == sec_id && 
            tc.school_id == school_id).FirstOrDefault();
            if(section == null)
            {
                return NotFound();
            }
            section.status = false;
            _context.Update(section);
            _context.Entry(section).Property(s => s.id).IsModified = false;
            await _context.SaveChangesAsync();

            return Ok(section);
        }
        #endregion


        [HttpGet("exporttoexcel")]
        public async Task<ActionResult> ExportToExcel()
        { 
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Class Data");
                 
                worksheet.Cell(1, 1).Value = "Section ID";
                worksheet.Cell(1, 2).Value = "Class ID";
                 
                var cls = new List<TbClassDTO>();
                for (var i = 1; i < 10; i++)
                {
                    cls.Add(new TbClassDTO() { sec_id = i, class_id = i });
                }
                 
                var currentRow = 2;
                foreach (var item in cls)
                {
                    worksheet.Cell(currentRow, 1).Value = item.sec_id;
                    worksheet.Cell(currentRow, 2).Value = item.class_id;
                    currentRow++;
                }

                // Save the workbook to a memory stream
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    // Return the file with appropriate content type and download filename
                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "class_data.xlsx");
                }
            }
        }


        private async Task<int> GetSecId(int class_id, string schoolId)
        {
            int secId = 0;

            var clsdata = await _context.tbClasses.Where(c => c.class_id == class_id && c.school_id == schoolId).FirstOrDefaultAsync();
            if (clsdata != null)
            {
                secId = await _context.tbClasses.Where(c => c.class_id == class_id && c.school_id == schoolId).MaxAsync(c => (int?)c.sec_id) ?? 0;
                secId += 1;

                var secIdExists = await _context.tbClasses.AnyAsync(c => c.sec_id == secId && c.school_id == schoolId);
                if (secIdExists)
                {
                    secId = await _context.tbClasses.Where(c => c.school_id == schoolId).MaxAsync(c => (int?)c.sec_id) ?? 0;
                    secId += 1;
                }
            }
            else
            {
                secId = await _context.tbClasses.Where(c => c.school_id == schoolId).MaxAsync(c => (int?)c.sec_id) ?? 0;
                secId += 1;
            }
            return secId;
        }


    }
}

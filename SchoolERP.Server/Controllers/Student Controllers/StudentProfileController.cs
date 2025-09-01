using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers.Student_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentProfileController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<StudentProfileController> _logger;

        public StudentProfileController(SchoolERPContext context, ILogger<StudentProfileController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("stu-profile")]
        public async Task<IActionResult> stuProfile(string school_id, int uid)
        {
            // Fetch class names in advance from the database
            var classes = await _context.classNames.Where(cn => cn.school_id == school_id).ToListAsync();

            // Fetch student data
            var data = await (from sm in _context.tb_studentmasters
                              join soi in _context.student_Other_Infos
                              on new { sm.school_id, sm.uid }
                              equals new { soi.school_id, soi.uid }
                              where sm.school_id == school_id && sm.uid == uid && soi.reg_no != null
                              select new
                              {
                                  soi.first_name,soi.last_name,
                                  name = soi.first_name + " " + soi.last_name,
                                  soi.uid,soi.userid,soi.password,soi.gender,sm.class_id,sm.stu_id,soi.reg_no,
                                  soi.contact_no,soi.father_name,soi.mother_name,soi.alt_contact,sm.house_id,soi.dob,soi.stuImage
                              }).FirstOrDefaultAsync();
             
            if (data == null)
            {
                return NotFound();
            }
             
            var class_name = classes.Where(cls => cls.class_id == data.class_id).Select(cls => cls.class_name).FirstOrDefault();
             
            return Ok(new
            {
                data.first_name,data.last_name,data.name,data.uid,data.userid,data.password,
                data.gender,data.class_id,class_name,  
                data.stu_id,data.reg_no,data.contact_no,data.father_name,data.mother_name,data.alt_contact,data.house_id,data.dob,data.stuImage
            });
        }

        [HttpPut("student-password")]
        public async Task<IActionResult> studentPassword([FromBody] passwordDTO dTO)
        {
            if (string.IsNullOrEmpty(dTO.school_id))
            {
                return BadRequest("SChool Id not found in this Context! ");
            }
            var stu_info = await _context.student_Other_Infos.Where(soi => soi.school_id == dTO.school_id && soi.uid == dTO.uid).FirstOrDefaultAsync();
            if(stu_info == null)
            {
                return NotFound("Student not found! ");
            }

            stu_info.password = dTO.password;
            await _context.SaveChangesAsync();
            return Ok(stu_info);
        }

        public class passwordDTO
        {
            public string school_id { get; set; }
            public int uid { get; set; }
            public string password { get; set; }
        }

    }
}

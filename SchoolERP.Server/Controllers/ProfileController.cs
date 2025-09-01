using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Faculty;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private SchoolERPContext _context;

        public ProfileController(SchoolERPContext context)
        {
            _context = context;
        }

        [HttpGet("getProfile/{fac_id}")]
        public IActionResult Get(int fac_id, string school_id)
        {
             
            var faculty = _context.TbFacultymasters
                .Where(fm => fm.faculty_id == fac_id && fm.school_id == school_id)
                .FirstOrDefault();

            if (faculty == null)
            {
                return NotFound();
            }
            var desig_name = _context.TbDesignations.Where(dn => dn.designation_id == faculty.designation).FirstOrDefault();
            var y = new {
                faculty,
                desig_name.designation_name
                };

            

            //var response = new
            //{
            //    faculty.faculty_id,
            //    faculty.school_id,
            //    faculty.username,
            //    Dob = faculty.Dob.ToString("dd-MMM-yyyy") // Formatting the date
            //};

            //return Ok(response);
            return Ok(y);
        }

        [HttpPost("updateProfile/{faculty_id}")]
        public async Task<IActionResult> updateProfile(int faculty_id, TbFacultymaster facultyInfo)
        {
            if (faculty_id == 0 || faculty_id == null)
            {
                return BadRequest();
            }
            if (facultyInfo == null)
            {
                return BadRequest();
            }

            var item = _context.TbFacultymasters.Where(fm => fm.faculty_id == faculty_id).FirstOrDefault();
            if (item == null)
            {
                return BadRequest();
            }
            item.username = facultyInfo.username; 
            item.first_name = facultyInfo.first_name;
            item.last_name = facultyInfo.last_name;
            item.email = facultyInfo.email;
            item.qualification= facultyInfo.qualification;
            item.phone = facultyInfo.phone;
            item.dob = facultyInfo.dob;
            item.gender = facultyInfo.gender;
            item.address = facultyInfo.address;
            item.status = facultyInfo.status;
            item.bloodgroup = facultyInfo.bloodgroup;
            item.updated_at = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("updatePassword/{faculty_id}")]
        public async Task<IActionResult> updatePassword(int faculty_id, TbFacultymaster facultyInfo)
        {
            if (faculty_id == 0 || faculty_id == null)
            {
                return BadRequest();
            }
            if (facultyInfo == null)
            {
                return BadRequest();
            }



            var item = _context.TbFacultymasters.Where(fm => fm.faculty_id == faculty_id).FirstOrDefault();
            if (item == null)
            {
                return BadRequest();
            } 
            item.password = facultyInfo.password; 
            await _context.SaveChangesAsync();

            return Ok();
        }
         

    }
}

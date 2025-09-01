using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Faculty;
using SchoolERP.Server.Services;
using System.Diagnostics;
using System.Security.Claims;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationController : ControllerBase
    {
        private SchoolERPContext _context;
        private readonly SessionService _sessionService;

        public DesignationController(SchoolERPContext context, SessionService sessionService)
        {
            _context = context;
            _sessionService = sessionService;
        }

        [HttpGet("getDesignation")]
        public async Task<IActionResult> getDesignation()
        {
            var desg = await _context.TbDesignations.Where(d => d.designation_id != 1).ToListAsync();
            if (desg == null || !desg.Any()) return NotFound();
            return Ok(desg);
        }

        //[HttpGet("checkDesignation/{f_id}")]
        //public async Task<IActionResult> checkDesignation(int f_id)
        //{
        //    // Retrieve the SchoolId from the cookie
        //    //string schoolId = Request.Cookies["SchoolId"].ToString();

        //    if (string.IsNullOrEmpty(schoolId))
        //    {
        //        return BadRequest("School ID is not set in cookies.");
        //    }

        //    if (f_id == 0 || f_id == null)
        //    {
        //        return BadRequest("FacultyId not Found");
        //    }

        //    var desig = await _context.DesigMappings
        //        .Where(dm => dm.faculty_id == f_id && dm.school_id == schoolId)
        //        .FirstOrDefaultAsync();

        //    if (desig == null)
        //        return NotFound();

        //    return Ok(desig.designation_id);
        //}


        [HttpGet("checkDesignation/{f_id}")]
        public async Task<IActionResult> checkDesignation(int f_id, [FromQuery] string schoolId)
        {
            //var claimsIdentity = User.Identity as ClaimsIdentity;
            //var schoolIdClaim = claimsIdentity?.FindFirst("SchoolId");

            //if (schoolIdClaim == null)
            //{
            //    return BadRequest("School ID is not found in token.");
            //}
            if (schoolId == null)
            {
                return BadRequest("School ID is not found.");
            }

            //string schoolId = schoolIdClaim.Value;

            if (f_id == 0 || f_id == null)
            {
                return BadRequest("FacultyId not Found");
            }

            var desig = await _context.DesigMappings
                .Where(dm => dm.faculty_id == f_id && dm.school_id == schoolId)
                .FirstOrDefaultAsync();



            if (desig == null)
            {
                return NotFound();
            }


            return Ok(desig.designation_id);
        }


        [HttpPost("assignDesignation/{fac_id}")]
        public async Task<IActionResult> assignDesignation(int fac_id, int des_id, string school_id)
        {
            if (fac_id <= 0)
            {
                return BadRequest("Faculty Id is not valid.");
            }
            if (des_id <= 0)
            {
                return BadRequest("Designation Id is not valid.");
            }


            TbFacultymaster tb = await _context.TbFacultymasters.Where(fm => fm.faculty_id == fac_id && fm.school_id == school_id).FirstOrDefaultAsync();
            tb.designation = des_id;
            await _context.SaveChangesAsync();


            var item = await _context.DesigMappings.FirstOrDefaultAsync(dm => dm.faculty_id == fac_id);

            if (item == null)
            {
                DesigMapping _desigmapping = new DesigMapping
                {
                    designation_id = des_id,
                    faculty_id = fac_id,
                    assigned_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    school_id = school_id
                };

                await _context.DesigMappings.AddAsync(_desigmapping);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(assignDesignation), new { fac_id, des_id }, _desigmapping);
            }
            else
            {
                item.designation_id = des_id;
                item.updated_at = DateTime.Now;

                await _context.SaveChangesAsync();

                return NoContent();
            }
        }


    }
}

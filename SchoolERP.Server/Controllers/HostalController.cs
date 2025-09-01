using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostalController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<HostalController> _logger;

        public HostalController(SchoolERPContext context,ILogger<HostalController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("get-hostal")]
        public async Task<IActionResult> getHostal(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("Schoool Id is null. ");
            }

            List<hostal> hostals = await _context.hostals.Where(hs => hs.school_id == school_id && hs.isActive == true).ToListAsync();

            return Ok(hostals);

        }

        [HttpGet("get-hostal-by-id")]
        public async Task<IActionResult> getHostalbyId(string school_id,int hostal_id)
        {
            if (string.IsNullOrEmpty(school_id) || hostal_id == 0)
            {
                return BadRequest("Schoool Id and hostal may not be null. ");
            }
            hostal hostal = await _context.hostals.Where(hs => hs.school_id == school_id && hs.hostal_id == hostal_id && hs.isActive == true).FirstOrDefaultAsync();
            return Ok(hostal);

        }

        [HttpPost("post-hostal")]
        public async Task<IActionResult> postHostal(string school_id,hostal hostals)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("Schoool Id is null. ");
            }
            hostals.isActive = true;
            _context.Add(hostals);
            await _context.SaveChangesAsync();
            return Ok(hostals);

        }
        
        [HttpPut("update-hostal")]
        public async Task<IActionResult> putHostal(string school_id,hostal hostal)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("Schoool Id is null. ");
            }
            _context.Update(hostal);
            await _context.SaveChangesAsync();
            return Ok(hostal);

        }


        [HttpDelete("delete-hostal")]
        public async Task<IActionResult> deleteHostal(string school_id, int hostal_id)
        {
            if (string.IsNullOrEmpty(school_id) || hostal_id == 0)
            {
                return BadRequest("Schoool Id and hostal may not be null. ");
            }
            hostal hostal = await _context.hostals.Where(hs => hs.school_id == school_id && hs.hostal_id == hostal_id).FirstOrDefaultAsync();
            hostal.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(hostal);

        }


    }
}

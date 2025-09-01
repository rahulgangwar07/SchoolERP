using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityStateController : ControllerBase
    {
        private SchoolERPContext _context;
        public CityStateController(SchoolERPContext context)
        {
            _context = context;
        }

        [HttpGet("getStates")]
        public async Task<IActionResult> getStates()
        {
            // Await the asynchronous call to get the states from the database
            var states = await _context.states.ToListAsync();

            // Return the list of states as an OK response
            return Ok(states);
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private static ILogger<HolidayController> _logger;

        public HolidayController(SchoolERPContext context, ILogger<HolidayController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("getHolidays")]
        public async Task<IActionResult> getHolidays(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            } 
            var holidays = await _context.holidays.Where(sch => sch.school_id == school_id && sch.isDeleted == false).ToListAsync();
             
            
            return Ok(holidays);    
        }

        [HttpPost("insert-holiday")]
        public async Task<IActionResult> insertHolidays([FromBody] holidaysDTOs holidays)
        {
            if (string.IsNullOrEmpty(holidays.school_id))
            {
                return BadRequest("School_id is not Avaiable");
            }

            if(holidays.id == 0)
            {
                holidays holidays1 = new holidays
                {
                    title = holidays.title,
                    description = holidays.description,
                    start_date = holidays.start_date,
                    end_date = holidays.end_date,
                    event_type = holidays.event_type,
                    user_type = holidays.user_type,
                    isDeleted = false,
                    school_id = holidays.school_id,
                    created_by = holidays.created_by,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                };

                _context.Add(holidays1);
                await _context.SaveChangesAsync();
                return Ok(holidays1); 
            }
            else
            {
                var holiday = await _context.holidays.Where(hl => hl.school_id == holidays.school_id && hl.id == holidays.id).FirstOrDefaultAsync();
                holiday.title = holidays.title;
                holiday.description = holidays.description;
                holiday.start_date = holidays.start_date;
                holiday.end_date = holidays.end_date;
                holiday.event_type = holidays.event_type;
                holiday.user_type = holidays.user_type; 
                await _context.SaveChangesAsync();
                return Ok(holiday);
            }

            
            

        }

        [HttpDelete("delete-holiday")]
        public async Task<IActionResult> deleteHoliday(string school_id,int id)
        {
            if (string.IsNullOrEmpty(school_id) || id==0)
            {
                return BadRequest("SChool Id and id is mendatory fields! ");
            }


            var holiday = await _context.holidays.Where(h => h.school_id == school_id && h.id == id).FirstOrDefaultAsync();
            holiday.isDeleted = true;
            await _context.SaveChangesAsync();
            return Ok(holiday); 
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Server.Models;

namespace SchoolERP.Server.Controllers.Dashbaord_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentDashboardController : ControllerBase
    {
        private SchoolERPContext _context;
        private ILogger<StudentDashboardController> _logger;

        public StudentDashboardController(SchoolERPContext context, ILogger<StudentDashboardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("headerDashboard")]
        public ActionResult header(string school_id,string session,int stu_id)
        {
            if(string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and session is mendatory!");
            }

            var obj = new
            {
                homework = 5,
                live_classes = 3,
                online_exam = 4,
                syllabus = 2
            };

            return Ok(obj);
        }

    }
}

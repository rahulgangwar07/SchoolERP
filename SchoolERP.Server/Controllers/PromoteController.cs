using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Server.Models;
using System.Collections.Generic;
using System.Data;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromoteController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<PromoteController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly Models.Common _common;

        public PromoteController(ILogger<PromoteController> logger, SchoolERPContext context, IWebHostEnvironment env, Models.Common common)
        {
            _context = context;
            _logger = logger;
            _env = env;
            _common = common;
        }

        [HttpGet("get-StudentsforPromote")]
        public async Task<IActionResult> getStudentsforPromote(string school_id,string session,int class_id)
        {
            try
            {
                Dictionary<string,object> param =  new Dictionary<string, object>
                {
                    { "school_id", school_id },
                    { "session", session },
                    { "class_id", class_id.ToString() }
                };
                DataTable students = _common.ExecuteQuery("students_for_promote_class", param);
                return Ok(students);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching students");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("get-StudentsforDemote")]
        public async Task<IActionResult> getStudentsforDemote(string school_id, string session, int class_id)
        {
            try
            {
                Dictionary<string, object> param = new Dictionary<string, object>
                {
                    { "school_id", school_id },
                    { "session", session },
                    { "class_id", class_id.ToString() }
                };
                DataTable students = _common.ExecuteQuery("students_for_demote_class", param);
                return Ok(students);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching students");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("post-promote-demote-stundent")]
        public async Task<IActionResult> postPromoteDemoteStudent(string school_id,[FromBody] PromoteDemoteRequest request)
        {

            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null..");
            }
            if(request.FromClass == request.ToClass || request.FromSession == request.ToSession)
            {
                return BadRequest("You cannot promote demote into same class");
            }

            Dictionary<string, string> para = new Dictionary<string, string>()
            {
                { "school_id", school_id },
                { "action", request.Action },
                   { "currsession", request.FromSession },
                   { "nextsession", request.ToSession },
                   { "currclass", request.FromClass.ToString() },
                   { "nextclass", request.ToClass.ToString() },
                   { "registration_no", request.StudentRegs }
            };

            _common.ExecuteQuery("students_insert_promote_demote",para);

            return Ok();
        }

        public class PromoteDemoteRequest
        {
            public string Action { get; set; }
            public string FromSession { get; set; }
            public string ToSession { get; set; }
            public int FromClass { get; set; }
            public int ToClass { get; set; }
            public string StudentRegs { get; set; }
        }

    }
}

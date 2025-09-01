using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Counsellor_Lead;

namespace SchoolERP.Server.Controllers.Counsellor_Lead
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowupController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<FollowupController> _logger;
        public FollowupController(SchoolERPContext context, ILogger<FollowupController> logger)
        {
            _context = context;
            _logger = logger;

        }

        #region Follow Up
        [HttpGet("get-follow-up")]
        public async Task<IActionResult> getLeadType(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            List<followup> followups = await _context.followups.Where(lt => lt.school_id == school_id && lt.isActive == true).ToListAsync();

            return Ok(followups);
        }

        [HttpGet("get-follow-up-by-id")]
        public async Task<IActionResult> getLeadType(string school_id, int followup_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            followup followup_ = await _context.followups.Where(lt => lt.school_id == school_id && lt.followup_id == followup_id).FirstOrDefaultAsync();

            return Ok(followup_);
        }
        
        [HttpGet("get-follow-up-by-lead-id")]
        public async Task<IActionResult> getLeadTypebyleadId(string school_id, int lead_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            List<followup> followup_ = await _context.followups.Where(lt => lt.school_id == school_id && lt.lead_id == lead_id).ToListAsync();

            return Ok(followup_);
        }

        [HttpPost("post-follow-up")]
        public async Task<IActionResult> postLeadType(string school_id, followup followup_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            _context.Add(followup_);
            await _context.SaveChangesAsync();
            return Ok(followup_);
        }

        [HttpPut("update-follow-up")]
        public async Task<IActionResult> updateLeadType(string school_id, followup followup_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            _context.Update(followup_);
            await _context.SaveChangesAsync();
            return Ok(followup_);
        }

        [HttpDelete("delete-follow-up")]
        public async Task<IActionResult> deleteLeadType(string school_id, int follow_up_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            followup followup_ = await _context.followups.Where(lt => lt.school_id == school_id && lt.followup_id == follow_up_id).FirstOrDefaultAsync();
            followup_.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(followup_);
        }

        #endregion
    }
}

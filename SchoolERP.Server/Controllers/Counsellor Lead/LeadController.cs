using DocumentFormat.OpenXml.Office2019.Drawing.Model3D;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Counsellor_Lead;

namespace SchoolERP.Server.Controllers.Counsellor_Lead
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<LeadController> _logger;
        public LeadController(SchoolERPContext context,ILogger<LeadController> logger)
        {
            _context = context;
            _logger = logger;

        }

        #region Lead Type
        [HttpGet("get-lead-type")]
        public async Task<IActionResult> getLeadType(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            List<lead_types> leadType_ = await _context.lead_Types.Where(lt => lt.school_id == school_id && lt.isActive == true).ToListAsync();

            return Ok(leadType_);
        }

        [HttpGet("get-lead-type-by-id")]
        public async Task<IActionResult> getLeadType(string school_id,int lead_type_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            lead_types lead_ = await _context.lead_Types.Where(lt => lt.school_id == school_id && lt.lead_type_id == lead_type_id).FirstOrDefaultAsync();

            return Ok(lead_);
        }

        [HttpPost("post-lead-type")]
        public async Task<IActionResult> postLeadType(string school_id,lead_types lead_Types)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            _context.Add(lead_Types);
            await _context.SaveChangesAsync();
            return Ok(lead_Types);
        }

        [HttpPut("update-lead-type")]
        public async Task<IActionResult> updateLeadType(string school_id, lead_types lead_Types)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            _context.Update(lead_Types);
            await _context.SaveChangesAsync();
            return Ok(lead_Types);
        }

        [HttpDelete("delete-lead-type")]
        public async Task<IActionResult> deleteLeadType(string school_id,int lead_type_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            lead_types lead_Types = await _context.lead_Types.Where(lt => lt.school_id == school_id && lt.lead_type_id == lead_type_id).FirstOrDefaultAsync();
            lead_Types.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(lead_Types);
        }

        #endregion


        #region Leads Logic
        [HttpGet("get-leads")]
        public async Task<IActionResult> getLeads(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            List<leads> lead_ = await _context.leads.Where(lt => lt.school_id == school_id && lt.isActive == true)
                .Include(lt => lt.followups).ToListAsync();
            //        List<leads> lead_ = await _context.leads
            //.Where(lt => lt.school_id == school_id && lt.isActive == true && lt.followups.Any())
            //.Include(lt => lt.followups).ToListAsync();


            return Ok(lead_);
        }

        
        [HttpGet("get-lead-by-id")]
        public async Task<IActionResult> getLeads(string school_id,int lead_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            leads lead_ = await _context.leads.Where(lt => lt.school_id == school_id && lt.lead_id == lead_id).FirstOrDefaultAsync();

            return Ok(lead_);
        }

        
        [HttpPost("post-leads")]
        public async Task<IActionResult> postLeads(string school_id,leads lead_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            _context.Add(lead_);
            await _context.SaveChangesAsync();

            return Ok(lead_);
        }
        
        [HttpPut("update-leads")]
        public async Task<IActionResult> putLeads(string school_id,leads lead_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            _context.Update(lead_);
            await _context.SaveChangesAsync();

            return Ok(lead_);
        }


        [HttpDelete("delete-lead")]
        public async Task<IActionResult> deleteLeads(string school_id, int lead_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            leads lead_ = await _context.leads.Where(lt => lt.school_id == school_id && lt.lead_id == lead_id).FirstOrDefaultAsync();
            lead_.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(lead_);
        }


        #endregion
    }
}

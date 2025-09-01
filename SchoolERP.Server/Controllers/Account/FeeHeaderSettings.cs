using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Account;

namespace SchoolERP.Server.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeHeaderSettings : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<FeeHeaderSettings> _logger;
        private readonly IWebHostEnvironment _env;

        public FeeHeaderSettings(ILogger<FeeHeaderSettings> logger, SchoolERPContext context, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        #region Fee Type Actions

        [HttpGet("get-fee-type")]
        public async Task<IActionResult> getFeeType(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id should not be null here.");

            var feeTypes = await _context.feeTypes
                .Where(x => x.IsDeleted == false)
                .ToListAsync();
            return Ok(feeTypes);
        }

        [HttpPost("insert-fee-type")]
        public async Task<IActionResult> postFeeType(feeType feeType)
        {
            if (string.IsNullOrEmpty(feeType.school_id)) return BadRequest("School Id should not be null here.");
             
            if(feeType.fee_type_id == 0)
            {
                _context.Add(feeType);
                await _context.SaveChangesAsync();
                return Ok(feeType);
            }
            else
            {
                var fee = await _context.feeTypes.Where(ft => ft.school_id == feeType.school_id && ft.fee_type_id == feeType.fee_type_id).FirstOrDefaultAsync();
                fee.fee_type_name = feeType.fee_type_name;
                fee.description = feeType.description;
                await _context.SaveChangesAsync();
                return Ok(fee);
            } 
        }

        [HttpDelete("delete-fee-type")]
        public async Task<IActionResult> deleteFeeType(string school_id,int fee_type_id)
        {
            if (string.IsNullOrEmpty(school_id) || fee_type_id == 0) return BadRequest("Mendatory fields are not fill");

            var fee = await _context.feeTypes.Where(ft => ft.school_id == school_id && ft.fee_type_id == fee_type_id).FirstOrDefaultAsync();
            fee.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok(fee);
        }

        #endregion
        

        #region Fee Head Actions

        [HttpGet("get-fee-head")]
        public async Task<IActionResult> getFeeHead(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id should not be null here.");

            var feeHeads = await _context.feeHeads
        .Where(x => x.IsDeleted == false && x.school_id == school_id).ToListAsync();

            return Ok(feeHeads);
        }

        [HttpPost("insert-fee-head")]
        public async Task<IActionResult> postFeeHead(feeHead feeHead)
        {
            if (string.IsNullOrEmpty(feeHead.school_id)) return BadRequest("School Id should not be null here.");
             
            if(feeHead.fee_head_id == 0)
            {
                _context.Add(feeHead);
                await _context.SaveChangesAsync();
                return Ok(feeHead);
            }
            else
            {
                var fee = await _context.feeHeads.Where(ft => ft.school_id == feeHead.school_id && ft.fee_head_id == feeHead.fee_head_id).FirstOrDefaultAsync(); 
                fee.fee_head_name = feeHead.fee_head_name;
                fee.description = feeHead.description;
                await _context.SaveChangesAsync();
                return Ok(fee);
            } 
        }

        [HttpDelete("delete-fee-head")]
        public async Task<IActionResult> deleteFeeHead(string school_id,int fee_head_id)
        {
            if (string.IsNullOrEmpty(school_id) || fee_head_id == 0) return BadRequest("Mendatory fields are not fill");

            var fee = await _context.feeHeads.Where(ft => ft.school_id == school_id && ft.fee_head_id == fee_head_id).FirstOrDefaultAsync();
            fee.IsDeleted = true;
            await _context.SaveChangesAsync();
            return Ok(fee);
        }

        #endregion


        #region Fee Head mapping Actions

        [HttpGet("get-feehead-mapping")]
        public async Task<IActionResult> GetFeeHeadMappings(string school_id,string session)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required.");

            var mappings = await _context.feeHeadMappings
                .Where(x => x.school_id == school_id && x.session == session && x.IsDeleted == false)
                .ToListAsync();

            return Ok(mappings);
        }

        [HttpGet("get-feetype-from-mapping")]
        public async Task<IActionResult> GetFeeHeadMappings(string school_id,string session,int fee_head_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required.");

            var mappings = await _context.feeHeadMappings
                .Where(x => x.school_id == school_id && x.session == session && x.fee_head_id == fee_head_id && x.IsDeleted == false).Select(s => s.fee_type_id)
                .FirstOrDefaultAsync();

            return Ok(mappings);
        }


        [HttpPost("insert-feehead-mapping")]
        public async Task<IActionResult> PostFeeHeadMapping(feeHeadMapping model)
        {
            if (string.IsNullOrEmpty(model.school_id)) return BadRequest("School Id is required.");

            if (model.fee_head_mapping_id == 0)
            {
                model.cDate = DateTime.Now;
                model.mDate = DateTime.Now;
                model.IsDeleted = false;
                _context.feeHeadMappings.Add(model);
                await _context.SaveChangesAsync();
                return Ok(model);
            }
            else
            {
                var existing = await _context.feeHeadMappings
                    .FirstOrDefaultAsync(x => x.fee_head_mapping_id == model.fee_head_mapping_id && x.school_id == model.school_id);

                if (existing == null) return NotFound("Mapping not found.");

                existing.fee_type_id = model.fee_type_id;
                existing.fee_head_id = model.fee_head_id; 
                existing.session = model.session;
                existing.mDate = DateTime.Now;

                await _context.SaveChangesAsync();
                return Ok(existing);
            }
        }


        [HttpDelete("delete-feehead-mapping")]
        public async Task<IActionResult> DeleteFeeHeadMapping(string school_id,int fee_head_mapping_id)
        {
            var mapping = await _context.feeHeadMappings
                .FirstOrDefaultAsync(x => x.fee_head_mapping_id == fee_head_mapping_id && x.school_id == school_id);

            if (mapping == null) return NotFound("Mapping not found.");

            mapping.IsDeleted = true;
            mapping.mDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(mapping);
        }


        #endregion

    }
}

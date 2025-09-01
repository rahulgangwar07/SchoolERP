using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using System.Data;
using static Azure.Core.HttpHeader;

namespace SchoolERP.Server.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeCollectionController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<FeeCollectionController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly Models.Common _common;

        public FeeCollectionController(ILogger<FeeCollectionController> logger, SchoolERPContext context, IWebHostEnvironment env, Models.Common common)
        {
            _context = context;
            _logger = logger;
            _env = env;
            _common = common;
        }

        [HttpGet("fee-student-data")]
        public async Task<IActionResult> getStudentData([FromQuery] string schoolId, [FromQuery] string session, [FromQuery] string actionType,[FromQuery] string value)
        {
            try
            {
                var parameters = new Dictionary<string, object>
                {
                    { "@school_id", schoolId },
                    { "@session", session },
                    { "@actionType", actionType },
                    { "@value", value }
                };
                DataTable dataTable = _common.ExecuteQuery("sp_get_student_fee_data", parameters);
                return Ok(dataTable);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching student fee data");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
          
            }
        }



        [HttpGet("get-monthly-fees")]
        public async Task<IActionResult> GetMonthlyFees([FromQuery] string school_id,[FromQuery] string session,
                    [FromQuery] int class_id, [FromQuery] List<int> monthIds)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("school_id and session are required.");
            }

            var parameters = new Dictionary<string, object>
    {
        { "@school_id", school_id },
        { "@session", session },
        { "@actionType", "getStudentByClass" },
        { "@value", class_id }
    };

            DataTable dataTable = _common.ExecuteQuery("sp_get_student_fee_data", parameters);

            if (dataTable.Rows.Count == 0)
            {
                return NotFound("No student found for the given class.");
            }

            int studentId = Convert.ToInt32(dataTable.Rows[0]["stu_id"].ToString());

            var feeInstallments = await _context.feeStudentLedgers
                .Where(fi => fi.school_id == school_id && fi.session == session && fi.stu_id == studentId && !fi.IsDeleted)
                .ToListAsync();

            var feeTypes = await _context.feeTypes
                .Where(ft => ft.school_id == "All" || ft.school_id == school_id)
                .ToListAsync();

            var feeHeads = await _context.feeHeads
                .Where(fh => fh.school_id == school_id)
                .ToListAsync();

            var expandedInstallments = new List<ExpandedInstallment>();

            //foreach (var inst in feeInstallments)
            //{
            //    if (string.IsNullOrWhiteSpace(inst.installment_id)) continue;

            //    var months = inst.instMonth.Split(',')
            //        .Select(m => int.TryParse(m.Trim(), out int month) ? month : (int?)null)
            //        .Where(m => m.HasValue)
            //        .Select(m => m.Value)
            //        .ToList();

            //    int instNo = inst.installment_id;
            //    decimal amountPerMonth = inst.amount;

            //    if (months.Count > 1)
            //    {
            //        amountPerMonth /= months.Count;
            //    }

            //    foreach (int month in months)
            //    {
            //        if (monthIds == null || monthIds.Count == 0 || monthIds.Contains(month))
            //        {
            //            expandedInstallments.Add(new ExpandedInstallment
            //            {
            //                fee_head_mapping_id = inst.fee_head_mapping_id,
            //                class_id = inst.class_id,
            //                instNo = (months.Count > 1) ? month : instNo,
            //                Month = month,
            //                dueDate = inst.payment_date,
            //                amount = amountPerMonth,
            //                fee_head_id = inst.fee_head_mapping_id,
            //                fee_head_name = feeHeads.FirstOrDefault(f => f.fee_head_id == inst.fee_head_mapping_id)?.fee_head_name,
            //                fee_type_id = inst.installment_id, 
            //                fee_type_name = feeTypes.FirstOrDefault(f => f.fee_type_id == inst.installment_id)?.fee_type_name
            //            });
            //        }
            //    }
            //}

            var result = expandedInstallments
                .GroupBy(e => e.fee_head_id)
                .Select(g => new
                {
                    fee_head_id = g.Key,
                    fee_head_name = g.FirstOrDefault()?.fee_head_name,
                    total_amount = g.Sum(x => x.amount),
                    fee_type_id = g.FirstOrDefault()?.fee_type_id,
                    fee_type_name = g.FirstOrDefault()?.fee_type_name,
                    details = g.Select(x => new { x.Month, x.amount, x.dueDate, x.instNo }).ToList()
                })
                .ToList();

            return Ok(result);
        }


        public class ExpandedInstallment
        {
            public int fee_head_mapping_id { get; set; }
            public int class_id { get; set; }
            public int instNo { get; set; }
            public string instMonth { get; set; }
            public int Month { get; set; }
            public DateTime dueDate { get; set; }
            public decimal amount { get; set; }
            public int fee_head_id { get; set; }
            public string fee_head_name { get; set; }
            public int fee_type_id { get; set; }
            public string fee_type_name { get; set; }
        }

    }

}

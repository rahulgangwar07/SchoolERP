using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Charts;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Account;
using Microsoft.AspNetCore.SignalR.Protocol;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Collections.Generic;

namespace SchoolERP.Server.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeeStrutureController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<FeeStrutureController> _logger;
        private readonly IWebHostEnvironment _env; 
        private readonly Models.Common _common;

        public FeeStrutureController(ILogger<FeeStrutureController> logger, SchoolERPContext context, IWebHostEnvironment env, Common common)
        {
            _context = context;
            _logger = logger;
            _env = env;
            _common = common;
        }

        [HttpGet("get-fee-installment-structure")]
        public async Task<IActionResult> GetFeeStructure(string school_id, string session, int class_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id should not be null here.");

            var rawResult = new List<fetch_FeeHead_Mappings>();
            var query = @"exec fetch_FeeHead_Installment_Mappings @school_id, @session, @class_id";

            var clsses = await _context.classNames.Where(cn => cn.school_id == school_id && (cn.class_id == class_id || class_id == 0) && cn.status==true).ToListAsync();

            foreach(var cn in clsses)
            {
                using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
                {
                    await con.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@school_id", school_id);
                        cmd.Parameters.AddWithValue("@session", session);
                        cmd.Parameters.AddWithValue("@class_id", cn.class_id);

                        using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                var item = new fetch_FeeHead_Mappings
                                {
                                    fee_head_mapping_id = reader["fee_head_mapping_id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["fee_head_mapping_id"]),
                                    fee_type_id = reader["fee_type_id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["fee_type_id"]),
                                    fee_type_name = reader["fee_type_name"]?.ToString() ?? string.Empty,
                                    fee_head_id = reader["fee_head_id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["fee_head_id"]),
                                    fee_head_name = reader["fee_head_name"]?.ToString() ?? string.Empty,
                                    installment_id = reader["installment_id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["installment_id"]),
                                    class_id = reader["class_id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["class_id"]),
                                    instNo = reader["instNo"] == DBNull.Value ? 0 : Convert.ToInt32(reader["instNo"]),
                                    instMonth = reader["instMonth"]?.ToString() ?? string.Empty,
                                    dueDate = reader["dueDate"] == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(reader["dueDate"]),
                                    amount = reader["amount"] == DBNull.Value ? 0 : Convert.ToInt32(reader["amount"]),
                                    session = reader["session"]?.ToString() ?? string.Empty,
                                    school_id = reader["school_id"]?.ToString() ?? string.Empty
                                };

                                rawResult.Add(item);
                            }
                        }
                    }
                }

            }


            var groupedData = rawResult
                .GroupBy(r => new {r.class_id, r.fee_type_id, r.fee_type_name })
                .Select(g => new
                {
                   class_id = g.Key.class_id,
                    fee_type_id = g.Key.fee_type_id,
                    fee_type_name = g.Key.fee_type_name,
                    total_amount = g.Sum(x => x.amount)
                })
                .ToList();

            return Ok(groupedData); 
             
        }
    
        [HttpGet("get-classwise-feeInstallment")]
        public async Task<IActionResult> getClasswiseFeeHead(string school_id, string session, int class_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id should not be null.");

            var mappingDictionary = new Dictionary<int, FeeHeadInstallmentResult>();
            //var rawResult = new List<FeeHeadInstallmentResult>();

            var query = @"exec fetch_FeeHead_Installment_Mappings @school_id, @session, @class_id";

            using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
            {
                await con.OpenAsync();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@school_id", school_id);
                    cmd.Parameters.AddWithValue("@session", session);
                    cmd.Parameters.AddWithValue("@class_id", class_id);

                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int fee_head_mapping_id = reader["fee_head_mapping_id"] != DBNull.Value ? Convert.ToInt32(reader["fee_head_mapping_id"]) : 0;

                            if (!mappingDictionary.ContainsKey(fee_head_mapping_id))
                            {
                                var item = new FeeHeadInstallmentResult
                                {
                                    fee_type_id = reader["fee_type_id"] != DBNull.Value ? Convert.ToInt32(reader["fee_type_id"]) : 0,
                                    fee_type_name = reader["fee_type_name"]?.ToString() ?? "",
                                    fee_head_id = reader["fee_head_id"] != DBNull.Value ? Convert.ToInt32(reader["fee_head_id"]) : 0,
                                    fee_head_name = reader["fee_head_name"]?.ToString() ?? "",
                                    session = reader["session"]?.ToString() ?? "",
                                    school_id = reader["school_id"]?.ToString() ?? ""
                                };

                                mappingDictionary.Add(fee_head_mapping_id, item);
                            }
                        }
                    }
                }
            }
             
            // Fetch installment records
            var installmentData = await _context.feeInstallmentMasters
                .Where(x => x.class_id == class_id && x.session == session && x.school_id == school_id && x.IsDeleted == false)
                .ToListAsync();

            // Month name map (Apr to Mar)
            var monthNames = new Dictionary<int, string>
    {
        { 1, "Apr" }, { 2, "May" }, { 3, "Jun" }, { 4, "Jul" }, { 5, "Aug" }, { 6, "Sep" },
        { 7, "Oct" }, { 8, "Nov" }, { 9, "Dec" }, { 10, "Jan" }, { 11, "Feb" }, { 12, "Mar" }
    };

            foreach (var rlt in mappingDictionary.Values)
            {
                var relatedInstallments = installmentData
                    .Where(x => x.fee_head_id == rlt.fee_head_id)
                    .ToList();

                var addedMonthIds = new HashSet<int>();

                if (!relatedInstallments.Any())
                {
                    // No data: fill all months with amount 0
                    foreach (var month in monthNames)
                    {
                        rlt.installments.Add(new MonthFeeData
                        {
                            month_id = month.Key,
                            month_name = month.Value,
                            amount = 0
                        });
                    }

                    continue;
                }

                // Loop through available installments
                foreach (var inst in relatedInstallments)
                {
                    var monthIds = inst.instMonth.Split(',')
                        .Select(m => int.TryParse(m.Trim(), out var n) ? n : 0)
                        .Where(n => n >= 1 && n <= 12)
                        .ToList();

                    var splitAmount = monthIds.Count > 0 ? inst.amount / monthIds.Count : 0;

                    foreach (var monthId in monthIds)
                    {
                        if (monthNames.TryGetValue(monthId, out var monthName))
                        {
                            rlt.installments.Add(new MonthFeeData
                            {
                                month_id = monthId,
                                month_name = monthName,
                                amount = splitAmount
                            });

                            addedMonthIds.Add(monthId);
                        }
                    }
                }

                foreach (var m in monthNames)
                {
                    if (!addedMonthIds.Contains(m.Key))
                    {
                        rlt.installments.Add(new MonthFeeData
                        {
                            month_id = m.Key,
                            month_name = m.Value,
                            amount = 0
                        });
                    }
                }
                rlt.installments = rlt.installments.OrderBy(rl => rl.month_id).ToList();
                //return Ok(rlt);
            }


            return Ok(mappingDictionary.Values.ToList());
        }

        [HttpPost("insert-FeeInstallmentData")]
        public async Task<IActionResult> InsertInstallmentData(string school_id, string session, int class_id, List<FeeHeadInstallmentResult> feeHeadInstallmentResult)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            var now = DateTime.UtcNow;

            var existingInstallments = await _context.feeInstallmentMasters
                .Where(im => im.school_id == school_id && im.session == session && im.class_id == class_id && !im.IsDeleted)
                .ToListAsync();

            var mappingDict = await _context.feeHeadMappings
                .Where(f => f.school_id == school_id)
                .ToDictionaryAsync(f => (f.fee_head_id, f.fee_type_id), f => f.fee_head_mapping_id);

            foreach (var feeHead in feeHeadInstallmentResult)
            {
                var key = (feeHead.fee_head_id, feeHead.fee_type_id);
                if (!mappingDict.TryGetValue(key, out int feeHeadMappingId))
                    continue; 

                var relatedExisting = existingInstallments
                    .Where(x => x.fee_head_id == feeHead.fee_head_id)
                    .ToList();

                var newFeeInstallments = new List<feeInstallmentMaster>();

                if (feeHead.fee_type_name.Contains("Quarterly", StringComparison.OrdinalIgnoreCase))
                {
                    var quarterlyGroups = new List<List<int>>
            {
                new() { 1, 2, 3 },
                new() { 4, 5, 6 },
                new() { 7, 8, 9 },
                new() { 10, 11, 12 }
            };

                    foreach (var quarter in quarterlyGroups)
                    {
                        var quarterMonths = feeHead.installments
                            .Where(m => quarter.Contains(m.month_id) && m.amount > 0)
                            .ToList();

                        if (quarterMonths.Count == 3 && quarterMonths.All(x => x.amount == quarterMonths.First().amount))
                        {
                            var amount = quarterMonths.First().amount;
                            var totalAmount = amount * 3;
                            var monthStr = string.Join(",", quarter);

                            if (!relatedExisting.Any(x => x.instMonth == monthStr && x.amount == Convert.ToInt32(totalAmount)))
                            {
                                newFeeInstallments.Add(CreateInstallment(feeHeadMappingId, class_id, feeHead, quarter.First(), monthStr, totalAmount, session, school_id, now));
                            }
                        }
                    }
                }
                else
                {
                    List<int> existingInst = new List<int>();
                    foreach (var inst in feeHead.installments.Where(i => i.amount > 0))
                    {
                        var monthStr = inst.month_id.ToString();
                        var existing = relatedExisting.FirstOrDefault(x => x.instMonth == monthStr);

                        if (existing == null)
                        {
                            newFeeInstallments.Add(CreateInstallment(feeHeadMappingId, class_id, feeHead, inst.month_id, monthStr, inst.amount, session, school_id, now));
                        }
                        else if (existing.amount != inst.amount)
                        {
                            existing.amount = inst.amount;
                            existing.mDate = now;
                            _context.feeInstallmentMasters.Update(existing);
                            existingInst.Add(existing.instNo);
                        }
                        else
                        {
                            existingInst.Add(existing.instNo);
                        }
                    }
                    var forDelete = relatedExisting.Where(r => !existingInst.Contains(r.instNo)).ToList();

                    foreach (var del in forDelete)
                    {
                        del.IsDeleted = true;
                        del.mDate = now;
                        _context.feeInstallmentMasters.Update(del);
                    }

                }

                await _context.feeInstallmentMasters.AddRangeAsync(newFeeInstallments);
            }

            await _context.SaveChangesAsync();
            return Ok(new   { message = "Installments inserted/updated successfully." });
        }

        // Helper method to avoid repetition
        private feeInstallmentMaster CreateInstallment(int mappingId, int classId, FeeHeadInstallmentResult head, int instNo, string monthStr, decimal amount, string session, string schoolId, DateTime now)
        {
            return new feeInstallmentMaster
            {
                fee_head_mapping_id = mappingId,
                class_id = classId,
                instNo = instNo,
                instMonth = monthStr,
                dueDate = now, 
                amount = amount,
                session = session,
                school_id = schoolId,
                IsDeleted = false,
                cDate = now,
                mDate = now,
                fee_head_id = head.fee_head_id,
                fee_type_id = head.fee_type_id
            };
        }

        [HttpDelete("clear-fee-installment")]
        public async Task<IActionResult> clearFeeStruture(string school_id, string session, int class_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School ID is null");

            var installment = await _context.feeInstallmentMasters.Where(fi => fi.school_id == school_id && fi.session == session && fi.class_id == class_id).ToListAsync();
            _context.RemoveRange(installment);
            await _context.SaveChangesAsync();

            return Ok(new {message = "Installment Removed." });

        }

        [HttpPost("createStudentLedgers")]
        public async Task<IActionResult> createStudentLedgers(string school_id,string session)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School ID is null");
            Dictionary<string, string> param = new Dictionary<string, string>
            {
                {"school_id",school_id },
                {"session",session }
            };
            _common.ExecuteQuery("create_LedgerforAllStudents",param);

            return Ok();
        }


        public class MonthFeeData
        {
            public int month_id { get; set; }
            public string month_name { get; set; }
            public decimal amount { get; set; } = 0;
        }

        public class FeeHeadInstallmentResult
        {
            public int fee_type_id { get; set; }
            public string fee_type_name { get; set; }
            public int fee_head_id { get; set; }
            public string fee_head_name { get; set; }
            public string session { get; set; }
            public string school_id { get; set; }
            public List<MonthFeeData> installments { get; set; } = new List<MonthFeeData>();
        }


    }
}

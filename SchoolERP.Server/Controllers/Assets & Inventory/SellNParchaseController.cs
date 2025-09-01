using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Assets___Inventory;
using System.Diagnostics.Metrics;

namespace SchoolERP.Server.Controllers.Assets___Inventory
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellNParchaseController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SellNParchaseController> _logger;
        
        public SellNParchaseController(SchoolERPContext context,ILogger<SellNParchaseController> logger)
        {
            _context = context;
            _logger = logger;
        }


        #region purchase Logic

        [HttpGet("get-purchase_entries")]
        public async Task<IActionResult> getPurchaseEntries(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var purchaseEntites = await _context.purchase_Entries.Where(pe => pe.school_id == school_id).ToListAsync();

            return Ok(purchaseEntites);

        }

        [HttpGet("get-purchase_entries-by-id")]
        public async Task<IActionResult> getPurchaseEntries(string school_id, int purchase_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var purchaseEntites = await _context.purchase_Entries.Where(pe => pe.school_id == school_id && pe.purchase_EntryID == purchase_id).FirstOrDefaultAsync();

            return Ok(purchaseEntites);

        }

        [HttpGet("get-purchase_entries-by-asset-id")]
        public async Task<IActionResult> getPurchaseEntriesbyAsset(string school_id, int asset_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var purchaseEntites = await _context.purchase_Entries.Where(pe => pe.school_id == school_id && pe.asset_id == asset_id).ToListAsync();

            return Ok(purchaseEntites);

        }

        [HttpPost("post-purchase_entries")]
        public async Task<IActionResult> postPurchaseEntries(string school_id,purchase_entries purchase_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            _context.Add(purchase_);
            await _context.SaveChangesAsync();

            return Ok(purchase_);

        }
         
        [HttpPut("put-purchase_entries")]
        public async Task<IActionResult> putPurchaseEntries(string school_id,purchase_entries purchase_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            //var pc = await _context.purchase_Entries.Where(pe => pe.school_id == school_id && pe.purchase_EntryID == purchase_.purchase_EntryID).FirstOrDefaultAsync();
            _context.Update(purchase_);
            await _context.SaveChangesAsync(); 
            return Ok(purchase_); 
        }

        [HttpDelete("delete-purchase_entries")]
        public async Task<IActionResult> deletePurchaseEntries(string school_id, int purchase_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var purchaseEntites = await _context.purchase_Entries.Where(pe => pe.school_id == school_id && pe.purchase_EntryID == purchase_id).FirstOrDefaultAsync();
            _context.Remove(purchaseEntites);
            await _context.SaveChangesAsync(); 
            return Ok(purchaseEntites); 
        }

        #endregion

        #region Sell Logic

        [HttpGet("get-sell-counter")]
        public async Task<IActionResult> getSellCounter(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var sellCounter = await _context.sell_Counters.Where(sc => sc.school_id == school_id).ToListAsync();

            return Ok(sellCounter);
        }

        [HttpGet("get-sell-counter-by-id")]
        public async Task<IActionResult> getSellCounter(string school_id,int sell_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var sellCounter = await _context.sell_Counters.Where(sc => sc.school_id == school_id && sc.sell_id == sell_id).FirstOrDefaultAsync();

            return Ok(sellCounter);
        }

        [HttpPost("post-sell-counter")]
        public async Task<IActionResult> postSellCounter(string school_id,sell_counter sell_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            } 
            _context.Add(sell_);
            await _context.SaveChangesAsync();
             
            return Ok(sell_);
        }

        [HttpPost("post-multiple-sell-counter")]
        public async Task<IActionResult> postMultipleSellCounter(string school_id,sellCountDTO sell_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            List<sell_counter> sell_s = new List<sell_counter>();
            if(sell_ != null && sell_.purchase_1.Count != 0)
            {
                foreach (var s in sell_.purchase_1)
                {
                    sell_counter counter = new sell_counter();
                    counter = new sell_counter
                    {
                        item_type = sell_.sell_1.item_type,
                        item_id = sell_.sell_1.item_id,
                        deployment_area_id = sell_.sell_1.deployment_area_id, 
                        quantity = s.newQuantity,
                        total_amount = s.total_amount,
                        unit_price = s.unit_price,
                        student_id = sell_.sell_1.student_id,
                        remark = sell_.sell_1.remark,
                        sold_by = sell_.sell_1.sold_by,
                        sell_date = DateOnly.FromDateTime(DateTime.Now),
                        school_id = s.school_id
                    };

                    sell_s.Add(counter);
                }
            }

            _context.AddRange(sell_s);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("put-sell-counter")]
        public async Task<IActionResult> putSellCounter(string school_id,sell_counter sell_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }
            var sellCounter = await _context.sell_Counters.Where(s => s.school_id == sell_.school_id && s.sell_id == sell_.sell_id).FirstOrDefaultAsync();
            sellCounter.deployment_area_id = sell_.deployment_area_id;
            sellCounter.student_id = sell_.student_id;
            sellCounter.sell_date = sell_.sell_date;
            sellCounter.quantity = sell_.quantity;
            sellCounter.unit_price = sell_.unit_price;
            sellCounter.total_amount = sell_.total_amount;
            sellCounter.discount = sell_.discount;
            sellCounter.balance = sell_.balance;
            sellCounter.remark = sell_.remark;
            sellCounter.sold_by = sell_.sold_by; 

            _context.Add(sell_);
            await _context.SaveChangesAsync();
             
            return Ok(sell_);
        }


        [HttpDelete("delete-sell-counter")]
        public async Task<IActionResult> deleteSellCounter(string school_id, int sell_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            var sellCounter = await _context.sell_Counters.Where(sc => sc.school_id == school_id && sc.sell_id == sell_id).FirstOrDefaultAsync();
            _context.Remove(sellCounter);
            await _context.SaveChangesAsync();
            return Ok(sellCounter);
        }


        #endregion

        #region Inventroy Sell Management

        [HttpGet("get-inventory-sell")]
        public async Task<IActionResult> getInventorySell(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            // Get inventory sell records
            var invSell = await _context.sell_Counters
                .Where(i => i.item_type == "Inventory" &&
                i.school_id == school_id && i.isActive == true)
                .ToListAsync();

            // Get student data
            var students = from sm in _context.tb_studentmasters
                           join soi in _context.student_Other_Infos
                               on new { sm.school_id, sm.uid } equals new { soi.school_id, soi.uid }
                           where sm.school_id == school_id
                           select new
                           {
                               sm.stu_id,
                               sm.uid,
                               soi.first_name,
                               sm.class_id,
                               soi.father_name,
                               soi.mother_name,
                               soi.contact_no
                           };
            var inventory = await _context.inventories.Where(inv => inv.school_id == school_id).ToListAsync();
            // Join invSell with student data on stu_id
            var result = from sell in invSell
                         join stu in students
                         on sell.student_id equals stu.stu_id
                         select new
                         {
                             sell.sell_uid,
                             sell.item_id,
                             item_name = inventory.Where(inv => inv.school_id == school_id && inv.inventory_id == sell.item_id).Select(s => s.item_name).FirstOrDefault(),
                             sell.quantity,
                             sell.discount,
                             sell.balance,
                             sell.total_amount,
                             sell.sell_date,
                             stu.stu_id,
                             stu.uid,
                             stu.first_name,
                             stu.class_id,
                             stu.father_name,
                             stu.mother_name,
                             stu.contact_no
                         };
            var grp = result.GroupBy(s => s.sell_uid);
            return Ok(grp);
        }
        

        [HttpGet("get-uid-inventory-sell")]
        public async Task<IActionResult> getUIDInventorySell(string school_id,string Suid)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.");
            }

            // Get inventory sell records
            var invSell = await _context.sell_Counters
                .Where(i => i.item_type == "Inventory" && i.sell_uid == Suid &&
                i.school_id == school_id && i.isActive == true)
                .ToListAsync();

            // Get student data
            var students = from sm in _context.tb_studentmasters
                           join soi in _context.student_Other_Infos
                               on new { sm.school_id, sm.uid } equals new { soi.school_id, soi.uid }
                           where sm.school_id == school_id
                           select new
                           {
                               sm.stu_id,
                               sm.uid,
                               soi.first_name,
                               sm.class_id,
                               soi.father_name,
                               soi.mother_name,
                               soi.contact_no
                           };
            var inventory = await _context.inventories.Where(inv => inv.school_id == school_id).ToListAsync();
            // Join invSell with student data on stu_id
            var result = from sell in invSell
                         join stu in students
                         on sell.student_id equals stu.stu_id
                         select new
                         {
                             sell.sell_uid,
                             sell.item_id,
                             item_name = inventory.Where(inv => inv.school_id == school_id && inv.inventory_id == sell.item_id).Select(s => s.item_name).FirstOrDefault(),
                             sell.quantity,
                             sell.discount,
                             sell.balance,
                             sell.total_amount,
                             sell.sell_date,
                             stu.stu_id,
                             stu.uid,
                             stu.first_name,
                             stu.class_id,
                             stu.father_name,
                             stu.mother_name,
                             stu.contact_no
                         };
            var grp = result.GroupBy(s => s.sell_uid);
            return Ok(grp);
        }


        [HttpPost("post-inventory-sell")]
        public async Task<IActionResult> InsertInventorySell([FromQuery] string school_id, [FromBody] InventorySellDto data)
        {
            try
            {
                if (data == null)
                {
                    return BadRequest("No data received.");
                }

                data.School_Id = school_id;
                List<sell_counter> sell = new List<sell_counter>();
                string guid = Guid.NewGuid().ToString();
                foreach (var item in data.ItemDetails)
                {
                    sell_counter sell_ = new sell_counter
                    {
                        item_type = data.Item_Type,
                        item_id = item.Inventory_Id,
                        sub_item_id = item.Variant_Id,
                        sell_uid = guid,
                        deployment_area_id = data.Deployment_Area_Id,
                        student_id = data.Student_Id,
                        sell_date = DateOnly.FromDateTime((DateTime.Parse(data.Sell_Date).Date)),
                        quantity = item.Quantity,
                        unit_price = item.Unit_Price,
                        total_amount = item.Total_Price,
                        discount = 0,
                        balance = 0,
                        remark = data.Remark,
                        sold_by = data.Sold_By,
                        isActive = true,
                        school_id = data.School_Id,
                    };
                    sell.Add(sell_);
                }
                _context.AddRange(sell);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Inventory inserted successfully!",
                    received = sell
                });
            }
            catch(Exception ex)
            {
                return BadRequest("Exception is "+ex.Message);
            }
        }



        #endregion


        public class sellCountDTO
        {
            public List<PurchaseEntriesAsset> purchase_1 { get; set; }
            public sell_counter sell_1 { get; set; }
        }

        public class PurchaseEntriesAsset : purchase_entries
        { 
            public int newQuantity { get; set; }
        }

    }
}

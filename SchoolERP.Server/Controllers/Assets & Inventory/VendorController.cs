using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Assets___Inventory;

namespace SchoolERP.Server.Controllers.Assets___Inventory
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<VendorController> _logger;

        public VendorController(SchoolERPContext context, ILogger<VendorController> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Vendor Apis

        [HttpGet("get-vendors")]
        public async Task<IActionResult> getVendors(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var vendros = await _context.vendors.Where(vn => vn.school_id == school_id && vn.isactive == true).ToListAsync();
            return Ok(vendros);
        }
        

        [HttpGet("get-vendor-by-id")]
        public async Task<IActionResult> getVendorbyId(string school_id,int vendor_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var vendor = await _context.vendors.Where(vn => vn.school_id == school_id && vn.isactive == true && vn.vendor_id == vendor_id).FirstOrDefaultAsync();
            return Ok(vendor);
        }
        

        [HttpPost("post-vendors")]
        public async Task<IActionResult> postVendors(string school_id,Vendors vendor)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            _context.Add(vendor);
            await _context.SaveChangesAsync();

            return Ok(vendor);
        }
        

        [HttpPut("put-vendors")]
        public async Task<IActionResult> updateVendors(string school_id, Vendors vendor)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var v = await _context.vendors.Where(vn => vn.school_id == school_id).FirstOrDefaultAsync();
            v.vendor_name = vendor.vendor_name;
            v.contact = vendor.contact;
            v.email = vendor.email;
            v.address = vendor.address;
            await _context.SaveChangesAsync();

            return Ok(vendor);
        }

        [HttpDelete("delete-vendor")]
        public async Task<IActionResult> deleteVendor(string school_id, int vendor_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var vendor = await _context.vendors.Where(vn => vn.school_id == school_id & vn.vendor_id == vendor_id).FirstOrDefaultAsync();
            vendor.isactive = false;
            await _context.SaveChangesAsync();
            return Ok(vendor);
        }

        #endregion

        #region Purchase Transaction Table

        [HttpGet("get-transaction")]
        public async Task<ActionResult<IEnumerable<purchase_transaction>>> GetAll(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("school id is mendatory. ");
            }
            var transaction = await _context.purchase_Transactions
                .Where(x => x.isActive && x.school_id == school_id)
                .ToListAsync();
            return Ok(transaction);
        }

        // 🔹 Get By ID
        [HttpGet("get-transaction-id")]
        public async Task<ActionResult<purchase_transaction>> GetById(string school_id,int id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("school id is mendatory. ");
            }
            var txn = await _context.purchase_Transactions.Where(pt => pt.school_id == school_id && pt.transaction_id == id).FirstOrDefaultAsync();
            if (txn == null || txn.isActive == false)
                return NotFound();
            return Ok(txn);
        }

        // 🔹 Create
        [HttpPost("post-transaction")]
        public async Task<ActionResult<purchase_transaction>> Create(string school_id, purchase_transaction txn)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("school id is mendatory. ");
            }
            txn.created_at = DateTime.Now;
            txn.transaction_date = txn.transaction_date == default ? DateTime.Today : txn.transaction_date;
            txn.isActive = true;

            _context.purchase_Transactions.Add(txn);
            await _context.SaveChangesAsync();

            return Ok(txn);
        }

        // 🔹 Update
        [HttpPut("put-transaction")]
        public async Task<IActionResult> Update(string school_id, int id, purchase_transaction txn)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("school id is mendatory. ");
            }
            if (id != txn.transaction_id)
                return BadRequest();

            var existing = await _context.purchase_Transactions.FindAsync(id);
            if (existing == null)
                return NotFound();

            // Update only fields allowed to be edited
            existing.vendor_id = txn.vendor_id;
            existing.item_id = txn.item_id;
            existing.contact = txn.contact;
            existing.transaction_date = txn.transaction_date;
            existing.amount = txn.amount;
            existing.dues = txn.dues;
            existing.notes = txn.notes;
            existing.entered_by = txn.entered_by;
            existing.school_id = txn.school_id;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 🔹 Soft Delete
        [HttpDelete("delete-transaction")]
        public async Task<IActionResult> SoftDelete(string school_id, int id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("school id is mendatory. ");
            }
            var txn = await _context.purchase_Transactions.FindAsync(id);
            if (txn == null) return NotFound();

            txn.isActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

    }
}

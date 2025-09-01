using DocumentFormat.OpenXml.Drawing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Assets___Inventory;

namespace SchoolERP.Server.Controllers.Assets___Inventory
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsNInventoryController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<AssetsNInventoryController> _logger;

        public AssetsNInventoryController(SchoolERPContext context, ILogger<AssetsNInventoryController> logger)
        {
            _context = context;
            _logger = logger;
        }

        #region Asset Methods

        [HttpGet("get-assets")]
        public async Task<IActionResult> getAssets(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var assets = await _context.assets.Where(ass => ass.school_id == school_id).ToListAsync();
            return Ok(assets);
        }

        [HttpGet("get-asset-by-id")]
        public async Task<IActionResult> getAssetbyId(string school_id,int asset_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var asset = await _context.assets.Where(ass => ass.school_id == school_id && ass.asset_id == asset_id).FirstOrDefaultAsync();
            return Ok(asset);
        }

        [HttpPost("post-assets")]
        public async Task<IActionResult> insertAssets(string school_id,Assets assets)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            _context.Add(assets);
            await _context.SaveChangesAsync();
            return Ok(assets);
        }

        [HttpPut("put-assets")]
        public async Task<IActionResult> updateAssets(string school_id,Assets asset)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var a = await _context.assets.Where(ass => ass.school_id == school_id && ass.asset_id == asset.asset_id).FirstOrDefaultAsync();
            a.asset_name = asset.asset_name; 
            a.description = asset.description; 
            a.asset_status = "In Use"; 

            await _context.SaveChangesAsync();

            return Ok(a);
        }

        [HttpDelete("delete-asset")]
        public async Task<IActionResult> deleteAsset(string school_id, int asset_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var asset = await _context.assets.Where(ass => ass.school_id == school_id && ass.asset_id == asset_id).FirstOrDefaultAsync();
            _context.Remove(asset);
            await _context.SaveChangesAsync();
            return Ok(asset);
        }

        #endregion

        #region Inventory Methods

        [HttpGet("get-inventories")]
        public async Task<IActionResult> getInventories(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var inventories = await _context.inventories.Where(inv => inv.school_id == school_id).Include(inv => inv.Inventory_s).ToListAsync();
            return Ok(inventories);
        }

        [HttpGet("get-inventory-by-id")]
        public async Task<IActionResult> getInventorybyId(string school_id,int inventory_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var invetory = await _context.inventories.Where(inv => inv.school_id == school_id && inv.inventory_id == inventory_id).FirstOrDefaultAsync();
            return Ok(invetory);
        }

        [HttpPost("post-inventory")]
        public async Task<IActionResult> insertInventory(string school_id,Inventory inventory)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            _context.Add(inventory);
            await _context.SaveChangesAsync();
            return Ok(inventory);
        }

        

        [HttpPut("put-inventory")]
        public async Task<IActionResult> updateInventory(string school_id,Inventory inventory)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var inv = await _context.inventories.Where(inv => inv.school_id == school_id && inv.inventory_id == inventory.inventory_id).FirstOrDefaultAsync();
            inv.item_name = inventory.item_name;
            inv.description = inventory.description; 

            await _context.SaveChangesAsync();

            return Ok(inv);
        }

        [HttpDelete("delete-inventory")]
        public async Task<IActionResult> deleteInventory(string school_id, int inventory_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found.");
            }

            var inventory = await _context.inventories.Where(inv => inv.school_id == school_id && inv.inventory_id == inventory_id).FirstOrDefaultAsync();
            _context.Remove(inventory);
            await _context.SaveChangesAsync();
            return Ok(inventory);
        }


        #endregion

        #region Inventory Variant

        [HttpGet("get-inv-variant")]
        public async Task<IActionResult> getVariants(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.. ");
            }

            var variants = await _context.inventory_Variants.Where(inv => inv.school_id == school_id).ToListAsync(); ;

            return Ok(variants);
        }
        

        [HttpGet("get-inv-variant-by-inv-id")]
        public async Task<IActionResult> getVariantsbyId(string school_id,string inventory_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.. ");
            }
            List<int> ids = inventory_id.Split(",").Select(int.Parse).ToList();
            var variants = await _context.inventory_Variants.Where(inv => inv.school_id == school_id && ids.Contains(inv.inventory_id)).ToListAsync();
            var v = variants.GroupBy(inv => inv.inventory_id);

            return Ok(v);
        }

        [HttpPost("post-inv-variant")]
        public async Task<IActionResult> postInvVariant(string school_id,List<Inventory_Variants> inventory_)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null.. ");
            }
            if(inventory_.Count == 0)
            {
                return NotFound();
            }

            var insert_inv = inventory_.Where(i => !string.IsNullOrEmpty(i.variant_name) && i.inventory_id != 0 && i.variant_id == 0).ToList();
            var update_inv = inventory_.Where(i => !string.IsNullOrEmpty(i.variant_name) && i.inventory_id != 0 && i.variant_id != 0).ToList();

            _context.AddRange(insert_inv);
            _context.UpdateRange(update_inv);
            await _context.SaveChangesAsync();

            return Ok(insert_inv);

        }

        [HttpDelete("delete-inv-variant")]
        public async Task<IActionResult> deleteInvvariant(string school_id,int variant_id)
        {
            if (string.IsNullOrEmpty(school_id) && variant_id!= 0)
            {
                return BadRequest("School Id and Variant Id is null.");
            }
            var v = await _context.inventory_Variants.Where(iv => iv.school_id == school_id && iv.variant_id == variant_id).FirstOrDefaultAsync();
            _context.Remove(v);
            await _context.SaveChangesAsync();
            return Ok(v);
        }

        #endregion

        [HttpGet("get-asset-dep-report")]
        public async Task<IActionResult> getAssetReport(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }

            var assets = await _context.assets.Where(s => s.school_id == school_id).ToDictionaryAsync(s => s.asset_id,s => s.asset_name);

            var data = await _context.sell_Counters.Where(sc => sc.school_id == school_id && sc.item_type == "Asset").Select(
                sc => new 
                {
                    sc.sell_id,
                    sc.item_type,
                    sc.item_id,
                    item_name = assets[sc.item_id] ?? "",
                    sc.deployment_area_id,
                    sc.sell_date,
                    sc.quantity,
                }).ToListAsync();

            return Ok(data);
        }

    }
}

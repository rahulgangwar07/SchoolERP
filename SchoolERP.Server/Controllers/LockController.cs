using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LockController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<LockController> _logger;

        public LockController(SchoolERPContext context, ILogger<LockController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // POST: api/lock/lock-module
        [HttpPost("lock-module")]
        public async Task<IActionResult> LockModule([FromBody] LockEntry model)
        {
            if (model == null || string.IsNullOrEmpty(model.school_id) || string.IsNullOrEmpty(model.locked_by))
                return BadRequest("Invalid input.");

            var existing = await _context.lockEntries.FirstOrDefaultAsync(l =>
                l.school_id == model.school_id &&
                l.session == model.session &&
                l.lock_type == model.lock_type);

            if (existing != null)
            {
                existing.is_locked = true;
                existing.remarks = model.remarks;
                existing.locked_by = model.locked_by;
                existing.locked_on = DateTime.Now;
            }
            else
            {
                model.locked_on = DateTime.Now;
                model.is_locked = true;
                _context.lockEntries.Add(model);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Module locked successfully." });
        }

        // POST: api/lock/unlock-module
        [HttpPost("unlock-module")]
        public async Task<IActionResult> UnlockModule([FromBody] LockEntry model)
        {
            var existing = await _context.lockEntries.FirstOrDefaultAsync(l =>
                l.school_id == model.school_id &&
                l.session == model.session &&
                l.lock_type == model.lock_type);

            if (existing == null)
                return NotFound("No lock found.");

            existing.is_locked = false;
            existing.remarks = model.remarks;
            existing.locked_by = model.locked_by;
            existing.locked_on = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Module unlocked successfully." });
        }

        // GET: api/lock/status?school_id=abc&session=2024-25&lock_type=1
        [HttpGet("status")]
        public async Task<IActionResult> CheckLockStatus(string school_id, string session, int lock_type)
        {
            var lockEntry = await _context.lockEntries.FirstOrDefaultAsync(l =>
                l.school_id == school_id &&
                l.session == session &&
                l.lock_type == lock_type);

            if (lockEntry == null)
                return Ok(new { is_locked = false });

            return Ok(new { is_locked = true });
        }

        // GET: api/lock/all?school_id=abc&session=2024-25
        [HttpGet("all")]
        public async Task<IActionResult> GetAllLocks(string school_id, string session)
        {
            var locks = await _context.lockEntries
                .Where(l => l.school_id == school_id && l.session == session)
                .ToListAsync();

            return Ok(locks);
        }

        [Table("ModuleLocks")]
        public class LockEntry
        {
            [Key]
            public int lock_id { get; set; }

            public int lock_type { get; set; } // FK to LockTypes table

            public bool is_locked { get; set; }

            public string? remarks { get; set; }

            [Required]
            public string locked_by { get; set; }

            public DateTime locked_on { get; set; }

            [Required]
            public string school_id { get; set; }

            [Required]
            public string session { get; set; }
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Examination;

namespace SchoolERP.Server.Controllers.Examination
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamSettingsController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<ExamSettingsController> _logger;
        private readonly IWebHostEnvironment _env;

        public ExamSettingsController(ILogger<ExamSettingsController> logger, SchoolERPContext context, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet("GetExamMarksEntries")]
        public async Task<IActionResult> GetExamMarksEntries()
        {
            try
            {
                var marksEntries = await _context.marks_Entries.ToListAsync();
                return Ok(marksEntries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam marks entries.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamMarksEntryById/{id}")]
        public async Task<IActionResult> GetExamMarksEntryById(int id)
        {
            try
            {
                var marksEntry = await _context.marks_Entries.FindAsync(id);
                if (marksEntry == null)
                {
                    return NotFound($"Marks entry with ID {id} not found.");
                }
                return Ok(marksEntry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam marks entry by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpPost("CreateExamMarksEntry")]
        public async Task<IActionResult> CreateExamMarksEntry([FromBody] marks_entry marksEntry)
        {
            if (marksEntry == null)
            {
                return BadRequest("Marks entry data is null.");
            }
            try
            {
                _context.marks_Entries.Add(marksEntry);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetExamMarksEntryById), new { id = marksEntry.marks_entry_id }, marksEntry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam marks entry.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamMarksEntry/{id}")]
        public async Task<IActionResult> UpdateExamMarksEntry(int id, [FromBody] marks_entry marksEntry)
        {
            if (marksEntry == null || marksEntry.marks_entry_id != id)
            {
                return BadRequest("Marks entry data is null or ID mismatch.");
            }
            try
            {
                var existingMarksEntry = await _context.marks_Entries.FindAsync(id);
                if (existingMarksEntry == null)
                {
                    return NotFound($"Marks entry with ID {id} not found.");
                }
                existingMarksEntry.exam_id = marksEntry.exam_id;
                existingMarksEntry.student_id = marksEntry.student_id;
                existingMarksEntry.subject_id = marksEntry.subject_id;
                existingMarksEntry.obtained_marks = marksEntry.obtained_marks;
                existingMarksEntry.session = marksEntry.session;
                existingMarksEntry.school_id = marksEntry.school_id;
                _context.marks_Entries.Update(existingMarksEntry);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam marks entry.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamMarksEntry/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamMarksEntry(int id)
        {
            try
            {
                var marksEntry = await _context.marks_Entries.FindAsync(id);
                if (marksEntry == null)
                {
                    return NotFound($"Marks entry with ID {id} not found.");
                }
                _context.marks_Entries.Remove(marksEntry);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam marks entry.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        [HttpGet("GetExamMarksEntriesByStudent/{studentId}")]
        public async Task<IActionResult> GetExamMarksEntriesByStudent(int studentId)
        {
            try
            {
                var marksEntries = await _context.marks_Entries
                    .Where(m => m.student_id == studentId)
                    .ToListAsync();
                if (marksEntries == null || !marksEntries.Any())
                {
                    return NotFound($"No marks entries found for student with ID {studentId}.");
                }
                return Ok(marksEntries);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam marks entries by student ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


    }
}

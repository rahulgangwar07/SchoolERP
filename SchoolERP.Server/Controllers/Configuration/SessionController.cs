using DocumentFormat.OpenXml.Office2021.Excel.RichDataWebImage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private SchoolERPContext _context;

        public SessionController(SchoolERPContext context)
        {
            _context = context;
        }

        #region Get Only For Calling everyWhere

        [HttpGet("getSingleSession")]
        public async Task<IActionResult> getOnlySession(string school_id, int desig_id)
        {
            if (string.IsNullOrWhiteSpace(school_id) || desig_id <= 0)
            {
                return BadRequest("Invalid school_id or desig_id.");
            }

            var session = await _context.sessionMappings
                .Where(sm => sm.school_id == school_id && sm.desig_id == desig_id)
                .FirstOrDefaultAsync();

            if (session == null)
            {
                var mainsession = await _context.sessions
                    .Where(sm => sm.school_id == school_id && sm.status == true)
                    .FirstOrDefaultAsync();

                if (mainsession == null)
                {
                    return NotFound("No session found for the given school_id.");
                }

                return Ok(new { mainsession.session_name });
            }

            var fetchedSession = await _context.sessions
                .Where(ss => ss.session_id == session.session_id && ss.school_id == school_id)
                .FirstOrDefaultAsync();

            if (fetchedSession == null)
            {
                return NotFound("No matching session found for the given session_id.");
            }

            return Ok(new { fetchedSession.session_name });
        }

        #endregion

        #region getSession Data

        [HttpGet("getSession")]
        public async Task<IActionResult> getSession(string school_id, int desig_id)
        {

            var session = await _context.sessions
                .Where(s => s.school_id == school_id).FirstOrDefaultAsync();

            if (session == null)
            {
                return NotFound("No active session found.");
            }



            var session_mapping = await _context.sessionMappings
                .Where(sm => sm.school_id == school_id && sm.desig_id == desig_id).FirstOrDefaultAsync();

            if (session_mapping == null)
            {
                // If no mapping exists, create a new mapping
                session_mapping = new SessionMapping
                {
                    session_id = session.session_id,
                    desig_id = desig_id,
                    school_id = school_id,
                    created_date = DateTime.Now,
                    updated_date = DateTime.Now
                };

                _context.sessionMappings.Add(session_mapping);
                await _context.SaveChangesAsync();
            }
            else
            {
                var chksession = await _context.sessions.Where(ss => ss.school_id == school_id).ToListAsync();
                if (chksession == null)
                {
                    return BadRequest();
                }
                foreach (var item in chksession)
                {
                    if (item.session_id == session_mapping.session_id)
                    {
                        item.status = true;
                    }
                    else
                    {
                        item.status = false;
                    }
                }


                return Ok(chksession);
            }

            var finaldata = await _context.sessions.Where(ss => ss.school_id == school_id).ToListAsync();

            return Ok(finaldata);


        }

        #endregion

        #region Insert New Session or Update Existing Data

        [HttpPost("postSession")]
        public async Task<IActionResult> InsertSession(string school_id, sessionInsertion_DTOs dTOs)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found!.");
            }

            if (dTOs.session_id == 0)
            {
                Session session = new Session
                {
                    session_name = dTOs.startYear + " - " + dTOs.endYear,
                    start_month = dTOs.startMonth,
                    end_month = dTOs.endMonth,
                    start_year = dTOs.startYear,
                    end_year = dTOs.endYear,
                    status = false,
                    created_date = DateTime.Now,
                    updated_date = DateTime.Now,
                    school_id = school_id
                };
                _context.Add(session);
                await _context.SaveChangesAsync();
            }
            else
            {
                var s = await _context.sessions.Where(ss => ss.school_id == school_id && ss.session_id == dTOs.session_id).FirstOrDefaultAsync();
                if (s == null)
                {
                    return BadRequest("Session data not found! ");
                }
                Session_log session1 = new Session_log
                {
                    session_id = s.session_id,
                    session_name = s.session_name,
                    start_month = s.start_month,
                    end_month = s.end_month,
                    start_year = s.start_year,
                    end_year = s.end_year,
                    status = s.status,
                    created_date = DateTime.Now,
                    updated_date = s.updated_date,
                    school_id = s.school_id
                };
                _context.Add(session1);
                await _context.SaveChangesAsync();

                s.session_name = dTOs.startYear + " - " + dTOs.endYear;
                s.start_month = dTOs.startMonth;
                s.end_month = dTOs.endMonth;
                s.start_year = Convert.ToInt32(dTOs.startYear);
                s.end_year = Convert.ToInt32(dTOs.endYear);
                s.updated_date = DateTime.Now;

                await _context.SaveChangesAsync();



            }





            return Ok();
        }

        #endregion

        #region Update Session Active Status
        [HttpPut("updateSession/{desig_id}")]
        public async Task<IActionResult> updateSession(int desig_id, [FromBody] Session session)
        {
            if (desig_id == 0)
            {
                return BadRequest("desig id not found.");
            }
            if (session == null)
            {
                return BadRequest("Data not Found. ");
            }

            var item = await _context.sessionMappings.Where(sm => sm.desig_id == desig_id && sm.school_id == session.school_id).FirstOrDefaultAsync();
            if (item == null)
            {
                var session_mapping = new SessionMapping
                {
                    session_id = session.session_id,
                    desig_id = desig_id,
                    school_id = session.school_id,
                    created_date = DateTime.Now,
                    updated_date = DateTime.Now
                };
                _context.Add(session_mapping);
                await _context.SaveChangesAsync();
            }
            else
            {
                item.session_id = session.session_id;
                item.updated_date = DateTime.Now;
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
        #endregion

        #region Delete Session Permanently

        [HttpDelete("deleteSession")]
        public async Task<IActionResult> deleteSession(string school_id, int session_id)
        {
            if (string.IsNullOrEmpty(school_id) || session_id == 0)
            {
                return BadRequest("School id and Session Id are mandatory fields!");
            }

            // Check if session exists
            var session = await _context.sessions
                .Where(ss => ss.school_id == school_id && ss.session_id == session_id)
                .FirstOrDefaultAsync();

            if (session == null)
            {
                return NotFound("Session not found.");
            }

            var mappingdata = await _context.sessionMappings
                .Where(sm => sm.school_id == school_id && sm.session_id == session_id).FirstOrDefaultAsync();

            var student_reg = await _context.student_Regs
                .Where(sr => sr.school_id == school_id && sr.session == session.session_name).FirstOrDefaultAsync();

            var classSubject = await _context.ClassSubjects
                .Where(cs => cs.school_id == school_id && cs.session == session.session_name).FirstOrDefaultAsync();

            if (student_reg == null && classSubject == null)
            {
                if (mappingdata != null)
                {
                    _context.Remove(mappingdata);
                }

                _context.Remove(session);

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Error occurred while deleting session: {ex.Message}");
                }
            }
            else
            {
                return Conflict("Cannot delete session as it is still being used in student registrations or class subjects.");
            }
        }


        #endregion


    }
}

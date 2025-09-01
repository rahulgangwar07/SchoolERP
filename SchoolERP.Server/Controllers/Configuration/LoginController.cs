using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Student_Models;
using SchoolERP.Server.Services;
using System.Threading.Tasks;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly JwtService _jwtService;
        private readonly UserService _userService;

        public LoginController(SchoolERPContext context, JwtService jwtService, UserService userService)
        {
            _context = context;
            _jwtService = jwtService;
            _userService = userService;
        }


        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Data is not found.");
            }

            if (loginRequest.Role != "Faculty" && loginRequest.Role != "Student" && loginRequest.Role != "Admin")
            {
                return BadRequest(new { message = "Invalid role" });
            }

            // Validate user based on selected role
            if (loginRequest.Role == "Faculty")
            {
                var faculty = await _context.TbFacultymasters
                    .Where(u => (u.username == loginRequest.Username || u.email == loginRequest.Username)
                            && u.password == loginRequest.Password
                            && u.status == "active")
                    .FirstOrDefaultAsync();

                if (faculty != null)
                {

                    int desig_id = faculty.designation != null ? faculty.designation.Value : 0;

                    string session = await SessionName(faculty.school_id, desig_id);
                    session = session ?? "2024 - 2025";
                    var token = _jwtService.GenerateJwtToken(session, faculty.school_id);
                    var role = faculty.username.Contains("admin", StringComparison.OrdinalIgnoreCase) ? "Admin" : "Faculty";

                    return Ok(new
                    {
                        message = $"{role} login successful",
                        token,
                        role,
                        user_id = faculty.faculty_id,
                        desig_id = faculty.designation,
                        faculty.school_id,
                        session_name = session,
                        class_id = 0
                    });
                }
            }
            else if (loginRequest.Role == "Student")
            {
                var student = await _context.student_Other_Infos
                    .FirstOrDefaultAsync(u => (u.userid == loginRequest.Username || u.email == loginRequest.Username)
                                            && u.password == loginRequest.Password);

                if (student != null)
                {
                    var stuMaster = await _context.tb_studentmasters
                        .Where(sm => sm.school_id == student.school_id && sm.uid == student.uid).OrderByDescending(sm => sm.stu_id)
                        .FirstOrDefaultAsync();

                    if (stuMaster == null)
                    {
                        return Unauthorized(new { message = "Student is not registered yet." });
                    }

                    string session = await SessionName(student.school_id, 2);
                    session = session ?? "2024 - 2025";
                    var token = _jwtService.GenerateJwtToken(session, student.school_id);

                    return Ok(new
                    {
                        message = "Student login successful",
                        token,
                        role = "Student",
                        user_id = student.uid,
                        student.school_id,
                        session_name = session,
                        stuMaster.class_id
                    });
                }
            }

            return Unauthorized(new { message = "Invalid username or password" });
        }

        [NonAction]
        public async Task<string> SessionName(string school_id, int desig)
        {
            // Fetch the session mapping based on school_id and desig
            var session = await _context.sessionMappings
                .Where(sm => sm.school_id == school_id && sm.desig_id == desig)
                .FirstOrDefaultAsync();

            if (session == null)
            {
                // If no specific session found, fetch the main session for the given school
                var mainsession = await _context.sessions
                    .Where(sm => sm.school_id == school_id && sm.status == true)
                    .FirstOrDefaultAsync();

                if (mainsession == null)
                {
                    // No main session found
                    return "No session found for the given school_id."; // Return a simple string message
                }

                return mainsession.session_name; // Return the session name for the main session
            }

            // Fetch the session based on the session_id found in session mapping
            var fetchedSession = await _context.sessions
                .Where(ss => ss.session_id == session.session_id && ss.school_id == school_id)
                .FirstOrDefaultAsync();

            if (fetchedSession == null)
            {
                // If no session found for the given session_id
                return "No matching session found for the given session_id."; // Return a simple string message
            }

            return fetchedSession.session_name; // Return the session name
        }




        [HttpPost("SuperAdminLogin")]
        public async Task<IActionResult> SuperAdminLogin([FromBody] LoginRequest superAdminLogin)
        {
            if (superAdminLogin == null || string.IsNullOrWhiteSpace(superAdminLogin.Username) || string.IsNullOrWhiteSpace(superAdminLogin.Password))
            {
                return BadRequest(new { message = "Username and password are required" });
            }
            var logindata = await _context.SuperAdminLogin
                                          .FirstOrDefaultAsync(sa => sa.username == superAdminLogin.Username);

            if (logindata != null)
            {
                var session = "2024 - 2025";
                var token = _jwtService.GenerateJwtToken(session, "All");

                return Ok(new { message = "Super Admin login successful", token, role = "SuperAdmin", school_id = "All" });
            }

            return Unauthorized(new { message = "Invalid username or password" });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear session or JWT token if needed, but in most cases for stateless JWT, we do not need to clear session.
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("send-credentials")]
        public async Task<IActionResult> SendUserCredential(string school_id, string UserEmail, string UserId, string UserPassword)
        {
            try
            {
                // Call service method with email and password
                bool success = await _userService.CreateAndSendUserCredentials(UserEmail, UserId, UserPassword);

                if (success)
                {
                    return Ok(new { message = "User credentials sent to email successfully" });
                }
                else
                {
                    return StatusCode(500, new { message = "An error occurred while sending credentials." });
                }
            }
            catch (Exception ex)
            {
                // Log error
                return StatusCode(500, new { message = "An error occurred while processing your request." });
            }
        }


        [HttpPost("sendOTPs")]
        public async Task<IActionResult> LoginsendOTPs([FromBody] PasswordResetRequestsDTOs head)
        {
            try
            {
                if (head.email == null)
                {
                    return BadRequest("Email Id not found! ");
                }
                var facultymaster = await _context.TbFacultymasters.Where(fm => fm.email == head.email && fm.status == "Active").FirstOrDefaultAsync();
                if (facultymaster == null)
                {
                    return BadRequest("Email Id Not exists! ");
                }

                bool success = await _userService.SendOTPCredentials(head.email, head.otp);

                if (success)
                {
                    PasswordResetRequests requests = new PasswordResetRequests
                    {
                        Email = head.email,
                        OTP = head.otp.ToString(),
                        OTPExpiry = head.otpExpiry,
                        RequestDate = head.requestDate,
                        IsOTPVerified = false
                    };

                    _context.Add(requests);
                    await _context.SaveChangesAsync();

                    return Ok(new { requests });
                }
                else
                {
                    return StatusCode(500, new { message = "An error occurred while sending credentials." });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("saveNewPassword")]
        public async Task<IActionResult> saveNewPassword([FromBody] savePasswordDTO save)
        {
            if (string.IsNullOrEmpty(save.email) || string.IsNullOrEmpty(save.password))
            {
                return BadRequest("Email Id and Password not Valid! ");
            }

            var faculty = await _context.TbFacultymasters.Where(tf => tf.email == save.email).FirstOrDefaultAsync();
            if (faculty == null)
            {
                return NotFound();
            }

            var resetRequest = await _context.resetRequests.Where(rr => rr.Email == save.email && rr.OTP == save.otp).FirstOrDefaultAsync();
            if (resetRequest != null)
            {
                resetRequest.IsOTPVerified = true;
            }
            faculty.password = save.password;
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}

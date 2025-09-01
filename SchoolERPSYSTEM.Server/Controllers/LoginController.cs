using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Services;
using SchoolERPSYSTEM.Server.Models;
using System.Threading.Tasks;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly JwtService _jwtService;

        public LoginController(SchoolERPContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // Endpoint to handle user login
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest("Data is not found.");
            }

            // Check if the role is valid
            if (loginRequest.Role != "Faculty" && loginRequest.Role != "Student" && loginRequest.Role != "Admin")
            {
                return BadRequest(new { message = "Invalid role" });
            }

            // Validate user based on selected role
            if (loginRequest.Role == "Faculty")
            {
                var faculty = await _context.TbFacultymasters
                    .FirstOrDefaultAsync(u => u.username == loginRequest.Username && u.Password == loginRequest.Password);

                if (faculty != null)
                {
                    // Generate JWT token for faculty
                    var token = _jwtService.GenerateJwtToken(faculty.username, "Faculty", faculty.school_id);

                    var role = faculty.username == "admin" ? "Admin" : "Faculty";
                    return Ok(new { message = $"{role} login successful", token = token, role = role, user_id = faculty.faculty_id, school_id = faculty.school_id });
                }
            }
            else if (loginRequest.Role == "Student")
            {
                var student = await _context.student_Other_Infos
                    .FirstOrDefaultAsync(u => u.userid == loginRequest.Username && u.password == loginRequest.Password);

                if (student != null)
                {
                    // Generate JWT token for student
                    var token = _jwtService.GenerateJwtToken(student.userid, "Student", student.school_id);
                    return Ok(new { message = "Student login successful", token = token, role = "Student", user_id = student.uid, school_id = student.school_id });
                }
            }

            // If no matching user is found for Faculty or Student
            return Unauthorized(new { message = "Invalid username or password" });
        }

        // Endpoint to handle SuperAdmin login
        [HttpPost("SuperAdminLogin")]
        public async Task<IActionResult> SuperAdminLogin([FromBody] LoginRequest superAdminLogin)
        {
            if (superAdminLogin == null || string.IsNullOrWhiteSpace(superAdminLogin.Username) || string.IsNullOrWhiteSpace(superAdminLogin.Password))
            {
                return BadRequest(new { message = "Username and password are required" });
            }

            // Retrieve SuperAdmin login data from database
            var logindata = await _context.SuperAdminLogin
                                          .FirstOrDefaultAsync(sa => sa.username == superAdminLogin.Username);

            if (logindata != null)
            {

                // Generate JWT token for SuperAdmin
                var token = _jwtService.GenerateJwtToken(superAdminLogin.Username, "SuperAdmin", "All");

                return Ok(new { message = "Super Admin login successful", token = token, role = "SuperAdmin", school_id = "All" });
            }

            // If login fails or no matching user found
            return Unauthorized(new { message = "Invalid username or password" });
        }

        // Endpoint to handle logout (optional for clearing session data)
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear session or JWT token if needed, but in most cases for stateless JWT, we do not need to clear session.
            return Ok(new { message = "Logged out successfully" });
        }
    }
}

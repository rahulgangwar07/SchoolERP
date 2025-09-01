using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Server.Models;
using System.Text;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<ImageController> _logger;
        private readonly IWebHostEnvironment _env;

        public ImageController(ILogger<ImageController> logger,SchoolERPContext context, IWebHostEnvironment env)
        {
            _logger = logger;
            _context = context;
            _env = env;
        }

        [HttpGet("getImage/{token}")]
        public IActionResult GetImageFromToken(string token)
        {
            try
            { 
                var tokenData = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                 
                var parts = tokenData.Split(':');

                if (parts.Length != 3)
                {
                    return BadRequest("Invalid token format.");
                }

                var schoolId = parts[0];
                var fileName = parts[1];
                var folder = parts[2];
                 
                var fileExtension = Path.GetExtension(fileName).ToLower();
                 
                var filePath = Path.Combine(_env.WebRootPath, "api", "uploads", schoolId, folder, fileName);
                 
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound("File not found.");
                }
                 
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                 
                string contentType;

                switch (fileExtension)
                {
                    case ".jpg":
                    case ".jpeg":
                        contentType = "image/jpeg";
                        break;
                    case ".png":
                        contentType = "image/png";
                        break;
                    case ".gif":
                        contentType = "image/gif";
                        break;
                    case ".pdf":
                        contentType = "application/pdf";
                        break;
                    default:
                        contentType = "application/octet-stream";   
                        break;
                }
                 
                return new FileContentResult(fileBytes, contentType);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }



    }
}

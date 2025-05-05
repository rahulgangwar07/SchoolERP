using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models
{
    public class LoginRequest
    {
        [Key]
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}

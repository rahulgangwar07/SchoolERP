using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("PasswordResetRequests")]
    public class PasswordResetRequests
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string OTP { get; set; }
        public DateTime OTPExpiry { get; set; }
        public DateTime RequestDate { get; set; }
        public bool IsOTPVerified { get; set; }
    }

    public class PasswordResetRequestsDTOs
    {
        public string email { get; set; }
        public string otp { get; set; }
        public DateTime otpExpiry { get; set; }
        public DateTime requestDate { get; set; }
    }

    public class savePasswordDTO
    {
        public string email { get; set; }
        public string password { get; set; }
        public string otp { get; set; }
    }
}

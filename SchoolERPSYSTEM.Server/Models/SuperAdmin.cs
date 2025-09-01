using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    public class SuperAdmin
    {

    }

    [Table("superadmin_login")]
    public class SuperAdminLogin
    {
        public int id { get; set; }
        public string username { get; set; }
        [Column("password_hash")]
        public string password { get; set; }
        public string email { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public DateTime last_login_at { get; set; }
        public string status { get; set; }
    }
}

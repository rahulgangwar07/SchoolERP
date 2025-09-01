using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("role_permissions")]
    public class RolesPermission
    {
        [Key]
        public int role_permission_id { get; set; }
        public int desig_id { get; set; }
        public int module_id { get; set; }
        public string submodule_id { get; set; }
        public int permission_id { get; set; }
        public DateTime created_date { get; set; }
        public string school_id { get; set; }
    }

    public class AccessRolesPermission
    {
        [Key]
        public int role_permission_id { get; set; }
        public int desig_id { get; set; }
        public int module_id { get; set; }
        //public string submodule_id { get; set; }
        public int permission_id { get; set; }
        public List<int> submodule_id { get; set; }
        public string school_id { get; set; }
    }
}

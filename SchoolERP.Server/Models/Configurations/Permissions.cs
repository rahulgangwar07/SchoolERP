using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models.Configurations
{
    public class Permissions
    {
        [Key]
        public int permission_id { get; set; }

        public bool p_create { get; set; }
        public bool p_view { get; set; }
        public bool p_edit { get; set; }
        public bool p_delete { get; set; }
    }

    public class permissionsDTOs
    {
        public bool create { get; set; }
        public bool view { get; set; }
        public bool edit { get; set; }
        public bool delete { get; set; }
    }

    public class p_modulesDTOs
    {
        public int module_id { get; set; }
        public string module_name { get; set; }
        public bool assigned { get; set; }
        public permissionsDTOs permissions { get; set; }

    }

    public class designationsDTOs
    {
        public int des_id { get; set; }
        public string des_title { get; set; }
        public List<p_modulesDTOs> modules { get; set; }
    }

    public class chkPermissions
    {
        public bool canCreate { get; set; }
        public bool canView { get; set; }
        public bool canEdit { get; set; }
        public bool canDelete { get; set; }
        public bool triggered { get; set; }
    }
}

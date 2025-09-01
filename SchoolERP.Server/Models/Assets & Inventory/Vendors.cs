using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("Vendors")]
    public class Vendors
    {
        [Key]
        public int vendor_id { get; set; }
        public string vendor_name { get; set; }
        public string contact { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public bool isactive { get; set; }
        public string school_id { get; set; }
    }
}

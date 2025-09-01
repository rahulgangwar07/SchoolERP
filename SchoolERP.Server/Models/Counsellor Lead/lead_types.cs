using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Counsellor_Lead
{
    [Table("lead_types")]
    public class lead_types
    {
        [Key]
        public int lead_type_id { get; set; }
        public string name { get; set; }
        public string category_type { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

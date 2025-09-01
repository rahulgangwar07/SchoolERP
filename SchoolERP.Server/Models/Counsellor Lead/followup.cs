using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Counsellor_Lead
{
    [Table("followups")]
    public class followup
    {
        [Key]
        public int followup_id { get; set; }
        public int lead_id { get; set; }    
        public DateTime followup_date { get; set; } 
        public string followup_action { get; set; }
        public string followup_result { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

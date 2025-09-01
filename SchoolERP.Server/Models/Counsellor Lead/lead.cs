using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Counsellor_Lead
{
    
    [Table("leads")]
        public class leads
        {
            [Key]
            public int lead_id { get; set; }
            public int lead_type_id { get; set; }
            public string name { get; set; }
            public string father_name { get; set; }
            public string mother_name { get; set; }
            public string phone { get; set; }
            public string address { get; set; }
            public DateTime date { get; set; }
            public DateTime next_followup { get; set; } 
            public string comment { get; set; }
            public bool isActive { get; set; }
            public string school_id { get; set; }  
            [ForeignKey("lead_id")]
            public virtual ICollection<followup>? followups { get;set; }
        }
}

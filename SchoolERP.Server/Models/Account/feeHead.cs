using SchoolERP.Server.Models.Counsellor_Lead;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.AccessControl;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models.Account
{

    [Table("fee_head_master")]
    public class feeHead
    {
        [Key]
        public int fee_head_id { get; set; } 
        public string fee_head_name { get; set; }
        public string description { get; set; }
        public bool IsMandatory { get; set; }
        public string school_id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime cDate { get; set; }
        public DateTime mDate { get; set; }  
    }

    public class feeHeadDTOs
    {
        public int fee_head_id { get; set; } 
        public string fee_head_name { get; set; }
        public string description { get; set; }
        public bool IsMandatory { get; set; }
        public string school_id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime cDate { get; set; }
        public DateTime mDate { get; set; } 
    }

     
}

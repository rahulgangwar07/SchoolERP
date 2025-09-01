using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Account
{

    [Table("fee_type_master")]
    public class feeType
    {
        [Key]
        public int fee_type_id { get; set; }
        public string fee_type_name { get; set; }
        public int month { get; set; }
        public string description { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime cDate { get; set; }
        public DateTime mDate { get; set; }
        public string school_id { get; set; }
    }


}

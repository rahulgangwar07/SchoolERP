using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Account
{
    [Table("fee_installment_master")]
    public class feeInstallmentMaster
    {
        [Key]
        public int installment_id { get; set; }
        public int fee_head_mapping_id { get; set; }
        public int fee_head_id { get; set; }
        public int fee_type_id { get; set; }
        public int class_id { get; set; }
        public int instNo { get; set; } 
        public string instMonth { get; set; }
        public DateTime dueDate { get; set; }
        public decimal amount { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime cDate { get; set; } 
        public DateTime mDate { get; set; } 

    }
}

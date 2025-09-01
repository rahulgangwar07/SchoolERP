using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Controllers.Account
{
    [Table("fee_student_ledger")]
    public class FeeStudentLedger
    {
        [Key]
        public int ledger_id { get; set; }
        public int stu_id { get; set; }
        public int fee_head_mapping_id { get; set; }
        public int installment_id { get; set; }
        public int inst_month { get; set; }
        public decimal amount { get; set; } 
        public decimal debit_amount { get; set; } 
        public decimal balance_amount { get; set; } 
        public DateTime payment_date { get; set; } 
        public string payment_status { get; set; }
        public string remarks { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime cDate { get; set; } 
        public DateTime mDate { get; set; }
        public string session { get; set; } 
        public string school_id { get; set; } 
    }
}

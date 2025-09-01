using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("purchase_Transactions")]
    public class purchase_transaction
    {
        [Key]
        public int transaction_id { get; set; }
        public int? vendor_id { get; set; }
        public int item_id { get; set; }
        public string contact { get; set; }
        public DateTime transaction_date { get; set; }
        public decimal amount { get; set; }
        public decimal dues { get; set; }
        public string notes { get; set; }
        public bool isActive { get; set; }
        public string entered_by { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; } 
    }
}

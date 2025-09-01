using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("purchase_entries")]
    public class purchase_entries
    {
        [Key]
        public int purchase_EntryID { get; set; }
        public int item_type { get; set; } 
        public int asset_id { get; set; } 
        public int vendor_id { get; set; }
        public DateOnly purchase_date { get; set; }
        public int quantity { get; set; }
        public decimal unit_price { get; set; }
        public decimal total_amount { get; set; }
        public string weight { get; set; }
        public string location { get; set; }
        public DateOnly? warranty_ExpiryDate { get; set; }
        public string school_id { get; set; }
    }
}

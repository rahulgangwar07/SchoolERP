using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("Inventory_Variants")]
    public class Inventory_Variants
    {
        [Key]
        public int variant_id { get; set; } 
        public int inventory_id { get; set; }
        public string variant_name { get; set; } 
        public int quantity { get; set; }
        public decimal unit_price { get; set; } 
        public DateTime created_date { get; set; } 
        public string school_id { get; set; }  
    }
}

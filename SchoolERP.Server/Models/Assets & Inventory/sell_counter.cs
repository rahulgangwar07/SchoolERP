using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("sell_counter")]
    public class sell_counter
    {
        [Key]
        public int sell_id { get; set; }
        public string item_type { get; set; }
        public int item_id { get; set; }
        public int sub_item_id { get; set; }
        public string sell_uid { get; set; }    
        public string deployment_area_id { get; set; }
        public int? student_id { get; set; }
        public DateOnly? sell_date { get; set; }
        public int quantity { get; set; }
        public decimal unit_price { get; set; }
        public decimal total_amount { get; set; }
        public decimal discount { get; set; }
        public decimal balance { get; set; }
        public string remark { get; set; }
        public string sold_by { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

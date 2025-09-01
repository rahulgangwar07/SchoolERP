using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("Inventory")]
    public class Inventory
    {
        [Key]
        public int inventory_id { get; set; }
        public string item_name { get; set; }
        public string description { get; set; } 
        public string school_id { get; set; }
        [ForeignKey("inventory_id")]
        public virtual ICollection<Inventory_Variants> Inventory_s { get; set; } = new List<Inventory_Variants>();
    }
     

public class InventorySellDto
    {
        [JsonPropertyName("sell_id")]
        public int Sell_Id { get; set; }

        [JsonPropertyName("item_type")]
        public string Item_Type { get; set; }

        [JsonPropertyName("item_id")]
        public int[] Item_Id { get; set; }

        [JsonPropertyName("sub_item_id")]
        public int Sub_Item_Id { get; set; }

        [JsonPropertyName("deployment_area_id")]
        public string Deployment_Area_Id { get; set; }

        [JsonPropertyName("student_id")]
        public int Student_Id { get; set; }

        [JsonPropertyName("sell_date")]
        public string Sell_Date { get; set; }

        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }

        [JsonPropertyName("unit_price")]
        public decimal Unit_Price { get; set; }

        [JsonPropertyName("total_amount")]
        public decimal Total_Amount { get; set; }

        [JsonPropertyName("discount")]
        public decimal Discount { get; set; }

        [JsonPropertyName("balance")]
        public decimal Balance { get; set; }

        [JsonPropertyName("remark")]
        public string Remark { get; set; }

        [JsonPropertyName("sold_by")]
        public string Sold_By { get; set; }

        [JsonPropertyName("school_id")]
        public string School_Id { get; set; }

        [JsonPropertyName("itemDetails")]
        public List<InventorySellItemDto> ItemDetails { get; set; }
    }

    public class InventorySellItemDto
    {
        [JsonPropertyName("inventory_id")]
        public int Inventory_Id { get; set; }

        [JsonPropertyName("variant_id")]
        public int Variant_Id { get; set; }

        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }

        [JsonPropertyName("unit_price")]
        public decimal Unit_Price { get; set; }

        [JsonPropertyName("total_price")]
        public decimal Total_Price { get; set; }
    }



}

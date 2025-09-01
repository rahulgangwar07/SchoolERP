using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Assets___Inventory
{
    [Table("Assets")]
    public class Assets
    {
        [Key]
        public int asset_id { get; set; }
        public string asset_name { get; set; }
        public string description { get; set; }  
        public string asset_status { get; set; } 
        public string school_id { get; set; }
    }
}

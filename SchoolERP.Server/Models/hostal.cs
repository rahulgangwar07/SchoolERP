using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("Hostels")]
    public class hostal
    {
        [Key]
        public int hostal_id { get; set; }
        public string hostal_name { get; set; }
        public string phone { get; set; }
        public string? fee_month { get; set; }
        public decimal? monthly_fee { get; set; }
        public string? address { get; set; }
        public string? room_type { get; set; }
        public string? occupancy_status { get; set; }
        public string? facilities { get; set; }
        public bool? isActive { get; set; }
        public string school_id { get; set; }
    }
}
 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("tb_Designation")]
    public class TbDesignation
    {
        [Key]
        public int designation_id { get; set; }

        [Required, MaxLength(255)]
        public string designation_name { get; set; }

        public string description { get; set; }

        public DateTime created_date { get; set; }
    }
}

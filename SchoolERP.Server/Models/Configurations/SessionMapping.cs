using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("session_mapping")]
    public class SessionMapping
    {
        [Key]
        public int mapping_id { get; set; }
        public int session_id { get; set; }
        public int desig_id { get; set; }
        public string school_id { get; set; }
        public DateTime created_date { get; set; }
        public DateTime updated_date { get; set; }
    }
}

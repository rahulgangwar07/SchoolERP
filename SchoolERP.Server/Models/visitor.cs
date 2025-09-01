using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("visitor_log")]
    public class visitor
    {
        [Key]
        public int visitor_id { get; set; }
        public string visitor_name { get; set; }
        public string visitor_contact { get; set; }
        public string visitor_email { get; set; }
        public string meeting_with { get; set; }
        public string purpose_of_visit { get; set; }
        public DateTime appointment_date { get; set; }
        public DateTime check_in_time { get; set; }
        public DateTime check_out_time { get; set; }
        public string visitor_status { get; set; }
        public string addres { get; set; }
        public string visitor_image { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{

    [Table("holidays")]
    public class holidays
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateOnly start_date { get; set; }
        public DateOnly end_date { get; set; }
        public string event_type { get; set; }
        public string user_type { get; set; }
        public bool isDeleted { get; set; }
        public string school_id { get; set; }
        public string created_by { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
    public class holidaysDTOs
    { 
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateOnly start_date { get; set; }
        public DateOnly end_date { get; set; }
        public string event_type { get; set; }
        public string user_type { get; set; } 
        public string school_id { get; set; }
        public string created_by { get; set; } 
    }
}

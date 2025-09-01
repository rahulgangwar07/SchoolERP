using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("session")]
    public class Session
    {
        [Key]
        public int session_id { get; set; }
        public string session_name { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool status { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}

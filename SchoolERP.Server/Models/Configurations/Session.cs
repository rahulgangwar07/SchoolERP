using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("tbl_session")]
    public class Session
    {
        [Key]
        public int session_id { get; set; }
        public string session_name { get; set; }
        public string start_month { get; set; }
        public string end_month { get; set; }
        public int start_year { get; set; }
        public int end_year { get; set; }
        public bool status { get; set; }
        public DateTime created_date { get; set; }
        public DateTime updated_date { get; set; }
        public string school_id { get; set; }
    }

    [Table("tbl_session_log")]
    public class Session_log
    {
        [Key]
        public int session_id { get; set; }
        public string session_name { get; set; }
        public string start_month { get; set; }
        public string end_month { get; set; }
        public int start_year { get; set; }
        public int end_year { get; set; }
        public bool status { get; set; }
        public DateTime created_date { get; set; }
        public DateTime updated_date { get; set; }
        public string school_id { get; set; }
    }

    public class sessionInsertion_DTOs
    {
        public int session_id { get; set; }
        public string startMonth { get; set; }
        public string endMonth { get; set; }
        public int startYear { get; set; }
        public int endYear { get; set; }
    }
}

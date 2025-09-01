using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    public class Routine
    {

    }

    [Table("periods")]
    public class Period
    {
        [Key]
        public int id { get; set; }
        public int period_number { get; set; }
        public TimeOnly start_time { get; set; }
        public TimeOnly end_time { get; set; }
        public string school_id { get; set; }
    }
    
    [Table("class_schedule")]
    public class Schedule
    {
        [Key]
        public int id { get; set; }
        public int class_id { get; set; }
        public int sec_id { get; set; }
        public string day_name { get; set; }
        public int period_id { get; set; }
        public int faculty_id { get; set; }
        public int subject_id { get; set; }
        public string routine { get; set; }
        public string school_id { get; set; }
        public string session { get; set; }
        public DateTime created_date { get; set; }
        public DateTime updated_date { get; set; }
    }

    public class ScheduleDTOs
    { 
        public int schedule_id { get; set; }
        public int class_id { get; set; }
        public int sec_id { get; set; }
        public string day { get; set; }
        public int priod { get; set; }
        public string routine { get; set; }
        public int subject_id { get; set; }
        public int teacher { get; set; }  
        public string school_id { get; set; } 
        public string session { get; set; } 
    }

    public class PeriodDTOs
    {
        public int id { get; set; }
        public int period_number { get; set; }
        public string start_time { get; set; }
        public string end_time { get; set; }
    }

    public class getScheduleDTOs
    {
        public int schedule_id { get; set; }
        public int period_id { get; set; }
        public string routine { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public string faculty_name { get; set; }
        public int? subject_id { get; set; }
        public string? subject_name { get; set; }
        public int? class_id { get; set; }
        public string? class_name { get; set; }
        public int? sec_id { get; set; }
        public string? sec_name { get; set; }
    }

}

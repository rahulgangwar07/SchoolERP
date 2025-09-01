using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Faculty
{
    [Table("faculty_attendance")]
    public class faculty_attendance
    {
        [Key]
        public int attendanceId { get; set; }
        public int facultyId { get; set; }
        public DateOnly date { get; set; }
        public DateTime created_date { get; set; }
        public TimeSpan inTime { get; set; }
        public TimeSpan outTime { get; set; }
        public bool active { get; set; }
        public string status { get; set; }
        public string school_id { get; set; }
    }

    public class faculty_attendance_DTOs
    {
        [Key]
        public int attendanceId { get; set; }
        public int facultyId { get; set; }
        public string fac_name { get; set; }
        public int designation_id { get; set; }
        public string designation_name { get; set; }
        public string? image { get; set; }
        public DateOnly date { get; set; }
        public DateTime created_date { get; set; }
        public TimeSpan inTime { get; set; }
        public TimeSpan outTime { get; set; }
        public bool active { get; set; }
        public string status { get; set; }
        public string school_id { get; set; }
        //public virtual attendanceList attendanceList {get;set;} 
    }

    public class attendanceListReport
    {
        public int faculty_id { get; set; }
        public string faculty_name { get; set; }
        public int desig_id { get; set; }
        public string desig_name { get; set; }
        public List<faculty_attendance> faculty_ { get; set; }
    }

    public class reportParameter
    {
        public int month { get; set; }
        public int year { get; set; }
        public string school_id { get; set; }
    }
}

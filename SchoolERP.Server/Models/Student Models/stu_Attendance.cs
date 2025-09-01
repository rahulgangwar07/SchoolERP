using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Student_Models
{
    [Table("student_attendance")]
    public class stu_Attendance
    {
        [Key]
        public int attendance_id { get; set; }
        public int stu_id { get; set; }
        public int class_id { get; set; }
        public int sec_id { get; set; }
        public DateOnly att_date { get; set; }
        public string status { get; set; }
        public bool IsExcused { get; set; }
        public TimeSpan inTime { get; set; }
        public TimeSpan outTime { get; set; }
        public string? remark { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public bool isDeleted { get; set; }
        public string school_id { get; set; }
        public string session { get; set; }
        public string? created_by { get; set; }
    }

    public class studentAttendanceDTO
    {
        public string attstatus { get; set; }
        public DateOnly attdate { get; set; }
        public TimeSpan inTime { get; set; }
        public string? caste { get; set; }
        public int class_id { get; set; }
        public int? sec_id { get; set; }
        public string? father_name { get; set; }
        public string first_name { get; set; }
        public string? mother_name { get; set; }
        public string? pen_card { get; set; }
        public string registration_no { get; set; }
        public string? remark { get; set; }
        public string school_id { get; set; } 
        public string session { get; set; }
        public int? state_id { get; set; }
        public int stu_id { get; set; }
        public int uid { get; set; }
        public bool isDeleted { get; set; }
        public string? created_by { get; set; }
    }

    public class studentAttendanceDTOs
    {
        public List<studentAttendanceDTO> dTOs { get; set; }
    }

    public class paramentes
    {
        public string school_id { get; set; }
        public DateOnly date { get; set; }
        public int class_id { get; set; }
    }

    public class attendanceReport
    {
        public string[] name { get; set; }
        public List<attday> attdays { get; set; }
    }

    public class attday
    {
        public DateOnly date { get; set; }
        public string[] status { get; set; }
    }

}

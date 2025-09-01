using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Online_Exam
{
    [Table("Student_Exams")]
    public class Student_Exams
    {
        [Key]
        public int student_exam_id { get; set; }
        public int stu_id { get; set; }
        public int exam_id { get; set; }
        public DateTime? exam_date { get; set; }
        public DateOnly? result_date { get; set; }
        public string status { get; set; } 
        public string school_id { get; set; }
        public DateTime create_date { get; set; }
    }

}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Online_Exam
{
    [Table("Student_Answers")]
    public class Student_Answers
    {
        [Key]
        public int answer_id { get; set; }
        public int student_exam_id { get; set; }
        public int question_id { get; set; }
        public int selected_option { get; set; }
        public string answer_text { get; set; }
        public int marks_awarded { get; set; }
        public string school_id { get; set; }
    }

    public class StudentResult
    {
        public bool answer_sheet { get; set; } = false;
        public int question_count { get; set; }
        public int attempted { get; set; }
        public int correct { get; set; }
        public int wrong { get; set; }
        public float string_rate { get; set; }
        public DateTime attempt_date { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Online_Exam
{
    [Table("Questions")]
    public class Questions
    {
        [Key]
        public int question_id { get; set; }
        public int exam_id { get; set; }
        public string question_text { get; set; }
        public string question_type { get; set; }
        //public int duration { get; set; }
        public int marks { get; set; }
        public string? option_1 { get; set; }
        public string? option_2 { get; set; }
        public string? option_3 { get; set; }
        public string? option_4 { get; set; }
        public string? option_5 { get; set; }
        public int? correct_option { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

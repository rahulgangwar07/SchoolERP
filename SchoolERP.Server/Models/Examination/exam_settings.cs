using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Examination
{
    public class exam_settings
    {
    }

    [Table("tbl_marks_entry")]
    public class marks_entry
    {
        [Key]
        public int marks_entry_id { get; set; }
        public int student_id { get; set; }
        public int set_id { get; set; }
        public int exam_id { get; set; }
        public int term_id { get; set; }
        public int class_id { get; set; }
        public int sec_id { get; set; }
        public int subject_id { get; set; }
        public decimal? obtained_marks { get; set; }
        public bool is_absent { get; set; } = false;
        public DateTime marks_entry_date { get; set; } = DateTime.Now;
        public int? graded_by { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

}

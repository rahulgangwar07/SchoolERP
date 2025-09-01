using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Online_Exam
{
    [Table("Exams")]
    public class Exams
    {
        [Key]
        public int exam_id { get; set; }
        public string type { get; set; }
        public string exam_name { get; set; }
        public int? class_id { get; set; }
        public int? sec_id { get; set; }
        public int subject_id { get; set; }
        public string exam_title { get; set; }
        public int faculty_id { get; set; }
        public DateTime exam_start_date { get; set; }
        public DateTime exam_end_date { get; set; }
        public string duration_type { get; set; }
        public TimeSpan? start_time { get; set; }
        public TimeSpan? end_time { get; set; }
        public int duration { get; set; }
        public string instruction_to_condidate { get; set; }
        public string description { get; set; }
        public bool result_restriction { get; set; }
        public bool exam_restriction { get; set; }
        public DateTime? result_date { get; set; }
        public DateTime? lock_date { get; set; }
        public bool ans_sheet_status { get; set; }
        public int total_marks { get; set; }
        public string status { get; set; }
        public bool isActive { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
        public DateTime created_date { get; set; }
    }

    public class ExamsDTOs
    { 
        public int exam_id { get; set; }
        public string type { get; set; }
        public string exam_name { get; set; }
        public int? class_id { get; set; }
        public int? sec_id { get; set; }
        public int subject_id { get; set; }
        public string exam_title { get; set; }
        public int faculty_id { get; set; }
        public DateTime exam_start_date { get; set; }
        public DateTime exam_end_date { get; set; }
        public string duration_type { get; set; }
        public string? start_time { get; set; }
        public string? end_time { get; set; }
        public int duration { get; set; }
        public string instruction_to_condidate { get; set; }
        public string description { get; set; } 
        public DateTime? result_date { get; set; }
        public DateTime? lock_date { get; set; }
        public int total_marks { get; set; } 
        public bool isActive { get; set; } = false;
    }

    public class ExamPermissionDTOs
    {
        public int exam_id { get; set; }
        public bool result_restriction { get; set; }
        public bool exam_restriction { get; set; }
        public string? result_date { get; set; }
        public string? lock_date { get; set; }
        public bool ans_sheet_status { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

}

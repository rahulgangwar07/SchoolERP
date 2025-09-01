using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Academics
{

    [Table("workAssignment")]
    public class workAssignment
    {
        [Key]
        public int assignment_id { get; set; }
        public DateTime date { get; set; }
        public int class_id { get; set; } 
        public int? sec_id { get; set; } 
        public DateTime due_date { get; set; }
        public string priority { get; set; }
        public bool status { get; set; }
        public string type { get; set; }
        public string remarks { get; set; }
        public string feedback { get; set; }
        public string? videoLink { get; set; }
        public string created_by { get; set; }
        public string school_id { get; set; }
        [NotMapped]
        public List<assignmentSubjects> Subjects { get; set; }
    }

    [Table("assignmentSubjects")]
    public class assignmentSubjects
    {
        [Key]
        public int id { get; set; }
        public int assignment_id { get; set; }
        public int subject_id { get; set; }
        public string description { get; set; }
        public bool isDeleted { get; set; }
    }

    [Table("assignmentAttachments")]
    public class assignmentAttachments
    {
        [Key]
        public int id { get; set; }
        public int assignment_id { get; set; }
        public string attachment { get; set; }
        public bool isDeleted { get; set; }
    }

    public class assignmentDTOs
    {
        public int assignment_id { get; set; }
        public int class_id { get; set; }
        public int? sec_id { get; set; }
        public DateTime date { get; set; }
        public string type { get; set; }
        public bool? status { get; set; }
        public string? created_by { get; set; }
        public subjects[] subjects { get; set; } 
        public string? videoLink { get; set; }
        public IFormFile[]? file { get; set; }
    }

    public class subjects
    {
        public int subject_id { get; set; }
        public string subject_name { get; set; }
        public string? description { get; set; }
    }

    public class fetchAssignmentDTOs
    {
        public int assignment_id { get; set; }
        public DateTime date { get; set; }
        public int class_id { get; set; }
        public string class_name { get; set; }
        public int? sec_id { get; set; }
        public DateTime due_date { get; set; }
        public string priority { get; set; }
        public bool status { get; set; }
        public string type { get; set; }
        public string remarks { get; set; }
        public string feedback { get; set; }
        public string? videoLink { get; set; }
        public string created_by { get; set; }
        public string school_id { get; set; }
        public List<assignmentAttachments> assignments { get; set; }
        public List<assignmentSubjectsDTOs> subjects { get; set; }
    } 
    public class assignmentSubjectsDTOs
    {
        [Key]
        public int id { get; set; }
        public int assignment_id { get; set; }
        public int subject_id { get; set; }
        public string? subject_name { get; set; }
        public string description { get; set; }
        public bool isDeleted { get; set; } 
    }

    [Table("assignmentReplies")]
    public class assignmentReport
    {
        [Key]
        public int reply_id { get; set; }
        public int assignment_id { get; set; }
        public int stu_id { get; set; }  
        public string stu_reply { get; set; }
        public string stu_permission { get; set; }
        public int faculty_id { get; set; }
        public string faculty_reply { get; set; }
        public DateTime created_at { get; set; }
        public string school_id { get; set; }
        public string session { get; set; }
    }

    public class assignmentReportDtos
    {
        public int reply_id { get; set; }
        public int? assignment_id { get; set; }
        public int stu_id { get; set; }
        public string registration_no { get; set; }
        public string stu_name { get; set; }
        public int class_id { get; set; }
        public int sec_id { get; set; }
        public int? faculty_id { get; set; }
        public string father_name { get; set; }
        public string school_id { get; set; }
        public string? stu_reply { get; set; } 
        public string? stu_permission { get; set; }  
        public string? faculty_reply { get; set; } 
        public DateTime? created_at { get; set; } 
    }

    public class submitReply
    {
        public int? reply_id { get; set; }
        public int assignment_id { get; set; }
        public int uid { get; set; }
        public string stu_reply { get; set; }
        public string stu_permission { get; set; }
        public int faculty_id { get; set; }
        public string faculty_reply { get; set; }
    }

}

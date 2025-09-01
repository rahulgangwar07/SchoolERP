using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Subjects
{
    [Table("student_optional_subject")]
    public class student_optional_subject
    {
        [Key]
        public int id { get; set; }
        public int stu_id { get; set; }
        public int subject_id { get; set; }
        public bool isActive { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    //public class optional_subject_DTOsHeader
    //{
    //    public string roll_no { get; set; }
    //    public string stu_name { get; set; }
    //    public string[] optSubjects { get; set; }
    //}

    //public class optional_subject_DTOs
    //{
    //    public int roll_no { get; set; }
    //    public string stu_name { get; set; }
    //    public string father_name { get; set; }
    //    public List<optional_classSubjectDtos> subjectDtos { get; set; }
        
    //}

    //public class optional_classSubjectDtos
    //{
    //    public int subject_id { get; set; }
    //    public string subject_name { get; set; }  
    //    public bool check { get; set; }
    //}



}

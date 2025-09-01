using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Subjects
{
    [Table("ClassSubjects")]
    public class ClassSubjects
    {
        public int class_id { get; set; }
        public int subject_id { get; set; } 
        public bool isActive { get; set; } 
        public string session { get; set; }
        public string school_id { get; set; } 
    }

    public class classSubjectDTOs
    {
        public int sub_id { get; set; }
        public string subject_name { get; set; }
        public bool check { get; set; } 
    }

    
}

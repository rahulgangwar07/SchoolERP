using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Subjects
{ 
    public class Subject
    {
        [Key]
        public int subject_id { get; set; }
        public string subject_name { get; set; }
        public string subjectCode { get; set; }
        public bool IsActive { get; set; }
        public bool optional { get; set; }
        public int priority { get; set; }
        public DateTime created_date { get; set; }
        public string school_id { get; set; }
    }

    public class SubjectInsert_Dtos
    {
        public int? subject_id { get; set; }
        public string subject_name { get; set; }
        public string subjectCode { get; set; }
        public int priority { get; set; }
        public bool optional { get; set; }
    }

  
}

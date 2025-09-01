using SchoolERP.Server.Models.Subjects;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("class_name")]
    public class ClassName
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int class_id { get; set; }
        public string class_name { get; set; }
        public string dis_name { get; set; }
        public bool status { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
        public DateTime updated_at { get; set; } = DateTime.Now;
        public string school_id { get; set; } 
    }

    public class ClassDTOs
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int class_id { get; set; }
        public string class_name { get; set; }
        public string dis_name { get; set; }
        public List<classSubjectDTOs> subject { get; set; }
        public List<classSubjectDTOs> opt_subject { get; set; }
        public bool status { get; set; }
        public DateTime? created_at { get; set; } = DateTime.Now;
        public DateTime? updated_at { get; set; } = DateTime.Now;
        public string session { get; set; }
        public string school_id { get; set; }
        public int secCount { get; set; }
        public int stuCount { get; set; }
        public int subjCount { get; set; }
    }


    public class ClassDTOsforSubject
    { 
        public List<ClassName> classes { get; set; }
        public List<classSubjectDTOs> subjects { get; set; }
        public List<classSubjectDTOs> optsubjects { get; set; }
    }
     

   


}

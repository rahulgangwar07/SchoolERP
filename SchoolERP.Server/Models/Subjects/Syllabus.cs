using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Subjects
{
    [Table("chapters")]
    public class chapters
    {
        [Key]
        public int chapter_id { get; set; }
        public int class_id { get; set; }
        public int subject_id { get; set; }
        public string chapter_name { get; set; }
        public bool isDeleted { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }

    public class chapterRequest1
    {
        public int class_id { get; set; }
        public int subject_id { get; set; }
        public string chapter_name { get; set; }
    }

    [Table("syllabus")] 
    public class Syllabus
    {
        [Key]
        public int syllabus_id { get; set; } 
        public int chapter_id { get; set; } 
        public int class_id { get; set; } 
        public string topic_name { get; set; }
        public string document { get; set; }
        public string document_type { get; set; }
        public bool isDeleted { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }

    public class syllabusRequest1
    {
        public int chapter_id { get; set; } 
        public int class_id { get; set; } 
        public string topic_name { get; set; }
        public IFormFile document { get; set; } 
    }
}

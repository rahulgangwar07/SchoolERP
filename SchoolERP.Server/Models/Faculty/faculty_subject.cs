using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Faculty
{
    [Table("faculty_subjects")]
    public class faculty_subject
    {
        [Key]
        public int id { get; set; }
        public int faculty_id { get; set; }
        public int subject_id { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }

    public class faculty_subjectDTOs
    {
        public int teacherId { get; set; }
        public int[] subjectIds { get; set; }
    }
}

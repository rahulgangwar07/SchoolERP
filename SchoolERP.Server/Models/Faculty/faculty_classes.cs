using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Faculty
{
    [Table("faculty_classes")]
    public class faculty_classes
    {
        [Key]
        public int id { get; set; }
        public int faculty_id { get; set; }
        public int class_id { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }

    public class faculty_classDTOs
    {
        public int teacherId { get; set; }
        public int[] classIds { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Notice
{
    [Table("important_Programs")]
    public class important_Programs
    {
        [Key]
        public int program_id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string program_For { get; set; }
        public string? filePath { get; set; }
        public DateTime created_On { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

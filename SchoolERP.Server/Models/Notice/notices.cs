using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace SchoolERP.Server.Models.Notice
{
    [Table("Notices")]
    public class notices
    {
        [Key]
        public int notice_id { get; set; }
        public string subject { get; set; }
        public string notice { get; set; }
        public string notice_for { get; set; }
        public string notice_type { get; set; }
        public string? class_ids { get; set; }
        public int? sec_id { get; set; }
        public string? video_link { get; set; }
        public string? file_path { get; set; }
        public DateTime created_At { get; set; }
        public string created_By { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
}

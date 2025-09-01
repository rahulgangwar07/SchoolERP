using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Certificate
{
    [Table("certificate_templates")]
    public class certificate_templates
    {
        [Key]
        public int template_id { get; set; }
        public string title { get; set; }
        public string template_body { get; set; }
        public string? header { get; set; }
        public string? footer { get; set; }
        public string macros_used { get; set; } 
        public string background_image { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }

    public class certificate_Dtos
    {
        public int template_id { get; set; }
        public IFormFile? header { get; set; }
        public IFormFile? footer { get; set; } 
        public string title { get; set; }
        public string templateBody { get; set; }
    }

    [Table("issued_certificates")]
    public class issued_certificates
    {
        [Key]
        public int issue_id { get; set; }
        public int stu_id { get; set; }
        public int template_id { get; set; }
        public DateTime issue_date { get; set; }
        public int issued_by { get; set; }
        public string issued_role { get; set; }
        public string reason { get; set; }
        public string remarks { get; set; }
        public string generated_file_path { get; set; }
        public string school_id { get; set; }
        public string session { get; set; } 
        public bool is_active { get; set; } 
    }
}

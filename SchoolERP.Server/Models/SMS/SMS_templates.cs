using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace SchoolERP.Server.Models.SMS
{
    [Table("SMS_templates")]
    public class SMS_templates
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string template_id { get; set; }
        public string template_Name { get; set; }
        public int template_type_id { get; set; }
        public string template_Content { get; set; }
        public bool isDLTApproved { get; set; }
        public DateTime DLT_submissionDate { get; set; }
        public string approval_Status { get; set; }
        public string remarks { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
        public DateTime created_At { get; set; }
        public DateTime updated_At { get; set; }
        public string created_by { get; set; }
        public string updated_by { get; set; }
    }

    public class SMS_templates_DTOs
    { 
        public int id { get; set; }
        public string template_id { get; set; }
        public string template_Name { get; set; }
        public int template_type_id { get; set; }
        public string template_Content { get; set; }
        public bool isDLTApproved { get; set; } 
    }

    public class SMS_template_versions
    {
        [Key]
        public int version_id { get; set; }
        public string template_id { get; set; }
        public string version_number { get; set; }
        public string template_Content { get; set; }
        public DateTime updated_at { get; set; }
        public string updated_by { get; set; }
    }
}

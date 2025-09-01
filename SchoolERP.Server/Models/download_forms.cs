using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{

    [Table("download_forms")]
    public class download_forms
    {
        [Key]
        public int form_id { get; set; }
        public string form_name { get; set; }
        public string form_url { get; set; }
        public string form_type { get; set; }
        public bool isActive { get; set; }
        public DateTime created_at { get; set; }
        public string school_id { get; set; }
    }
    public class download_forms_DTOs
    { 
        public int form_id { get; set; }
        public string form_name { get; set; }
        public IFormFile? form_url { get; set; }
        public string form_type { get; set; } 
    }
}

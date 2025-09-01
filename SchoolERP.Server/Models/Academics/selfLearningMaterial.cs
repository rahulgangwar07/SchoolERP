using DocumentFormat.OpenXml.Drawing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Academics
{

    [Table("self_learning_material")]
    public class selfLearningMaterial
    {
        [Key]
        public int material_id { get; set; }
        public int class_id { get; set; }
        public int subject_id { get; set; }
        public string content_type { get; set; }
        public string content_title { get; set; }
        public string content_url { get; set; }
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }

    }

    public class selfLearningMaterial_DTOs
    {
        public int material_id { get; set; }
        public int class_id { get; set; }
        public int subject_id { get; set; }
        public IFormFile file { get; set; }
        public string content_type { get; set; }
        public string content_title { get; set; }
        public string content_url { get; set; }
        public string school_id { get; set; }
    }

}

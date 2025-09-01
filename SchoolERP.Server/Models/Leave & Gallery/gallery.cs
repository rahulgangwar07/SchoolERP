using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Leave___Gallery
{

    public class gallery
    {
    }

    [Table("gallery_category")]
    public class galleryCategory
    {
        [Key]
        public int category_id { get; set; }
        public string category_name { get; set; }
        public bool isActive { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public string school_id { get; set; } 

        [ForeignKey("category_id")]
        public List<imageGallery>? imageGalleries { get; set; }
    }

    [Table("Image_gallery")]
    public class imageGallery
    {
        [Key]
        public int img_id { get; set; }
        public string img_url { get; set; }
        public int category_id { get; set; }
        public string? title { get; set; }
        public string? description { get; set; }
        public bool isActive { get; set; } 
        public DateTime uploaded_at { get; set; }
        public string school_id { get; set; }
    }

    public class imageGalleryDTOs
    {
        [Key]
        public int img_id { get; set; }
        public string img_url { get; set; }
        public int category_id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public bool isActive { get; set; } 
        public DateTime uploaded_at { get; set; }
        public string school_id { get; set; }
        public IFormFile image { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    public class global_settings
    {
    }

    [Table("global_header_settings")]
    public class globalheaderSettings
    {
        [Key]
        public int setting_id { get; set; }
        public string school_id { get; set; }
        public string global_header { get; set; }
        public string header_image { get; set; }
        public string header_bgcolor { get; set; }
        public string header_text_color { get; set; } 
        public string logo_url { get; set; } 
        public string font_family { get; set; } 
        public bool is_active { get; set; } 
        public DateTime last_updated { get; set; } 
        public string created_by { get; set; } 
    }
    public class globalheader_Settings_DTOs
    { 
        public int setting_id { get; set; } 
        public string school_id { get; set; }
        public string global_header { get; set; }
        public IFormFile? header_image { get; set; }
        public string header_bgcolor { get; set; }
        public string header_text_color { get; set; } 
        public IFormFile? logo_url { get; set; } 
        public bool image_change { get; set; }
        public string font_family { get; set; }  
        public string created_by { get; set; } 
    }

    [Table("signature_settings")]
    public class signatureSettings
    {
        [Key]
        public int setting_id { get; set; }
        public string school_id { get; set; }
        public string? examination_controller_signature { get; set; }
        public string? center_controller_signature { get; set; }
        public string? director_signature { get; set; }
        public string? icard_signature { get; set; } 
        public DateTime last_updated_date { get; set; }
    }

    public class signatureSettingsDTOs
    {
        public int setting_id { get; set; }
        public string school_id { get; set; }
        public IFormFile examination_controller_signature { get; set; }
        public IFormFile center_controller_signature { get; set; }
        public IFormFile director_signature { get; set; }
        public IFormFile icard_signature { get; set; } 
        public DateTime last_updated_date { get; set; }
    }


    [Table("support_contact_settings")]
    public class supportContactSettings
    {
        [Key]
        public int setting_id { get; set; }
        public string school_id { get; set; } 
        public string support_email { get; set; } 
        public string support_phone { get; set; } 
        public string grievance_cell { get; set; } 
        public string accountdepartment { get; set; } 
        public string examcell { get; set; } 
        public string admissioncell { get; set; } 
        public string support_address { get; set; } 
    }


    [Table("applicationTheme_settings")]
    public class applicationThemeSettings
    {
        [Key]
        public int setting_id { get; set; }
        public string school_id { get; set; } 
        public string appTheme_website_url { get; set; } 
        public string youtube_url { get; set; } 
        public string primary_color { get; set; } 
        public string secondary_color { get; set; } 
        public string button_color { get; set; } 
        public string sidebar_bgcolor { get; set; } 
        public string sidebar_color { get; set; } 
        public string favicon_url { get; set; } 
        public bool is_active { get; set; } 
        public DateTime created_at { get; set; } 
        public DateTime updated_at { get; set; } 
        public string created_by { get; set; } 
        public string updated_by { get; set; } 
    }

    public class applicationThemeSettingsDTOs
    {
        [Key]
        public int setting_id { get; set; } 
        public string school_id { get; set; } 
        public string appTheme_website_url { get; set; } 
        public string youtube_url { get; set; } 
        public string primary_color { get; set; } 
        public string secondary_color { get; set; } 
        public string button_color { get; set; } 
        public string sidebar_bgcolor { get; set; } 
        public string sidebar_color { get; set; } 
        public string favicon_url { get; set; }  
    }


}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.SMS
{
    [Table("template_Macros")]
    public class Macro
    {
        [Key]
        public int marco_id { get; set; } 
        public string macro_name { get; set; }
        public string description { get; set; }

        public DateTime created_At { get; set; }
        public DateTime updated_At { get; set; }

        // Navigation Property
        public ICollection<templateMacroUsage> TemplateMacroUsages { get; set; }
    }

    [Table("template_Types")]
    public class templateType
    {
        [Key]
        public int typeid { get; set; }

        public string typename { get; set; }
        public bool isActive { get; set; }
        public string description { get; set; }

        // Navigation Property
        public ICollection<templateMacroUsage> TemplateMacroUsages { get; set; }
    }

    [Table("template_macro_usage")]
    public class templateMacroUsage
    {
        [Key]
        public int id { get; set; }

        [ForeignKey("Macro")]
        public int macro_id { get; set; }

        [ForeignKey("TemplateType")]
        public int template_type_id { get; set; }

        // Navigation properties
        public Macro Macro { get; set; }
        public templateType TemplateType { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("module")]
    public class Module
    {
        [Key]
        public int module_id { get; set; }

        [Required, MaxLength(80)]
        public string module_name { get; set; }

        public string route { get; set; }

        public string description { get; set; }
        public string icon { get; set; }

        public ICollection<SubModule> SubModules { get; set; }
    }
    public class ModuleDTO
    {

        public int module_id { get; set; }

        public string module_name { get; set; }

        public string route { get; set; }

        public string description { get; set; }

        public string icon { get; set; }

        public ICollection<SubModuleDTO> SubModules { get; set; }

    }

}

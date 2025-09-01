using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("sub_modules")]
    public class SubModule
    {
        [Key]
        public int submodule_id { get; set; }
        [ForeignKey(nameof(module))]
        public int module_id { get; set; }
        public string submodule_name { get; set; }
        public string submodule_route { get; set; }
        public string description { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public string icon { get; set; }
        public bool status { get; set; }
        public int parentsubmodule_id { get; set; }

        [JsonIgnore]
        public Module module { get; set; }

    }

    public class SubModuleDTO
    {

        public int submodule_id { get; set; }
        public int module_id { get; set; }
        public string submodule_name { get; set; }
        public string submodule_route { get; set; }
        public string description { get; set; }
        public string created_by { get; set; }
        public DateTime created_date { get; set; }
        public string icon { get; set; }
        public int parentsubmodule_id { get; set; }
        public List<SubModule> ChildSubModules { get; set; } = new List<SubModule>();
    }


    public class SubModuleWithChildrenDTO
    {
        public int submodule_id { get; set; }
        public string submodule_name { get; set; }
        public string submodule_route { get; set; }
        public string description { get; set; }
        public string icon { get; set; }

        // Child submodules related to this submodule
        public List<SubModuleWithChildrenDTO> ChildSubModules { get; set; } = new List<SubModuleWithChildrenDTO>();
    }

    // DTO for Module to include its submodules
    public class ModuleWithSubModulesDTO
    {
        public int module_id { get; set; }
        public string module_name { get; set; }
        public string route { get; set; }
        public string description { get; set; }
        public string icon { get; set; }

        // Submodules related to this module
        public List<SubModuleWithChildrenDTO> SubModules { get; set; } = new List<SubModuleWithChildrenDTO>();
    }

    public class AddSubModuleDto
    {
        public int desig_id { get; set; }
        public string school_id { get; set; }
        public int[] subIds { get; set; }
    }

}

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SchoolERP.Server.Models.Faculty;

namespace SchoolERP.Server.Models.Configurations
{
    [Table("desig_mapping")]
    public class DesigMapping
    {
        [Key]
        public int mapping_id { get; set; }

        public int designation_id { get; set; }
        public int? faculty_id { get; set; }

        public DateTime? assigned_at { get; set; }
        public DateTime? updated_at { get; set; }
        public string school_id { get; set; }

        [ForeignKey(nameof(designation_id))]
        public virtual TbDesignation Designation { get; set; }

        [ForeignKey(nameof(faculty_id))]
        public virtual TbFacultymaster Faculty { get; set; }
    }
}

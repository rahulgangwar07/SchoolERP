using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("tb_studentmaster")]
    public class tb_studentmaster
    {
        //public int StuId { get; set; }

        public int stu_id { get; set; }

        [Required]
        public int uid { get; set; }

       

        public int? class_id { get; set; }

        public int? sec_id { get; set; }

        public string registration_no { get; set; }

        public int? house_id { get; set; }

        public string? status { get; set; }

        public bool? isNew { get; set; }

        public bool? isActive { get; set; }



        [StringLength(60)]
        public string session { get; set; }

        [Required]
        [StringLength(50)]
        public string school_id { get; set; }

    }
     
    public class tb_studentmaster_update
    {
        //public int StuId { get; set; }

        [Key]
        public int id { get; set; }

        public int stu_id { get; set; }

        [Required]
        public int uid { get; set; } 

        public int? class_id { get; set; }

        public string registration_no { get; set; }

        public int? sec_id { get; set; }

        public int? house_id { get; set; }

        public string? status { get; set; }

        public bool? isNew { get; set; }

        public bool? isActive { get; set; }



        [StringLength(60)]
        public string session { get; set; }

        [Required]
        [StringLength(50)]
        public string school_id { get; set; }

    }
}

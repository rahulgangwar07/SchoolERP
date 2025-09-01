
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("student_reg")]
    public class Student_reg
    {
        [Key]
        public int id { get; set; }
        public int uid { get; set; }
        [ForeignKey("uid")]
        public virtual Student_Other_info Student_Other_info { get; set; }  // Navigation property

        public string? reg_no { get; set; }
        public DateTime? adm_date { get; set; }
        public string status { get; set; }
        public int class_id { get; set; }
        public DateTime created_date { get; set; }
        public DateTime updated_date { get; set; }
        public int registration_amt { get; set; }
        public string? mode { get; set; }
        public string school_id { get; set; }
        public string session { get; set; }

    }
    //[Table("student_reg")]
    //public class Student_reg2
    //{
    //    [Key]
    //    public int id { get; set; }
    //    public int uid { get; set; }
    //    [ForeignKey("uid")]
    //    public virtual Student_Other_info Student_Other_info { get; set; }  // Navigation property

    //    public string? reg_no { get; set; }
    //    public DateTime? adm_date { get; set; }
    //    public string status { get; set; }
    //    public int class_id { get; set; }
    //    public DateTime created_date { get; set; }
    //    public DateTime updated_date { get; set; }
    //    public int registration_amt { get; set; }
    //    public string? mode { get; set; }
    //    public string school_id { get; set; }
    //    public string? session { get; set; }

    //}
} 

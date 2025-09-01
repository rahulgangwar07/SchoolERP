using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("tb_class")]
    public class TbClass
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int sec_id { get; set; }
        public int class_id { get; set; }
        public string sec_name { get; set; }
        public string sec_dis_name { get; set; }
        public bool status { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
        public DateTime updated_at { get; set; } = DateTime.Now;
        public string school_id { get; set; }
        public string session { get; set; }
    }


    public class TbClassDTO
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public int sec_id { get; set; }
        public int class_id { get; set; }
        public string sec_name { get; set; }
        public string sec_dis_name { get; set; }
        public bool status { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
        public DateTime updated_at { get; set; } = DateTime.Now;
        public string school_id { get; set; }
        public string session { get; set; }
    }

 
}

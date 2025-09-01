using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models.Student_Models
{
    public class Sibling
    {
        [Key]
        public int uid { get; set; }
        public string father_name { get; set; }
        public string mother_name { get; set; }
        public string phone { get; set; }
        public virtual List<studentDTO> students { get; set; }
    }

    public class studentDTO {
        public string stu_name { get; set; }
        public string reg_no { get; set; }
        public string fees { get; set; }
    }

}

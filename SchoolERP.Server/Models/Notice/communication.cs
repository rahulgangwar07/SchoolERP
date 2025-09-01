using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Notice
{
    [Table("communication")]
    public class communication
    {
        [Key]
        public int communication_id { get; set; }
        public string subject { get; set; }
        public int created_by { get; set; }
        public string created_role { get; set; }
        public int class_id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public DateTime asked_at { get; set; }
        public int asked_to { get; set; }
        public string answered_by { get; set; }
        public string answered_role { get; set; }
        public DateTime answered_at { get; set; }
        public bool isOpen { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
        public string session { get; set; }
    }

    public class communicationDTOs
    {
        [Key]
        public int communication_id { get; set; }
        public string subject { get; set; }
        public int created_by { get; set; }
        public string created_by_name { get; set; }
        public string created_role { get; set; }
        public int class_id { get; set; }
        public string class_name { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public DateTime asked_at { get; set; }
        public int asked_to { get; set; }
        public string asked_to_name { get; set; }
        public string answered_by { get; set; }
        public string answered_by_name { get; set; }
        public string answered_role { get; set; }
        public DateTime answered_at { get; set; }
        public bool isOpen { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }
     
}

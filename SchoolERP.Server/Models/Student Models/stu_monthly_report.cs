using System.Text.Json.Serialization;
using System.Text.Json;

namespace SchoolERP.Server.Models.Student_Models
{
    public class stu_monthly_report
    {
        public int stu_id { get; set; }
        public string registration_no { get; set; }
        public string name { get; set; }
        public string father_name { get; set; }
        public int class_id { get; set; } 
        //public string? att_date { get; set; }
        public int present_count { get; set; }
        public int absent_count { get; set; }
        public int leave_count { get; set; }
        public double ratio { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
    }
     
}

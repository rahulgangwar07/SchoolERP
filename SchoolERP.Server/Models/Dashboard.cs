namespace SchoolERP.Server.Models
{
    public class Dashboard
    {

    }

    public class schoolDetail {

        public string schoolId { get; set; }
        public string schoolname { get; set; }
        public int totalStudent { get; set; }
        public int totalTeacher { get; set; } 
    }

    public class schoolHeader
    {

        //public string schoolId { get; set; }
        public int totalSchool { get; set; }
        public int totalTeacher { get; set; }
        public int totalStudent { get; set; }
    }

}

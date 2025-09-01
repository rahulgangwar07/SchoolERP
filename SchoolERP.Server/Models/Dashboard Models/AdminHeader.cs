namespace SchoolERP.Server.Models.Dashboard_Models
{

    public class AdminHeader
    {
        public avaiablity faculties { get; set; }
        public avaiablity students { get; set; }
        public course_avaiablity courses { get; set; }
        public smsreport_avaiablity smsreport { get; set; }
    }
    //student and teacher streigth
    public class avaiablity
    {
        public string name { get; set; }
        public int total { get; set; }
        public int present { get; set; }
        public int absent { get; set; }
        public int leave { get; set; } 
        public int inActive { get; set; }
    }

    public class course_avaiablity
    {
        public string name { get; set; }
        public int total { get; set; }
        public int online { get; set; }
        public int offline { get; set; }
        public int upcoming { get; set; }
    }
    public class smsreport_avaiablity
    {
        public string name { get; set; }
        public int total { get; set; }
        public int sent { get; set; }
        public int failed { get; set; }
        public int pending { get; set; }
    }
    

}

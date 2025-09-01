namespace SchoolERP.Server.Models.Student_Models
{
    public class statistics
    {

    }

    public class reportData
    {
        public string className { get; set; }
        public categories categories { get; set; }
        public string totalStudents { get; set; }
    }

    public class categories
    {
        public datawithgender[] data { get; set; }
    }

    public class datawithgender
    {
        public string catName { get; set; }
        public stuData data { get; set; }
    }

    public class stuData
    {
        public string[] name { get; set; }
        public int[] quantity { get; set; }
    }

}

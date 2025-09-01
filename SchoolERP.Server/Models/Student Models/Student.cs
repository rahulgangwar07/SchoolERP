namespace SchoolERP.Server.Models.Student_Models
{
    public class Student
    {
    }

    #region class Routine
    public class weekSchedule
    {
        public string day { get; set; }
        public List<schedule> schedules { get; set; }
    }

    public class weekScheduledata
    {
        public int class_id { get; set; }
        public string class_name { get; set; }
        public string sec_name { get; set; }
        public List<weekSchedule> schedules { get; set; }
    }

    public class schedule
    {
        public string fac_name { get; set; }
        public int fac_id { get; set; }
        public string subject { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public int period { get; set; }
    }

    public class ClassRoutineResult
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; }
        public string SectionName { get; set; }
        public string Day { get; set; }
        public int Period { get; set; }
        public int FacultyId { get; set; }
        public string FacultyName { get; set; }
        public string Subject { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }



    #endregion

    #region student Attendance

    public class attendance_request
    {
        public string school_id { get; set; }
        public string session { get; set; }
        public int uid { get; set; }
        public int month { get; set; }
        public int year { get; set; }
    }

    public class stu_attendance
    {
        public totalCount total { get; set; }
        public List<attData> data { get; set; }
    }

    public class totalCount
    {
        public int Present { get; set; }
        public int Absent { get; set; }
        public int Leave { get; set; }
    }

    public class attData
    {
        public DateOnly date { get; set; }
        public string status { get; set; }
        public TimeSpan In { get; set; }
        public TimeSpan Out { get; set; }
        public bool SMS { get; set; }
    }

    #endregion
}

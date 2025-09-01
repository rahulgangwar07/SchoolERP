using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Services;
using System.Data;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private SchoolERPContext _context; 
        private static string schoolId = "";

        public DashboardController(SchoolERPContext context)
        {
            _context = context; 

        }



        #region superadmin-dashboard

        [HttpGet("superadmin-header")]
        public async Task<IActionResult> superadminHeader()
        {
            var schools = await _context.schools.ToListAsync();
            int faculties = await _context.TbFacultymasters.CountAsync(fm => fm.faculty_id != 0);
            int students = await _context.student_Other_Infos.CountAsync(fm => fm.uid != 0);
            superadmin_headerCount _HeaderCount = new superadmin_headerCount();
            _HeaderCount.activeSchools = schools.Count(s => s.SchoolStatus == true);
            _HeaderCount.inactiveSchools = schools.Count(s => s.SchoolStatus == false);
            _HeaderCount.totalFaculties = faculties;
            _HeaderCount.totalStudents = students;

            return Ok(_HeaderCount);
        }

        [HttpGet("sessionwise-data")]
        public async Task<IActionResult> sessionWiseData()
        {
            try
            {
                DateOnly date = DateOnly.FromDateTime(DateTime.Now);
                int year = date.Year;
                string currSession = (year) + " - " + (year+1);
                string prevSession = (year - 1) + " - " + (year);

                using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
                {
                    DataTable dt = new DataTable();
                    await con.OpenAsync();

                    using (SqlCommand cmd = new SqlCommand("schools_studentcount", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@session", currSession);
                        cmd.Parameters.AddWithValue("@preSession", prevSession);

                        using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                        {
                            await Task.Run(() => sda.Fill(dt));
                        }
                    }

                    con.Close();

                    List<schoolsStudentCount> schools1 = new List<schoolsStudentCount>();
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            schoolsStudentCount schools = new schoolsStudentCount();
                            schools.school_id = dt.Rows[i]["school_id"].ToString();
                            schools.school_name = dt.Rows[i]["school_name"].ToString();
                            schools.session = dt.Rows[i]["session"].ToString();
                            schools.pre_session = dt.Rows[i]["pre_session"].ToString();

                            // If the procedure returns current and previous session counts, map them accordingly
                            schools.totalStuCurrentSession = dt.Rows[i]["totalStuCurrentSession"] != DBNull.Value
                                ? dt.Rows[i]["totalStuCurrentSession"].ToString()
                                : "0"; // Handle null values

                            schools.totalStuPreviousSession = dt.Rows[i]["totalStuPreviousSession"] != DBNull.Value ? dt.Rows[i]["totalStuPreviousSession"].ToString()
                                : "0"; // Handle null values

                            schools1.Add(schools);
                        }
                    }
                    return Ok(schools1);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("superadmin-dashboard")]
        public IActionResult superadminDashboard()
        { 
            var item = _context.schools
                        .Where(sm => schoolId == "All" || sm.SchoolId == schoolId)
                        .ToList();
            int schoolCount = 0;
            int teacherCount = 0;
            int studentCount = 0;
            if (item != null)
            {
                schoolCount = item.Count;
            }

            var faculty = _context.TbFacultymasters
                        .Where(fm => schoolId == "All" || fm.school_id == schoolId).ToList();

            if (faculty != null)
            {
                teacherCount = faculty.Count;
            }

            var student = _context.student_Other_Infos
                        .Where(fm => schoolId == "All" || fm.school_id == schoolId).ToList();

            if (student != null)
            {
                studentCount = student.Count;
            }

            schoolHeader schoolheader = new schoolHeader();
            schoolheader.totalSchool = schoolCount;
            schoolheader.totalTeacher = teacherCount;
            schoolheader.totalStudent = studentCount;

            return Ok(schoolheader); // Return the dashboard header data
        }

         
        [HttpGet("school-info")]
        public async Task<IActionResult> schoolDetail()
        {
            var school = _context.schools.Where(sch => sch.SchoolId == schoolId).FirstOrDefault();
            if(school == null) { return NotFound(); }

            schoolDetail schooldetail = new schoolDetail();
            schooldetail.schoolId = schoolId;
            schooldetail.schoolname = school.SchoolName;
            schooldetail.totalStudent = 40;
            schooldetail.totalTeacher = 12;



            return Ok(schooldetail);
        }


        #endregion

    }

    public class superadmin_headerCount
    {
        public int activeSchools { get; set; }
        public int inactiveSchools { get; set; }
        public int totalStudents { get; set; }
        public int totalFaculties { get; set; }
    }

    public class schoolsStudentCount
    {
        public string school_id { get; set; }
        public string school_name { get; set; }
        public string session { get; set; }
        public string pre_session { get; set; }
        public string totalStuCurrentSession { get; set; }
        public string totalStuPreviousSession { get; set; }
    }
}


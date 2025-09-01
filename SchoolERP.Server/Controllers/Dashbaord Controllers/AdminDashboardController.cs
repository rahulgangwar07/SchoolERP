using DocumentFormat.OpenXml.Office.Word;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.Identity.Client;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Dashboard_Models;
using System.Data;

namespace SchoolERP.Server.Controllers.Dashbaord_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminDashboardController : ControllerBase
    {   
        private SchoolERPContext _context;
        private ILogger<AdminDashboardController> _logger;

        public AdminDashboardController(SchoolERPContext context,ILogger<AdminDashboardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("getHeader")]
        public async Task<IActionResult> GetHeaderDashboard(string school_id,string session)
        {
            using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
            {
                DataSet ds = new DataSet();
                await con.OpenAsync();
                using (SqlCommand cmd = new SqlCommand("adminHeader", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@school_id",school_id);
                    cmd.Parameters.AddWithValue("@session",session);

                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    { 
                        await Task.Run(() => sda.Fill(ds));
                    }
                }

                con.Close();

                if (ds.Tables.Count > 0)
                {
                    AdminHeader header = new AdminHeader();
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        avaiablity avaiablity = new avaiablity
                        {
                            name = ds.Tables[0].Rows[0]["name"].ToString(),
                            total = Convert.ToInt32(ds.Tables[0].Rows[0]["total"]),
                            present = Convert.ToInt32(ds.Tables[0].Rows[0]["present"]),
                            absent = Convert.ToInt32(ds.Tables[0].Rows[0]["absent"]),
                            leave = Convert.ToInt32(ds.Tables[0].Rows[0]["leave"]),
                            inActive = Convert.ToInt32(ds.Tables[0].Rows[0]["inActive"])
                        };
                        header.faculties = avaiablity;
                    }
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        avaiablity avaiablity = new avaiablity
                        {
                            name = ds.Tables[1].Rows[0]["name"].ToString(),
                            total = Convert.ToInt32(ds.Tables[1].Rows[0]["total"]),
                            present = Convert.ToInt32(ds.Tables[1].Rows[0]["present"]),
                            absent = Convert.ToInt32(ds.Tables[1].Rows[0]["absent"]),
                            leave = Convert.ToInt32(ds.Tables[1].Rows[0]["leave"]),
                            inActive = Convert.ToInt32(ds.Tables[1].Rows[0]["inActive"])
                        };
                        header.students = avaiablity;
                    }
                    if (ds.Tables[2].Rows.Count > 0)
                    {
                        course_avaiablity course_ = new course_avaiablity
                        {
                            name = ds.Tables[2].Rows[0]["name"].ToString(),
                            total = Convert.ToInt32(ds.Tables[2].Rows[0]["total"]),
                            online = Convert.ToInt32(ds.Tables[2].Rows[0]["online"]),
                            offline = Convert.ToInt32(ds.Tables[2].Rows[0]["offline"]),
                            upcoming = Convert.ToInt32(ds.Tables[2].Rows[0]["upcoming"])
                        };
                        header.courses = course_; 
                    }
                    if (ds.Tables[3].Rows.Count > 0)
                    {
                        smsreport_avaiablity smsreport_ = new smsreport_avaiablity
                        {
                            name = ds.Tables[3].Rows[0]["name"].ToString(),
                            total = Convert.ToInt32(ds.Tables[3].Rows[0]["total"]),
                            sent = Convert.ToInt32(ds.Tables[3].Rows[0]["sent"]),
                            failed = Convert.ToInt32(ds.Tables[3].Rows[0]["failed"]),
                            pending = Convert.ToInt32(ds.Tables[3].Rows[0]["pending"])
                        }; 
                        header.smsreport = smsreport_; 
                    }

                    return Ok(header);
                }
                else
                {
                    return NotFound("No data found.");
                }

            } 
        }

        [HttpGet("classwiseStatics")]
        public async Task<IActionResult> classwiseStatics(string school_id, string session)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and Session not coming from request.");
            }

            // Get the previous session using a helper function
            string previousSession = GetPreviousSession(session);

            var classData = await (from tb_cls in _context.tbClasses
                                    join tb_name in _context.classNames
                                    on new { tb_cls.school_id, tb_cls.class_id,tb_cls.status }
                                    equals new { tb_name.school_id, tb_name.class_id,tb_name.status }
                                    where tb_cls.school_id == school_id && tb_cls.status == true 
                                    group new { tb_cls, tb_name } by new { tb_name.class_id, tb_name.class_name } into g
                                    select new  
                                    {
                                        g.Key.class_id,
                                        g.Key.class_name,
                                        session,
                                        previousSession,
                                        stuCount_currentSession = _context.tb_studentmasters.Count(sm => sm.class_id == g.Key.class_id && sm.school_id == school_id && sm.session == session && sm.status == "Registered"),
                                        stuCount_previousSession = _context.tb_studentmasters.Count(sm => sm.class_id == g.Key.class_id && sm.school_id == school_id && sm.session == previousSession && sm.status == "Registered")
                                    }).ToListAsync();

            return Ok(classData);
        }

        [HttpGet("upComingBirthday")]
        public async Task<ActionResult> upComingBirthday(string school_id, string session)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and Session not coming from request.");
            }

            using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
            {
                DataTable dt = new DataTable();
                await con.OpenAsync();

                using (SqlCommand cmd = new SqlCommand("upComingBirthday", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@school_id", school_id);
                    cmd.Parameters.AddWithValue("@session", session);

                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        await Task.Run(() => sda.Fill(dt));
                    }
                }

                await con.CloseAsync();

                if (dt.Rows.Count > 0)
                { 
                    var result = dt.AsEnumerable()
                        .Select(row => dt.Columns.Cast<DataColumn>()
                            .ToDictionary(col => col.ColumnName, col => row[col]))
                        .ToList();

                    return Ok(result);  
                }
                else
                {
                    return NotFound("Data is not available.");
                }
            }
        }



        private string GetPreviousSession(string session)
        {
            var sessionParts = session.Split('-');
            int startYear = int.Parse(sessionParts[0]);
            int endYear = int.Parse(sessionParts[1]);

            return (startYear - 1) + " - " + (endYear - 1);
        }

    }
}

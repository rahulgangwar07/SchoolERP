
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Student_Models;
using System.Data;

namespace SchoolERP.Server.Controllers.Student_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyReportController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<MonthlyReportController> _logger;

        public MonthlyReportController(SchoolERPContext context, ILogger<MonthlyReportController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("monthlyReport")]
        public async Task<IActionResult> monthlyreport(string school_id, int class_id, int sec_id, string sDate,string eDate)
        {
            try
            { 

                if(string.IsNullOrEmpty(school_id))
                {
                    return BadRequest("School Id not found! ");
                }
                if (sDate == null)
                {
                    sDate = (DateTime.Now).ToString();
                }
                if (eDate == null)
                {
                    eDate = (DateTime.Now).ToString();
                }


                var conStr = _context.Database.GetConnectionString();

                List<stu_monthly_report> reportList = new List<stu_monthly_report>();

                using (var connection = new SqlConnection(conStr))
                {
                    DateOnly startDate = DateOnly.FromDateTime(DateTime.Parse(sDate));
                    DateOnly endDate = DateOnly.FromDateTime(DateTime.Parse(eDate));
                    await connection.OpenAsync(); 
                    using (var command = new SqlCommand("attendance_monthly_report", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@school_id",school_id);
                        command.Parameters.AddWithValue("@class_id",class_id);
                        command.Parameters.AddWithValue("@sec_id",sec_id);
                        command.Parameters.AddWithValue("@startDate",startDate);
                        command.Parameters.AddWithValue("@endDate", endDate);
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows)
                            {
                                while (await reader.ReadAsync())
                                {
                                    var report = new stu_monthly_report
                                    {
                                        stu_id = reader.GetInt32(reader.GetOrdinal("stu_id")),
                                        registration_no = reader.GetString(reader.GetOrdinal("registration_no")),
                                        name = reader.GetString(reader.GetOrdinal("name")),
                                        father_name = reader.GetString(reader.GetOrdinal("father_name")),
                                        class_id = reader.GetInt32(reader.GetOrdinal("class_id")),
                                        //// GetDateTime() se Date ko fetch karke string mein convert karein
                                        //att_date = reader.GetString(reader.GetOrdinal("att_date")),
                                        ////att_date = reader.GetDateTime(reader.GetOrdinal("att_date")).ToString("yyyy-MM-dd"),
                                        present_count = reader.GetInt32(reader.GetOrdinal("present_count")),
                                        absent_count = reader.GetInt32(reader.GetOrdinal("absent_count")),
                                        leave_count = reader.GetInt32(reader.GetOrdinal("leave_count")),
                                        ratio = reader.GetDouble(reader.GetOrdinal("ratio")),
                                        startDate = reader.GetDateTime(reader.GetOrdinal("startDate")),
                                        endDate = reader.GetDateTime(reader.GetOrdinal("endDate"))
                                    };
                                    reportList.Add(report);
                                }
                            }
                        }
                    }

                    await connection.CloseAsync();
                }






                return Ok(reportList);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching monthly report: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

        }


      

    }
}

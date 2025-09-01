using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Controllers.Configuration;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Student_Models;
using System;

namespace SchoolERP.Server.Controllers.Student_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAttendanceController : ControllerBase
    {
        private SchoolERPContext _context;
        private readonly ILogger<SchoolController> _logger;
        public StudentAttendanceController(ILogger<SchoolController> logger,SchoolERPContext context)
        {
            _context = context;
            _logger = logger;
        }

        #region Get Student Data for Attendance

        [HttpGet("getStudentAttendance/{clsId}")]
        public async Task<IActionResult> Get(int clsId, [FromQuery] string school_id, int sec_id, string date)
        {
            // Try parsing the date to handle potential errors
            if (!DateTime.TryParse(date, out DateTime parsedDate))
            {
                return BadRequest("Invalid date format.");
            }
            DateOnly parsedDatenew = DateOnly.FromDateTime(parsedDate);

            var data = await (from sm in _context.tb_studentmasters
                              join so in _context.student_Other_Infos on new { sm.uid, sm.school_id } equals new { so.uid, so.school_id }
                              join sa in _context.stu_Attendances on new { sm.stu_id, sm.school_id, att_date = parsedDatenew } equals new { sa.stu_id, sa.school_id, sa.att_date } into saGroup
                              from sa in saGroup.DefaultIfEmpty()
                              where sm.class_id == clsId && (sec_id == 0 || sm.sec_id == sec_id) && sm.school_id == school_id && sm.status == "Registered"
                              select new studentAttendanceDTO
                              {
                                  uid = sm.uid,
                                  stu_id = sm.stu_id,
                                  sec_id = sm.sec_id,
                                  registration_no = sm.registration_no,
                                  first_name = so.first_name,
                                  pen_card = so.pen_card,
                                  mother_name = so.mother_name,
                                  father_name = so.father_name,
                                  state_id = so.state_id,
                                  caste = so.caste,
                                  class_id = sm.class_id ?? 0,
                                  school_id = sm.school_id,
                                  session = sm.session,
                                  remark = sa.remark,
                                  isDeleted = sa != null ? sa.isDeleted : false,
                                  attstatus = sa != null ? (!sa.isDeleted ? sa.status : "P") : "P",
                                  attdate = sa.att_date != null ? sa.att_date : DateOnly.MinValue

                              }).AsNoTracking().ToListAsync();

            var filterdata = data.Where(d => !d.isDeleted).ToList();

            // If no records meet the filter, modify the isDeleted field for all records and return
            if (filterdata.Count == 0)
            {
                // Change isDeleted to false for all records where it is true
                foreach (var item in data)
                {
                    item.isDeleted = false;
                }

                // Return the modified data where all isDeleted are set to false
                return Ok(data);
            }

            return Ok(filterdata);
        }

        #endregion

        #region Submit Student attendance Data

        [HttpPost("submitAttendanceData")]
          public async Task<IActionResult> submitStudentAttendance(string school_id, string date, [FromBody] studentAttendanceDTOs students)
            { 
                if (DateTime.TryParse(date, out DateTime dt))
                { 
                    DateOnly attdate = DateOnly.FromDateTime(dt); 
                    TimeSpan attTime = dt.TimeOfDay;
                 
                    Console.WriteLine("Parsed Date: " + attdate.ToString("yyyy-MM-dd")); 
                    Console.WriteLine("Parsed Time: " + attTime.ToString(@"hh\:mm\:ss")); 
                 
                    if (school_id == null)
                    {
                        return BadRequest("School ID not found.");
                    }
                    if (students == null)
                    {
                        return BadRequest("Data not found.");
                    }

                    var att_Data = await _context.stu_Attendances.Where(sa => sa.school_id == school_id && sa.att_date == attdate && sa.isDeleted == false).ToListAsync();
         
                    foreach (var item in students.dTOs)
                    {
                        var att = att_Data.Where(ad => ad.stu_id == item.stu_id && ad.att_date == attdate).FirstOrDefault();
                        if(att == null)
                         {
                        stu_Attendance stu_ = new stu_Attendance
                        {
                            stu_id = item.stu_id,
                            class_id = item.class_id,
                            sec_id = item.sec_id ?? 0,
                            att_date = attdate,
                            status = item.attstatus,
                            inTime = attTime,
                            remark = item.remark,
                            createdAt = DateTime.Now,
                            updatedAt = DateTime.Now,
                            school_id = item.school_id,
                            session = "2024 - 2025"
                        };
                        _context.Add(stu_);
                        await _context.SaveChangesAsync();
                       }
                        else
                        {
                        att.status = item.attstatus;
                        att.updatedAt = DateTime.Now;
                        att.remark = item.remark;
                        _context.Update(att);
                        await _context.SaveChangesAsync();
                        }
                        // Process each student's attendance data here
                    }

                    return Ok(att_Data);
                }
                else
                {
                    // Handle invalid date format
                    return BadRequest("Invalid date format.");
                }
            }


        #endregion


        #region Delete Attendance Record

        [HttpDelete("deleteStudentAttendance")]
        public async Task<IActionResult> deleteAttendace(paramentes p)
        {
            if (p == null || p.school_id == null)
            {
                return BadRequest("Parameters not found.");
            }

            DateOnly date = p.date;

            // Check active records
            var att_data = _context.stu_Attendances.Where(att => att.school_id == p.school_id &&
                            att.class_id == p.class_id && att.att_date == date && att.isDeleted == false);

            if (!att_data.Any())   
            {
                return NotFound("No active attendance records found.");
            }
             
            var delete = await _context.stu_Attendances
                .Where(att => att.school_id == p.school_id && att.class_id == p.class_id && att.att_date == date && att.isDeleted == true)
                .ToListAsync();

            if (delete.Any())  
            {
                foreach (var d in delete)
                {
                    _context.stu_Attendances.Remove(d);   
                }

                await _context.SaveChangesAsync();   
            }

            // Mark active attendance records as deleted
            foreach (var item in att_data.OrderBy(s => s.stu_id))
            {
                item.isDeleted = true;
                item.updatedAt = DateTime.Now;   
            }

            await _context.SaveChangesAsync();   

            return Ok(att_data);
        }



        #endregion


        #region Get Student Data for View Page
        [HttpGet("getAttendanceReport")]
        public async Task<IActionResult> getAttendanceData(string school_id, int class_id, int sec_id, DateOnly date)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found!");
            }

            if (date == default || class_id == 0)
            {
                return BadRequest("Some thing went wrong");
            }

            // Fetch the attendance records for the given filters
            var att_record = await _context.stu_Attendances
                .Where(sa => sa.school_id == school_id && !sa.isDeleted && sa.class_id == class_id
                             && (sec_id == 0 || sa.sec_id == sec_id) && sa.att_date.Month == date.Month && sa.att_date.Year == date.Year)
                .ToListAsync();

            if (att_record == null || !att_record.Any())
            {
                return Ok(new attendanceReport());   
            }
             
            var stuname = await (from so in _context.student_Other_Infos
                                 join sm in _context.tb_studentmasters on new { so.school_id, so.uid } equals new { sm.school_id, sm.uid }
                                 where sm.school_id == school_id && sm.class_id == class_id && (sec_id == 0 || sm.sec_id == sec_id) && sm.status == "Registered"
                                 select new
                                 {
                                     sm.stu_id,
                                     so.first_name
                                 }).OrderBy(sm => sm.stu_id).ToListAsync();

            // Get the list of dates for the given month
            List<DateOnly> dates = getDates(date.Year, date.Month);

            var attendances = new attendanceReport
            {
                name = stuname.Select(st => st.first_name).ToArray(),
                attdays = new List<attday>()
            };

            // Dictionary to quickly access attendance records by date
            var attendanceDict = att_record.GroupBy(ar => ar.att_date)
                                           .ToDictionary(g => g.Key, g => g.ToList());

            foreach (var d in dates)
            {
                var attday = new attday { date = d };
                 
                string[] statuses = new string[stuname.Count];

                if (attendanceDict.ContainsKey(d))
                { 
                    var recordsForDay = attendanceDict[d];

                    for (int i = 0; i < stuname.Count; i++)
                    {
                        var status = recordsForDay.FirstOrDefault(r => r.stu_id == stuname[i].stu_id)?.status;
                        statuses[i] = status ?? "";   
                    }
                }
                else
                { 
                    statuses = new string[stuname.Count];
                }

                attday.status = statuses;
                attendances.attdays.Add(attday);
            }

            return Ok(attendances);
        }

        #endregion

        public static List<DateOnly> getDates(int year, int month)
        {
            var dates = new List<DateOnly>();

            // Loop from the first day of the month until we hit the next month, moving forward a day at a time
            for (var date = new DateOnly(year, month, 1); date.Month == month; date = date.AddDays(1))
            {
                dates.Add(date);
            }

            return dates;
        }

    }
}

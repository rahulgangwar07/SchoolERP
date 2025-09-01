using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Office2019.Excel.RichData2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SchoolERP.Server.Controllers.Configuration;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Student_Models;
using System.Data;
using static Azure.Core.HttpHeader;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    { 
        private readonly SchoolERPContext _context;
        private readonly ILogger<SchoolController> _logger;
        private readonly Models.Common _common;

        public StudentController(SchoolERPContext context, ILogger<SchoolController> logger, Models.Common common)
        {
            _context = context;
            _logger = logger;
            _common = common;
        }

        [HttpGet("siblingReport")]
        public async Task<IActionResult> getSibingReport([FromQuery] string school_id)
        { 

            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found! ");
            }

            var info = await _context.student_Other_Infos.Where(so => so.school_id == school_id && so.father_name != null).ToListAsync();
            if (info == null || info.Count == 0)
            {
                return NotFound("No sibling records found.");
            }

            var filterRecord = info.GroupBy(so => so.father_name).Where(group => group.Count() > 1).ToList();
            if (filterRecord == null)
            {
                return NotFound("No sibling records found.");
            }
            List<Sibling> siblings = new List<Sibling>();
            foreach (var item in filterRecord)
            {
                Sibling sibling = new Sibling();
                List<studentDTO> dTOs = new List<studentDTO>();
                foreach (var val in item)
                {
                    studentDTO dTO = new studentDTO();
                    sibling.father_name = val.father_name;
                    sibling.mother_name = val.mother_name;
                    sibling.phone = val.contact_no;
                    dTO.stu_name = val.first_name;
                    dTO.reg_no = val.reg_no;
                    dTO.fees = "00";
                    dTOs.Add(dTO);
                }
                sibling.students = dTOs;
                siblings.Add(sibling);
            }


            return Ok(siblings);
        }

        [HttpGet("siblingReportforFaculty")]
        public async Task<IActionResult> getSibingReport([FromQuery] string school_id,int teacherId)
        {
            if (string.IsNullOrEmpty(school_id) || teacherId == 0)
            {
                return BadRequest("School Id and Teacher Id is mendatory! ");
            }

            List<int> mappedClass = await _context.faculty_Classes.Where(fc => fc.school_id == school_id && fc.faculty_id == teacherId && fc.isActive == true)
                .Select(f => f.class_id).ToListAsync();

            List<int> uids = await _context.tb_studentmasters.Where(ts => ts.school_id == school_id && ts.status != "Withdrawn" && mappedClass.Contains(ts.class_id ?? 0))
                .Select(u => u.uid).Distinct().ToListAsync();

            var info = await _context.student_Other_Infos.Where(so => so.school_id == school_id && so.father_name != null && uids.Contains(so.uid)).ToListAsync();
            if (info == null || info.Count == 0)
            {
                return NotFound("No sibling records found.");
            }

            var filterRecord = info.GroupBy(so => so.father_name).Where(group => group.Count() > 1).ToList();
            if (filterRecord == null)
            {
                return NotFound("No sibling records found.");
            }
            List<Sibling> siblings = new List<Sibling>();
            foreach (var item in filterRecord)
            {
                Sibling sibling = new Sibling();
                List<studentDTO> dTOs = new List<studentDTO>();
                foreach (var val in item)
                {
                    studentDTO dTO = new studentDTO();
                    sibling.father_name = val.father_name;
                    sibling.mother_name = val.mother_name;
                    sibling.phone = val.contact_no;
                    dTO.stu_name = val.first_name;
                    dTO.reg_no = val.reg_no;
                    dTO.fees = "00";
                    dTOs.Add(dTO);
                }
                sibling.students = dTOs;
                siblings.Add(sibling);
            }


            return Ok(siblings);
        }

        [HttpGet("get-student-list")]
        public async Task<IActionResult> GetStudentListByClass([FromQuery] string schoolId, [FromQuery] string session,
         [FromQuery] int classId, [FromQuery] int? secId = null)
        {
            try
            {
                var parameters = new Dictionary<string, object>
        {
            { "@school_id", schoolId },
            { "@session", session },
            { "@class_id", classId },
            { "@sec_id", secId.HasValue ? secId.Value : DBNull.Value }
                };

                DataTable dataTable = _common.ExecuteQuery("sp_get_classwise_student_list", parameters);
                return Ok(dataTable);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching classwise student data");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("classRoutine")]
        public async Task<IActionResult> classRoutine(string school_id, string session, int uid)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and Session are null!");
            }

            var connectionString = _context.Database.GetConnectionString(); 
            var weekScheduleData = new weekScheduledata();

            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                     
                    using (var command = new SqlCommand("GetClassRoutine", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                         
                        command.Parameters.Add(new SqlParameter("@SchoolId", school_id));
                        command.Parameters.Add(new SqlParameter("@Session", session));
                        command.Parameters.Add(new SqlParameter("@Uid", uid));
                         
                        using (var reader = await command.ExecuteReaderAsync())
                        { 
                            var result = new List<ClassRoutineResult>();

                            while (await reader.ReadAsync())
                            {
                                var startTime = reader.IsDBNull(reader.GetOrdinal("StartTime"))
                                    ? (TimeSpan?)null
                                    : reader.GetTimeSpan(reader.GetOrdinal("StartTime"));

                                var endTime = reader.IsDBNull(reader.GetOrdinal("EndTime"))
                                    ? (TimeSpan?)null
                                    : reader.GetTimeSpan(reader.GetOrdinal("EndTime"));

                                result.Add(new ClassRoutineResult
                                {
                                    ClassId = reader.GetInt32(reader.GetOrdinal("ClassId")),
                                    ClassName = reader.GetString(reader.GetOrdinal("ClassName")),
                                    SectionName = reader.GetString(reader.GetOrdinal("SectionName")),
                                    Day = reader.GetString(reader.GetOrdinal("Day")),
                                    FacultyId = reader.GetInt32(reader.GetOrdinal("faculty_id")),
                                    FacultyName = reader.GetString(reader.GetOrdinal("faculty_name")),
                                    Subject = reader.GetString(reader.GetOrdinal("Subject")),
                                    StartTime = startTime ?? TimeSpan.Zero,  
                                    EndTime = endTime ?? TimeSpan.Zero,      
                                    Period = reader.GetInt32(reader.GetOrdinal("Period"))
                                });
                            }


                            if (result.Count == 0)
                            {
                                return NotFound("No data found for the provided parameters.");
                            }
                             
                            weekScheduleData.class_id = result.FirstOrDefault()?.ClassId ?? 0;
                            weekScheduleData.class_name = result.FirstOrDefault()?.ClassName;
                            weekScheduleData.sec_name = result.FirstOrDefault()?.SectionName;
                            weekScheduleData.schedules = result
                                .GroupBy(r => r.Day)
                                .Select(g => new weekSchedule
                                {
                                    day = g.Key,
                                    schedules = g.OrderBy(s => s.Period).Select(s => new schedule
                                    {
                                        fac_name = string.IsNullOrEmpty(s.FacultyName) ? s.FacultyId.ToString() : s.FacultyName,
                                        subject = s.Subject, 
                                        startTime = s.StartTime.ToString(@"hh\:mm"),
                                        endTime = s.EndTime.ToString(@"hh\:mm"),
                                        period = s.Period
                                    }).ToList()
                                }).ToList();
                        }
                    }
                }
                catch (Exception ex)
                { 
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

            return Ok(weekScheduleData);
        }

        [HttpGet("stuAttendanceData")]
        public async Task<IActionResult> stuAttendanceData([FromQuery] attendance_request _Request)
        {
            DateOnly fromDate = new DateOnly(_Request.year,_Request.month,1);
            DateOnly toDate = fromDate.AddMonths(1).AddDays(-1);

            if (string.IsNullOrEmpty(_Request.school_id) || string.IsNullOrEmpty(_Request.session))
            {
                return BadRequest("School Id and Session is Mandetory Fields! ");
            }

            int stu_id = await _context.tb_studentmasters.Where(sm => sm.school_id == _Request.school_id && sm.session == _Request.session && sm.uid == _Request.uid).Select(s => s.stu_id).FirstOrDefaultAsync();

            var stu_Attendance = await _context.stu_Attendances.Where(att => att.school_id == _Request.school_id && att.att_date >= fromDate && att.att_date <= toDate
            && att.stu_id == stu_id && att.isDeleted == false).OrderBy(att => att.att_date).ToListAsync();

            List<attData> attDates = new List<attData>();
            totalCount total = new totalCount();
            foreach (var attt in stu_Attendance)
            {
                attData att = new attData
                {
                    date = attt.att_date,
                    status = attt.status,
                    In = attt.inTime,
                    Out = attt.outTime,
                    SMS = false,
                };
                if(attt.status == "P")
                {
                    total.Present++;
                }else if(attt.status == "A")
                {
                    total.Absent++;
                }
                else if(attt.status == "L")
                {
                    total.Leave++;
                }
                
                attDates.Add(att);
            }
            stu_attendance stu_ = new stu_attendance
            {
                total = total,
                data = attDates
            };



            return Ok(stu_);
        }

      


        //[HttpGet("classRoutine")]
        //public async Task<IActionResult> classRoutine(string school_id, string session, int uid)
        //{
        //    if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
        //    {
        //        return BadRequest("SchoolId and Session is null! ");
        //    }

        //    string[] days = ["Monday", "Tuesday", "Wednesday", "Tuesday", "Friday", "Saturday"];

        //    var item = await (from sm in _context.tb_studentmasters
        //                      join soi in _context.student_Other_Infos
        //                      on new { sm.school_id, sm.uid } equals new { soi.school_id, soi.uid }
        //                      where sm.school_id == school_id && sm.session == session && sm.status == "Registered" && sm.uid == uid
        //                      select new
        //                      {
        //                          sm.class_id,
        //                          sm.sec_id
        //                      }).FirstOrDefaultAsync();

        //    int[] subject_id = await _context.ClassSubjects.Where(cs => cs.school_id == school_id && cs.session == session && cs.class_id == item.class_id
        //    && cs.isActive == true).Select(cs => cs.subject_id).ToArrayAsync();

        //    Dictionary<int, string> subject = await _context.subjects.Where(s => s.school_id == school_id && subject_id.Contains(s.subject_id) && s.IsActive == true).ToDictionaryAsync(s => s.subject_id, s => s.subject_name);

        //    var cls_schedules = await _context.schedules.Where(sc => sc.school_id == school_id && sc.class_id == item.class_id && sc.sec_id == item.sec_id).ToListAsync();

        //    var periods = await _context.periods.Where(pr => pr.school_id == school_id).ToListAsync();

        //    List<weekSchedule> weeks  = new List<weekSchedule>();

        //    foreach(var day in days)
        //    {
        //        weekSchedule week = new weekSchedule();
        //        week.day = day;
        //        List<schedule> s = new List<schedule>();
        //        var cls_schedule = cls_schedules.Where(s => s.day_name == day).OrderBy(s => s.period_id).ToList();
        //        foreach(var schedule in cls_schedule)
        //        {
        //            schedule schedule1 = new schedule();
        //            schedule1.fac_name = schedule.faculty_id.ToString();
        //            schedule1.subject = subject.Where(ss => ss.Key == schedule.subject_id).Select(ss => ss.Value).FirstOrDefault();
        //            schedule1.startTime = periods.Where(pr => pr.period_number == schedule.period_id).Select(pr => pr.start_time.ToString()).FirstOrDefault();
        //            schedule1.endTime = periods.Where(pr => pr.period_number == schedule.period_id).Select(pr => pr.end_time.ToString()).FirstOrDefault();
        //            schedule1.period = schedule.period_id;
        //            s.Add(schedule1);
        //        }
        //        week.schedules = s;
        //        weeks.Add(week);

        //    }

        //    string cls_name = await _context.classNames.Where(cn => cn.school_id == school_id && cn.class_id == item.class_id).Select(cn => cn.class_name).FirstOrDefaultAsync();
        //    string sec_name = await _context.tbClasses.Where(cn => cn.school_id == school_id && cn.class_id == item.class_id && cn.sec_id == item.sec_id).Select(cn => cn.sec_dis_name).FirstOrDefaultAsync();

        //    weekScheduledata scheduledata = new weekScheduledata
        //    {
        //        class_id = item.class_id ?? 0,
        //        class_name = cls_name,
        //        sec_name = sec_name,
        //        schedules = weeks

        //    };


        //    return Ok(scheduledata);
        //}


        //[HttpGet("siblingReport")]
        //public async Task<IActionResult> getSiblingReport([FromQuery] string school_id, [FromQuery] string fatherName)
        //{
        //    // Fetching the records based on the provided school_id and checking if the father_name includes the provided fatherName string
        //    var info = await _context.student_Other_Infos
        //                              .Where(so => so.school_id == school_id && so.father_name.Contains(fatherName))
        //                              .GroupBy(so => so.father_name) // Grouping by father's name
        //                              .Select(group => group.FirstOrDefault()) // Selecting the first occurrence from each group (removes duplicates)
        //                              .ToListAsync();

        //    if (info == null || info.Count == 0)
        //    {
        //        return NotFound("No sibling records found.");
        //    }

        //    return Ok(info);
        //}

    }
}

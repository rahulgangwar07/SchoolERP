using DocumentFormat.OpenXml.Drawing.Diagrams;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Subjects;
using System.Globalization;
using System.Linq;
using System.Runtime.CompilerServices;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoutineController : ControllerBase
    {
        private static SchoolERPContext _context;
        private static ILogger<RoutineController> _logger;

        public RoutineController(ILogger<RoutineController> logger,SchoolERPContext context)
        {
            _context = context;
            _logger = logger;
        }

        #region Get Priod Detail

        [HttpGet("getPriod")]
        public async Task<IActionResult> getPriod(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found! ");
            }
            var proid = await _context.periods.Where(p => p.school_id == school_id).OrderBy(p=>p.period_number).ToListAsync();
            if(proid == null)
            {
                return NotFound();
            }

            return Ok(proid);
        }

        #endregion

        #region Post Period detail
        [HttpPost("postPriod")]
        public async Task<IActionResult> postPriod(string school_id, PeriodDTOs dTOs)
        {
            // Validate input data
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is required.");
            }

            if (dTOs == null)
            {
                return BadRequest("Period data is missing.");
            }

            try
            {
                string startTime = NormalizeTimeFormat(dTOs.start_time);
                string endTime = NormalizeTimeFormat(dTOs.end_time);

                TimeOnly start = ParseTimeWithAMPM(startTime);
                TimeOnly end = ParseTimeWithAMPM(endTime);

                if(dTOs.id == 0)
                {
                    Period period = new Period
                    {
                        period_number = dTOs.period_number,
                        start_time = start,
                        end_time = end,
                        school_id = school_id
                    };

                    _context.periods.Add(period);
                    await _context.SaveChangesAsync();

                    return Ok(period);
                }
                else
                {
                    var period = await _context.periods.Where(pr => pr.school_id == school_id && pr.id == dTOs.id).FirstOrDefaultAsync();
                    //period.pepe
                    period.period_number = dTOs.period_number;
                    period.start_time = start;
                    period.end_time = end;
                    await _context.SaveChangesAsync();

                    return Ok(period);
                }
                
            }
            catch (FormatException)
            {
                return BadRequest("Invalid time format. Please use 'hh:mmAM/PM' format.");
            }
        }

      
        // Helper method to normalize time format (12-hour to 24-hour)
        private string NormalizeTimeFormat(string time)
        {
            // If input time doesn't have AM/PM part, add "AM" for safety
            if (string.IsNullOrEmpty(time))
                throw new FormatException("Time format is incorrect.");

            time = time.Trim();

 
            if (!time.EndsWith("AM") && !time.EndsWith("PM"))
            {
                time += "AM";
            }

            DateTime parsedTime;
            if (DateTime.TryParseExact(time, "hh:mmtt", CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedTime))
            {
                return parsedTime.ToString("HH:mm"); 
            }

            throw new FormatException("Invalid time format.");
        }

        // Helper method to parse the 12-hour time with AM/PM
        private TimeOnly ParseTimeWithAMPM(string time)
        {
            // The time has already been normalized to the 24-hour format, so no need for extra parsing
            if (DateTime.TryParseExact(time, "HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedTime))
            {
                return TimeOnly.FromDateTime(parsedTime);
            }

            throw new FormatException("Invalid time format.");
        }
        #endregion

        #region Delete Priod
        [HttpDelete("deletePriod")]
        public async Task<IActionResult> deletePriod(int period_id,string school_id)
        {
            if(period_id == 0 || string.IsNullOrEmpty(school_id))
            {
                return BadRequest("Period Number and School Id is mendetory Fields: ");
            }

            var schedule = await _context.schedules.Where(sch => sch.school_id == school_id && sch.period_id == period_id).FirstOrDefaultAsync();
            if(schedule != null)
            {
                return Ok(new {message = "Schedule Exists"});
            }

            var periods = await _context.periods.Where(pr => pr.school_id == school_id && pr.period_number == period_id).FirstOrDefaultAsync();
            if(periods == null)
            {
                return NotFound();
            }
            _context.Remove(periods);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted" });
        }

        #endregion

        #region Get Class Scheule

        [HttpGet("getClassSchedule")]
        public async Task<IActionResult> getClassSchedule(string school_id, string session, string routine)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and session are mandatory!");
            }

            List<string> days = new List<string> { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

            // Fetch classes and sections based on school_id
            List<ClassName> classes = await _context.classNames.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync();
            var sections = await _context.tbClasses.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync();
            var faculties = await _context.TbFacultymasters.Where(fm => fm.designation == 3 && fm.status == "Active" && fm.school_id == school_id).ToListAsync();
            var periods = await _context.periods.Where(sc => sc.school_id == school_id).ToListAsync();
            var scheduleData = await _context.schedules.Where(sc => sc.school_id == school_id && sc.session == session && sc.routine == routine).ToListAsync();
            var subjects = await _context.subjects.Where(ss => ss.school_id == school_id).ToListAsync();

            var data = new List<object>();

            foreach (var cls in classes)
            {
                // Get sections for the current class
                var classSections = sections.Where(s => s.class_id == cls.class_id).ToList();

                foreach (var section in classSections)
                {
                    var classScheduleDtos = new List<object>();

                    foreach (var day in days)
                    {
                        var sectionSchedules = scheduleData.Where(s => s.class_id == cls.class_id
                                               && s.sec_id == section.sec_id && s.day_name == day && s.routine == routine).ToList();

                        string day_name = day;
                        List<getScheduleDTOs> scheduleDtos = new List<getScheduleDTOs>();

                        foreach (var schedule in sectionSchedules)
                        {
                            var scheduleDto = new getScheduleDTOs
                            {
                                schedule_id = schedule.id,
                                period_id = schedule.period_id,
                                routine = schedule.routine,
                                startTime = periods.Where(p => p.period_number == schedule.period_id).Select(p => p.start_time).FirstOrDefault().ToString(),
                                endTime = periods.Where(p => p.period_number == schedule.period_id).Select(p => p.end_time).FirstOrDefault().ToString(),
                                faculty_name = faculties.Where(fac => fac.faculty_id == schedule.faculty_id).Select(fac => fac.first_name).FirstOrDefault(),
                                subject_id = schedule.subject_id,
                                subject_name = subjects.Where(ss => ss.subject_id == schedule.subject_id).Select(ss => ss.subject_name).FirstOrDefault(),
                                class_id = cls.class_id,
                                class_name = cls.class_name,
                                sec_id = section.sec_id,
                                sec_name = section.sec_name
                            };

                            scheduleDtos.Add(scheduleDto);
                        }

                        var sectionSchedule = new
                        {
                            day = day_name,
                            schedule = scheduleDtos
                        };

                        classScheduleDtos.Add(sectionSchedule);
                    }

                    // Check if any section schedule contains data
                    bool check = classScheduleDtos.Any(c => ((List<getScheduleDTOs>)c.GetType().GetProperty("schedule").GetValue(c)).Count > 0);

                    if (check)
                    {
                        var dto = new
                        {
                            class_id = cls.class_id,
                            class_name = cls.class_name,
                            section_id = section.sec_id,
                            section_name = section.sec_name,
                            days = classScheduleDtos
                        };

                        data.Add(dto);
                    }
                }


            }

            return Ok(data);
        }


        #endregion


        #region delete Class Scheule
        [HttpDelete("deleteClassSchedule")]
        public async Task<IActionResult> deleteClassSchedule(string school_id, string session, int schedule_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session is mendatory! ");
            }

            var schedule = await _context.schedules.Where(sc => sc.school_id == school_id && sc.session == session && sc.id == schedule_id).FirstOrDefaultAsync();
            _context.Remove(schedule);
            await _context.SaveChangesAsync();

            return Ok(schedule);
        }

        #endregion

        #region Get Schedule by Schedule Id
        [HttpGet("getSchedulebyId")]
        public async Task<IActionResult> getSchedulebyId([FromHeader] string school_id,[FromHeader] string session,[FromHeader] int schedule_id)
        {
            if(string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and Session is mandetory! ");
            }

            var schedule = await _context.schedules.Where(sc => sc.school_id == school_id && sc.session == session && sc.id == schedule_id).FirstOrDefaultAsync();

            return Ok(schedule);
        }

        #endregion

        #region Post Class Schedule

        [HttpPost("postSchedule")]
        public async Task<IActionResult> postSchedule([FromBody] ScheduleDTOs dTOs)
        {
            if(string.IsNullOrEmpty(dTOs.school_id) && string.IsNullOrEmpty(dTOs.session))
            {
                return BadRequest("School Id and Session is Mandetory! ");
            }

            if(dTOs.schedule_id == 0)
            {
                Schedule schedule = new Schedule
                {
                    class_id = dTOs.class_id,
                    sec_id = dTOs.sec_id,
                    day_name = dTOs.day,
                    period_id = dTOs.priod,
                    faculty_id = dTOs.teacher,
                    subject_id = dTOs.subject_id,
                    routine = dTOs.routine,
                    school_id = dTOs.school_id,
                    session = dTOs.session,
                    created_date = DateTime.Now,
                    updated_date = DateTime.Now
                };
                _context.Add(schedule);
                await _context.SaveChangesAsync();

                return Ok(schedule);
            }
            else
            {
                var schedule = await _context.schedules.Where(sch => sch.school_id == dTOs.school_id && sch.session == dTOs.session && sch.id == dTOs.schedule_id).FirstOrDefaultAsync();
                    schedule.class_id = dTOs.class_id;
                    schedule.sec_id = dTOs.sec_id;
                    schedule.day_name = dTOs.day;
                    schedule.period_id = dTOs.priod;
                    schedule.faculty_id = dTOs.teacher;
                    schedule.subject_id = dTOs.subject_id;
                    schedule.routine = dTOs.routine;  
                    schedule.updated_date = DateTime.Now;
                await _context.SaveChangesAsync();
                return Ok(schedule);
            }



            
        }

        #endregion

        #region Get Teachers schedule
        [HttpGet("getTeacherSchedule")]
        public async Task<IActionResult> getTeacherSchedule(string school_id, string session)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("SchoolId and session are mandatory!");
            }

            List<string> days = new List<string> { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

            // Fetch necessary data: classes, faculties, periods, schedules, and subjects
            var classes = await _context.classNames.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync();
            var faculties = await _context.TbFacultymasters.Where(fm => fm.designation == 3 && fm.status == "Active" && fm.school_id == school_id).ToListAsync();
            var periods = await _context.periods.Where(sc => sc.school_id == school_id).ToListAsync();
            var schedules = await _context.schedules.Where(sc => sc.school_id == school_id && sc.session == session).ToListAsync();
            var subjects = await _context.subjects.Where(ss => ss.school_id == school_id).ToListAsync();
            var sections = await _context.tbClasses.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync(); // To get section info

            var data = new List<object>();

            foreach (var fac in faculties)
            {
                int sectionCount = 0;
                var facScheduleDtos = new List<object>();
                 
                foreach (var day in days)
                { 
                    var facultySchedules = schedules.Where(s => s.faculty_id == fac.faculty_id && s.day_name == day).ToList();
                     
                    if (facultySchedules.Count > 0) sectionCount++;

                    string day_name = day;
                    List<getScheduleDTOs> scheduleDtos = new List<getScheduleDTOs>();
                     
                    foreach (var schedule in facultySchedules)
                    { 
                        var section = sections.FirstOrDefault(s => s.class_id == schedule.class_id && s.sec_id == schedule.sec_id);

                        getScheduleDTOs scheduleDto = new getScheduleDTOs
                        {
                            schedule_id = schedule.id,
                            period_id = schedule.period_id,
                            routine = schedule.routine,
                            startTime = periods.Where(p => p.period_number == schedule.period_id).Select(p => p.start_time).FirstOrDefault().ToString(),
                            endTime = periods.Where(p => p.period_number == schedule.period_id).Select(p => p.end_time).FirstOrDefault().ToString(),
                            faculty_name = fac.first_name,
                            subject_id = schedule.subject_id,
                            subject_name = subjects.Where(ss => ss.subject_id == schedule.subject_id).Select(ss => ss.subject_name).FirstOrDefault(),
                            class_id = schedule.class_id,
                            class_name = classes.Where(cls => cls.class_id == schedule.class_id).Select(cls => cls.class_name).FirstOrDefault(),
                            sec_id = schedule.sec_id,  
                            sec_name = section?.sec_name  
                        };

                        scheduleDtos.Add(scheduleDto);
                    }

                    var clsSchedule = new
                    {
                        day = day_name,
                        schedule = scheduleDtos
                    };

                    facScheduleDtos.Add(clsSchedule);
                } 
                var dto = new
                {
                    fac_name = fac.first_name,
                    days = facScheduleDtos
                };

                if (sectionCount > 0)
                {
                    data.Add(dto);
                }
            }

            return Ok(data);
        }


        #endregion

        [HttpGet("getSchedulePeriodPrint")]
        public async Task<IActionResult> getSchedulePrint(string school_id, string session, int class_id)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {
                return BadRequest("School Id and Session are mandatory!");
            }

            // Fetch the schedules for the specific class_id, session, and school_id, including sections
            var schedules = await _context.schedules
                .Where(sc => sc.school_id == school_id && sc.session == session && sc.class_id == class_id)
                .ToListAsync();

            // Get distinct periods for the class schedule
            int[] periods = schedules.Select(sc => sc.period_id).Distinct().OrderBy(period_id => period_id).ToArray();

            var periodData = await _context.periods.Where(pr => pr.school_id == school_id).ToListAsync();
            var subjects = await _context.subjects.Where(ss => ss.school_id == school_id && ss.IsActive == true).ToListAsync();
            var faculties = await _context.TbFacultymasters.Where(fm => fm.school_id == school_id && fm.status == "Active").ToListAsync();
            var sections = await _context.tbClasses.Where(tc => tc.school_id == school_id && tc.class_id == class_id).ToListAsync(); // Get sections for the class

            var subjectLookup = subjects.ToDictionary(sub => sub.subject_id, sub => sub.subject_name);
            var facultyLookup = faculties.ToDictionary(fac => fac.faculty_id, fac => fac.first_name);
            var periodLookup = periodData.ToDictionary(p => p.period_number, p => p);
            var sectionLookup = sections.ToDictionary(sec => sec.sec_id, sec => sec.sec_name); // Lookup for sections

            // Group schedules by day, period, and section
            var schedulesGroupedByDayPeriodSection = schedules
                .GroupBy(sc => new { sc.day_name, sc.period_id, sc.sec_id })
                .ToList();

            string[] days = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

            List<object> list = new List<object>();
            foreach (var day in days)
            {
                var daySchedules = schedulesGroupedByDayPeriodSection.Where(sc => sc.Key.day_name == day).ToList();
                var dayData = new List<object>();

                foreach (var period in periods)
                {
                    // Filter schedules by period and add section info
                    var schedule = daySchedules.FirstOrDefault(sc => sc.Key.period_id == period);

                    if (schedule != null)
                    {
                        var sectionId = schedule.Key.sec_id;
                        var subjectId = schedule.FirstOrDefault()?.subject_id;
                        var facultyId = schedule.FirstOrDefault()?.faculty_id;

                        var daywiseData = new
                        {
                            subject = subjectId.HasValue ? subjectLookup.GetValueOrDefault(subjectId.Value) : null,
                            time = periodLookup.GetValueOrDefault(period)?.start_time + " - " + periodLookup.GetValueOrDefault(period)?.end_time,
                            faculty_name = facultyId.HasValue ? facultyLookup.GetValueOrDefault(facultyId.Value) : null,
                            section_name = sectionLookup.GetValueOrDefault(sectionId)  
                        };

                        dayData.Add(daywiseData);
                    }
                    else
                    { 
                        dayData.Add(new { subject = "", time = "", faculty_name = "", section_name = "" });
                    }
                }

                list.Add(new { name = day, schedule = dayData });
            }

            var result = new
            {
                periods,
                days = list
            };

            return Ok(result);
        }


        public static string twoArrays(int k, List<int> A, List<int> B)
        {
            A.Sort(); 
            B.OrderByDescending(b => b);
            bool check = true;
            for(int i = 0; i < A.Count; i++)
            {
                if (A[i] + B[i] <= k)
                {
                    check=false;break;
                } 
            }
            if (check)
            {
                return "Yes";
            }
            else
                return "No";
        }


    }
}

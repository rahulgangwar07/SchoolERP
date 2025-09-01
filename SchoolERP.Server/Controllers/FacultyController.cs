using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Faculty;
using SchoolERP.Server.Services;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly SessionService _sessionService;
        private readonly IWebHostEnvironment _env;

        public FacultyController(SchoolERPContext context,SessionService sessionService, IWebHostEnvironment env)
        {
            _context = context;
            _sessionService = sessionService;
            _env = env;
        }

        #region Get Faculty (Single)
        // GET: api/Faculty/getFaculty/1
        [HttpGet("getFaculty/{id}")]
        public async Task<ActionResult<TbFacultymaster>> GetFaculty(int id, [FromQuery] string school_id)
        {
            //var schoolId = _sessionService.GetSchoolId(); // Use service to get the SchoolId
            if(school_id == null)
            {
                return BadRequest("schoolId not found! ");
            }
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School ID is not set in session.");
            }
            var faculty = await _context.TbFacultymasters.Where(fm => fm.school_id == school_id && fm.faculty_id == id).FirstOrDefaultAsync();

            if (faculty == null)
            {
                return NotFound();
            }

            return Ok(faculty);
        }

        #endregion

        #region Get All Faculties

        [HttpGet("getAll")]
        public async Task<ActionResult> GetAllFaculties([FromQuery] string school_id)
        {
            var faculties = await _context.TbFacultymasters.Where(tf => tf.school_id == school_id
            && (tf.status.Trim().ToLower() != "inactive" && tf.status.Trim().ToLower() != "withdrawn")).ToListAsync();

            List<TbFacultymasterDTOs> facultylist = new List<TbFacultymasterDTOs>();

            foreach(var faculty in faculties)
            {
                TbFacultymasterDTOs dTOs = new TbFacultymasterDTOs();
                dTOs.faculty_id = faculty.faculty_id;
                dTOs.username = faculty.username;
                dTOs.first_name = faculty.first_name;
                dTOs.last_name = faculty.last_name;
                dTOs.password = faculty.password;
                dTOs.email = faculty.email;
                dTOs.qualification = faculty.qualification;
                dTOs.phone = faculty.phone;
                dTOs.dob = faculty.dob;
                dTOs.gender = faculty.gender;
                dTOs.address = faculty.address;
                dTOs.status = faculty.status;
                dTOs.created_at = faculty.created_at;
                dTOs.updated_at = faculty.updated_at;
                dTOs.school_id = faculty.school_id;
                dTOs.bloodgroup = faculty.bloodgroup;
                dTOs.aadhar_card = faculty.aadhar_card;
                dTOs.date_of_joining = faculty.date_of_joining;
                dTOs.whatsapp_no = faculty.whatsapp_no;
                dTOs.designation = faculty.designation;
                dTOs.designation_name = _context.TbDesignations.Where(td => td.designation_id == Convert.ToInt32(faculty.designation)).Select(td => td.designation_name).FirstOrDefault(); ;
                dTOs.speciality = faculty.speciality;
                dTOs.spouse_name = faculty.spouse_name;
                dTOs.mother_name = faculty.mother_name;
                dTOs.father_name = faculty.father_name;
                dTOs.local_address = faculty.local_address;
                dTOs.experience = faculty.experience;
                dTOs.bank_name = faculty.bank_name;
                dTOs.account_no = faculty.account_no;
                dTOs.ifsc_code = faculty.ifsc_code;
                dTOs.aadhar_no = faculty.aadhar_no;
                dTOs.pan_card = faculty.pan_card;
                dTOs.passport = faculty.passport;
                dTOs.dl_details = faculty.dl_details;
                dTOs.pf_account_no = faculty.pf_account_no;
                dTOs.image = faculty.image;
                dTOs.signature = faculty.signature;

                facultylist.Add(dTOs);
            }
            return Ok(facultylist);
        }

        #endregion

        #region Get Teachers Only

        [HttpGet("getTeachers")]
        public async Task<IActionResult> getTeachers(string school_id)
        {
            if(school_id == null)
            {
                return BadRequest("School Id not Found! ");
            }
            var teachers = await _context.TbFacultymasters.Where(sch => sch.school_id == school_id && sch.designation == 3 && sch.status == "Active").ToListAsync();
            return Ok(teachers);
        }

        #endregion

        #region Assign Class Teacher

        [HttpPost("insertClassTeacher")]
        public async Task<IActionResult> insertClassTeacher([FromHeader] string school_id, [FromHeader] string session, [FromHeader] string class_id, [FromHeader] string faculty_id)
        {
            if(school_id == null)
            {
                return BadRequest("School Id not found!");
            }
            if(session == null)
            {
                return BadRequest("Session not found!");
            }

            

            return Ok();
        }

        #endregion

        #region Create Faculty (POST)

        [HttpPost("create")] 
        public async Task<ActionResult<TbFacultymasterDTOs>> CreateFaculty(TbFacultymasterDTOs faculty)
        {
            if (faculty == null)
            {
                return BadRequest("Faculty data is null");
            }

            

            var uploadDirectory = Path.Combine(_env.WebRootPath,"api" ,"uploads",faculty.school_id,"faculty");
            if (!Directory.Exists(uploadDirectory))
            {
                Directory.CreateDirectory(uploadDirectory);
            }

            string imageFileName = null;
            if (!string.IsNullOrEmpty(faculty.image))
            {
                try
                {
                    if (faculty.image.StartsWith("data:image"))
                    {
                        var base64Data = faculty.image.Split(',')[1];
                        faculty.image = base64Data;

                        faculty.image = faculty.image.Trim();

                        byte[] imageBytes = Convert.FromBase64String(faculty.image);

                        imageFileName = Guid.NewGuid().ToString() + ".png";

                        var filePath = Path.Combine(uploadDirectory, imageFileName);

                        await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);
                    }
                    else
                    {
                        imageFileName = faculty.image;
                    }
                }
                catch (FormatException ex)
                {
                    return BadRequest($"Invalid base64 string for image: {ex.Message}");
                }
            }

            string signatureFileName = null;
            if (!string.IsNullOrEmpty(faculty.signature))
            {
                try
                {
                    if (faculty.signature.StartsWith("data:image"))
                    {
                        var base64Data = faculty.signature.Split(',')[1];   
                        faculty.signature = base64Data;  
                    

                    faculty.signature = faculty.signature.Trim();

                    byte[] signatureBytes = Convert.FromBase64String(faculty.signature);

                    signatureFileName = Guid.NewGuid().ToString() + ".png";

                    var signatureFilePath = Path.Combine(uploadDirectory, signatureFileName);

                    await System.IO.File.WriteAllBytesAsync(signatureFilePath, signatureBytes);
                    }
                    else
                    {
                        signatureFileName = faculty.signature;
                    }
                }
                catch (FormatException ex)
                {
                    return BadRequest($"Invalid base64 string for signature: {ex.Message}");
                }
            }

            if (faculty.faculty_id == 0 || faculty.faculty_id == null)
            {

                TbFacultymaster tbFacultymaster = new TbFacultymaster
                {
                    username = faculty.username,
                    first_name = faculty.first_name,
                    last_name = faculty.last_name,
                    password = faculty.password,
                    email = faculty.email,
                    qualification = faculty.qualification,
                    phone = faculty.phone,
                    dob = faculty.dob,
                    gender = faculty.gender,
                    address = faculty.address,
                    status = "Active", 
                    bloodgroup = faculty.bloodgroup,
                    aadhar_card = faculty.aadhar_card,
                    date_of_joining = faculty.date_of_joining,
                    whatsapp_no = faculty.whatsapp_no,
                    designation = faculty.designation,
                    speciality = faculty.speciality,
                    spouse_name = faculty.spouse_name,
                    mother_name = faculty.mother_name,
                    father_name = faculty.father_name,
                    local_address = faculty.local_address,
                    experience = faculty.experience,
                    bank_name = faculty.bank_name,
                    account_no = faculty.account_no,
                    ifsc_code = faculty.ifsc_code,
                    aadhar_no = faculty.aadhar_no,
                    pan_card = faculty.pan_card,
                    passport = faculty.passport,
                    dl_details = faculty.dl_details,
                    pf_account_no = faculty.pf_account_no,
                    school_id = faculty.school_id,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    image = imageFileName,
                    signature = signatureFileName,
                };

                _context.TbFacultymasters.Add(tbFacultymaster);
                await _context.SaveChangesAsync();

                //assign designation in desig mapping 

                if(faculty.designation != null && faculty.designation > 0)
                {
                    int fac_id = await _context.TbFacultymasters.Where(fm => fm.school_id == faculty.school_id && fm.username == faculty.username && fm.password == faculty.password).Select(fm=>fm.faculty_id).FirstOrDefaultAsync();
                    DesigMapping _desigmapping = new DesigMapping
                    {
                        designation_id = faculty.designation ?? 0,
                        faculty_id = fac_id,
                        assigned_at = DateTime.Now,
                        updated_at = DateTime.Now,
                        school_id = faculty.school_id
                    };

                    await _context.DesigMappings.AddAsync(_desigmapping);
                    await _context.SaveChangesAsync();
                }

                return Ok(new { message = "Faculty created successfully", data = faculty });
            }
            else
            {
                var existingFaculty = await _context.TbFacultymasters
            .FirstOrDefaultAsync(f => f.faculty_id == faculty.faculty_id && f.school_id == faculty.school_id);

                if (existingFaculty == null)
                {

                    return NotFound(new { message = $"Faculty with id {faculty.faculty_id} not found." });
                }
                 
                existingFaculty.first_name = faculty.first_name;
                existingFaculty.last_name = faculty.last_name;
                existingFaculty.password = faculty.password;
                existingFaculty.email = faculty.email;
                existingFaculty.qualification = faculty.qualification;
                existingFaculty.phone = faculty.phone;
                existingFaculty.dob = faculty.dob;
                existingFaculty.gender = faculty.gender;
                existingFaculty.address = faculty.address;
                existingFaculty.updated_at = DateTime.Now;
                existingFaculty.bloodgroup = faculty.bloodgroup;
                existingFaculty.aadhar_card = faculty.aadhar_card;
                existingFaculty.date_of_joining = faculty.date_of_joining;
                existingFaculty.whatsapp_no = faculty.whatsapp_no;
                existingFaculty.designation = faculty.designation;
                existingFaculty.speciality = faculty.speciality;
                existingFaculty.spouse_name = faculty.spouse_name;
                existingFaculty.mother_name = faculty.mother_name;
                existingFaculty.father_name = faculty.father_name;
                existingFaculty.local_address = faculty.local_address;
                existingFaculty.experience = faculty.experience;
                existingFaculty.bank_name = faculty.bank_name;
                existingFaculty.account_no = faculty.account_no;
                existingFaculty.ifsc_code = faculty.ifsc_code;
                existingFaculty.aadhar_no = faculty.aadhar_no;
                existingFaculty.pan_card = faculty.pan_card;
                existingFaculty.passport = faculty.passport;
                existingFaculty.dl_details = faculty.dl_details;
                existingFaculty.pf_account_no = faculty.pf_account_no;
                if (!string.IsNullOrEmpty(faculty.image))
                {
                    existingFaculty.image = imageFileName; 
                }

                if (!string.IsNullOrEmpty(faculty.signature))
                {
                    existingFaculty.signature = signatureFileName;  
                }
                 
                await _context.SaveChangesAsync();

                return Ok(new { message = "Data Updated" });
            }

            

            
        }


        #endregion

        #region Update Faculty (PUT)
        // PUT: api/Faculty/update/1
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateFaculty(int id, TbFacultymaster faculty)
        {
            if (id != faculty.faculty_id)
            {
                return BadRequest("Faculty ID mismatch");
            }

            _context.Entry(faculty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        #endregion


        [HttpDelete("changeStatusofFaculty/{id}")]
        public async Task<IActionResult> changeStatusofFaculty(int id, [FromQuery] string status, [FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found! ");
            }
            var faculty = await _context.TbFacultymasters
                             .Where(tf => tf.school_id == school_id && tf.faculty_id == id)
                             .FirstOrDefaultAsync();
            if (faculty == null)
            {
                return NotFound();
            }

            faculty.status = status;
            faculty.updated_at = DateTime.Now;
             
             await _context.SaveChangesAsync();

            return NoContent();
        }


        #region Delete Faculty (DELETE)
        // DELETE: api/Faculty/delete/1
        [HttpDelete("deletePermanent/{id}")]
        public async Task<IActionResult> deleteFaculty(int id, [FromQuery] string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                {
                    return BadRequest("School Id not found!");
                }

                var desig = await _context.DesigMappings.Where(des => des.faculty_id == id && des.school_id == school_id).FirstOrDefaultAsync();

                var faculty = await _context.TbFacultymasters
                                  .Where(tf => tf.school_id == school_id && tf.faculty_id == id)
                                  .FirstOrDefaultAsync();

                if (faculty == null)
                {
                    return NotFound();
                }

                TbFacultymasterDelete tb = new TbFacultymasterDelete
                {
                    username = faculty.username,
                    first_name = faculty.first_name,
                    last_name = faculty.last_name,
                    email = faculty.email,
                    qualification = faculty.qualification,
                    phone = faculty.phone,
                    dob = faculty.dob,
                    gender = faculty.gender,
                    address = faculty.address,
                    status = faculty.status,
                    created_at = faculty.created_at,
                    updated_at = DateTime.Now,
                    school_id = faculty.school_id,
                    bloodgroup = faculty.bloodgroup,
                    aadhar_card = faculty.aadhar_card,
                    date_of_joining = faculty.date_of_joining,
                    whatsapp_no = faculty.whatsapp_no,
                    designation = faculty.designation,
                    speciality = faculty.speciality,
                    spouse_name = faculty.spouse_name,
                    mother_name = faculty.mother_name,
                    father_name = faculty.father_name,
                    local_address = faculty.local_address,
                    experience = faculty.experience,
                    bank_name = faculty.bank_name,
                    account_no = faculty.account_no,
                    ifsc_code = faculty.ifsc_code,
                    aadhar_no = faculty.aadhar_no,
                    pan_card = faculty.pan_card,
                    passport = faculty.passport,
                    password = faculty.password,
                    dl_details = faculty.dl_details,
                    pf_account_no = faculty.pf_account_no,
                    image = faculty.image,
                    signature = faculty.signature
                };

                _context.Remove(desig);
                await _context.SaveChangesAsync();
                _context.TbFacultymasterDeletes.Add(tb);
                _context.TbFacultymasters.Remove(faculty);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion

        [HttpGet("getAlumni")]
        public async Task<IActionResult> getAlumniFaculty([FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("SchoolId is null");
            }
            var faculty = _context.TbFacultymasters.Where(tf => tf.school_id == school_id && tf.status.ToLower() == "withdrawn").ToList();
            return Ok(faculty);

        }

        [HttpGet("getdeletedFaculty")]
        public async Task<IActionResult> getdeletedFaculty([FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("SchoolId is null");
            }
            var faculty = _context.TbFacultymasters.Where(tf => tf.school_id == school_id && tf.status.ToLower() == "inactive").ToList();
            return Ok(faculty);

        }

        //[HttpDelete("moveAlumni/{id}")]
        //public async Task<IActionResult> withdrawnFaculty(int id, [FromQuery] string school_id)
        //{
        //    if(school_id == null)
        //    {
        //        return BadRequest("SchoolId not found! ");
        //    }
        //    if (id == 0 || id == null)
        //    {
        //        return BadRequest("Id not found! ");
        //    }
        //    var faculty = await _context.TbFacultymasters.Where(fm => fm.faculty_id == id && fm.school_id == school_id).FirstOrDefaultAsync();
        //    if(faculty == null)
        //    {
        //        return BadRequest("Data not found! ");
        //    }

        //    faculty.status = "Withdrawn";
        //    await _context.SaveChangesAsync();

        //    return Ok();

        //} 


        [HttpGet("changePswd/{id}")]
        public async Task<IActionResult> changePswd(int id,string pswd,string school_id)
        {
            if(id == 0)
            {
                return BadRequest("Id is null");
            }
            if(school_id == null || school_id == "")
            {
                return BadRequest("School Id not found! ");
            }

            var faculty = await _context.TbFacultymasters.Where(fm => fm.faculty_id == id && fm.school_id == school_id).FirstOrDefaultAsync();
            if(faculty == null)
            {
                return BadRequest("Data not found! ");
            }
            faculty.password = pswd;
            _context.SaveChanges();
            return Ok();
        }


        #region Faculty Login (POST)
        // POST: api/Faculty/login
        [HttpPost("login")]
        public async Task<ActionResult<TbFacultymaster>> Login([FromBody] LoginModel login)
        {
            var faculty = await _context.TbFacultymasters
                                         .FirstOrDefaultAsync(f => f.username == login.username && f.password == login.password);

            if (faculty == null)
            {
                return Unauthorized("Invalid username or password");
            }

            // You can also return a token here if you are implementing JWT authentication
            return Ok(faculty);  // You may choose to return the faculty details or a success message
        }
        #endregion

        #region Helper Method to Check If Faculty Exists
        private bool FacultyExists(int id)
        {
            return _context.TbFacultymasters.Any(f => f.faculty_id == id);
        }
        #endregion

        #region Faculty Attendance Related Data

        #region Get Faculty Attendance

        [HttpGet("getAttendanceInfo")]
        public async Task<IActionResult> attendanceInfo([FromQuery] string school_id, [FromQuery] DateOnly date)
        {
            if (date == null)
            {
                date = DateOnly.FromDateTime(DateTime.Today);
            }
            if (school_id == null)
            {
                return BadRequest("School Id is not found! ");
            }
            var faculties = await _context.TbFacultymasters
      .Where(tf => tf.status == "Active" && tf.school_id == school_id).ToListAsync();

            var attendanceRecord = await _context.faculty_Attendances
                .Where(fa => fa.date == date && fa.school_id == school_id).ToListAsync();

            //var designationRecord = await _context.TbDesignations.ToListAsync();
            var designationRecord = await _context.TbDesignations
                .ToDictionaryAsync(dr => dr.designation_id, dr => dr.designation_name);

            List<faculty_attendance_DTOs> att = new List<faculty_attendance_DTOs>();

            foreach (var faculty in faculties)
            {
                var attendance = attendanceRecord.FirstOrDefault(fa => fa.facultyId == faculty.faculty_id);

                var desig = designationRecord.ContainsKey(Convert.ToInt32(faculty.designation)) ? designationRecord[Convert.ToInt32(faculty.designation)] : null;
                var faculty_DT = new faculty_attendance_DTOs
                {
                    facultyId = faculty.faculty_id,
                    fac_name = faculty.first_name,
                    designation_id = Convert.ToInt32(faculty.designation),
                    designation_name = desig,
                    image = faculty.image,
                    date = attendance?.date ?? DateOnly.FromDateTime(DateTime.Today), 
                    inTime = attendance?.inTime ?? new TimeSpan(0, 0, 0),   
                    outTime = attendance?.outTime ?? new TimeSpan(0, 0, 0), 
                    active = attendance?.active ?? false,
                    status = attendance?.status ?? "",  
                    school_id = attendance?.school_id ?? faculty.school_id  
                };
                att.Add(faculty_DT);
            }

            return Ok(att);
        }

        #endregion

        #region Post Faculty Attendance

        [HttpPost("postAttendanceInfo")]
        public async Task<IActionResult> postAttendanceInfo([FromQuery] string school_id, [FromQuery] DateOnly dateTime,
            [FromBody] List<faculty_attendance_DTOs> faculty_Attendance_DT)
        {
            if(school_id == null)
            {
                return BadRequest("School Id is null! ");
            }

            if(faculty_Attendance_DT == null)
            {
                return BadRequest("Data is null");
            }

            foreach(var att in faculty_Attendance_DT)
            {
                TimeSpan intime = att.inTime == TimeSpan.Zero ? DateTime.Now.TimeOfDay
                    : new TimeSpan(att.inTime.Hours, att.inTime.Minutes, att.inTime.Seconds);
                TimeSpan outtime = att.outTime == TimeSpan.Zero ? DateTime.Now.TimeOfDay
                    : new TimeSpan(att.outTime.Hours, att.outTime.Minutes, att.outTime.Seconds);
                var attrecord = await _context.faculty_Attendances.Where(fa => fa.facultyId == att.facultyId && fa.school_id == att.school_id
                && fa.date == dateTime).FirstOrDefaultAsync();
                if(attrecord == null)
                {
                    if(att.status != "")
                    {
                        faculty_attendance faculty_ = new faculty_attendance
                        {
                            facultyId = att.facultyId,
                            date = dateTime,
                            created_date = att.date.ToDateTime(new TimeOnly(0, 0)),
                            inTime = intime,
                            outTime = att.outTime,
                            active = true,
                            status = att.status,
                            school_id = att.school_id
                        };
                        _context.Add(faculty_);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    attrecord.active = (att.status != "") ? true : false;
                    attrecord.status = att.status;
                    attrecord.inTime = intime;
                    attrecord.outTime = (attrecord.active == true && att.status != "") ? outtime : att.outTime;
                    await _context.SaveChangesAsync();
                }
            }

            return Ok();
        }

        #endregion

        #region Monthly Faculty Attendance Report
        [HttpGet("facultyAttendanceReport")]
        public async Task<IActionResult> facultyAttendanceReport([FromQuery] reportParameter parameter)
        {
            //DateTime dae = DateTime.Now;

            var des = await _context.TbDesignations.ToListAsync();

            var faculties = await _context.TbFacultymasters
      .Where(tf => tf.status == "Active" && tf.school_id == parameter.school_id).ToListAsync();

            var facultyAttendance = await _context.faculty_Attendances.Where(fa => fa.date.Month == parameter.month && fa.date.Year == parameter.year && fa.school_id == parameter.school_id).ToListAsync();
            var faculty = facultyAttendance.Select(f => f.facultyId).Distinct();

            List<DateOnly> monthDates = monthDatesfun(parameter.year, parameter.month);

            var attendanceReport = new List<object>();
            foreach (var fid in faculty)
            {
                var desig = faculties.Where(fa => fa.faculty_id == fid).Select(fa => fa.designation).FirstOrDefault();
                attendanceListReport fac = new attendanceListReport()
                {
                    faculty_id = fid,
                    faculty_name = faculties.Where(fa => fa.faculty_id == fid).Select(fa=>fa.first_name).FirstOrDefault(),
                    desig_id = des.Where(d => d.designation_id == desig).Select(d=>d.designation_id).FirstOrDefault(),
                    desig_name = des.Where(d => d.designation_id == desig).Select(d=>d.designation_name).FirstOrDefault()
                };

                var fInfo = facultyAttendance.Where(fa => fa.facultyId == fid).OrderBy(fa => fa.date).ToList();
                List<faculty_attendance> facdata = new List<faculty_attendance>();
                foreach(var date in monthDates)
                {
                    var currentdate = fInfo.Where(fa => fa.date == date).FirstOrDefault();
                    if(currentdate != null)
                    {
                        facdata.Add(currentdate);
                        //facdates.Add();
                    }
                    else
                    {
                        var data = new faculty_attendance();
                        data.facultyId = fid;
                        data.date = date;
                        data.created_date = DateTime.Now;
                        data.inTime = new TimeSpan(00,00,00);
                        data.outTime = new TimeSpan(00,00,00);
                        data.active = false;
                        data.status = "";
                        data.school_id = parameter.school_id;
                        facdata.Add(data);
                    }
                }
                fac.faculty_ = facdata;
                attendanceReport.Add(fac);
            }
            //filter 

            return Ok(attendanceReport);
        }


        #endregion

        #endregion

        [HttpGet("month-dates")]
        public List<DateOnly> monthDatesfun(int year, int month)
        {
            List<DateOnly> dates = new List<DateOnly>();
             
            var firstDay = new DateOnly(year, month, 1); 
            var lastDay = firstDay.AddMonths(1).AddDays(-1);
             
            for (DateOnly date = firstDay; date <= lastDay; date = date.AddDays(1))
            {
                dates.Add(date);
            }

            return dates;
        }


        #region Faculty mapping With Class and Subject
        [HttpPost("mapSubject")]
        public async Task<IActionResult> mapTeacherSubject([FromQuery] string school_id, [FromBody] faculty_subjectDTOs dTOs)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not Found! ");
            }
            if (dTOs == null)
            {
                return BadRequest("Required data not passed via Service to Controller.");
            }

            var faculty_subjects = await _context.faculty_Subjects.Where(fs => fs.school_id == school_id && fs.faculty_id == dTOs.teacherId).ToListAsync();
            foreach(var fac in faculty_subjects)
            {
                fac.isActive = false;
            }
             
             List<faculty_subject> newMappings = new List<faculty_subject>();
            foreach (var sub in dTOs.subjectIds)
            {
                var existingMapping = faculty_subjects.FirstOrDefault(fs => fs.subject_id == sub);
                if (existingMapping!= null)
                {
                    existingMapping.isActive = true;
                }
                else
                {
                    faculty_subject _Subject = new faculty_subject
                    {
                        faculty_id = dTOs.teacherId,
                        subject_id = sub,
                        isActive = true,
                        school_id = school_id,

                    };
                    newMappings.Add(_Subject);
                }
            }

            _context.faculty_Subjects.UpdateRange(faculty_subjects);
            await _context.AddRangeAsync(newMappings);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher's subjects mapped successfully." });
        }

        [HttpPost("mapClasses")]
        public async Task<IActionResult> mapTeacherClass([FromQuery] string school_id, [FromBody] faculty_classDTOs dTOs)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not Found! ");
            }
            if (dTOs == null)
            {
                return BadRequest("Required data not passed via Service to Controller.");
            }

            var faculty_classes = await _context.faculty_Classes.Where(fs => fs.school_id == school_id && fs.faculty_id == dTOs.teacherId).ToListAsync();
            foreach (var fac in faculty_classes)
            {
                fac.isActive = false;
            }

            List<faculty_classes> newMappings = new List<faculty_classes>();
            foreach (var sub in dTOs.classIds)
            {
                var existingMapping = faculty_classes.FirstOrDefault(fs => fs.class_id == sub);
                if (existingMapping != null)
                {
                    existingMapping.isActive = true;
                }
                else
                {
                    faculty_classes _Classes = new faculty_classes
                    {
                        faculty_id = dTOs.teacherId,
                        class_id = sub,
                        isActive = true,
                        school_id = school_id,

                    };
                    newMappings.Add(_Classes);
                }
            }

            _context.faculty_Classes.UpdateRange(faculty_classes);
            await _context.AddRangeAsync(newMappings);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher's subjects mapped successfully." });

            return Ok();
        }

        [HttpGet("getmapSubject")]
        public async Task<IActionResult> getmapSubjects([FromQuery] string school_id, int teacherId)
        {
            if (string.IsNullOrEmpty(school_id) || teacherId == 0)
            {
                return BadRequest("School Id and Teacher is required. ");
            }

            List<int> faculty_subjects = await _context.faculty_Subjects.Where(fs => fs.school_id == school_id && fs.faculty_id == teacherId && fs.isActive == true)
                .Select(fs => fs.subject_id).ToListAsync();

            return Ok(faculty_subjects);
        }

        [HttpGet("getmapClasses")]
        public async Task<IActionResult> getmapClasses([FromQuery] string school_id, int teacherId)
        {
            if (string.IsNullOrEmpty(school_id) || teacherId == 0)
            {
                return BadRequest("School Id and Teacher is required. ");
            }

            List<int> faculty_classes = await _context.faculty_Classes.Where(fc => fc.school_id == school_id && fc.faculty_id == teacherId && fc.isActive == true)
                .Select(fc => fc.class_id).ToListAsync();

            return Ok(faculty_classes);
        }

        #endregion

    }

    // Login Model for Post request
    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}

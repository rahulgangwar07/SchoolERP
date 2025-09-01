using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Services;
using System.Linq;
using System.Net;

    namespace SchoolERP.Server.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private SchoolERPContext _context;
        private readonly bussinessLogic _bussinessLogic;
        private readonly IWebHostEnvironment _env;

        public RegistrationController(SchoolERPContext context, bussinessLogic bussinessLogic, IWebHostEnvironment env)
        {
            _context = context;
            _bussinessLogic = bussinessLogic;
            _env = env;
        }
        [HttpGet("getStudent")]
        public async Task<IActionResult> getStudent([FromQuery] string status, [FromQuery] string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found! ");
            }
            // Fetch students with their registrations
            var students = await (from s in _context.student_Other_Infos
                                  join r in _context.student_Regs on new { s.uid, s.school_id } equals new { r.uid, r.school_id }
                                  where r.status == status && s.school_id == school_id
                                  select new
                                  {
                                      Student = new Student_Other_info
                                      {
                                          uid = s.uid,
                                          reg_no = s.reg_no ?? "",
                                          old_reg_no = s.old_reg_no ?? "",
                                          first_name = s.first_name,
                                          last_name = s.last_name ?? "",
                                          father_name = s.father_name ?? "",
                                          mother_name = s.mother_name ?? "",
                                          gender = s.gender ?? "",
                                          enquiry_type = s.enquiry_type ?? "",
                                          branch = s.branch ?? "",
                                          description = s.description ?? "",
                                          dob = s.dob ?? null,
                                          state_id = s.state_id ?? 0,
                                          pin_code = s.pin_code ?? "",
                                          city = s.city ?? "",
                                          address = s.address ?? "",
                                          contact_no = s.contact_no ?? "",
                                          alt_contact = s.alt_contact ?? "",
                                          email = s.email ?? "",
                                          enquiry_date = s.enquiry_date ?? null,
                                          academic_year = s.academic_year ?? "",
                                          aadhar_card = s.aadhar_card ?? "",
                                          bloodgroup = s.bloodgroup ?? "",
                                          pen_card = s.pen_card ?? "",
                                          reference = s.reference ?? "",
                                          userid = s.userid ?? "",
                                          password = s.password ?? "",
                                          school_id = s.school_id ?? "",
                                          father_occupation = s.father_occupation ?? "",
                                          father_email = s.father_email ?? "",
                                          father_aadhar = s.father_aadhar ?? "",
                                          father_income = s.father_income ?? "",
                                          father_contact = s.father_contact ?? "",
                                          village = s.village ?? "",
                                          post = s.post ?? "",
                                          stuImage = s.stuImage ?? "",
                                          religion = s.religion ?? "",
                                          caste = s.caste ?? "",
                                          last_institution = s.last_institution ?? "",
                                          tc_no = s.tc_no ?? "",
                                          counsellor = s.counsellor ?? "",
                                          bank_account = s.bank_account ?? "",
                                          ifsc_code = s.ifsc_code ?? ""
                                      },
                                      Registration = new Student_reg
                                      {
                                          id = r.id,
                                          uid = r.uid,
                                          reg_no = r.reg_no ?? "",
                                          adm_date = r.adm_date ?? null,
                                          status = r.status ?? "",
                                          class_id = r.class_id,
                                          created_date = r.created_date,
                                          updated_date = r.updated_date,
                                          registration_amt = r.registration_amt,
                                          mode = r.mode ?? "",
                                          school_id = r.school_id,
                                          session = r.session ?? "2024 - 2025"
                                      }
                                  }).ToListAsync();

            if (!students.Any())
            {
                return NotFound("No students found.");
            }

            // Fetch all StudentMasters in one go to avoid multiple database calls
            var studentMasters = await _context.tb_studentmasters
                .Where(sm => students.Select(s => s.Student.uid).Contains(sm.uid) &&
                             students.Select(s => s.Registration.school_id).Contains(sm.school_id))
                .ToListAsync();

            // Create the DTO list and populate StudentMaster
            var result = students.Select(student => new StudentWithRegistrationDTO
            {
                Student = student.Student,
                Registration = student.Registration,
                StudentMaster = studentMasters.FirstOrDefault(sm => sm.uid == student.Student.uid && sm.school_id == student.Registration.school_id)
            }).ToList();

            return Ok(result);
        }

        [HttpGet("getStudentforFaculty")]
        public async Task<IActionResult> getStudentforFaculty([FromQuery] string status, [FromQuery] string school_id, [FromQuery] int teacherId)
        {
            if (string.IsNullOrEmpty(school_id) || teacherId ==0)
            {
                return BadRequest("School Id and teacherId not found! ");
            }
            List<int> mappedclasses = await _context.faculty_Classes.Where(sch => sch.school_id == school_id && sch.faculty_id == teacherId && sch.isActive == true)
                .Select(f => f.class_id).ToListAsync();
            // Fetch students with their registrations
            var students = await (from s in _context.student_Other_Infos
                                  join r in _context.student_Regs on new { s.uid, s.school_id } equals new { r.uid, r.school_id }
                                  where r.status == status && s.school_id == school_id
                                  select new
                                  {
                                      Student = new Student_Other_info
                                      {
                                          uid = s.uid,
                                          reg_no = s.reg_no ?? "",
                                          old_reg_no = s.old_reg_no ?? "",
                                          first_name = s.first_name,
                                          last_name = s.last_name ?? "",
                                          father_name = s.father_name ?? "",
                                          mother_name = s.mother_name ?? "",
                                          gender = s.gender ?? "",
                                          enquiry_type = s.enquiry_type ?? "",
                                          branch = s.branch ?? "",
                                          description = s.description ?? "",
                                          dob = s.dob ?? null,
                                          state_id = s.state_id ?? 0,
                                          pin_code = s.pin_code ?? "",
                                          city = s.city ?? "",
                                          address = s.address ?? "",
                                          contact_no = s.contact_no ?? "",
                                          alt_contact = s.alt_contact ?? "",
                                          email = s.email ?? "",
                                          enquiry_date = s.enquiry_date ?? null,
                                          academic_year = s.academic_year ?? "",
                                          aadhar_card = s.aadhar_card ?? "",
                                          bloodgroup = s.bloodgroup ?? "",
                                          pen_card = s.pen_card ?? "",
                                          reference = s.reference ?? "",
                                          userid = s.userid ?? "",
                                          password = s.password ?? "",
                                          school_id = s.school_id ?? "",
                                          father_occupation = s.father_occupation ?? "",
                                          father_email = s.father_email ?? "",
                                          father_aadhar = s.father_aadhar ?? "",
                                          father_income = s.father_income ?? "",
                                          father_contact = s.father_contact ?? "",
                                          village = s.village ?? "",
                                          post = s.post ?? "",
                                          stuImage = s.stuImage ?? "",
                                          religion = s.religion ?? "",
                                          caste = s.caste ?? "",
                                          last_institution = s.last_institution ?? "",
                                          tc_no = s.tc_no ?? "",
                                          counsellor = s.counsellor ?? "",
                                          bank_account = s.bank_account ?? "",
                                          ifsc_code = s.ifsc_code ?? ""
                                      },
                                      Registration = new Student_reg
                                      {
                                          id = r.id,
                                          uid = r.uid,
                                          reg_no = r.reg_no ?? "",
                                          adm_date = r.adm_date ?? null,
                                          status = r.status ?? "",
                                          class_id = r.class_id,
                                          created_date = r.created_date,
                                          updated_date = r.updated_date,
                                          registration_amt = r.registration_amt,
                                          mode = r.mode ?? "",
                                          school_id = r.school_id,
                                          session = r.session ?? "2024 - 2025"
                                      }
                                  }).ToListAsync();

            if (!students.Any())
            {
                return NotFound("No students found.");
            }

            var studentMasters = await _context.tb_studentmasters
        .Where(sm => students.Select(s => s.Student.uid).Contains(sm.uid) &&
                     mappedclasses.Contains(sm.class_id ?? 0) &&  // Use ?? for null-coalescing
                     students.Select(s => s.Registration.school_id).Contains(sm.school_id))
        .ToListAsync();

            // Create the DTO list and populate StudentMaster
            var result = students
                .Select(student => new StudentWithRegistrationDTO
                {
                    Student = student.Student,
                    Registration = student.Registration,
                    StudentMaster = studentMasters.FirstOrDefault(sm => sm.uid == student.Student.uid && sm.school_id == student.Registration.school_id)  // Fetch the corresponding StudentMaster or null
                })
                .ToList();

            return Ok(result);
        }

        #region Get Student By ID -stdent that is not registered

        [HttpGet("getStudentbyId/{id}")]
        public async Task<IActionResult> GetStudentById(int id, [FromQuery] string status, [FromQuery] string school_id, [FromQuery] string session)
        {
             
            // Fetch the student details from the database based on the provided `id`
            var student = await (from s in _context.student_Other_Infos
                                 join r in _context.student_Regs on new { s.uid, s.school_id } equals new { r.uid, r.school_id }
                                 where s.uid == id && r.status == status && s.school_id == school_id
                                 select new
                                 {
                                     Student = new Student_Other_info_DTO
                                     {
                                         uid = s.uid,
                                         reg_no = s.reg_no ?? "",
                                         old_reg_no = s.old_reg_no ?? "",
                                         first_name = s.first_name,
                                         last_name = s.last_name ?? "",
                                         class_id = r.class_id,
                                         father_name = s.father_name ?? "",
                                         mother_name = s.mother_name ?? "",
                                         gender = s.gender ?? "",
                                         enquiry_type = s.enquiry_type ?? "",
                                         branch = s.branch ?? "",
                                         description = s.description ?? "",
                                         dob = s.dob ?? null, // Safely handle nulls for dob
                                                              //dob = s.dob.HasValue ? s.dob.Value : DateTime.MinValue, // Safely handle nulls for dob
                                         state_id = s.state_id ?? 0,
                                         pin_code = s.pin_code ?? "",
                                         city = s.city ?? "",
                                         address = s.address ?? "",
                                         contact_no = s.contact_no ?? "",
                                         alt_contact = s.alt_contact ?? "",
                                         email = s.email ?? "",
                                         enquiry_date = s.enquiry_date ?? null, // Safely handle nulls for enquiry_date
                                         academic_year = r.session ?? "",
                                         aadhar_card = s.aadhar_card ?? "",
                                         bloodgroup = s.bloodgroup ?? "",
                                         pen_card = s.pen_card ?? "",
                                         reference = s.reference ?? "",
                                         userid = s.userid ?? "",
                                         password = s.password ?? "",
                                         school_id = s.school_id ?? "",
                                         father_occupation = s.father_occupation ?? "",
                                         father_email = s.father_email ?? "",
                                         father_aadhar = s.father_aadhar ?? "",
                                         father_income = s.father_income ?? "",
                                         father_contact = s.father_contact ?? "",
                                         village = s.village ?? "",
                                         post = s.post ?? "",
                                         stuImage = s.stuImage ?? "",
                                         religion = s.religion ?? "",
                                         caste = s.caste ?? "",
                                         last_institution = s.last_institution ?? "",

                                         tc_no = s.tc_no ?? "",
                                         tc_date = s.tc_date ?? null,
                                         //tc_date = s.tc_date.ToString() ?? DateTime.MinValue.ToString("yyyy-MM-dd"),
                                         counsellor = s.counsellor ?? "",
                                         bank_account = s.bank_account ?? "",
                                         ifsc_code = s.ifsc_code ?? "",
                                         class_name = _context.classNames.Where(cn => cn.class_id == r.class_id).Select(cn => cn.class_name).FirstOrDefault() ?? ""
                                     },
                                     Registration = new Student_reg
                                     {
                                         id = r.id,
                                         uid = r.uid,
                                         reg_no = r.reg_no ?? "",
                                         adm_date = r.adm_date ?? null,// Safely handle null adm_date
                                                                       //adm_date = r.adm_date.HasValue ? r.adm_date.Value : DateTime.MinValue, // Safely handle null adm_date
                                         status = r.status ?? "",
                                         class_id = r.class_id,
                                         created_date = r.created_date,
                                         updated_date = r.updated_date,
                                         registration_amt = r.registration_amt,
                                         mode = r.mode ?? "",
                                         school_id = r.school_id,
                                         session = r.session ?? ""
                                     }
                                 }).FirstOrDefaultAsync();

            var tb_ = await _context.tb_studentmasters.Where(sm => sm.school_id == school_id && sm.session == session && 
            sm.uid == id).Select(sm => new
            {
                sm.stu_id,sm.uid,sm.class_id,
                sec_id = sm.sec_id == null || sm.sec_id == 0 ? 0 : sm.sec_id
            }).FirstOrDefaultAsync();

            if (student == null)
            {
                return NotFound($"Student with ID {id} not found.");
            }

            if(tb_ == null)
            {
                return Ok(new
                {
                    Student = student.Student,
                    Registration = student.Registration,
                    Master = new
                    {
                        stu_id = 0,
                        uid = 0,
                        class_id = 0,
                        sec_id = 0
                    }
                });
            }
            else
            {
                return Ok(new
                {
                    Student = student.Student,
                    Registration = student.Registration,
                    Master = tb_
                });
            }
            
        }

        #endregion

        #region Post Student
        [HttpPost("postStudent")]
        public async Task<IActionResult> postStudent([FromBody] Student_Other_info_DTO student_Other_Info)
        {
            if (student_Other_Info == null)
            {
                return BadRequest("Data is not Available");
            }

            var existingStudent = await _context.student_Other_Infos.FirstOrDefaultAsync(s => s.uid == student_Other_Info.uid);

            if (existingStudent != null)
            {
                var updateResult = await _bussinessLogic.updateStudentInfo(student_Other_Info.uid, student_Other_Info);
                if (updateResult)
                {
                    await _bussinessLogic.updateStudentReg(student_Other_Info.uid, student_Other_Info);
                    return Ok(new { message = "Student info updated successfully" });
                }
                else
                {
                    return NotFound(new { message = "Student not found" });
                }
            }
            else
            {
                var studentId = await _bussinessLogic.insertStudentInfo(student_Other_Info);
                return Ok(new { studentId });
            }
        }


        [HttpPost("postFULLStudent/{nuid}/{step}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> postFULLStudent(int nuid, int step, [FromForm] Student_Other_info2 student_Other_Info, [FromForm] IFormFile stuImage = null)
        {
            if (student_Other_Info == null)
            {
                return BadRequest("Data is not Available");
            }

            if (student_Other_Info.school_id == null)
            {
                return BadRequest("School Id is not Available");
            }

            string userid = generateUserid(student_Other_Info.first_name);
            student_Other_Info.userid = userid;
            student_Other_Info.password = userid;

            string uploadedFileName = null;
            if (stuImage != null && stuImage.Length > 0)
            {
                uploadedFileName = await SaveStudentImageAsync(stuImage,student_Other_Info.school_id);
            }

            if (nuid == 0)
            {
                return await  CreateNewStudentAsync(student_Other_Info, uploadedFileName);
            }
            else
            {
                switch (step)
                {
                    case 1:
                        return await UpdateStudentStep1Async(nuid, student_Other_Info, uploadedFileName);
                    case 2:
                        return await UpdateStudentStep2Async(nuid, student_Other_Info);
                    case 3:
                        return await UpdateStudentStep3Async(nuid, student_Other_Info);
                    case 4:
                        return await UpdateStudentStep4Async(nuid, student_Other_Info);
                    default:
                        return BadRequest("Invalid step.");
                }
            }
        }

        public static string generateUserid(string name)
        {
            var nameParts = name.Split(" ");
            string firstName = nameParts[0];
             
            string firstNamePart = firstName.Length >= 4 ? firstName.Substring(0, 4) : firstName;

            Random rand = new Random();
            int randomNumber = rand.Next(10000000, 99999999);
             
            string userId = firstNamePart.ToUpper() + randomNumber.ToString();
             
            return userId.Substring(0, 10);
        }

        #endregion

        #region Create and Update Student function
        private async Task<IActionResult> CreateNewStudentAsync(Student_Other_info2 student_Other_Info, string uploadedFileName)
        {
            var executionStrategy = _context.Database.CreateExecutionStrategy();

            try
            {
                // Execute the strategy with an async context
                await executionStrategy.ExecuteAsync(async () =>
                {
                    using (var transaction = await _context.Database.BeginTransactionAsync())
                    {
                        try
                        {
                            DateTime enquirydate;
                             
                            if (string.IsNullOrEmpty(student_Other_Info.enquiry_date))
                            {
                                enquirydate = DateTime.Now;
                            }
                            else
                            {
                                enquirydate = DateTime.Parse(student_Other_Info.enquiry_date);
                            }
                             
                            var uid = _context.student_Other_Infos
                                .OrderByDescending(soi => soi.uid)
                                .Select(soi => soi.uid)
                                .FirstOrDefault();

                            student_Other_Info.uid = (uid == null) ? 1 : uid + 1;
                             
                            var newStudent = new Student_Other_info
                            {
                                uid = student_Other_Info.uid,
                                first_name = student_Other_Info.first_name ?? "",
                                last_name = student_Other_Info.last_name ?? "",
                                reg_no = student_Other_Info.reg_no ?? "",
                                userid = student_Other_Info.userid ?? "",
                                password = student_Other_Info.password ?? "",
                                email = student_Other_Info.email ?? "",
                                address = student_Other_Info.address ?? "",
                                gender = student_Other_Info.gender ?? "",
                                aadhar_card = student_Other_Info.aadhar_card ?? "",
                                pen_card = student_Other_Info.pen_card ?? "",
                                pin_code = student_Other_Info.pin_code ?? "",
                                dob = student_Other_Info.dob ?? DateTime.Now,
                                school_id = student_Other_Info.school_id ?? "",
                                stuImage = uploadedFileName
                            };

                            _context.Add(newStudent);
                            await _context.SaveChangesAsync();
                             
                            var studentReg = new Student_reg
                            {
                                uid = student_Other_Info.uid,
                                reg_no = student_Other_Info.reg_no ?? "",
                                adm_date = enquirydate,
                                status = string.IsNullOrEmpty(student_Other_Info.reg_no) ? "Pending" : "Registered",
                                session = student_Other_Info.academic_year ?? "",
                                class_id = Convert.ToInt32(student_Other_Info.class_id),
                                created_date = DateTime.Now,
                                updated_date = DateTime.Now,
                                school_id = student_Other_Info.school_id
                            };

                            _context.Add(studentReg);
                            await _context.SaveChangesAsync();
                             
                            if (!string.IsNullOrEmpty(student_Other_Info.reg_no))
                            {
                                await _bussinessLogic.insertStudentMaster(student_Other_Info);
                            }
                             
                            await transaction.CommitAsync();
                             
                            return new OkObjectResult(student_Other_Info.uid);
                        }
                        catch (Exception ex)
                        { 
                            await transaction.RollbackAsync();
                             
                            throw new Exception($"Internal server error: {ex.Message}");
                        }
                    }
                });
                 
                return Ok(student_Other_Info.uid);
            }
            catch (Exception ex)
            {
                // If any error occurs at the top level (outside the ExecuteAsync)
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }



        private async Task<IActionResult> UpdateStudentStep1Async(int nuid, Student_Other_info2 student_Other_Info, string uploadedFileName)
        {
            // Create an execution strategy for transient failures (optional, used if you expect transient failures like network errors)
            var executionStrategy = _context.Database.CreateExecutionStrategy();

            // Define a result that will be returned at the end of the function
            IActionResult result = null;

            // Execute the logic with the execution strategy
            await executionStrategy.ExecuteAsync(async () =>
            {
                // Start the transaction here so it's properly scoped
                await using var transaction = await _context.Database.BeginTransactionAsync();

                try
                {
                    // Retrieve student information
                    var student = await _context.student_Other_Infos
                        .FirstOrDefaultAsync(x => x.uid == nuid && x.school_id == student_Other_Info.school_id);

                    if (student == null)
                    {
                        // If student is not found, set the result and return early
                        result = NotFound($"Student with UID {nuid} not found.");
                        return;
                    }

                    // Update student information
                    student.first_name = student_Other_Info.first_name;
                    student.last_name = student_Other_Info.last_name;
                    student.userid = student_Other_Info.userid;
                    student.reg_no = string.IsNullOrEmpty(student_Other_Info.reg_no) ? "" : student_Other_Info.reg_no;
                    student.password = student_Other_Info.password;
                    student.contact_no = student_Other_Info.contact_no;
                    student.address = student_Other_Info.address;
                    student.aadhar_card = student_Other_Info.aadhar_card;
                    student.academic_year = student_Other_Info.academic_year;
                    student.pen_card = student_Other_Info.pen_card;
                    student.gender = student_Other_Info.gender;
                    student.email = student_Other_Info.email;
                    student.pin_code = student_Other_Info.pin_code;
                    student.dob = student_Other_Info.dob;

                    // If a new image is uploaded, update it
                    if (uploadedFileName != null)
                    {
                        student.stuImage = uploadedFileName;
                    }

                    // Update the student record in the database
                    _context.Update(student);
                    await _context.SaveChangesAsync(); // Save student update

                    // Retrieve student registration information
                    var studentReg = await _context.student_Regs
                        .FirstOrDefaultAsync(x => x.uid == nuid && x.school_id == student_Other_Info.school_id);

                    if (studentReg == null)
                    {
                        // If student registration is not found, set the result and return early
                        result = NotFound($"Student registration for UID {nuid} not found.");
                        return;
                    }

                    // Update student registration details
                    studentReg.uid = student_Other_Info.uid;
                    studentReg.session = student_Other_Info.academic_year;
                    studentReg.status = string.IsNullOrEmpty(student_Other_Info.reg_no) ? "Pending" : "Registered";
                    studentReg.class_id = Convert.ToInt32(student_Other_Info.class_id);
                    studentReg.reg_no = student_Other_Info.reg_no ?? "";
                    studentReg.adm_date = studentReg.adm_date ?? DateTime.Now;
                    studentReg.school_id = student_Other_Info.school_id;
                     
                    _context.Update(studentReg);
                    await _context.SaveChangesAsync();  
                     
                    if (!string.IsNullOrEmpty(student_Other_Info.reg_no))
                    {
                        var chkStudent = await _context.tb_studentmasters
                            .Where(sm => sm.uid == nuid && sm.session == student_Other_Info.academic_year && sm.school_id == student_Other_Info.school_id)
                            .FirstOrDefaultAsync();

                        if (chkStudent == null)
                        {
                            await _bussinessLogic.insertStudentMaster(student_Other_Info);
                        }
                        else
                        {
                            await _bussinessLogic.updateStudentMaster(chkStudent, student_Other_Info);
                        }
                    }
                     
                    await transaction.CommitAsync();
                     
                    result = Ok(student_Other_Info.uid);
                }
                catch (Exception ex)
                { 
                    await transaction.RollbackAsync();
                    result = StatusCode(500, $"Internal Server Error: {ex.Message}");
                }
            });

            // Return the result after execution completes
            return result;
        }
          
        private async Task<IActionResult> UpdateStudentStep2Async(int nuid, Student_Other_info2 student_Other_Info)
        {
            var existingStudent = await _context.student_Other_Infos
                    .Where(s => s.uid == nuid)
                    .Select(s => new Student_Other_info
                    {
                        uid = s.uid,
                        mother_name = student_Other_Info.mother_name ?? "",
                        father_name = student_Other_Info.father_name ?? "",
                        father_occupation = student_Other_Info.father_occupation ?? "",
                        father_email = student_Other_Info.father_email ?? "",
                        father_aadhar = student_Other_Info.father_aadhar ?? "",
                        father_income = student_Other_Info.father_income ?? "",
                        father_contact = student_Other_Info.father_contact ?? "",
                        village = student_Other_Info.village ?? "",
                        post = student_Other_Info.post ?? "",
                        pin_code = student_Other_Info.pin_code ?? "",
                        city = student_Other_Info.city ?? "",
                        state_id = student_Other_Info.state_id ?? 0
                    })
                    .FirstOrDefaultAsync();

            // Check if the student exists
            if (existingStudent == null)
            {
                return NotFound($"Student with UID {nuid} not found.");
            }

            // Update the student's details with the provided data
            existingStudent.mother_name = student_Other_Info.mother_name ?? existingStudent.mother_name;
            existingStudent.father_name = student_Other_Info.father_name ?? existingStudent.father_name;
            existingStudent.father_occupation = student_Other_Info.father_occupation ?? existingStudent.father_occupation;
            existingStudent.father_email = student_Other_Info.father_email ?? existingStudent.father_email;
            existingStudent.father_aadhar = student_Other_Info.father_aadhar ?? existingStudent.father_aadhar;
            existingStudent.father_income = student_Other_Info.father_income ?? existingStudent.father_income;
            existingStudent.father_contact = student_Other_Info.father_contact ?? existingStudent.father_contact;
            existingStudent.village = student_Other_Info.village ?? existingStudent.village;
            existingStudent.post = student_Other_Info.post ?? existingStudent.post;
            existingStudent.pin_code = student_Other_Info.pin_code ?? existingStudent.pin_code;
            existingStudent.city = student_Other_Info.city ?? existingStudent.city;
            existingStudent.state_id = student_Other_Info.state_id ?? existingStudent.state_id;

            // Mark the properties as modified
            _context.Entry(existingStudent).Property(x => x.mother_name).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_name).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_occupation).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_email).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_aadhar).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_income).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.father_contact).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.village).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.post).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.pin_code).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.city).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.state_id).IsModified = true;

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(existingStudent);
        }

        private async Task<IActionResult> UpdateStudentStep3Async(int nuid, Student_Other_info2 student_Other_Info)
        {
            var existingStudent = await _context.student_Other_Infos
                    .Where(s => s.uid == nuid && s.school_id == student_Other_Info.school_id)
                    .Select(s => new Student_Other_info
                    {
                        uid = s.uid,
                        religion = s.religion,
                        caste = s.caste,
                        last_institution = s.last_institution,
                        tc_no = s.tc_no,
                        tc_date = s.tc_date
                    })
                    .FirstOrDefaultAsync();

            if (existingStudent == null)
            {
                return NotFound($"Student with UID {nuid} not found.");
            }

            existingStudent.religion = student_Other_Info.religion ?? existingStudent.religion;
            existingStudent.caste = student_Other_Info.caste ?? existingStudent.caste;
            existingStudent.last_institution = student_Other_Info.last_institution ?? existingStudent.last_institution;
            existingStudent.tc_no = student_Other_Info.tc_no ?? existingStudent.tc_no;
            existingStudent.tc_date = student_Other_Info.tc_date ?? existingStudent.tc_date;
            await _context.SaveChangesAsync();

            _context.Entry(existingStudent).Property(x => x.religion).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.caste).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.last_institution).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.tc_no).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.tc_date).IsModified = true;

            // Update existingStudentreg

            var reg = _context.student_Regs.Where(p => p.uid == nuid && p.school_id == student_Other_Info.school_id).FirstOrDefault();

            reg.session = student_Other_Info.academic_year;
            _context.Database.ExecuteSqlRaw("update student_reg set session='" + student_Other_Info.academic_year + "' where uid='" + student_Other_Info.uid + "' and school_id='" + student_Other_Info.school_id + "'");


            await _context.SaveChangesAsync();

            return Ok(existingStudent);
        }

        private async Task<IActionResult> UpdateStudentStep4Async(int nuid, Student_Other_info2 student_Other_Info)
        {
            var existingStudent = _context.student_Other_Infos
                    .Where(s => s.uid == nuid)
                    .Select(s => new Student_Other_info
                    {
                        uid = s.uid,
                        counsellor = s.counsellor,
                        bank_account = s.bank_account,
                        ifsc_code = s.ifsc_code
                    })
                    .FirstOrDefault();

            // Update the student's counsellor and bank account details
            existingStudent.counsellor = student_Other_Info.counsellor ?? existingStudent.counsellor;
            existingStudent.bank_account = student_Other_Info.bank_account ?? existingStudent.bank_account;
            existingStudent.ifsc_code = student_Other_Info.ifsc_code ?? existingStudent.ifsc_code;

            // Mark properties as modified
            _context.Entry(existingStudent).Property(x => x.counsellor).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.bank_account).IsModified = true;
            _context.Entry(existingStudent).Property(x => x.ifsc_code).IsModified = true;

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(existingStudent);
        }
        #endregion

        #region Save Student Image
        private async Task<string> SaveStudentImageAsync(IFormFile stuImage,string school_id)
        { 
            var uploadsFolder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "student");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            var uniqueFileName = Path.GetFileNameWithoutExtension(stuImage.FileName) + "_" + Guid.NewGuid().ToString() + Path.GetExtension(stuImage.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await stuImage.CopyToAsync(stream);
            }

            return uniqueFileName;
        }
        #endregion


        #region delete/Restore Student Temprary    
        [HttpDelete("deletestu/{uid}")]
        public async Task<IActionResult> DeleteStudent(int uid, string school_id)
        {
            if (uid == 0)
            {
                return BadRequest("Uid not available");
            }

            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found");
            }

            var executionStrategy = _context.Database.CreateExecutionStrategy();

            try
            {
                IActionResult result = null;  // To store the final result for returning later

                await executionStrategy.ExecuteAsync(async () =>
                {
                    using (var transaction = await _context.Database.BeginTransactionAsync())
                    {
                        try
                        {
                            // If data exists, update status to "Inactive" instead of deleting
                            var stumaster = await _context.tb_studentmasters
                                .Where(sm => sm.status == "Registered" && sm.uid == uid)
                                .OrderByDescending(sm => sm.stu_id)
                                .FirstOrDefaultAsync();

                            if (stumaster != null)
                            {
                                stumaster.status = "Inactive";
                                await _context.SaveChangesAsync();
                            }
                            else
                            { 
                                var studentreg = await _context.student_Regs
                                    .Where(sr => sr.uid == uid && sr.school_id == school_id)
                                    .FirstOrDefaultAsync();

                                var studentotherinfo = await _context.student_Other_Infos
                                    .Where(so => so.uid == uid && so.school_id == school_id)
                                    .FirstOrDefaultAsync();

                                if (studentreg == null || studentotherinfo == null)
                                { 
                                    result = NotFound("Student or associated records not found.");
                                    return;  
                                }
                                 
                                _context.Remove(studentreg);
                                _context.Remove(studentotherinfo);

                                await _context.SaveChangesAsync();
                            }
                             
                            await transaction.CommitAsync();
                             
                            result = Ok(new { message = "Student and associated records deleted successfully." });
                        }
                        catch (Exception ex)
                        { 
                            await transaction.RollbackAsync();
                            throw new Exception($"Error during delete operation: {ex.Message}");
                        }
                    }
                });
                 
                return result ?? StatusCode(500, "Unexpected error occurred.");
            }
            catch (Exception ex)
            {
                // Catch any errors from the outer context and return a 500 status code
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }


        #endregion

        #region Post Enquiry and get Registration
        [HttpPost("postEnquiry")]
        public async Task<IActionResult> postEnquiry(Student_reg student_Reg)
        {
            if (student_Reg == null)
            {
                return BadRequest();
            }

            return Ok();
        }
        #endregion

        [HttpGet("getRegistrationno/{regno}")]
        public async Task<IActionResult> getRegistrationno(string regno, string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found!");
            }
            if (regno == "0")
            {
                regno = "";
            }

            checkRegistration check = new checkRegistration
            {
                status = false
            };

            var regnos = await _context.student_Regs
                .Where(sr => sr.school_id == school_id && !string.IsNullOrEmpty(sr.reg_no))
                .OrderByDescending(sr => sr.uid)
                .Select(sr => sr.reg_no)
                .FirstOrDefaultAsync();
            string str = "";
            string substr = "";
            if (regnos == null)
            {
                str = "1";
                substr = "1";
            }
            else
            {
                //str = GetNextRegistrationNumber(regnos);
                substr = GetNextRegistrationNumber(regnos);
                var item = _context.student_Regs.Where(sr => sr.reg_no == substr && sr.school_id == school_id).FirstOrDefault();
                if (item == null)
                {

                    str += substr;
                }

            }
            int i = 0;
            while (i < 3)
            {
                substr = GetNextRegistrationNumber(substr);
                var item = _context.student_Regs.Where(sr => sr.reg_no == substr && sr.school_id == school_id).FirstOrDefault();
                if (item == null)
                {

                    str += "," + substr;
                    i++;
                }
            }

            if (regnos == null)
            {
                check.avaiableRegno = str;
                check.status = true;
            }
            else if (regnos == regno)
            {
                check.avaiableRegno = str;
                check.status = false;
            }
            else
            {
                check.avaiableRegno = str;
                check.status = true;
            }

            return Ok(check);
        }

        #region Temprary disable
        [HttpPost("stuIsActive/{uid}")]
        public async Task<IActionResult> isActiveStatus(int uid, [FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found! ");
            }

            if (uid == null)
            {
                return BadRequest();
            }

            var stu = await _context.tb_studentmasters.Where(sm => sm.uid == uid && sm.school_id == sm.school_id).OrderByDescending(sm => sm.stu_id).FirstOrDefaultAsync();
            if (stu == null)
            {
                return BadRequest("Data not found! ");
            }
            stu.isActive = !stu.isActive;
            await _context.SaveChangesAsync();

            return Ok(stu);
        }
        #endregion

        #region Move to Alumni (Withdrawn Student)

        [HttpPost("moveToalumni/{uid}")]
        public async Task<IActionResult> moveToalumni(int uid, [FromQuery] string school_id)
        {
            if (school_id == null)
            {
                return BadRequest("School Id not found! ");
            }

            if (uid == 0)
            {
                return BadRequest();
            }

            var stu = await _context.tb_studentmasters.Where(sm => sm.uid == uid && sm.school_id == sm.school_id).OrderByDescending(sm => sm.stu_id).FirstOrDefaultAsync();
            if (stu == null)
            {
                return BadRequest("Data not found! ");
            }
            stu.status = "Withdrawn";
            await _context.SaveChangesAsync();

            return Ok(stu);
        }
        #endregion

        #region change Password

        [HttpGet("changePassword/{uid}")]
        public async Task<IActionResult> changePsword(int uid, [FromQuery] string school_id, [FromQuery] string psword, string user_id)
        {
            if (uid == 0 || school_id == null || psword == null || user_id == null)
            {
                return BadRequest();
            }
            var data = await _context.student_Other_Infos.Where(so => so.uid == uid && so.school_id == school_id).FirstOrDefaultAsync();
            if (data == null)
            {
                return NotFound("Data not found!. ");
            }
            data.password = psword;
            await _context.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #region TrashBox & Alumni Logic 
        [HttpGet("trashboxAlumniData")]
        public async Task<IActionResult> trashboxAlumniData([FromQuery] string school_id, string status)
        {
            if (school_id == null)
            {
                return BadRequest("SchoolId is not found! ");
            }

            // Fetch class names into memory for the given school_id
            var classes = await _context.classNames
                                        .Where(cn => cn.school_id == school_id)
                                        .ToListAsync();

            // Fetch student data
            var students = await (from sm in _context.tb_studentmasters
                                  join so in _context.student_Other_Infos on new { sm.uid, sm.school_id } equals new { so.uid, so.school_id }
                                  join sr in _context.student_Regs on new { so.uid, so.school_id } equals new { sr.uid, sr.school_id }
                                  where sm.school_id == school_id && sm.status == status
                                  select new
                                  {
                                      sm.stu_id,
                                      sm.uid,
                                      sm.registration_no,
                                      sm.status,
                                      sm.isActive,
                                      so.first_name,
                                      so.last_name,
                                      sm.class_id,
                                      so.aadhar_card,
                                      so.father_name,
                                      so.mother_name,
                                      so.gender,
                                      so.stuImage,
                                      sr.adm_date,
                                      sr.created_date,
                                      sr.updated_date,
                                      sr.registration_amt,
                                      sr.mode,
                                      sr.session
                                  }).ToListAsync();

            // Join class names with students in memory
            var result = students.Select(sm => new
            {
                studentMaster = new
                {
                    sm.stu_id,
                    sm.uid,
                    sm.registration_no,
                    sm.status,
                    sm.isActive,
                    sm.first_name,
                    sm.last_name,
                    sm.class_id,
                    class_name = classes.FirstOrDefault(cls => cls.class_id == sm.class_id)?.class_name,  // Get class_name from in-memory classes
                    sm.aadhar_card,
                    sm.father_name,
                    sm.mother_name,
                    sm.gender,
                    sm.stuImage,
                    sm.adm_date,
                    sm.created_date,
                    sm.updated_date,
                    sm.registration_amt,
                    sm.mode,
                    sm.session
                }
            }).ToList();
            return Ok(result);
        }
        #endregion

        #region Restore Student

        [HttpPost("restorestu/{uid}")]
        public async Task<IActionResult> restoreStudent(int uid, [FromQuery] int stu_id, [FromQuery] string school_id)
        {
            if (uid == 0 && stu_id == 0)
            {
                return BadRequest("UID/STUID not found! ");
            }
            if (school_id == null)
            {
                return BadRequest("SchoolId is null");
            }

            var data = await _context.tb_studentmasters.Where(sm => sm.school_id == school_id && sm.uid == uid && sm.stu_id == stu_id).FirstOrDefaultAsync();
            if (data == null)
            {
                return BadRequest("Data not Found! ");
            }

            data.status = "Registered";
            await _context.SaveChangesAsync();

            return Ok(data);
        }

        #endregion

        //#region get Alumni Data
        //[HttpGet("getAlumni")]
        //public async Task<IActionResult> getAlumni(string school_id)
        //{
        //    var data = await (from sm in _context.tb_studentmasters join so in _context.student_Other_Infos on new { sm.uid, sm.school_id }
        //    equals new { so.uid, so.school_id } join sr in _context.student_Regs on new { sm.uid, sm.school_id } equals new { sr.uid, sr.school_id }
        //    where sm.school_id == school_id && sm.status == "Withdrawn"
        //    select new
        //    {
        //        sm.stu_id,
        //        sm.uid,
        //        sm.registration_no,
        //        sm.status,
        //        sm.isActive,
        //        so.first_name,
        //        so.last_name,
        //        sm.class_id,
        //        so.aadhar_card,
        //        so.father_name,
        //        so.mother_name,
        //        so.gender,
        //        so.stuImage,
        //        sr.adm_date,
        //        sr.created_date,
        //        sr.updated_date,
        //        sr.registration_amt,
        //        sr.mode,
        //        sr.session
        //    }).ToListAsync();

        //    return Ok();
        //}

        //#endregion

        #region PermanentDetele student
        [HttpPost("permanentDelete/{uid}")]
        public async Task<IActionResult> permanentDelete(int uid,string school_id,[FromBody] int stu_id)
        { 

            if (school_id == null)
            {
                return BadRequest("School_id not Found!. ");
            }
            if(uid == 0 || stu_id == 0)
            {
                return BadRequest("UID/STUID not found!. ");
            }

            var stu = await _context.tb_studentmasters.Where(sm => sm.uid == uid && sm.stu_id == stu_id && sm.school_id == school_id).FirstOrDefaultAsync();
            if(stu == null)
            {
                return NotFound();
            }
            stu.status = "Deleted";
            await _context.SaveChangesAsync();

            return Ok(stu);
        }

        #endregion

        #region Generate TC

        [HttpGet("generateTC/{uid}/{stuId}")]
        public async Task<IActionResult> generateTC(int uid,int stuId,string school_id)
        {
            if(school_id == null)
            {
                return BadRequest("School Id not Found! ");
            }
            if(uid == 0 || stuId == 0)
            {
                return BadRequest("UID/STUID not available. ");
            }

            var data = await (from sm in _context.tb_studentmasters join so in _context.student_Other_Infos on new { sm.uid, sm.school_id } equals new { so.uid, so.school_id }
                        where sm.uid == uid && sm.stu_id == stuId && sm.school_id == school_id
                        select new
                        {
                            sm.uid,
                            sm.stu_id,
                            sm.sec_id,
                            so.first_name,
                            so.pen_card,
                            so.mother_name,
                            so.father_name,
                            so.state_id,
                            so.caste,
                            sm.class_id
                        }).FirstOrDefaultAsync();
             
            return Ok(data);
        }

        #endregion

        private string GetNextRegistrationNumber(string currentRegno)
        {
            // Check if the registration number has an underscore
            int lastUnderscoreIndex = currentRegno.LastIndexOf('_');

            if (lastUnderscoreIndex == -1)
            { 
                if (int.TryParse(currentRegno, out int num))
                {
                    num++;  
                    return num.ToString();  
                }
                else
                { 
                    return currentRegno + "_1";
                }
            }
            else
            {
                // If there's an underscore, split into alpha and numeric parts
                string alphaPart = currentRegno.Substring(0, lastUnderscoreIndex);
                string numericPart = currentRegno.Substring(lastUnderscoreIndex + 1);

                if (int.TryParse(numericPart, out int num))
                {
                    num++;  // Increment the numeric part
                    return alphaPart + "_" + num.ToString("D" + numericPart.Length);  // Format with leading zeros
                }
                else
                {
                    // If the numeric part is invalid, append "_1"
                    return currentRegno + "_1";
                }
            }
        }




        
    }

}
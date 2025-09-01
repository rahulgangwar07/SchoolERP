using Azure.Identity;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Academics;
using SchoolERP.Server.Models.Student_Models;
using System;
using System.Data;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicsController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<AcademicsController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public AcademicsController(ILogger<AcademicsController> logger, SchoolERPContext context, IWebHostEnvironment env, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _env = env;
            _configuration = configuration;
        }

        [HttpPost("execute-query")]
        public async Task<IActionResult> ExecuteQuery([FromBody] string query)
        {
            try
            {
                string connectionString = _configuration.GetConnectionString("SchoolERPConnection"); 
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    // Create command and assign the stored procedure to be executed
                    SqlCommand command = new SqlCommand("testing", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    // Add the query parameter
                    command.Parameters.Add(new SqlParameter("@qry", query));

                    // Open connection
                    await connection.OpenAsync();

                    // Execute the stored procedure
                    await command.ExecuteNonQueryAsync();

                    return Ok("Query executed successfully.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error executing query");
                return BadRequest("Error executing query.");
            }
        }

        #region APIs for Learning Material 

        [HttpGet("learning-material")]
        public async Task<IActionResult> GetLearningMaterial(string school_id="keasr_123")
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is required Field!");
            }
 
            try
            { 
                using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
                {
                    await connection.OpenAsync();
                     
                    var insertQuery = @"
                
                 ";

                    // Execute the SQL query (inserting data into 'template_macro_usage')
                    using (var command = new SqlCommand(insertQuery, connection))
                    {
                        await command.ExecuteNonQueryAsync();
                    }
                }
                 
                var material = await _context.learningMaterials
                    .Where(lm => lm.school_id == school_id && lm.isActive == true)
                    .ToListAsync();

                return Ok(material);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


      

        [HttpGet("learning-material-id")]
        public async Task<IActionResult> GetLearningMaterial(string school_id, int clsId, int subId)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is required Field!");
            }
            var material = await _context.learningMaterials
                                         .Where(lm => lm.school_id == school_id && lm.class_id == clsId && lm.subject_id == subId && lm.isActive == true)
                                         .ToListAsync();

            return Ok(material);
        }

        [HttpPost("upload-learning-material")]
        public async Task<IActionResult> UploadLearningMaterial([FromForm] selfLearningMaterial_DTOs _DTOs)
        {
            if (string.IsNullOrEmpty(_DTOs.school_id))
            {
                return BadRequest("School Id is a required field!");
            }

            if (_DTOs.file == null || _DTOs.file.Length == 0)
            {
                return BadRequest("No file uploaded!");
            }
             
            var uploadsFolder = Path.Combine(_env.WebRootPath,"api", "uploads", _DTOs.school_id, "academics");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            } 

            string extension = Path.GetExtension(_DTOs.file.FileName);  
            string cleanFileName = Path.GetFileNameWithoutExtension(_DTOs.file.FileName); 
            string fileName = $"{cleanFileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";

            var filePath = Path.Combine(uploadsFolder, fileName);
             
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await _DTOs.file.CopyToAsync(stream);
            }
             
            long fileSize = new FileInfo(filePath).Length;

            List<selfLearningMaterial> materials = await _context.learningMaterials.Where(lm => lm.school_id == _DTOs.school_id && lm.class_id == _DTOs.class_id &&
                    lm.subject_id == _DTOs.subject_id && lm.isActive == true).ToListAsync() ;

            foreach(var m in materials)
            {
                m.isActive = false;
            }
            await _context.SaveChangesAsync();
             
            var material = new selfLearningMaterial
            {
                school_id = _DTOs.school_id,
                class_id = _DTOs.class_id,
                subject_id = _DTOs.subject_id,
                content_title = _DTOs.content_title,
                content_type = _DTOs.content_type,
                content_url = _DTOs.content_url,
                FileName = fileName,
                FileSize = fileSize,
                isActive = true,
                created_at = DateTime.UtcNow,
                updated_at = DateTime.UtcNow
            };
             
            _context.learningMaterials.Add(material);
            await _context.SaveChangesAsync();

            return Ok(new { message = "File uploaded successfully", materialId = material.material_id });
        }

        #endregion

        #region APIs for All Types Assignments(homework,classword,dailywork)

        [HttpGet("get-assignment")]
        public async Task<IActionResult> getAssignment(string school_id, int desig_id, string user_id, string type)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(type))
            {
                return NotFound("School Id or type not Exists! ");
            } 

            var classes = await _context.classNames.Where(cn => cn.school_id == school_id && cn.status == true).ToListAsync();
            var workAssign = await _context.workAssignments.Where(wa => wa.school_id == school_id && wa.type == type && (desig_id == 2 || wa.created_by == user_id) && wa.status == true).ToListAsync();
            var assignmentIds = workAssign.Select(wa => wa.assignment_id).ToList();
            var assignAssignment = await _context.assignmentAttachments.Where(ass => assignmentIds.Contains(ass.assignment_id) && ass.isDeleted == false).ToListAsync();
            List<assignmentSubjectsDTOs> assignNotes = await (from ss in _context.assignmentSubjects
                                                              where assignmentIds.Contains(ss.assignment_id)
                                                                    && ss.subject_id == 0 && ss.isDeleted == false
                                                              select new assignmentSubjectsDTOs
                                                              {
                                                                  id = ss.id,
                                                                  assignment_id = ss.assignment_id,
                                                                  subject_id = ss.subject_id,
                                                                  subject_name = "Notes",
                                                                  description = ss.description,
                                                                  isDeleted = ss.isDeleted,
                                                              }).ToListAsync();
            // Fetching the assignment subjects
            List<assignmentSubjectsDTOs> assignsubj = await (from ss in _context.assignmentSubjects
                                                             join sub in _context.subjects on ss.subject_id equals sub.subject_id into subjectJoin
                                                             from sub in subjectJoin.DefaultIfEmpty()  
                                                             where assignmentIds.Contains(ss.assignment_id)
                                                                   && sub.school_id == school_id
                                                                   && (sub.IsActive == true || ss.subject_id == 0)
                                                             select new assignmentSubjectsDTOs
                                                             {
                                                                 id = ss.id,
                                                                 assignment_id = ss.assignment_id,
                                                                 subject_id = ss.subject_id,
                                                                 subject_name = ss.subject_id == 0 ? "Notes" : sub.subject_name,
                                                                 description = ss.description,
                                                                 isDeleted = ss.isDeleted,
                                                             }).ToListAsync();
             


            // Use AddRange to add the Notes subjects to assignsubj
            assignsubj.AddRange(assignNotes);

            List<fetchAssignmentDTOs> fetchAssignmentDTOs = new List<fetchAssignmentDTOs>();
            foreach (var work in workAssign)
            {
                fetchAssignmentDTOs dTOs = new fetchAssignmentDTOs();
                dTOs.assignment_id = work.assignment_id;
                dTOs.date = work.date;
                dTOs.class_id = work.class_id;
                dTOs.class_name = classes.Where(cls => cls.class_id == work.class_id).Select(cls => cls.dis_name).FirstOrDefault();
                dTOs.sec_id = work.sec_id;
                dTOs.due_date = work.due_date;
                dTOs.priority = work.priority;
                dTOs.status = work.status;
                dTOs.type = work.type;
                dTOs.remarks = work.remarks;
                dTOs.feedback = work.feedback;
                dTOs.videoLink = work.videoLink;
                dTOs.created_by = work.created_by;
                dTOs.school_id = work.school_id;

                List<assignmentAttachments> assignment = assignAssignment.Where(aa => aa.assignment_id == work.assignment_id).ToList();
                List<assignmentSubjectsDTOs> subjects = assignsubj.Where(aa => aa.assignment_id == work.assignment_id)
    .OrderByDescending(s => s.subject_id == 0).ToList();

                dTOs.assignments = assignment;
                dTOs.subjects = subjects;
                fetchAssignmentDTOs.Add(dTOs);
            }

            return Ok(fetchAssignmentDTOs);
        }


        [HttpPut("put-assignment")]
        public async Task<IActionResult> updateAssignment(string school_id, [FromBody] assignmentDTOs data)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null!");
            }
             
            workAssignment assignment = await _context.workAssignments
                .Where(wa => wa.school_id == school_id && wa.assignment_id == data.assignment_id).FirstOrDefaultAsync();

            if (assignment == null)
            {
                return NotFound("Assignment not found!");
            }
             
            assignment.type = data.type;
            assignment.date = data.date;
            assignment.class_id = data.class_id;
            assignment.sec_id = data.sec_id;
            assignment.videoLink = data.videoLink;
            assignment.status = data.status ?? true;   
            assignment.created_by = data.created_by;
             
            await _context.SaveChangesAsync();

            if (data.subjects != null && data.subjects.Any())
            { 
                List<assignmentSubjects> subjects = await _context.assignmentSubjects
                    .Where(a => a.assignment_id == data.assignment_id)
                    .ToListAsync();
                 
                foreach (var subj in subjects)
                {
                    var s  = data.subjects.FirstOrDefault(ss => ss.subject_id == subj.subject_id);
                    subj.description = s.description; 
                }
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Assignment updated successfully." });
        }



        [HttpPost("submit-assignment")]
        public async Task<IActionResult> submitAssignment(string school_id, string created_by, [FromForm] assignmentDTOs dTOs)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null!");
            }
              
            // Deserialize the 'subjects' JSON into a List<subjects>
            //List<subjects> subjectsList = JsonConvert.DeserializeObject<List<subjects>>(dTOs.subjects); 

            workAssignment work = new workAssignment
            {
                date = dTOs.date,
                class_id = dTOs.class_id,
                due_date = dTOs.date,
                priority = "high",
                status = true,
                type = dTOs.type,
                remarks = "",
                feedback = "",
                videoLink = dTOs.videoLink,
                created_by = created_by,
                school_id = school_id
            };

            _context.workAssignments.Add(work);
            await _context.SaveChangesAsync();

            int assignment_id = work.assignment_id;

            List<assignmentSubjects> assignments = new List<assignmentSubjects>();

            foreach (var item in dTOs.subjects)
            {
                if (!string.IsNullOrEmpty(item.description))
                {
                    assignmentSubjects subject = new assignmentSubjects
                    {
                        assignment_id = assignment_id,
                        subject_id = item.subject_id,
                        description = item.description
                    };
                    assignments.Add(subject);
                }

            }

            await _context.assignmentSubjects.AddRangeAsync(assignments);
            await _context.SaveChangesAsync();


            if (dTOs.file.Length != 0 && dTOs.file != null)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "academics");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                List<assignmentAttachments> attachments = new List<assignmentAttachments>();
                foreach (IFormFile file in dTOs.file)
                {
                    string extension = Path.GetExtension(file.FileName);
                    string cleanfileName = Path.GetFileNameWithoutExtension(file.FileName);
                    string fileName = $"{cleanfileName}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
                    var filePath = Path.Combine(uploadsFolder, fileName);
                    using (var stram = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stram);
                    }
                    assignmentAttachments attachments1 = new assignmentAttachments
                    {
                        assignment_id = assignment_id,
                        attachment = fileName,
                        isDeleted = false
                    };
                    attachments.Add(attachments1);
                }
                if (attachments.Count > 0)
                {
                    _context.AddRange(attachments);
                    await _context.SaveChangesAsync();
                }


                //using (var stream = new FileStream(filePath, FileMode.Create))
                //{
                //    await _DTOs.file.CopyToAsync(stream);
                //}
            }

            return Ok(new { message = "Assignment submitted successfully." });
        }

        [HttpDelete("delete-assignment")]
        public async Task<IActionResult> deleteAssignment(string school_id,int assignment_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id not found! ");
            }

            workAssignment work = await _context.workAssignments.Where(wa => wa.school_id == school_id && wa.assignment_id == assignment_id).FirstOrDefaultAsync();
            work.status = false;
            await _context.SaveChangesAsync();
            return Ok(work);

        }

        [HttpGet("get-student-report")]
        public async Task<IActionResult> getStudentReport(string school_id,string session,int class_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("SchoolId is mandetory! ");
            }
             

            using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
            {
                DataTable dt = new DataTable();
                await con.OpenAsync();
                using (SqlCommand cmd = new SqlCommand("assignment_report",con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@school_id",school_id);
                    cmd.Parameters.AddWithValue("@session",session);
                    cmd.Parameters.AddWithValue("@class_id",class_id);

                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        await Task.Run(() => sda.Fill(dt));
                    }
                }
                con.CloseAsync();

                List<assignmentReportDtos> reports = new List<assignmentReportDtos>();
                if (dt.Rows.Count > 0)
                {
                    for(int i = 0; i < dt.Rows.Count; i++)
                    {
                        assignmentReportDtos assignment = new assignmentReportDtos
                        {
                            reply_id = Convert.ToInt32(dt.Rows[i]["reply_id"].ToString()),
                            assignment_id = Convert.ToInt32(dt.Rows[i]["assignment_id"].ToString()),
                            stu_id = Convert.ToInt32(dt.Rows[i]["stu_id"].ToString()),
                            registration_no = dt.Rows[i]["registration_no"].ToString(),
                            stu_name = dt.Rows[i]["stu_name"].ToString(),
                            class_id = Convert.ToInt32(dt.Rows[i]["class_id"].ToString()),
                            sec_id = Convert.ToInt32(dt.Rows[i]["sec_id"].ToString()),
                            faculty_id = Convert.ToInt32(dt.Rows[i]["faculty_id"].ToString()),
                            father_name = dt.Rows[i]["father_name"].ToString(),
                            school_id = dt.Rows[i]["school_id"].ToString(),
                            stu_reply = dt.Rows[i]["stu_reply"].ToString(),
                            stu_permission = dt.Rows[i]["stu_permission"].ToString(),
                            faculty_reply = dt.Rows[i]["faculty_reply"].ToString(),
                            created_at = Convert.ToDateTime(dt.Rows[i]["created_at"].ToString())
                        };
                        reports.Add(assignment);
                    }
                }
                return Ok(reports); 
            } 
        }

        [HttpGet("get-assignment-reply")]
        public async Task<IActionResult> getAssignmentReply(string school_id,string session,int reply_id,int assignment_id,int uid)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {

                return BadRequest("School Id and Session is mendatory fields! ");
            } 
            if(reply_id != 0)
            {
                var stuReply = await _context.assignmentReports.Where(ar => ar.school_id == school_id && ar.session == session
            && ar.reply_id == reply_id).FirstOrDefaultAsync();

                return Ok(stuReply);
            }
            else
            {
                int stu_id = await _context.tb_studentmasters.Where(sm => sm.school_id == school_id &&
                sm.session == session && sm.uid == uid).Select(sm => sm.stu_id).FirstOrDefaultAsync();
                var stuReply = await _context.assignmentReports.Where(ar => ar.school_id == school_id && ar.session == session
                && ar.assignment_id == assignment_id && ar.stu_id == stu_id).FirstOrDefaultAsync();
                return Ok(stuReply);
            }
            
        }

        [HttpPost("submit-assignment-reply")]
        public async Task<IActionResult> submitAssignmentReply(string school_id,string session,string type, submitReply reply)
        {
            if(string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(session))
            {

                return BadRequest("School Id and Session is mendatory fields! ");
            }
             
            if (reply.reply_id == 0)
            {
                int stu_id = await _context.tb_studentmasters.Where(sm => sm.school_id == school_id && sm.session == session &&
            sm.uid == reply.uid).Select(sm => sm.stu_id).FirstOrDefaultAsync();

                assignmentReport report = new assignmentReport
                {
                    assignment_id = reply.assignment_id,
                    stu_id = stu_id,
                    stu_reply = reply.stu_reply,
                    stu_permission = reply.stu_permission,
                    faculty_id = reply.faculty_id,
                    faculty_reply = reply.faculty_reply,
                    created_at = DateTime.Now,
                    school_id = school_id,
                    session = session
                };

                _context.Add(report);
                await _context.SaveChangesAsync();

                return Ok(report);
            }
            else
            {
                var rply = await _context.assignmentReports.Where(ar => ar.school_id == school_id &&
                ar.reply_id == reply.reply_id).FirstOrDefaultAsync();

                rply.stu_reply = reply.stu_reply;
                rply.stu_permission = reply.stu_permission;
                rply.faculty_reply = reply.faculty_reply;
                if(type == "Faculty") 
                {
                    rply.faculty_id = reply.uid;
                }
                await _context.SaveChangesAsync();
                return Ok(rply);
            }
            
        }

        #endregion



        #region Video Tutorial

        [HttpGet("get-videoTutorial")]
        public async Task<IActionResult> getVideoTutorial(string school_id, string userRole, string userId)
        {
            if (string.IsNullOrEmpty(school_id) || string.IsNullOrEmpty(userRole) || string.IsNullOrEmpty(userId))
            {
                return BadRequest("School ID, User Role, and User ID are mandatory!");
            }

            var videoTutorialQuery = _context.workAssignments.AsQueryable();

            if (userRole == "Student")
            {
                int classId = Convert.ToInt32(userId);
                videoTutorialQuery = videoTutorialQuery.Where(wa => wa.school_id == school_id && wa.class_id == classId);
            }
            else
            {
                videoTutorialQuery = videoTutorialQuery.Where(wa => wa.school_id == school_id && (userRole == "Admin" || wa.created_by == userId));
            }


            var videoTutorials = await videoTutorialQuery.ToListAsync();
            var assignmentIds = videoTutorials.Select(wa => wa.assignment_id).ToList();


            var assignmentSubjects = await _context.assignmentSubjects
                .Where(s => assignmentIds.Contains(s.assignment_id) && s.isDeleted == false).ToListAsync();

            foreach (var tutorial in videoTutorials)
            {
                tutorial.Subjects = assignmentSubjects.Where(s => s.assignment_id == tutorial.assignment_id).ToList();
            }
            var subjects = await _context.subjects.Where(sub => sub.school_id == school_id && sub.IsActive == true)
                 .ToDictionaryAsync(s => s.subject_id, s => s.subject_name);



            return Ok(new
            {
                videoTutorials,
                subjects
            });
        }

        [HttpGet("get-video-Tutorial-by-id")]
        public async Task<IActionResult> getVideoTutorialbyId(string school_id, int assignment_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School ID is mandatory!");
            }
             
            var videoTutorial = await _context.workAssignments
                .Where(wa => wa.school_id == school_id && wa.assignment_id == assignment_id)
                .FirstOrDefaultAsync();   

            if (videoTutorial == null)
            {
                return NotFound("No tutorial found for the given school_id and assignment_id.");
            }
             
            var assignmentSubjects = await _context.assignmentSubjects
                .Where(s => s.assignment_id == videoTutorial.assignment_id && !s.isDeleted)
                .ToListAsync();
             
            videoTutorial.Subjects = assignmentSubjects;
             
            var subjects = await _context.subjects
                .Where(sub => sub.school_id == school_id && sub.IsActive)
                .ToDictionaryAsync(s => s.subject_id, s => s.subject_name);
             
            return Ok(new
            {
                videoTutorial,
                subjects
            });
        }


        #endregion
    }
}

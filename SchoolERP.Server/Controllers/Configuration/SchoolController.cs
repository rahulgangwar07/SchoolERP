using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Runtime.CompilerServices;
using SchoolERP.Server.Models.Faculty;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SchoolController> _logger;

        public SchoolController(SchoolERPContext context, ILogger<SchoolController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetSchools()
        {
            var schools = await _context.schools.ToListAsync();
            return Ok(schools);
        }

        [HttpGet("getSchoolById/{id}")]
        public async Task<IActionResult> GetSchoolById(int id)
        {
            if (id == 0)
            {
                return BadRequest("Data Not Found");
            }

            var school = await _context.schools.Where(sc => sc.Id == id).FirstOrDefaultAsync();
            if (school == null)
            {
                return NotFound("School not found");
            }
            return Ok(school);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateSchool([FromForm] SchoolDto schoolDto, [FromForm] IFormFile schoolLogo)
        {
            if (schoolDto == null)
            {
                return BadRequest("School data is missing.");
            }

            // Handle file upload for schoolLogo
            if (schoolLogo != null && schoolLogo.Length > 0)
            {
                // Define file path for saving the file
                var filePath = Path.Combine("wwwroot", "uploads", schoolLogo.FileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)); // Ensure the directory exists

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await schoolLogo.CopyToAsync(stream);
                }
            }


            var schoolEntity = new Schools
            {
                SchoolName = schoolDto.SchoolName,
                SchoolId = schoolDto.SchoolId,
                Address = schoolDto.Address,
                City = schoolDto.City,
                State = schoolDto.State,
                Country = schoolDto.Country,
                PostalCode = schoolDto.PostalCode,
                PhoneNumber = schoolDto.PhoneNumber,
                Email = schoolDto.Email,
                Website = schoolDto.Website,
                EstablishmentDate = schoolDto.EstablishmentDate,
                SchoolType = schoolDto.SchoolType,
                SchoolStatus = schoolDto.SchoolStatus,
                SchoolLogo = schoolLogo?.FileName,
                SchoolDescription = schoolDto.SchoolDescription,
                SchoolBoard = schoolDto.SchoolBoard,
                TotalArea = schoolDto.TotalArea,
                SchoolFacilities = schoolDto.SchoolFacilities,
                TransportationAvailable = schoolDto.TransportationAvailable,
                EmergencyContact = schoolDto.EmergencyContact,
                CreatedAt = DateTime.Now,
                CreatedBy = 1,
            };

            // Save school data to the database
            _context.schools.Add(schoolEntity);
            await _context.SaveChangesAsync();

            var existingSchool = await _context.schools
                                   .Where(s => s.SchoolId == schoolDto.SchoolId).FirstOrDefaultAsync();

            if (existingSchool == null)
            {
                return BadRequest("School not found for the provided SchoolId.");
            }

            string username = "admin_" + existingSchool.SchoolId;
            Random generator = new Random();
            int password = generator.Next(100000, 1000000);
            // Create a new Faculty (Admin) entry
            TbFacultymaster faculty = new TbFacultymaster
            {
                username = username,
                password = password.ToString(),
                email = existingSchool.Email,
                first_name = "admin",
                gender = "Male",
                status = "active",
                designation = 2,
                created_at = DateTime.Now,
                updated_at = DateTime.Now,
                school_id = existingSchool.SchoolId
            };
            _context.TbFacultymasters.Add(faculty);
            await _context.SaveChangesAsync();

            TbFacultymaster fac = await _context.TbFacultymasters.Where(fm => fm.school_id == schoolDto.SchoolId).FirstOrDefaultAsync();

            if (fac != null)
            {

                DesigMapping desig = new DesigMapping
                {
                    faculty_id = fac.faculty_id,
                    designation_id = 2,
                    assigned_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    school_id = schoolDto.SchoolId
                };

                // Add the new DesigMapping to the context and save changes
                _context.DesigMappings.Add(desig);
                await _context.SaveChangesAsync();


                List<RolesPermission> rolesPermission = new List<RolesPermission>()
                {
                    new RolesPermission()
                    {
                        desig_id = 2,
                        module_id = 1,
                        permission_id = 15,
                        submodule_id = "0",
                        created_date = DateTime.Now,
                        school_id = schoolDto.SchoolId // Ensure that this is not null
                    },
                    new RolesPermission()
                    {
                        desig_id = 2,
                        module_id = 2,
                        permission_id = 15,
                        submodule_id = "4",
                        created_date = DateTime.Now,
                        school_id = schoolDto.SchoolId // Ensure that this is not null
                    },
                    new RolesPermission()
                    {
                        desig_id = 2,
                        module_id = 10,
                        permission_id = 15,
                        submodule_id = "52,53,177,178,1178,1179",
                        created_date = DateTime.Now,
                        school_id = schoolDto.SchoolId
                    }
                };

                // Add all rolesPermission objects to the context using AddRange()
                _context.rolesPermissions.AddRange(rolesPermission);

                await _context.SaveChangesAsync();
            }

            if (!insert_BulkClass(schoolDto.SchoolId))
            {
                return Ok(new { message = "School created successfully! but Classes not Created" });
            }

            if (!insert_CurrentSession(schoolDto.SchoolId))
            {
                return Ok(new { message = "School created successfully! but Session not Created" });
            }


            return Ok(new { message = "School created successfully!", username, school_id = schoolDto.SchoolId, email = schoolDto.Email, password });
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateSchool([FromForm] SchoolDto schoolDto, [FromForm] IFormFile? schoolLogo, int id)
        {
            if (id == 0)
            {
                return BadRequest("Id is not available");
            }

            if (schoolDto == null)
            {
                return BadRequest("School data is missing");
            }

            var schoolData = await _context.schools.Where(sd => sd.Id == id).FirstOrDefaultAsync();

            if (schoolData == null)
            {
                return NotFound("School not found");
            }

            if (schoolLogo != null && schoolLogo.Length > 0)
            {
                var filePath = Path.Combine("wwwroot", "uploads", schoolLogo.FileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                var oldFilePath = Path.Combine("wwwroot", "uploads", schoolData.SchoolLogo);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await schoolLogo.CopyToAsync(stream);
                }

                schoolData.SchoolLogo = schoolLogo.FileName;
            }

            // Update other school details
            schoolData.SchoolName = schoolDto.SchoolName;
            schoolData.SchoolId = schoolDto.SchoolId;
            schoolData.Address = schoolDto.Address;
            schoolData.City = schoolDto.City;
            schoolData.State = schoolDto.State;
            schoolData.Country = schoolDto.Country;
            schoolData.PostalCode = schoolDto.PostalCode;
            schoolData.PhoneNumber = schoolDto.PhoneNumber;
            schoolData.Email = schoolDto.Email;
            schoolData.Website = schoolDto.Website;
            schoolData.EstablishmentDate = schoolDto.EstablishmentDate;
            schoolData.SchoolType = schoolDto.SchoolType;
            schoolData.SchoolStatus = schoolDto.SchoolStatus;
            schoolData.SchoolDescription = schoolDto.SchoolDescription;
            schoolData.SchoolBoard = schoolDto.SchoolBoard;
            schoolData.TotalArea = schoolDto.TotalArea;
            schoolData.SchoolFacilities = schoolDto.SchoolFacilities;
            schoolData.TransportationAvailable = schoolDto.TransportationAvailable;
            schoolData.EmergencyContact = schoolDto.EmergencyContact;
            schoolData.UpdatedAt = DateTime.Now;
            schoolData.UpdatedBy = 1;  // Set this to the current user ID (ideally)

            // Save the updated school data to the database
            await _context.SaveChangesAsync();

            return Ok(new { message = "School updated successfully!" });
        }

        [HttpGet("get-admins")]
        public async Task<IActionResult> getAdmins(string school_id)
        {
            var faculties = await _context.TbFacultymasters.Where(fm => fm.school_id == school_id && fm.designation == 2).ToListAsync();
            return Ok(faculties);
        }

        private bool insert_BulkClass(string school_id)
        {
            int clsID = 1;
            int secId = 21;
            List<string> classNames = new List<string>();
            classNames = ["NC", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

            List<ClassName> classList = new List<ClassName>();
            List<TbClass> secList = new List<TbClass>();
            foreach (var cls in classNames)
            {
                ClassName cls1 = new ClassName
                {
                    class_id = clsID,
                    class_name = cls,
                    dis_name = cls,
                    status = false,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    school_id = school_id
                };
                TbClass tbClass1 = new TbClass
                {
                    sec_id = secId,
                    class_id = clsID,
                    sec_name = "A",
                    sec_dis_name = "A",
                    status = true,
                    school_id = school_id,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now
                };
                classList.Add(cls1);
                secList.Add(tbClass1);

                clsID++;
                secId += 3;
            }

            _context.classNames.AddRange(classList);
            _context.tbClasses.AddRange(secList);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                // Log the error (use your preferred logging system)
                Console.WriteLine("Error: " + ex.Message);
                return false;
            }


            return true;
        }

        private bool insert_CurrentSession(string school_id)
        {
            try
            {
                var currentDate = DateTime.Now;
                string startMonth = "August";
                string endMonth = "July";

                int currentYear = currentDate.Year;
                int nextYear = currentYear + 1;
                string sessionName = $"{currentYear} - {nextYear}";

                var newSession = new Session
                {
                    session_name = sessionName,
                    start_month = startMonth,
                    end_month = endMonth,
                    start_year = currentYear,
                    end_year = nextYear,
                    status = true,
                    created_date = currentDate,
                    updated_date = currentDate,
                    school_id = school_id
                };
                _context.Add(newSession);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Examination;
using SchoolERP.Server.Models.Online_Exam;

namespace SchoolERP.Server.Controllers.Examination
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamTypesController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<ExamTypesController> _logger;
        private readonly IWebHostEnvironment _env; 

        public ExamTypesController(ILogger<ExamTypesController> logger, SchoolERPContext context, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet("GetExamTerms")]
        public async Task<IActionResult> GetExamTerms(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examTerms = await _context.exam_terms.Where(et => et.school_id == school_id && et.isActive == true).ToListAsync();
                return Ok(examTerms);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam terms.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamTermById/{id}")]
        public async Task<IActionResult> GetExamTermById(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examTerm = await _context.exam_terms.Where(et => et.school_id == school_id && et.exam_term_id == id).FirstOrDefaultAsync();
                if (examTerm == null)
                {
                    return NotFound($"Exam term with ID {id} not found.");
                }
                return Ok(examTerm);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam term by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        
        [HttpGet("GetExamTermBySession/{session}")]
        public async Task<IActionResult> GetExamTermBySession(string school_id,string session)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examTerm = await _context.exam_terms.Where(et => et.school_id == school_id && et.session == session).ToListAsync();
                if (examTerm == null)
                {
                    return NotFound($"Exam term with Session {session} not found.");
                }
                return Ok(examTerm);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam term by Session.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamTypes")]
        public async Task<IActionResult> GetExamTypes(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examTypes = await _context.exam_types.Where(et => et.school_id == school_id).ToListAsync();
                return Ok(examTypes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam types.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamTypeById/{id}")]
        public async Task<IActionResult> GetExamTypeById(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examType = await _context.exam_types.Where(et => et.school_id == school_id && et.exam_type_id == id).FirstOrDefaultAsync();
                if (examType == null)
                {
                    return NotFound($"Exam type with ID {id} not found.");
                }
                return Ok(examType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam type by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        

        [HttpGet("GetExamTypeByCatId/{catid}")]
        public async Task<IActionResult> GetExamTypeByCatId(string school_id, int catid)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examType = await _context.exam_types.Where(et => et.school_id == school_id && et.exam_type_cat == catid).ToListAsync();
                if (examType == null)
                {
                    return NotFound($"Exam type with Category ID {catid} not found.");
                }
                return Ok(examType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam type by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamNames")]
        public async Task<IActionResult> GetExamNames(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examNames = await _context.exam_names.Where(en => en.school_id == school_id && en.is_active == true).ToListAsync();
                return Ok(examNames);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam names.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamNameById/{id}")]
        public async Task<IActionResult> GetExamNameById(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examName = await _context.exam_names.Where(en => en.school_id == school_id && en.exam_name_id == id).FirstOrDefaultAsync();
                if (examName == null)
                {
                    return NotFound($"Exam name with ID {id} not found.");
                }
                return Ok(examName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam name by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        

        [HttpGet("GetExamSets")]
        public async Task<IActionResult> GetExamSets(string school_id,string session)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null.");

                var examSets = await _context.exam_sets
                    .Where(es => es.school_id == school_id)
                    .Include(es => es.exam_name)
                        .ThenInclude(en => en.exam_term)
                    .ToListAsync();

                var uniqueExamSets = examSets.GroupBy(x => x.exam_set_id).Select(g => g.First()).ToList();

                var assignExamSets = await _context.assign_exam_sets.Where(sc => sc.school_id == school_id).ToListAsync();
                var max_mins = await _context.define_max_mins.Where(sc => sc.school_id == school_id && sc.session == session).ToListAsync();

                var grouped = uniqueExamSets
                    .GroupBy(x => x.common_exam_set_id)
                    .Select(g => new GroupedExamSetDto
                    {
                        common_exam_set_id = g.Key,
                        exam_sets = g.ToList(),
                        max_mins_marks = max_mins.Where(mm => (examSets.Where(es => es.common_exam_set_id == g.Key).Select(s => s.exam_set_id).ToList()).Contains(mm.exam_set_id)).ToList(),
                        assign_exam_sets = assignExamSets.Where(ae => ae.common_exam_set_id == g.Key).ToList()
                    })
                    .ToList();



                return Ok(grouped);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching grouped exam sets.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpGet("GetExamSetById/{id}")]
        public async Task<IActionResult> GetExamSetById(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examSet = await _context.exam_sets.Where(es => es.school_id == school_id && es.exam_set_id == id).FirstOrDefaultAsync();
                if (examSet == null)
                {
                    return NotFound($"Exam set with ID {id} not found.");
                }
                return Ok(examSet);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam set by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }



        [HttpGet("GetExamSetAssignments")]
        public async Task<IActionResult> GetExamSetAssignments(string school_id)
        {
            try
            { 
                if(string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examSetAssignments = await _context.assign_exam_sets.Where(ae => ae.school_id == school_id).ToListAsync();
                return Ok(examSetAssignments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam set assignments.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("GetExamSetAssignmentsById/{id}")]
        public async Task<IActionResult> GetExamSetAssignmentsById(string school_id,int id)
        {
            try
            {
                var examSetAssignment = await _context.assign_exam_sets.Where(ae => ae.school_id == school_id && ae.assign_id == id).FirstOrDefaultAsync();
                if (examSetAssignment == null)
                {
                    return NotFound($"Exam set assignment with ID {id} not found.");
                }
                return Ok(examSetAssignment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam set assignment by ID.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetExamWeightage")]
        public async Task<IActionResult> GetExamWeightage(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var weightage = await _context.define_weightages.Where(wi => wi.school_id == school_id).ToListAsync();
                return Ok(weightage);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("GetWeightagesByCommonSetId/{common_exam_set_id}")]
        public async Task<IActionResult> GetWeightagesByCommonSetId(int common_exam_set_id,string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");

                var weightage = await _context.define_weightages.Where(w => _context.exam_sets.Where(e => e.common_exam_set_id == common_exam_set_id)
                .Select(e => e.exam_set_id).Contains(w.exam_set_id))
                    .Select(w => new
                    {
                        w.exam_set_id,
                        w.weightage
                    }).ToListAsync();

                //var weightage = await _context.define_weightages.Where(wi => wi.school_id == school_id).ToListAsync();
                return Ok(weightage);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("get-maxmin")]
        public async Task<IActionResult> GetExamMaxMin(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examMaxMinList = await _context.define_max_mins.Where(wi => wi.school_id == school_id).ToListAsync();
                if (examMaxMinList == null || examMaxMinList.Count == 0)
                    return NotFound("No records found for the given School ID.");
                return Ok(examMaxMinList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("get-maxmin/{common_exam_set_id}")]
        public async Task<IActionResult> GetMaxMinByCommonExamSetId(int common_exam_set_id)
        {
            var examSetIds = await _context.exam_sets
                .Where(e => e.common_exam_set_id == common_exam_set_id)
                .Select(e => e.exam_set_id)
                .ToListAsync();

            var result = await _context.define_max_mins
                .Where(m => examSetIds.Contains(m.exam_set_id))
                .Select(m => new {
                    m.exam_set_id,
                    m.max_marks,
                    m.min_marks
                }).ToListAsync();

            return Ok(result);
        }



        [HttpPost("CreateExamTerm")]
        public async Task<IActionResult> CreateExamTerm(string school_id, [FromBody] exam_term examTerm)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");
            if (examTerm == null)
                return BadRequest("Exam term data is null.");

            try
            {
                // Ensure school_id is set in the object
                examTerm.school_id = school_id;

                // Check for duplicate term name
                bool isDuplicate = await _context.exam_terms.AnyAsync(et =>
                    et.school_id == school_id &&
                    et.session == examTerm.session &&
                    et.term_name.ToLower() == examTerm.term_name.ToLower());

                if (isDuplicate)
                    return Conflict("An exam term with the same name already exists for this session and school.");

                // Find max exam_term_id for the given school and session
                int maxTermId = (await _context.exam_terms.Where(et => et.school_id == school_id && et.session == examTerm.session)
                .Select(et => et.exam_term_id).ToListAsync()).DefaultIfEmpty(0).Max();

                examTerm.exam_term_id = maxTermId + 1;

                _context.exam_terms.Add(examTerm);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExamTermById), new { id = examTerm.exam_term_id }, examTerm);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam term.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpPost("CreateExamType")]
        public async Task<IActionResult> CreateExamType(string school_id,[FromBody] exam_type examType)
        {

            if(school_id == null || string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null."); 
            if (examType == null)
            {
                return BadRequest("Exam type data is null.");
            }
            try
            {
                _context.exam_types.Add(examType);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetExamTypeById), new { id = examType.exam_type_id }, examType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam type.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("CreateExamName")]
        public async Task<IActionResult> CreateExamName(string school_id, [FromBody] ExamNameCreateUpdateDto examName)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examName == null)
            {
                return BadRequest("Exam name data is null.");
            }
            try
            {
                var newExam = new exam_name
                {
                    term_id = examName.term_id,
                    exam_type_id = examName.exam_type_id,
                    exam_title = examName.exam_title,
                    start_date = examName.start_date,
                    end_date = examName.end_date,
                    is_active = examName.is_active,
                    order_id = examName.order_id,
                    session = examName.session,
                    school_id = examName.school_id
                };

                _context.exam_names.Add(newExam);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetExamNameById), new { id = newExam.exam_name_id }, newExam);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam name.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
         

        [HttpPost("CreateExamSet")]
        public async Task<IActionResult> CreateExamSet(string school_id, [FromBody] exam_set examSet)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examSet == null)
            {
                return BadRequest("Exam set data is null.");
            }
            try
            {
                _context.exam_sets.Add(examSet);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetExamSetById), new { id = examSet.exam_set_id }, examSet);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam set.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("CreateExamSetAssignment")]
        public async Task<IActionResult> CreateExamSetAssignment(string school_id, [FromBody] assign_exam_set examSetAssignment)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examSetAssignment == null)
            {
                return BadRequest("Exam set assignment data is null.");
            }
            try
            {
                _context.assign_exam_sets.Add(examSetAssignment);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetExamSetAssignmentsById), new { id = examSetAssignment.assign_id }, examSetAssignment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam set assignment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("CreateExamWeightage")]
        public async Task<IActionResult> CreateExamWeightage(string school_id, string session, [FromBody] SaveWeightagePayload payload)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (payload == null || payload.weightages == null || payload.weightages.Count == 0)
                return BadRequest("Invalid payload");
            try
            {
                foreach (var item in payload.weightages)
                {
                    var existing = await _context.define_weightages
                        .FirstOrDefaultAsync(w => w.exam_set_id == item.exam_set_id);

                    if (existing != null)
                    {
                        // Update
                        existing.weightage = item.weightage;
                        existing.session = session;  
                        existing.school_id = school_id;  
                        _context.define_weightages.Update(existing);
                    }
                    else
                    {
                        // Insert
                        var newItem = new define_weightage
                        {
                            exam_set_id = item.exam_set_id,
                            weightage = item.weightage,
                            session = session, 
                            school_id = school_id
                        };
                        await _context.define_weightages.AddAsync(newItem);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Weightages saved successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("CreateExamMaxMin")]
        public async Task<IActionResult> CreateExamMaxMin(string school_id, string session, [FromBody] SaveMaxMinPayload payload)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School ID is null.");

            if (payload == null || payload.maxMinList == null || payload.maxMinList.Count == 0)
                return BadRequest("Invalid payload.");

            try
            {
                foreach (var item in payload.maxMinList)
                {
                    var existing = await _context.define_max_mins
                        .FirstOrDefaultAsync(w => w.exam_set_id == item.exam_set_id && w.school_id == school_id && w.session == session);

                    if (existing != null)
                    {
                        // Update
                        existing.max_marks = item.max_marks;
                        existing.min_marks = item.min_marks;
                        _context.define_max_mins.Update(existing);
                    }
                    else
                    {
                        // Insert
                        var newItem = new define_max_min
                        {
                            exam_set_id = item.exam_set_id,
                            max_marks = item.max_marks,
                            min_marks = item.min_marks,
                            session = session,
                            school_id = school_id
                        };
                        await _context.define_max_mins.AddAsync(newItem);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Max/Min marks saved successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the exam max/min marks.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }



        [HttpPut("UpdateExamTerm/{id}")]
        public async Task<IActionResult> UpdateExamTerm(string school_id,int id, [FromBody] exam_term examTerm)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examTerm == null || examTerm.id != id)
            {
                return BadRequest("Exam term data is null or ID mismatch.");
            }
            try
            {
                var existingExamTerm = await _context.exam_terms.FindAsync(id);
                if (existingExamTerm == null)
                {
                    return NotFound($"Exam term with ID {id} not found.");
                }
                existingExamTerm.exam_term_id = examTerm.exam_term_id;
                existingExamTerm.term_name = examTerm.term_name;
                existingExamTerm.start_date = examTerm.start_date;
                existingExamTerm.end_date = examTerm.end_date;
                existingExamTerm.session = examTerm.session;
                existingExamTerm.school_id = examTerm.school_id;
                _context.exam_terms.Update(existingExamTerm);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam term.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamType/{id}")]
        public async Task<IActionResult> UpdateExamType(string school_id,int id, [FromBody] exam_type examType)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examType == null || examType.exam_type_id != id)
            {
                return BadRequest("Exam type data is null or ID mismatch.");
            }
            try
            {
                var existingExamType = await _context.exam_types.FindAsync(id);
                if (existingExamType == null)
                {
                    return NotFound($"Exam type with ID {id} not found.");
                }
                existingExamType.exam_type_name = examType.exam_type_name;
                existingExamType.description = examType.description;
                existingExamType.school_id = examType.school_id;
                _context.exam_types.Update(existingExamType);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam type.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamName/{id}")]
        public async Task<IActionResult> UpdateExamName(string school_id,int id, [FromBody] ExamNameCreateUpdateDto  examName)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examName == null || examName.exam_name_id != id)
            {
                return BadRequest("Exam name data is null or ID mismatch.");
            }
            try
            {
                var existingExamName = await _context.exam_names.FindAsync(id);
                if (existingExamName == null)
                {
                    return NotFound($"Exam name with ID {id} not found.");
                }
                existingExamName.term_id = examName.term_id; 
                existingExamName.exam_type_id = examName.exam_type_id;
                existingExamName.exam_title = examName.exam_title;
                existingExamName.start_date = examName.start_date;
                existingExamName.end_date = examName.end_date;
                existingExamName.order_id = examName.order_id;
                existingExamName.session = examName.session;
                existingExamName.school_id = examName.school_id;
                _context.exam_names.Update(existingExamName);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam name.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamSet/{id}")]
        public async Task<IActionResult> UpdateExamSet(string school_id, int id, [FromBody] exam_set examSet)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examSet == null || examSet.exam_set_id != id)
            {
                return BadRequest("Exam set data is null or ID mismatch.");
            }
            try
            {
                var existingExamSet = await _context.exam_sets.FindAsync(id);
                if (existingExamSet == null)
                {
                    return NotFound($"Exam set with ID {id} not found.");
                }
                existingExamSet.exam_set_id = examSet.exam_set_id;
                existingExamSet.exam_name_id = examSet.exam_name_id;
                existingExamSet.common_exam_set_id = examSet.common_exam_set_id; 
                existingExamSet.session = examSet.session;
                existingExamSet.school_id = examSet.school_id;
                _context.exam_sets.Update(existingExamSet);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam set.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamSetAssignment/{id}")]
        public async Task<IActionResult> UpdateExamSetAssignment(string school_id, int id, [FromBody] assign_exam_set examSetAssignment)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (examSetAssignment == null || examSetAssignment.assign_id != id)
            {
                return BadRequest("Exam set assignment data is null or ID mismatch.");
            }
            try
            {
                var existingExamSetAssignment = await _context.assign_exam_sets.FindAsync(id);
                if (existingExamSetAssignment == null)
                {
                    return NotFound($"Exam set assignment with ID {id} not found.");
                }
                existingExamSetAssignment.common_exam_set_id = examSetAssignment.common_exam_set_id;
                existingExamSetAssignment.class_id = examSetAssignment.class_id;
                existingExamSetAssignment.session = examSetAssignment.session;
                existingExamSetAssignment.school_id = examSetAssignment.school_id;
                _context.assign_exam_sets.Update(existingExamSetAssignment);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam set assignment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamWeightage/{id}")]
        public async Task<IActionResult> UpdateExamWeightage(string school_id, int id, [FromBody] define_weightage define_Weightage)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
            if (define_Weightage == null || define_Weightage.exam_set_weightage_id != id)
            {
                return BadRequest("Exam set assignment data is null or ID mismatch.");
            }
            try
            {
                var weightage = await _context.define_weightages.FindAsync(id);
                if (weightage == null)
                {
                    return NotFound($"Exam set assignment with ID {id} not found.");
                }
                weightage.exam_set_id = weightage.exam_set_id;
                weightage.weightage = weightage.weightage;
                weightage.session = weightage.session; 
                _context.define_weightages.Update(weightage);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateExamMaxMin")]
        public async Task<IActionResult> UpdateExamMaxMin(string school_id, string session, [FromBody] SaveMaxMinPayload payload)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School ID is null.");

            if (payload == null || payload.maxMinList == null || payload.maxMinList.Count == 0)
                return BadRequest("Invalid payload.");

            try
            {
                foreach (var item in payload.maxMinList)
                {
                    var existing = await _context.define_max_mins
                        .FirstOrDefaultAsync(w => w.exam_set_id == item.exam_set_id
                                                  && w.school_id == school_id
                                                  && w.session == session);

                    if (existing == null)
                    { 
                        return NotFound($"Record not found for exam_set_id {item.exam_set_id} with given school and session.");
                    }

                    // Update existing record
                    existing.max_marks = item.max_marks;
                    existing.min_marks = item.min_marks;
                    _context.define_max_mins.Update(existing);
                }

                await _context.SaveChangesAsync();
                return Ok(new { message = "Max/Min marks updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the exam max/min marks.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpDelete("DeleteExamTerm/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamTerm(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examTerm = await _context.exam_terms.FindAsync(id);
                examTerm.isActive = false;
                if (examTerm == null)
                {
                    return NotFound($"Exam term with ID {id} not found.");
                }
                _context.exam_terms.Update(examTerm);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam term.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamType/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamType(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examType = await _context.exam_types.FindAsync(id);
                if (examType == null)
                {
                    return NotFound($"Exam type with ID {id} not found.");
                }
                _context.exam_types.Remove(examType);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam type.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamName/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamName(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examName = await _context.exam_names.FindAsync(id);
                if (examName == null)
                {
                    return NotFound($"Exam name with ID {id} not found.");
                }
                examName.is_active = false;
                _context.exam_names.Update(examName);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam name.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamSet/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamSet(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examSet = await _context.exam_sets.FindAsync(id);
                if (examSet == null)
                {
                    return NotFound($"Exam set with ID {id} not found.");
                }
                _context.exam_sets.Remove(examSet);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam set.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamSetAssignment/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamSetAssignment(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var examSetAssignment = await _context.assign_exam_sets.FindAsync(id);
                if (examSetAssignment == null)
                {
                    return NotFound($"Exam set assignment with ID {id} not found.");
                }
                _context.assign_exam_sets.Remove(examSetAssignment);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam set assignment.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamWeightage/{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteExamWeightage(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is null. ");
                var weightage = await _context.define_weightages.FindAsync(id);
                if (weightage == null)
                {
                    return NotFound($"Exam Weightage with ID {id} not found.");
                }
                _context.define_weightages.Remove(weightage);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the exam weightage.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteExamMaxMin/{exam_set_marks_id}")]
        public async Task<IActionResult> DeleteExamMaxMin(int exam_set_marks_id,string school_id)
        {
            try
            {
                var record = await _context.define_max_mins.Where(dm => dm.school_id == school_id)
                    .FirstOrDefaultAsync(x => x.exam_set_marks_id == exam_set_marks_id);

                if (record == null)
                    return NotFound($"No record found with exam_set_marks_id = {exam_set_marks_id}");

                _context.define_max_mins.Remove(record);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Record deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while deleting record with exam_set_marks_id = {exam_set_marks_id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


    }
}
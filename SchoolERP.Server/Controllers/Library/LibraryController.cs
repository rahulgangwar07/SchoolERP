using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OfficeOpenXml;
using SchoolERP.Server.Controllers.Transport;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Library;
using System.Data;
using OfficeOpenXml;

namespace SchoolERP.Server.Controllers.Library
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<LibraryController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly Common _common;

        public LibraryController(ILogger<LibraryController> logger, SchoolERPContext context, IWebHostEnvironment env,Common common)
        {
            _context = context;
            _logger = logger;
            _env = env;
            _common = common;
        }


        [HttpGet("GetLibraryBooks")]
        public async Task<IActionResult> GetLibraryBooks(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var books = await _context.library_Books.Where(b => b.school_id == school_id && b.status == true).ToListAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library books");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryMembers")]
        public async Task<IActionResult> GetLibraryMembers(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var members = await _context.library_Members.Where(m => m.school_id == school_id).ToListAsync();
                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library members");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryIssues")]
        public async Task<IActionResult> GetLibraryIssues(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var issues = await _context.library_Issues.Where(i => i.school_id == school_id).ToListAsync();
                return Ok(issues);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library issues");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryFines")]
        public async Task<IActionResult> GetLibraryFines(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var fines = await _context.library_Fines.Where(f => f.school_id == school_id).ToListAsync();
                return Ok(fines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library fines");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("GetLibraryIssueReturnBookbyDate")]
        public async Task<IActionResult> getLibraryIssueReturnBookbyDate(string school_id,string itemType,DateTime date)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                if(itemType == "issueDate")
                {
                    var books = await _context.library_Issues.Where(f => f.school_id == school_id && f.issue_date.Date == date.Date)
                        .Select(f => new
                        {
                            issuebook = f,
                            book = _context.library_Books.FirstOrDefault(lb => lb.book_id == f.book_id),
                            user = _context.library_Members.FirstOrDefault(lb => lb.member_id == f.member_id)
                        }).ToListAsync();
                    return Ok(books);
                }
                else if(itemType == "returnDate")
                {
                    var books = await _context.library_Issues.Where(f => f.school_id == school_id && f.submitted_date.HasValue && f.submitted_date.Value.Date == date.Date)
                        .Select(f => new
                        {
                            issuebook = f,
                            book = _context.library_Books.FirstOrDefault(lb => lb.book_id == f.book_id),
                            user = _context.library_Members.FirstOrDefault(lb => lb.member_id == f.member_id)
                        }).ToListAsync();

                    return Ok(books);
                }
                else
                {
                    return NotFound();
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library fines");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpPost("AddLibraryBook")]
        public async Task<IActionResult> AddLibraryBook([FromBody] library_books book)
        {
            if (book == null || string.IsNullOrEmpty(book.school_id)) return BadRequest("Invalid book data");
            try
            {
                _context.library_Books.Add(book);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetLibraryBooks), new { school_id = book.school_id }, book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding library book");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("AddLibraryMember")]
        public async Task<IActionResult> AddLibraryMember(string school_id, string created_by, [FromBody] library_members member)
        {
            if (member == null || string.IsNullOrEmpty(school_id)) return BadRequest("Invalid member data");
            try
            {
                member.created_by = created_by;
                _context.library_Members.Add(member);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetLibraryMembers), new { school_id = member.school_id }, member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding library member");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("AddLibraryIssue")]
        public async Task<IActionResult> AddLibraryIssue([FromBody] library_issues issue)
        {
            if (issue == null || string.IsNullOrEmpty(issue.school_id)) return BadRequest("Invalid issue data");
            try
            {
                _context.library_Issues.Add(issue);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetLibraryIssues), new { school_id = issue.school_id }, issue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding library issue");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("AddLibraryFine")]
        public async Task<IActionResult> AddLibraryFine([FromBody] library_fines fine)
        {
            if (fine == null || string.IsNullOrEmpty(fine.school_id)) return BadRequest("Invalid fine data");
            try
            {
                 _context.library_Fines.Add(fine);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetLibraryFines), new { school_id = fine.school_id }, fine);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding library fine");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateLibraryBook")]
        public async Task<IActionResult> UpdateLibraryBook([FromBody] library_books book)
        {
            if (book == null || string.IsNullOrEmpty(book.school_id)) return BadRequest("Invalid book data");
            try
            {
                var existingBook =  _context.library_Books.Find(book.book_id);
                if (existingBook == null) return NotFound("Book not found");
                existingBook.title = book.title;
                existingBook.isbn_no = book.isbn_no;
                existingBook.author = book.author;
                existingBook.edition = book.edition;
                existingBook.volume = book.volume;
                existingBook.publisher = book.publisher;
                existingBook.price = book.price;
                existingBook.no_of_copies = book.no_of_copies;
                existingBook.no_of_pages = book.no_of_pages;
                existingBook.almeria_no = book.almeria_no;
                existingBook.rack_no = book.rack_no;
                existingBook.position = book.position;
                existingBook.accession_no = book.accession_no;
                existingBook.book_language = book.book_language;
                existingBook.class_id = book.class_id;
                existingBook.subject_id = book.subject_id;
                existingBook.status = book.status;
                await _context.SaveChangesAsync();
                return Ok(existingBook);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating library book");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateLibraryMember")]
        public async Task<IActionResult> UpdateLibraryMember([FromBody] library_members member)
        {
            if (member == null || string.IsNullOrEmpty(member.school_id)) return BadRequest("Invalid member data");
            try
            {
                var existingMember =  _context.library_Members.Find(member.member_id);
                if (existingMember == null) return NotFound("Member not found");
                existingMember.member_type = member.member_type;
                existingMember.member_unique_id = member.member_unique_id;
                existingMember.full_name = member.full_name;
                existingMember.class_id = member.class_id;
                existingMember.department = member.department;
                existingMember.mobile_no = member.mobile_no;
                existingMember.email = member.email;
                existingMember.status = member.status;
                await _context.SaveChangesAsync();
                return Ok(existingMember);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating library member");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateLibraryIssue")]
        public async Task<IActionResult> UpdateLibraryIssue([FromBody] library_issues issue)
        {
            if (issue == null || string.IsNullOrEmpty(issue.school_id)) return BadRequest("Invalid issue data");
            try
            {
                var existingIssue =  _context.library_Issues.Find(issue.issue_id);
                if (existingIssue == null) return NotFound("Issue not found");
                existingIssue.book_id = issue.book_id;
                existingIssue.member_id = issue.member_id;
                existingIssue.issue_date = issue.issue_date;
                existingIssue.due_date = issue.due_date;
                existingIssue.return_date = issue.return_date;
                existingIssue.status = issue.status;
                existingIssue.remarks = issue.remarks;
                existingIssue.session = issue.session;
                await _context.SaveChangesAsync();
                return Ok(existingIssue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating library issue");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateLibraryBookSubmitData")]
        public async Task<IActionResult> UpdateLibraryBookSubmitData([FromBody] library_issues issue)
        {
            if (issue == null || string.IsNullOrEmpty(issue.school_id)) return BadRequest("Invalid issue data");
            try
            {
                var existingIssue =  _context.library_Issues.Find(issue.issue_id);
                if (existingIssue == null) return NotFound("Issue not found");
                existingIssue.submitted_date = issue.submitted_date; 
                existingIssue.status = "return"; 
                await _context.SaveChangesAsync();
                return Ok(existingIssue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating library issue");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("UpdateLibraryFine")]
        public async Task<IActionResult> UpdateLibraryFine(string school_id,[FromBody] library_fines fine)
        {
            if (fine == null || string.IsNullOrEmpty(school_id)) return BadRequest("Invalid fine data");
            try
            {
                var existingFine =  _context.library_Fines.Find(fine.finr_id);
                if (existingFine == null) return NotFound("Fine not found");
                existingFine.issue_id = fine.issue_id;
                existingFine.fine_amount = fine.fine_amount;
                existingFine.is_paid = fine.is_paid;
                existingFine.paid_date = fine.paid_date;
                existingFine.session = fine.session;
                await _context.SaveChangesAsync();
                return Ok(existingFine);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating library fine");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteLibraryBook/{bookId}")]
        public async Task<IActionResult> DeleteLibraryBook(string school_id, int bookId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var book =  _context.library_Books.Find(bookId);
                if (book == null) return NotFound("Book not found");
                book.status = false;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting library book");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteLibraryMember/{memberId}")]
        public async Task<IActionResult> DeleteLibraryMember(string school_id, int memberId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var member =  _context.library_Members.Find(memberId);
                if (member == null) return NotFound("Member not found");
                 _context.library_Members.Remove(member);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting library member");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteLibraryIssue/{issueId}")]
        public async Task<IActionResult> DeleteLibraryIssue(string school_id, int issueId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var issue =  _context.library_Issues.Find(issueId);
                if (issue == null) return NotFound("Issue not found");
                 _context.library_Issues.Remove(issue);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting library issue");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("DeleteLibraryFine/{fineId}")]
        public async Task<IActionResult> DeleteLibraryFine(string school_id, int fineId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var fine =  _context.library_Fines.Find(fineId);
                if (fine == null) return NotFound("Fine not found");
                 _context.library_Fines.Remove(fine);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting library fine");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }

        }

        [HttpGet("GetLibraryBookById/{bookId}")]
        public async Task<IActionResult> GetLibraryBookById(string school_id, int bookId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var book =  _context.library_Books.Find(bookId);
                if (book == null) return NotFound("Book not found");
                return Ok(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library book by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        

        [HttpGet("getLibraryBookByAccNo/{accno}")]
        public async Task<IActionResult> getLibraryBookByAccNo(string school_id, string accno)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var book = await _context.library_Books.FirstOrDefaultAsync(lb => lb.accession_no == accno);
                if (book == null) return NotFound("Book not found");
                return Ok(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library book by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryMemberById/{memberId}")]
        public async Task<IActionResult> GetLibraryMemberById(string school_id, int memberId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var member =  _context.library_Members.Find(memberId);
                if (member == null) return NotFound("Member not found");
                return Ok(member);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library member by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryIssueById/{issueId}")]
        public async Task<IActionResult> GetLibraryIssueById(string school_id, int issueId)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id is required. ");
                var issue =  _context.library_Issues.Find(issueId);
                if (issue == null) return NotFound("Issue not found");
                return Ok(issue);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library issue by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryFineById/{fineId}")]
        public async Task<IActionResult> GetLibraryFineById(int fineId)
        {
            try
            {
                var fine =  _context.library_Fines.Find(fineId);
                if (fine == null) return NotFound("Fine not found");
                return Ok(fine);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library fine by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryBooksByClass/{classId}")]
        public async Task<IActionResult> GetLibraryBooksByClass(int classId, string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var books = await  _context.library_Books
                    .Where(b => b.class_id == classId && b.school_id == school_id)
                    .ToListAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library books by class");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryBooksBySubject/{subjectId}")]
        public async Task<IActionResult> GetLibraryBooksBySubject(int subjectId, string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var books = await  _context.library_Books
                    .Where(b => b.subject_id == subjectId && b.school_id == school_id)
                    .ToListAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library books by subject");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        [HttpGet("GetLibraryMembersByType/{memberType}")]
        public async Task<IActionResult> GetLibraryMembersByType(string memberType, string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var members = await _context.library_Members
                    .Where(m => m.member_type == memberType && m.school_id == school_id)
                    .ToListAsync();
                return Ok(members);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library members by type");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryIssuesByMember/{memberId}")]
        public async Task<IActionResult> GetLibraryIssuesByMember(int memberId, string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var issues = await _context.library_Issues
                    .Where(i => i.member_id == memberId && i.school_id == school_id)
                    .ToListAsync();
                return Ok(issues);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library issues by member");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("getLibrarySearcheIssuebook")]
        public async Task<IActionResult> getLibrarySearcheIssuebook(
            [FromQuery] string school_id,
            [FromQuery] string userType = "",  // Default to empty string
            [FromQuery] string fullName = "",  // Default to empty string
            [FromQuery] int classs = 0)        // Default to 0 for class filter
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");

            try
            {
                if(userType.ToLower() == "staff")
                {
                    classs = 0;
                }
                //// Start with the library issues that match the school_id
                Dictionary<string, string> param = new Dictionary<string, string>
                {
                    { "@SchoolId" ,school_id},
                    { "@UserType" ,userType},
                    { "@FullName" ,fullName},
                    { "@ClassId" ,classs.ToString()}
                };

                DataTable dt = _common.ExecuteQuery("GetLibraryIssuedBooks",param);

                if (dt == null || dt.Rows.Count == 0)
                    return Ok(new List<LibraryIssuedBookDto>());

                var result = MapToIssuedBooks(dt);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching issued books");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        private List<LibraryIssuedBookDto> MapToIssuedBooks(DataTable dt)
        {
            var list = new List<LibraryIssuedBookDto>();

            foreach (DataRow row in dt.Rows)
            {
                var item = new LibraryIssuedBookDto
                {
                    FullName = row["full_name"]?.ToString(),
                    MemberUniqueId = row["member_unique_id"]?.ToString(),
                    MobileNo = row["mobile_no"]?.ToString(),
                    Email = row["email"]?.ToString(),
                    ClassId = (row["class_id"] == DBNull.Value || string.IsNullOrEmpty(row["class_id"].ToString())) ? 0 : Convert.ToInt32(row["class_id"] ?? 0),
                    Department = row["department"]?.ToString(),

                    IssueId = Convert.ToInt32(row["issue_id"]),
                    BookId = Convert.ToInt32(row["book_id"]),
                    MemberId = Convert.ToInt32(row["member_id"]),
                    IssueDate = Convert.ToDateTime(row["issue_date"]),
                    DueDate = Convert.ToDateTime(row["due_date"]),
                    ReturnDate = Convert.ToDateTime(row["return_date"]),
                    submitted_date = row["submitted_date"] == DBNull.Value ? (DateTime?)null : Convert.ToDateTime(row["submitted_date"]),

                    daysExceed = Convert.ToInt32(row["daysExceed"].ToString()),
                    Status = row["status"]?.ToString(),
                    Remarks = row["remarks"]?.ToString(),
                    CreatedBy = row["created_by"]?.ToString(),
                    Session = row["session"]?.ToString(),
                    SchoolId = row["school_id"]?.ToString(),
                    AccessionNo = row["accession_no"]?.ToString(),
                    UserType = row["userType"]?.ToString(),

                    BookType = row["book_type"]?.ToString(),
                    Title = row["title"]?.ToString()
                };

                list.Add(item);
            }

            return list;
        }


        [HttpGet("GetLibraryFinesByIssue/{issueId}")]
        public async Task<IActionResult> GetLibraryFinesByIssue(int issueId, string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var fines = await _context.library_Fines
                    .Where(f => f.issue_id == issueId && f.school_id == school_id)
                    .ToListAsync();
                return Ok(fines);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library fines by issue");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetLibraryBooksByLanguage/{language}")]
        public async Task<IActionResult> GetLibraryBooksByLanguage(string language, string school_id)
        {

            if (string.IsNullOrEmpty(school_id)) return BadRequest("School ID is required");
            try
            {
                var books = await _context.library_Books
                    .Where(b => b.book_language == language && b.school_id == school_id)
                    .ToListAsync();
                return Ok(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching library books by language");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpPost("UploadBooks")]
        public async Task<IActionResult> UploadBooks(string school_id,IFormFile file)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School should not be null.");
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var books = new List<library_books>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    int rowCount = worksheet.Dimension.Rows;

                    for (int row = 2; row <= rowCount; row++) // start at 2 to skip header
                    {
                        books.Add(new library_books
                        {
                            book_type = worksheet.Cells[row, 1].Text,
                            title = worksheet.Cells[row, 2].Text,
                            isbn_no = worksheet.Cells[row, 3].Text,
                            author = worksheet.Cells[row, 4].Text,
                            edition = worksheet.Cells[row, 5].Text,
                            volume = worksheet.Cells[row, 6].Text,
                            publisher = worksheet.Cells[row, 7].Text,
                            price = decimal.Parse(worksheet.Cells[row, 8].Text),
                            no_of_copies = int.Parse(worksheet.Cells[row, 9].Text),
                            no_of_pages = int.Parse(worksheet.Cells[row, 10].Text),
                            almeria_no = worksheet.Cells[row, 11].Text,
                            rack_no = worksheet.Cells[row, 12].Text,
                            position = worksheet.Cells[row, 13].Text,
                            accession_no = worksheet.Cells[row, 14].Text,
                            book_language = worksheet.Cells[row, 15].Text,
                            class_id = int.Parse(worksheet.Cells[row, 16].Text),
                            subject_id = int.Parse(worksheet.Cells[row, 17].Text),
                            status = true,
                            school_id = school_id,
                            created_at = DateTime.Now
                        });
                    }
                }
            }

            _context.library_Books.AddRange(books);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"{books.Count} books imported successfully." });
        }





    }
}

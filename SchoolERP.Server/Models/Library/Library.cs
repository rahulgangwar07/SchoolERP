using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http.HttpResults;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Student_Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Reflection;
using System.Security.Principal;
using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models.Library
{
    public class Library
    {
    }

 


    public class library_books
    {
        [Key]
        public int book_id { get; set; }
        public string book_type { get; set; }
        public string title { get; set; }
        public string isbn_no { get; set; }
        public string author { get; set; }
        public string edition { get; set; }
        public string volume { get; set; }
        public string publisher { get; set; }
        public decimal price { get; set; }
        public int no_of_copies { get; set; }
        public int no_of_pages { get; set; }
        public string almeria_no { get; set; }
        public string rack_no { get; set; }
        public string position { get; set; }
        public string accession_no { get; set; }  
        public string book_language { get; set; }
        public int class_id { get; set; } // Foreign key to ClassName
        public int subject_id { get; set; } // Foreign key to Subjects
        public bool status { get; set; } = false;
        public string school_id { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
        public DateTime? updated_at { get; set; } // Nullable for updates
    }
    public class library_members
    {
        [Key]
        public int member_id { get; set; }
        public string member_type { get; set; } 
        public int member_unique_id { get; set; }  
        public string full_name { get; set; }
        public string class_id { get; set; }  
        public string department { get; set; }  
        public string mobile_no { get; set; }
        public string email { get; set; }
        public bool status { get; set; } = true; // 1 = active 
        public string created_by { get; set; }
        public string school_id { get; set; }
    }
    public class library_issues
    {
        [Key]
        public int issue_id { get; set; }
        public int book_id { get; set; } 
        public string accession_no { get; set; } 
        public int member_id { get; set; } 
        public string userType { get; set; } 
        public DateTime issue_date { get; set; }
        public DateTime due_date { get; set; }
        public DateTime? return_date { get; set; } // Nullable for not returned yet
        public DateTime? submitted_date { get; set; }
        public string status { get; set; } = "Issued"; // 'Issued', 'Returned', 'Late'
        public string remarks { get; set; }
        public string created_by { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    } 
    public class library_fines
    {
        [Key]
        public int finr_id { get; set; }
        public int issue_id { get; set; } // Foreign key to library_issues
        public decimal fine_amount { get; set; }
        public bool is_paid { get; set; } = false; // Default to unpaid
        public DateTime? paid_date { get; set; } // Nullable for not paid yet
        public string session { get; set; }
        public string school_id { get; set; }
    }


    public class LibraryIssuedBookDto
    {
        public string FullName { get; set; }
        public string MemberUniqueId { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public int? ClassId { get; set; }
        public string Department { get; set; }

        public int IssueId { get; set; }
        public int BookId { get; set; }
        public int MemberId { get; set; }

        public DateTime IssueDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? submitted_date { get; set; }

        public int daysExceed { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public string Session { get; set; }
        public string SchoolId { get; set; }
        public string AccessionNo { get; set; }
        public string UserType { get; set; }

        public string BookType { get; set; }
        public string Title { get; set; }
    }


}

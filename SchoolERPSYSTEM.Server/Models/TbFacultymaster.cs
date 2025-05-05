using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{
    [Table("Tb_facultymaster")]
    public class TbFacultymaster
    {
        [Key]
        public int faculty_id { get; set; }

        [Required, MaxLength(50)]
        public string username { get; set; }

        [Required, MaxLength(255)]
        public string Password { get; set; }

        [MaxLength(100)]
        public string? first_name { get; set; }  
                                                 
        [MaxLength(100)]                         
        public string? last_name { get; set; }   
                                                 
        [MaxLength(100)]                         
        public string? Email { get; set; }       
                                                 
        [MaxLength(100)]
        public string? Qualification { get; set; }  

        [MaxLength(20)]
        public string? Phone { get; set; }       
                                                 
        public DateOnly? Dob { get; set; }       
                                                 
        [MaxLength(10)]                          
        public string? Gender { get; set; }      
                                                 
        [MaxLength(100)]                         
        public string? Address { get; set; }     
                                                 
        [MaxLength(20)]                          
        public string? Status { get; set; }      

        public string? bloodgroup { get; set; }

        public DateTime created_at { get; set; }

        [MaxLength(100)]
        public string? created_by { get; set; }

        public DateTime? updated_at { get; set; }

        public string school_id { get; set; }    // Nullable field
    }

}

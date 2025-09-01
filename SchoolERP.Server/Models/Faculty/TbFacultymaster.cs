using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.Faculty
{
    [Table("Tb_facultymaster")]
    public class TbFacultymaster
    {
        [Key]
        public int faculty_id { get; set; }

        [Required, MaxLength(50)]
        public string username { get; set; }

        [MaxLength(100)]
        public string? first_name { get; set; }

        [MaxLength(100)]
        public string? last_name { get; set; }

        [Required, MaxLength(255)]
        public string password { get; set; }

        [MaxLength(100)]
        public string? email { get; set; }

        [MaxLength(100)]
        public string? qualification { get; set; }

        [MaxLength(20)]
        public string? phone { get; set; }

        public DateOnly? dob { get; set; }

        [MaxLength(10)]
        public string? gender { get; set; }

        [MaxLength(100)]
        public string? address { get; set; }

        [MaxLength(20)]
        public string? status { get; set; }

        public DateTime created_at { get; set; }

        //[MaxLength(100)]
        //public string? created_by { get; set; }

        public DateTime updated_at { get; set; }

        public string school_id { get; set; }

        public string? bloodgroup { get; set; }

        public string? aadhar_card { get; set; }

        public DateOnly? date_of_joining { get; set; }

        public string? whatsapp_no { get; set; }

        public int? designation { get; set; }

        public string? speciality { get; set; }

        public string? spouse_name { get; set; }

        public string? mother_name { get; set; }

        public string? father_name { get; set; }

        public string? local_address { get; set; }

        public int? experience { get; set; }

        public string? bank_name { get; set; }

        public string? account_no { get; set; }

        public string? ifsc_code { get; set; }

        public string? aadhar_no { get; set; }

        public string? pan_card { get; set; }

        public string? passport { get; set; }

        public string? dl_details { get; set; }

        public string? pf_account_no { get; set; }

        public string? image { get; set; }

        public string? signature { get; set; }

    }

    public class TbFacultymasterDTOs
    {
        [Key]
        public int? faculty_id { get; set; } = 0;

        [Required, MaxLength(50)]
        public string username { get; set; }

        [MaxLength(100)]
        public string? first_name { get; set; }

        [MaxLength(100)]
        public string? last_name { get; set; }

        [Required, MaxLength(255)]
        public string password { get; set; }

        [MaxLength(100)]
        public string? email { get; set; }

        [MaxLength(100)]
        public string? qualification { get; set; }

        [MaxLength(20)]
        public string? phone { get; set; }

        public DateOnly? dob { get; set; }

        [MaxLength(10)]
        public string? gender { get; set; }

        [MaxLength(100)]
        public string? address { get; set; }

        [MaxLength(20)]
        public string? status { get; set; }

        public DateTime created_at { get; set; }

        //[MaxLength(100)]
        //public string? created_by { get; set; }

        public DateTime updated_at { get; set; }

        public string school_id { get; set; }

        public string? bloodgroup { get; set; }

        public string? aadhar_card { get; set; }

        public DateOnly? date_of_joining { get; set; }

        public string? whatsapp_no { get; set; }

        public int? designation { get; set; }

        public string? designation_name { get; set; }

        public string? speciality { get; set; }

        public string? spouse_name { get; set; }

        public string? mother_name { get; set; }

        public string? father_name { get; set; }

        public string? local_address { get; set; }

        public int? experience { get; set; }

        public string? bank_name { get; set; }

        public string? account_no { get; set; }

        public string? ifsc_code { get; set; }

        public string? aadhar_no { get; set; }

        public string? pan_card { get; set; }

        public string? passport { get; set; }

        public string? dl_details { get; set; }

        public string? pf_account_no { get; set; }

        public string? image { get; set; }  // Base64 Image Data
        public string? signature { get; set; }  // Base64 Signature Data

    }

    [Table("Tb_facultymaster_permanentRemoval")]
    public class TbFacultymasterDelete
    {
        [Key]
        public int faculty_id { get; set; }

        [Required, MaxLength(50)]
        public string username { get; set; }

        [MaxLength(100)]
        public string? first_name { get; set; }

        [MaxLength(100)]
        public string? last_name { get; set; }

        [Required, MaxLength(255)]
        public string password { get; set; }

        [MaxLength(100)]
        public string? email { get; set; }

        [MaxLength(100)]
        public string? qualification { get; set; }

        [MaxLength(20)]
        public string? phone { get; set; }

        public DateOnly? dob { get; set; }

        [MaxLength(10)]
        public string? gender { get; set; }

        [MaxLength(100)]
        public string? address { get; set; }

        [MaxLength(20)]
        public string? status { get; set; }

        public DateTime created_at { get; set; }

        //[MaxLength(100)]
        //public string? created_by { get; set; }

        public DateTime updated_at { get; set; }

        public string school_id { get; set; }

        public string? bloodgroup { get; set; }

        public string? aadhar_card { get; set; }

        public DateOnly? date_of_joining { get; set; }

        public string? whatsapp_no { get; set; }

        public int? designation { get; set; }

        public string? speciality { get; set; }

        public string? spouse_name { get; set; }

        public string? mother_name { get; set; }

        public string? father_name { get; set; }

        public string? local_address { get; set; }

        public int? experience { get; set; }

        public string? bank_name { get; set; }

        public string? account_no { get; set; }

        public string? ifsc_code { get; set; }

        public string? aadhar_no { get; set; }

        public string? pan_card { get; set; }

        public string? passport { get; set; }

        public string? dl_details { get; set; }

        public string? pf_account_no { get; set; }

        public string? image { get; set; }

        public string? signature { get; set; }

    }

}

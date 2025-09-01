using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models
{
    [Table("student_other_info")]
    public class Student_Other_info
    {
        [Key]
        public int uid { get; set; }

        public string? reg_no { get; set; }

        public string? old_reg_no { get; set; }

        public string? first_name { get; set; }

        public string? last_name { get; set; }

        public string? father_name { get; set; }

        public string? mother_name { get; set; }

        public string? gender { get; set; }

        public string? enquiry_type { get; set; }

        public string? branch { get; set; }

        public string? description { get; set; }

        public DateTime? dob { get; set; }

        public int? state_id { get; set; }

        public string? pin_code { get; set; }

        public string? city { get; set; }

        public string? address { get; set; }

        public string? contact_no { get; set; }
        public string? alt_contact { get; set; }

        public string? email { get; set; }

        public DateTime? enquiry_date { get; set; }

        public string? academic_year { get; set; }

        public string? aadhar_card { get; set; }

        public string? bloodgroup { get; set; }

        public string? pen_card { get; set; } 

        public string? reference { get; set; }

        public string? userid { get; set; }

        public string? password { get; set; }

        public string school_id { get; set; }

        // Adding missing fields from your table structure
        public string? father_occupation { get; set; }

        public string? father_email { get; set; }

        public string? father_aadhar { get; set; }

        public string? father_income { get; set; }

        public string? father_contact { get; set; }

        public string? village { get; set; }

        public string? post { get; set; }

        public string? stuImage { get; set; }

        public string? religion { get; set; }

        public string? caste { get; set; }

        public string? last_institution { get; set; }

        public string? tc_no { get; set; }

        public string? tc_date { get; set; }

        public string? counsellor { get; set; }

        public string? bank_account { get; set; }

        public string? ifsc_code { get; set; }

        [JsonIgnore]
        public ICollection<Student_reg> student_Reg { get; set; }

    }

    // This version of Student_Other_info2 includes the extra fields 
    public class Student_Other_info2
    {
        [Key]
        public int uid { get; set; }

        public string? reg_no { get; set; }

        public string? old_reg_no { get; set; }

        public string first_name { get; set; }

        public string? last_name { get; set; }

        public string? father_name { get; set; }

        public string? mother_name { get; set; }

        public string? gender { get; set; }

        public string? enquiry_type { get; set; }

        public string? branch { get; set; }

        public string? aadhar_card { get; set; }

        public string? description { get; set; }

        public DateTime? dob { get; set; }

        public int? state_id { get; set; }

        public string? pin_code { get; set; }

        public string? city { get; set; }

        public string? address { get; set; }

        public string? contact_no { get; set; }

        public string? alt_contact { get; set; }

        public string? email { get; set; }

        public string? enquiry_date { get; set; }

        public string? academic_year { get; set; }

        public string? stuImage { get; set; }

        public int? class_id { get; set; }

        public int? sec_id { get; set; }

        public string? reference { get; set; }

        public string? bloodgroup { get; set; }

        public string? status { get; set; }

        //public int? registration_amt { get; set; }

        public string? mode { get; set; }

        public string school_id { get; set; }

        public string? father_occupation { get; set; }

        public string? father_email { get; set; }

        public string? father_aadhar { get; set; }

        public string? father_income { get; set; }

        public string? father_contact { get; set; }

        public string? village { get; set; }

        public string? post { get; set; }

        //public string? photo { get; set; }

        public string? password { get; set; }

        public string? pen_card { get; set; }

        public string? userid { get; set; }

        public string? religion { get; set; }

        public string? caste { get; set; }

        public string? last_institution { get; set; }

        public string? tc_no { get; set; }

        public string? tc_date { get; set; }

        public string? counsellor { get; set; }

        public string? bank_account { get; set; }

        public string? ifsc_code { get; set; }

        // You can also include the new fields here if needed
    }


    public class Student_Other_info_DTO
    {
        [Key]
        public int uid { get; set; }

        public string? reg_no { get; set; }

        public string? old_reg_no { get; set; }

        public string first_name { get; set; }

        public string? last_name { get; set; }

        public string? aadhar_card { get; set; }

        public string? father_name { get; set; }

        public string? mother_name { get; set; }

        public int? class_id { get; set; }

        public int? sec_id { get; set; }

        public string? gender { get; set; }

        public string? enquiry_type { get; set; }

        public string? branch { get; set; }

        public string? description { get; set; }

        public DateTime? dob { get; set; }

        public int? state_id { get; set; }

        public string? pin_code { get; set; }

        public string? city { get; set; }

        public string? address { get; set; }

        public string? contact_no { get; set; }

        public string? alt_contact { get; set; }

        public string? email { get; set; }

        public DateTime? enquiry_date { get; set; }

        public string? academic_year { get; set; }

        public string? stuImage { get; set; } 

        public string? reference { get; set; }

        public string? bloodgroup { get; set; }

        public string? status { get; set; }

        public int? registration_amt { get; set; }

        public string? mode { get; set; }

        public string school_id { get; set; }

        public string? father_occupation { get; set; }

        public string? father_email { get; set; }

        public string? father_aadhar { get; set; }

        public string? father_income { get; set; }

        public string? father_contact { get; set; }

        public string? village { get; set; }

        public string? post { get; set; }

        //public string? photo { get; set; }

        public string? password { get; set; }

        public string? pen_card { get; set; }

        public string? userid { get; set; }

        public string? religion { get; set; }

        public string? caste { get; set; } 
        
        public string? last_institution { get; set; }

        public string? tc_no { get; set; }

        public string? tc_date { get; set; }

        public string? counsellor { get; set; }

        public string? bank_account { get; set; }

        public string? ifsc_code { get; set; }

        public string? class_name { get; set; }



        // You can also include the new fields here if needed
    }

    public class StudentWithRegistrationDTO
    {
        // Represents the student's personal details
        public Student_Other_info Student { get; set; }

        // Represents the student's registration details
        public Student_reg Registration { get; set; }

        // Represents the student's master record
        public tb_studentmaster StudentMaster { get; set; }
    }


    public class checkRegistration {
        public bool status { get; set; }
        public string avaiableRegno { get; set; }
    }


}


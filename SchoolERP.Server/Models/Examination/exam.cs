using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Office2010.PowerPoint;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using SchoolERP.Server.Models.Configurations;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Principal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models.Examination
{
    public class exam
    {

    }
     
    [Table("tbl_exam_term")]
    public class exam_term
    {
        [Key]
        public int id { get; set; }
        public int exam_term_id { get; set; }
        public string term_name { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool isActive { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    [Table("tbl_exam_type")]     
    public class exam_type
    {
        [Key]
        public int exam_type_id { get; set; }
        public string exam_type_name { get; set; }
        public int exam_type_cat { get; set; }
        public string description { get; set; }
        public int orderid { get; set; }
        public string school_id { get; set; }
    }

    [Table("tbl_exam_name")]     
    public class exam_name
    {
        [Key]
        public int exam_name_id { get; set; }
        public int term_id { get; set; } 
        public exam_term exam_term { get; set; }
        public int exam_type_id { get; set; }  
        public string exam_title { get; set; }      
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool is_active { get; set; }
        public int order_id { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class ExamNameCreateUpdateDto
    {
        public int exam_name_id { get; set; }
        public int term_id { get; set; }
        public int exam_type_id { get; set; }
        public string exam_title { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool is_active { get; set; }
        public int order_id { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class ExamNameDto
    {
        public int exam_name_id { get; set; }
        public int term_id { get; set; }
        public int exam_type_id { get; set; }
        public string exam_title { get; set; }
        public DateTime start_date { get; set; }
        public DateTime end_date { get; set; }
        public bool is_active { get; set; }
        public int order_id { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }

        public exam_term exam_term { get; set; }
        public exam_type exam_type { get; set; }
    }



    [Table("tbl_exam_set")]
    public class exam_set
    {
        [Key]
        public int exam_set_id { get; set; }
        public int exam_name_id { get; set; }
        [ForeignKey("exam_name_id")]
        public exam_name exam_name { get; set; }
        public int common_exam_set_id { get; set; } 
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class ExamSetCreateUpdateDto
    {
        public int exam_name_id { get; set; }
        public int common_exam_set_id { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class GroupedExamSetDto
    {
        public int common_exam_set_id { get; set; }
        public List<exam_set> exam_sets { get; set; }
        public List<define_max_min> max_mins_marks { get; set; }
        public List<assign_exam_set> assign_exam_sets { get; set; }
    }

    [Table("tbl_assign_exam_set")]
    public class assign_exam_set
    {
        [Key]
        public int assign_id { get; set; }
        public int common_exam_set_id { get; set; }
        public int class_id { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    } 
    

    [Table("tbl_define_weightage")]
    public class define_weightage
    {
        [Key]
        public int exam_set_weightage_id { get; set; }
        public int exam_set_id { get; set; }
        public decimal weightage { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class SaveWeightagePayload
    {
        public int common_exam_set_id { get; set; }
        public List<WeightageItemDto> weightages { get; set; }
    }

    public class WeightageItemDto
    {
        public int exam_set_id { get; set; }
        public decimal weightage { get; set; }
    }

    //    CREATE TABLE tbl_define_max_min(
    //    exam_set_marks_id INT PRIMARY KEY IDENTITY(1,1),
    //    exam_set_id INT NOT NULL FOREIGN KEY REFERENCES tbl_exam_set(exam_set_id),
    //    max_marks INT NOT NULL CHECK(max_marks >= 0),
    //    min_marks INT NOT NULL CHECK(min_marks >= 0),
    //    session VARCHAR(50),
    //    school_id VARCHAR(50),
    //    CONSTRAINT chk_min_le_max CHECK(min_marks <= max_marks)
    //);

    [Table("tbl_define_max_min")]
    public class define_max_min
    {
        [Key]
        public int exam_set_marks_id { get; set; }
        public int exam_set_id { get; set; }
        public int max_marks { get; set; }
        public int min_marks { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class SaveMaxMinPayload
    {
        public int common_exam_set_id { get; set; }
        [MinLength(1)]
        public List<MaxMinItem> maxMinList { get; set; }
    }

    public class MaxMinItem
    {
        public int exam_set_id { get; set; }
        [Range(0, 999)]
        public int max_marks { get; set; }
        [Range(0, 999)]
        public int min_marks { get; set; }
    }


}

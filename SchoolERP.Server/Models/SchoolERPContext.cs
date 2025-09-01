using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Controllers.Account;
using SchoolERP.Server.Models.Academics;
using SchoolERP.Server.Models.Account;
using SchoolERP.Server.Models.Assets___Inventory;
using SchoolERP.Server.Models.Certificate;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Counsellor_Lead;
using SchoolERP.Server.Models.Examination;
using SchoolERP.Server.Models.Faculty;
using SchoolERP.Server.Models.Leave___Gallery;
using SchoolERP.Server.Models.Library;
using SchoolERP.Server.Models.Notice;
using SchoolERP.Server.Models.Online_Exam;
using SchoolERP.Server.Models.SMS;
using SchoolERP.Server.Models.Student_Models;
using SchoolERP.Server.Models.Subjects;
using SchoolERP.Server.Models.Transport;
using static SchoolERP.Server.Controllers.LockController;

namespace SchoolERP.Server.Models
{
    public class SchoolERPContext : DbContext
    {
        public SchoolERPContext(DbContextOptions<SchoolERPContext> options) : base(options) { }

        //superAdmin
        public DbSet<SuperAdminLogin> SuperAdminLogin { get; set; }

        //school
        public DbSet<Schools> schools { get; set; }
        public DbSet<SchoolDto> schoolDtos { get; set; }
        //faculty
        public DbSet<TbFacultymaster> TbFacultymasters { get; set; }
        public DbSet<TbFacultymasterDelete> TbFacultymasterDeletes { get; set; }
        public DbSet<faculty_attendance> faculty_Attendances { get; set; }
        public DbSet<faculty_classes> faculty_Classes { get; set; }
        public DbSet<faculty_subject> faculty_Subjects { get; set; }
        //configuration
        public DbSet<TbDesignation> TbDesignations { get; set; }
        public DbSet<DesigMapping> DesigMappings { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<SubModule> subModules { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<RolesPermission> rolesPermissions { get; set; }
        //public DbSet<AccessRolesPermission> accessRolesPermission { get; set; }
        public DbSet<LoginRequest> loginRequests { get; set; } 
        public DbSet<PasswordResetRequests> resetRequests { get; set; }

        //session
        public DbSet<Session> sessions { get; set; }
        public DbSet<Session_log> session_Logs { get; set; }
        public DbSet<SessionMapping> sessionMappings { get; set; } 
        //class
        public DbSet<ClassName> classNames { get; set; }
        public DbSet<TbClass> tbClasses { get; set; }
        //class Routine
        public DbSet<Period> periods { get; set; }
        public DbSet<Schedule> schedules { get; set; }

        //student
        public DbSet<Student_Other_info> student_Other_Infos { get; set; }
        public DbSet<Student_reg> student_Regs { get; set; }
        public DbSet<tb_studentmaster> tb_studentmasters { get; set; }
        public DbSet<stu_Attendance> stu_Attendances { get; set; }

        //subjects
        public DbSet<Subject> subjects { get; set; }
        public DbSet<ClassSubjects> ClassSubjects { get; set; }
        public DbSet<student_optional_subject> student_Optional_Subjects { get; set; }
        public DbSet<chapters> chapters { get; set; }
        public DbSet<Syllabus> syllabus { get; set; }

        //examination
        public DbSet<exam_term> exam_terms { get; set; }
        public DbSet<exam_type> exam_types { get; set; }
        public DbSet<exam_name> exam_names { get; set; }
        public DbSet<exam_set> exam_sets { get; set; }
        public DbSet<assign_exam_set> assign_exam_sets { get; set; }
        public DbSet<define_weightage> define_weightages { get; set; }
        public DbSet<define_max_min> define_max_mins { get; set; }
        public DbSet<marks_entry> marks_Entries { get; set; } 



        //academics
        public DbSet<selfLearningMaterial> learningMaterials { get; set; }
        public DbSet<workAssignment> workAssignments { get; set; }
        public DbSet<assignmentSubjects> assignmentSubjects { get; set; }
        public DbSet<assignmentAttachments> assignmentAttachments { get; set; }
        public DbSet<assignmentReport>  assignmentReports { get; set; }

        //acounts
        public DbSet<feeType> feeTypes { get; set; }
        public DbSet<feeHead> feeHeads { get; set; }
        public DbSet<feeHeadMapping> feeHeadMappings { get; set; }
        public DbSet<feeInstallmentMaster> feeInstallmentMasters { get; set; }
        public DbSet<FeeStudentLedger> feeStudentLedgers { get; set; }

        //online exam
        public DbSet<Exams> exams { get; set; }
        public DbSet<Questions> questions { get; set; }
        public DbSet<Student_Exams> student_Exams { get; set; }
        public DbSet<Student_Answers> student_Answers { get; set; }

        //Assets & Inventory
        public DbSet<Assets> assets { get; set; }
        public DbSet<Inventory> inventories { get; set; }
        public DbSet<Inventory_Variants> inventory_Variants { get; set; }
        public DbSet<purchase_entries> purchase_Entries { get; set; }
        public DbSet<sell_counter> sell_Counters { get; set; }
        public DbSet<Vendors> vendors { get; set; }
        public DbSet<purchase_transaction> purchase_Transactions { get; set; }

        //Certificate
        public DbSet<certificate_templates> certificate_Templates { get; set; }
        public DbSet<issued_certificates> issued_Certificates { get; set; }


        //visitor
        public DbSet<visitor> visitors { get; set; }

        //hostal
        public DbSet<hostal> hostals { get; set; }

        //counsellor & lead
        public DbSet<lead_types> lead_Types { get; set; }
        public DbSet<leads> leads { get; set; }
        public DbSet<followup> followups { get; set; }

        //leave & galery
        public DbSet<holidays> holidays { get; set; }
        public DbSet<galleryCategory> galleryCategories { get; set; }
        public DbSet<imageGallery> imageGalleries { get; set; }

        //sms&notice
        public DbSet<SMSLog> sMSLogs { get; set; }
        public DbSet<SMSRecipients> sMSRecipients { get; set; }
        //notices
        public DbSet<notices> notices { get; set; }
        public DbSet<important_Programs> important_Programs { get; set; }
        public DbSet<communication> communications { get; set; }

        //settings
        public DbSet<Macro> macros { get; set; }
        public DbSet<templateType> template_Types { get; set; }
        public DbSet<templateMacroUsage> template_Macro_Usages { get; set; }
        public DbSet<SMS_templates> sMS_Templates { get; set; }
        public DbSet<SMS_template_versions> sMS_Template_Versions { get; set; }
        public DbSet<SMS_Gateway_Settings> sMS_Gateway_Settings { get; set; }

        //global settings
        public DbSet<globalheaderSettings> globalheaders { get; set; }
        public DbSet<signatureSettings> signatureSettings { get; set; }
        public DbSet<supportContactSettings> supportContactSettings { get; set; }
        public DbSet<applicationThemeSettings> applicationThemeSettings { get; set; }

        ///transportation <summary>
        public DbSet<TransportRoutes> transportRoutes { get; set; }
        public DbSet<TransportStops> transportStops { get; set; }
        public DbSet<VehicleType> vehicleTypes { get; set; }
        public DbSet<Vehicles> vehicles { get; set; }
        public DbSet<VehicleRouteMapping> vehicleRouteMappings{ get; set; }
        public DbSet<Drivers> drivers { get; set; }
        public DbSet<TransportAssignments> transportAssignments { get; set; }
        public DbSet<TransportFees> transportFees { get; set; }
        /// </summary>
        /// 


        //library
        public DbSet<library_books> library_Books { get; set; }
        public DbSet<library_members> library_Members { get; set; }
        public DbSet<library_issues> library_Issues { get; set; }
        public DbSet<library_fines> library_Fines { get; set; }


        //Form Download
        public DbSet<download_forms> download_Forms { get; set; }


        //procedure
        //public virtual DbSet<SecIdResult> SampleModels { get; set; }

        public DbSet<State> states { get; set; }
        
        
        
        public DbSet<LockEntry> lockEntries { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tb_studentmaster>().HasKey(s => new { s.stu_id, s.school_id });
            modelBuilder.Entity<ClassName>().HasKey(cn => new { cn.class_id, cn.school_id });
            modelBuilder.Entity<TbClass>().HasKey(cn => new { cn.sec_id, cn.school_id });
            modelBuilder.Entity<ClassSubjects>().HasKey(cs => new { cs.class_id, cs.subject_id, cs.session });
 

            modelBuilder.Entity<exam_name>()
                .HasOne(en => en.exam_term)
                .WithMany()  
                .HasPrincipalKey(et => et.exam_term_id)  
                .HasForeignKey(en => en.term_id);

            base.OnModelCreating(modelBuilder);
        }
    }

}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolERP.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "assignmentAttachments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    assignment_id = table.Column<int>(type: "int", nullable: false),
                    attachment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_assignmentAttachments", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "assignmentSubjects",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    assignment_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_assignmentSubjects", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "chapters",
                columns: table => new
                {
                    chapter_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    chapter_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chapters", x => x.chapter_id);
                });

            migrationBuilder.CreateTable(
                name: "class_name",
                columns: table => new
                {
                    class_id = table.Column<int>(type: "int", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dis_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_class_name", x => new { x.class_id, x.school_id });
                });

            migrationBuilder.CreateTable(
                name: "class_schedule",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    sec_id = table.Column<int>(type: "int", nullable: false),
                    day_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    period_id = table.Column<int>(type: "int", nullable: false),
                    faculty_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    routine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    session = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_class_schedule", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ClassSubjects",
                columns: table => new
                {
                    class_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    session = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSubjects", x => new { x.class_id, x.subject_id, x.session });
                });

            migrationBuilder.CreateTable(
                name: "faculty_attendance",
                columns: table => new
                {
                    attendanceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    facultyId = table.Column<int>(type: "int", nullable: false),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    inTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    outTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faculty_attendance", x => x.attendanceId);
                });

            migrationBuilder.CreateTable(
                name: "faculty_classes",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    faculty_id = table.Column<int>(type: "int", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faculty_classes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "faculty_subjects",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    faculty_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faculty_subjects", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "holidays",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: false),
                    end_date = table.Column<DateOnly>(type: "date", nullable: false),
                    event_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_holidays", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "loginRequests",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_loginRequests", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "module",
                columns: table => new
                {
                    module_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    module_name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    route = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    icon = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_module", x => x.module_id);
                });

            migrationBuilder.CreateTable(
                name: "PasswordResetRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OTP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OTPExpiry = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RequestDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsOTPVerified = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordResetRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "periods",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    period_number = table.Column<int>(type: "int", nullable: false),
                    start_time = table.Column<TimeOnly>(type: "time", nullable: false),
                    end_time = table.Column<TimeOnly>(type: "time", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_periods", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    permission_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    p_create = table.Column<bool>(type: "bit", nullable: false),
                    p_view = table.Column<bool>(type: "bit", nullable: false),
                    p_edit = table.Column<bool>(type: "bit", nullable: false),
                    p_delete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.permission_id);
                });

            migrationBuilder.CreateTable(
                name: "role_permissions",
                columns: table => new
                {
                    role_permission_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    desig_id = table.Column<int>(type: "int", nullable: false),
                    module_id = table.Column<int>(type: "int", nullable: false),
                    submodule_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    permission_id = table.Column<int>(type: "int", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role_permissions", x => x.role_permission_id);
                });

            migrationBuilder.CreateTable(
                name: "schoolDtos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SchoolName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EstablishmentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SchoolType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolStatus = table.Column<bool>(type: "bit", nullable: false),
                    SchoolBoard = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalArea = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SchoolFacilities = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransportationAvailable = table.Column<bool>(type: "bit", nullable: false),
                    EmergencyContact = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_schoolDtos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "schoolmaster",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SchoolName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    SchoolId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    City = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    State = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PostalCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Website = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    EstablishmentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SchoolType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    SchoolStatus = table.Column<bool>(type: "bit", maxLength: 255, nullable: false),
                    SchoolLogo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolBoard = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TotalArea = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SchoolFacilities = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransportationAvailable = table.Column<bool>(type: "bit", nullable: false),
                    EmergencyContact = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_schoolmaster", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "self_learning_material",
                columns: table => new
                {
                    material_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    content_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content_title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    content_url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_self_learning_material", x => x.material_id);
                });

            migrationBuilder.CreateTable(
                name: "session_mapping",
                columns: table => new
                {
                    mapping_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    session_id = table.Column<int>(type: "int", nullable: false),
                    desig_id = table.Column<int>(type: "int", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_session_mapping", x => x.mapping_id);
                });

            migrationBuilder.CreateTable(
                name: "state_list",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    state_id = table.Column<int>(type: "int", nullable: false),
                    state = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_state_list", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "student_attendance",
                columns: table => new
                {
                    attendance_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    stu_id = table.Column<int>(type: "int", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    sec_id = table.Column<int>(type: "int", nullable: false),
                    att_date = table.Column<DateOnly>(type: "date", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsExcused = table.Column<bool>(type: "bit", nullable: false),
                    inTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    outTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    session = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student_attendance", x => x.attendance_id);
                });

            migrationBuilder.CreateTable(
                name: "student_optional_subject",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    stu_id = table.Column<int>(type: "int", nullable: false),
                    subject_id = table.Column<int>(type: "int", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    session = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student_optional_subject", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "student_other_info",
                columns: table => new
                {
                    uid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    reg_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    old_reg_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    first_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mother_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    enquiry_type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    branch = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dob = table.Column<DateTime>(type: "datetime2", nullable: true),
                    state_id = table.Column<int>(type: "int", nullable: true),
                    pin_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contact_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    alt_contact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    enquiry_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    academic_year = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aadhar_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bloodgroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pen_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    userid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    father_occupation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_aadhar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_income = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_contact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    village = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    post = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    stuImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    religion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    caste = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    last_institution = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tc_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tc_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    counsellor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bank_account = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ifsc_code = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student_other_info", x => x.uid);
                });

            migrationBuilder.CreateTable(
                name: "subjects",
                columns: table => new
                {
                    subject_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    subject_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    subjectCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    optional = table.Column<bool>(type: "bit", nullable: false),
                    priority = table.Column<int>(type: "int", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subjects", x => x.subject_id);
                });

            migrationBuilder.CreateTable(
                name: "superadmin_login",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    last_login_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_superadmin_login", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "syllabus",
                columns: table => new
                {
                    syllabus_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    chapter_id = table.Column<int>(type: "int", nullable: false),
                    topic_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    document = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    document_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isDeleted = table.Column<bool>(type: "bit", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_syllabus", x => x.syllabus_id);
                });

            migrationBuilder.CreateTable(
                name: "tb_class",
                columns: table => new
                {
                    sec_id = table.Column<int>(type: "int", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    sec_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sec_dis_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    session = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_class", x => new { x.sec_id, x.school_id });
                });

            migrationBuilder.CreateTable(
                name: "tb_Designation",
                columns: table => new
                {
                    designation_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    designation_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_Designation", x => x.designation_id);
                });

            migrationBuilder.CreateTable(
                name: "Tb_facultymaster",
                columns: table => new
                {
                    faculty_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    qualification = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    dob = table.Column<DateOnly>(type: "date", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bloodgroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aadhar_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date_of_joining = table.Column<DateOnly>(type: "date", nullable: true),
                    whatsapp_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    designation = table.Column<int>(type: "int", nullable: true),
                    speciality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    spouse_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mother_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    local_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    experience = table.Column<int>(type: "int", nullable: true),
                    bank_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    account_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ifsc_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aadhar_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pan_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    passport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dl_details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pf_account_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    signature = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_facultymaster", x => x.faculty_id);
                });

            migrationBuilder.CreateTable(
                name: "Tb_facultymaster_permanentRemoval",
                columns: table => new
                {
                    faculty_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    last_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    qualification = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    phone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    dob = table.Column<DateOnly>(type: "date", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    bloodgroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aadhar_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    date_of_joining = table.Column<DateOnly>(type: "date", nullable: true),
                    whatsapp_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    designation = table.Column<int>(type: "int", nullable: true),
                    speciality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    spouse_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mother_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    father_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    local_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    experience = table.Column<int>(type: "int", nullable: true),
                    bank_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    account_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ifsc_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    aadhar_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pan_card = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    passport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dl_details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pf_account_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    signature = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_facultymaster_permanentRemoval", x => x.faculty_id);
                });

            migrationBuilder.CreateTable(
                name: "tb_studentmaster",
                columns: table => new
                {
                    stu_id = table.Column<int>(type: "int", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    uid = table.Column<int>(type: "int", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: true),
                    sec_id = table.Column<int>(type: "int", nullable: true),
                    registration_no = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    house_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isNew = table.Column<bool>(type: "bit", nullable: true),
                    isActive = table.Column<bool>(type: "bit", nullable: true),
                    session = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_studentmaster", x => new { x.stu_id, x.school_id });
                });

            migrationBuilder.CreateTable(
                name: "tbl_session",
                columns: table => new
                {
                    session_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    session_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    end_month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_year = table.Column<int>(type: "int", nullable: false),
                    end_year = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_session", x => x.session_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_session_log",
                columns: table => new
                {
                    session_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    session_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    end_month = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    start_year = table.Column<int>(type: "int", nullable: false),
                    end_year = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_session_log", x => x.session_id);
                });

            migrationBuilder.CreateTable(
                name: "workAssignment",
                columns: table => new
                {
                    assignment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    sec_id = table.Column<int>(type: "int", nullable: true),
                    due_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    priority = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    remarks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    feedback = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    videoLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_workAssignment", x => x.assignment_id);
                });

            migrationBuilder.CreateTable(
                name: "sub_modules",
                columns: table => new
                {
                    submodule_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    module_id = table.Column<int>(type: "int", nullable: false),
                    submodule_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    submodule_route = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    icon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false),
                    parentsubmodule_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sub_modules", x => x.submodule_id);
                    table.ForeignKey(
                        name: "FK_sub_modules_module_module_id",
                        column: x => x.module_id,
                        principalTable: "module",
                        principalColumn: "module_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "student_reg",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    uid = table.Column<int>(type: "int", nullable: false),
                    reg_no = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    adm_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    class_id = table.Column<int>(type: "int", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    registration_amt = table.Column<int>(type: "int", nullable: false),
                    mode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    session = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student_reg", x => x.id);
                    table.ForeignKey(
                        name: "FK_student_reg_student_other_info_uid",
                        column: x => x.uid,
                        principalTable: "student_other_info",
                        principalColumn: "uid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "desig_mapping",
                columns: table => new
                {
                    mapping_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    designation_id = table.Column<int>(type: "int", nullable: false),
                    faculty_id = table.Column<int>(type: "int", nullable: true),
                    assigned_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    school_id = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_desig_mapping", x => x.mapping_id);
                    table.ForeignKey(
                        name: "FK_desig_mapping_Tb_facultymaster_faculty_id",
                        column: x => x.faculty_id,
                        principalTable: "Tb_facultymaster",
                        principalColumn: "faculty_id");
                    table.ForeignKey(
                        name: "FK_desig_mapping_tb_Designation_designation_id",
                        column: x => x.designation_id,
                        principalTable: "tb_Designation",
                        principalColumn: "designation_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_desig_mapping_designation_id",
                table: "desig_mapping",
                column: "designation_id");

            migrationBuilder.CreateIndex(
                name: "IX_desig_mapping_faculty_id",
                table: "desig_mapping",
                column: "faculty_id");

            migrationBuilder.CreateIndex(
                name: "IX_student_reg_uid",
                table: "student_reg",
                column: "uid");

            migrationBuilder.CreateIndex(
                name: "IX_sub_modules_module_id",
                table: "sub_modules",
                column: "module_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "assignmentAttachments");

            migrationBuilder.DropTable(
                name: "assignmentSubjects");

            migrationBuilder.DropTable(
                name: "chapters");

            migrationBuilder.DropTable(
                name: "class_name");

            migrationBuilder.DropTable(
                name: "class_schedule");

            migrationBuilder.DropTable(
                name: "ClassSubjects");

            migrationBuilder.DropTable(
                name: "desig_mapping");

            migrationBuilder.DropTable(
                name: "faculty_attendance");

            migrationBuilder.DropTable(
                name: "faculty_classes");

            migrationBuilder.DropTable(
                name: "faculty_subjects");

            migrationBuilder.DropTable(
                name: "holidays");

            migrationBuilder.DropTable(
                name: "loginRequests");

            migrationBuilder.DropTable(
                name: "PasswordResetRequests");

            migrationBuilder.DropTable(
                name: "periods");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "role_permissions");

            migrationBuilder.DropTable(
                name: "schoolDtos");

            migrationBuilder.DropTable(
                name: "schoolmaster");

            migrationBuilder.DropTable(
                name: "self_learning_material");

            migrationBuilder.DropTable(
                name: "session_mapping");

            migrationBuilder.DropTable(
                name: "state_list");

            migrationBuilder.DropTable(
                name: "student_attendance");

            migrationBuilder.DropTable(
                name: "student_optional_subject");

            migrationBuilder.DropTable(
                name: "student_reg");

            migrationBuilder.DropTable(
                name: "sub_modules");

            migrationBuilder.DropTable(
                name: "subjects");

            migrationBuilder.DropTable(
                name: "superadmin_login");

            migrationBuilder.DropTable(
                name: "syllabus");

            migrationBuilder.DropTable(
                name: "tb_class");

            migrationBuilder.DropTable(
                name: "Tb_facultymaster_permanentRemoval");

            migrationBuilder.DropTable(
                name: "tb_studentmaster");

            migrationBuilder.DropTable(
                name: "tbl_session");

            migrationBuilder.DropTable(
                name: "tbl_session_log");

            migrationBuilder.DropTable(
                name: "workAssignment");

            migrationBuilder.DropTable(
                name: "Tb_facultymaster");

            migrationBuilder.DropTable(
                name: "tb_Designation");

            migrationBuilder.DropTable(
                name: "student_other_info");

            migrationBuilder.DropTable(
                name: "module");
        }
    }
}

import { DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClassWorkComponent } from "./Admin/academics/class-work/class-work.component";
import { CreateCourseComponent } from "./Admin/academics/create-course/create-course.component";
import { DailyNotesComponent } from "./Admin/academics/daily-notes/daily-notes.component";
import { EContentComponent } from "./Admin/academics/e-content/e-content.component";
import { EditCourseComponent } from "./Admin/academics/edit-course/edit-course.component";
import { HomeWorkComponent } from "./Admin/academics/home-work/home-work.component";
import { ExploreSlmContentComponent } from "./Admin/academics/self-learning-material/explore-slm-content/explore-slm-content.component";
import { ExploreSlmComponent } from "./Admin/academics/self-learning-material/explore-slm/explore-slm.component";
import { SelfLearningMaterialComponent } from "./Admin/academics/self-learning-material/self-learning-material.component";
import { AddClasswordHomeworkDailynotesComponent } from "./Admin/academics/Subcomponent/add-classword-homework-dailynotes/add-classword-homework-dailynotes.component";
import { CopyCorrectionComponent } from "./Admin/academics/Subcomponent/copy-correction/copy-correction.component";
import { VideoTutorialComponent } from "./Admin/academics/video-tutorial/video-tutorial.component";
import { ExpenseCategoryComponent } from "./Admin/Accounts/Account setting/expense-category/expense-category.component";
import { FeeHeadingsComponent } from "./Admin/Accounts/Account setting/fee-headings/fee-headings.component";
import { FeeStructureComponent } from "./Admin/Accounts/Account setting/fee-structure/fee-structure.component";
import { ImportFeeDuesListComponent } from "./Admin/Accounts/Account setting/import-fee-dues-list/import-fee-dues-list.component";
import { LateFineComponent } from "./Admin/Accounts/Account setting/late-fine/late-fine.component";
import { TallyDataSyncComponent } from "./Admin/Accounts/Account setting/tally-data-sync/tally-data-sync.component";
import { CashBookComponent } from "./Admin/Accounts/Expense/cash-book/cash-book.component";
import { DayBookWithStuFeeComponent } from "./Admin/Accounts/Expense/day-book-with-stu-fee/day-book-with-stu-fee.component";
import { DayBookComponent } from "./Admin/Accounts/Expense/day-book/day-book.component";
import { CollectFeesComponent } from "./Admin/Accounts/Fee Collection/collect-fees/collect-fees.component";
import { FeeListComponent } from "./Admin/Accounts/Fee Collection/fee-list/fee-list.component";
import { CreateDemandSlipComponent } from "./Admin/Accounts/Fee Overdue/create-demand-slip/create-demand-slip.component";
import { FeeOverdueComponent } from "./Admin/Accounts/Fee Overdue/fee-overdue/fee-overdue.component";
import { PrintDemandSlipComponent } from "./Admin/Accounts/Fee Overdue/print-demand-slip/print-demand-slip.component";
import { AuditComponent } from "./Admin/Accounts/Reports/audit/audit.component";
import { DailyComponent } from "./Admin/Accounts/Reports/daily/daily.component";
import { FeePaidComponent } from "./Admin/Accounts/Reports/fee-paid/fee-paid.component";
import { MonthlyComponent } from "./Admin/Accounts/Reports/monthly/monthly.component";
import { OnlinePaymentComponent } from "./Admin/Accounts/Reports/online-payment/online-payment.component";
import { RefundableAmountComponent } from "./Admin/Accounts/Reports/refundable-amount/refundable-amount.component";
import { TransportComponent } from "./Admin/Accounts/Reports/transport/transport.component";
import { TrashBoxComponent } from "./Admin/Accounts/Reports/trash-box/trash-box.component";
import { YearlyComponent } from "./Admin/Accounts/Reports/yearly/yearly.component";
import { AddAssetsComponent } from "./Admin/Assets & Inventory/Assets/add-assets/add-assets.component";
import { ViewAssetsComponent } from "./Admin/Assets & Inventory/Assets/view-assets/view-assets.component";
import { SellReportSellCounterComponent } from "./Admin/Assets & Inventory/Sell Counter/sell-report-sell-counter/sell-report-sell-counter.component";
import { ViewStockSellCounterComponent } from "./Admin/Assets & Inventory/Sell Counter/view-stock-sell-counter/view-stock-sell-counter.component";
import { PurchaseEntryComponent } from "./Admin/Assets & Inventory/Settings/purchase-entry/purchase-entry.component";
import { StockItemListComponent } from "./Admin/Assets & Inventory/Settings/stock-item-list/stock-item-list.component";
import { ActivityReportBranchComponent } from "./Admin/Branch & User/activity-report-branch/activity-report-branch.component";
import { BranchComponent } from "./Admin/Branch & User/branch/branch.component";
import { UsersBranchComponent } from "./Admin/Branch & User/users-branch/users-branch.component";
import { CertificateListComponent } from "./Admin/Certificate/certificate-list/certificate-list.component";
import { AddClassComponent } from "./Admin/Class & Subjects/Class Info/add-class/add-class.component";
import { ClassReportComponent } from "./Admin/Class & Subjects/Class Info/class-report/class-report.component";
import { PromoteClassesComponent } from "./Admin/Class & Subjects/Class Info/promote-classes/promote-classes.component";
import { ViewClassesComponent } from "./Admin/Class & Subjects/Class Info/view-classes/view-classes.component";
import { AddRoutineComponent } from "./Admin/Class & Subjects/Class Routine/add-routine/add-routine.component";
import { ViewRoutinePrintComponent } from "./Admin/Class & Subjects/Class Routine/Report Section/view-routine-print/view-routine-print.component";
import { TeacherRoutineComponent } from "./Admin/Class & Subjects/Class Routine/teacher-routine/teacher-routine.component";
import { ViewRoutineComponent } from "./Admin/Class & Subjects/Class Routine/view-routine/view-routine.component";
import { LessonPlanComponent } from "./Admin/Class & Subjects/lesson-plan/lesson-plan.component";
import { LiveClassComponent } from "./Admin/Class & Subjects/live-class/live-class.component";
import { AddSubjectComponent } from "./Admin/Class & Subjects/Subject Info/add-subject/add-subject.component";
import { OptionalSubjectComponent } from "./Admin/Class & Subjects/Subject Info/optional-subject/optional-subject.component";
import { QuestionSetComponent } from "./Admin/Class & Subjects/Subject Info/question-set/question-set.component";
import { QuestionTypeComponent } from "./Admin/Class & Subjects/Subject Info/question-type/question-type.component";
import { ViewSubjectComponent } from "./Admin/Class & Subjects/Subject Info/view-subject/view-subject.component";
import { UnitPlanComponent } from "./Admin/Class & Subjects/unit-plan/unit-plan.component";
import { ManageRolesComponent } from "./Admin/Configuration/manage-roles/manage-roles.component";
import { PermissionsComponent } from "./Admin/Configuration/permissions/permissions.component";
import { RoleConfigurationComponent } from "./Admin/Configuration/role-configuration/role-configuration.component";
import { SessionManagementComponent } from "./Admin/Configuration/session-management/session-management.component";
import { TSubjectMappingComponent } from "./Admin/Configuration/Teacher & Staff Settings/t-subject-mapping/t-subject-mapping.component";
import { AddLeadComponent } from "./Admin/Counsellor & Leads/add-lead/add-lead.component";
import { ImportLeadsComponent } from "./Admin/Counsellor & Leads/import-leads/import-leads.component";
import { LeadTypeComponent } from "./Admin/Counsellor & Leads/lead-type/lead-type.component";
import { ViewLeadsComponent } from "./Admin/Counsellor & Leads/view-leads/view-leads.component";
import { ADashboardComponent } from "./Admin/Dashboard/a-dashboard/a-dashboard.component";
import { SDashboardComponent } from "./Admin/Dashboard/s-dashboard/s-dashboard.component";
import { SaDashboardComponent } from "./Admin/Dashboard/sa-dashboard/sa-dashboard.component";
import { TDashboardComponent } from "./Admin/Dashboard/t-dashboard/t-dashboard.component";
import { CbseRegComponent } from "./Admin/Download Form/cbse-reg/cbse-reg.component";
import { RegistrationDownloadFormComponent } from "./Admin/Download Form/registration-download-form/registration-download-form.component";
import { SchoolshipComponent } from "./Admin/Download Form/schoolship/schoolship.component";
import { UploadFormComponent } from "./Admin/Download Form/upload-form/upload-form.component";
import { AddCoExamScheduleComponent } from "./Admin/Examination/add-co-exam-schedule/add-co-exam-schedule.component";
import { AddScheduleComponent } from "./Admin/Examination/add-schedule/add-schedule.component";
import { ExamCategoryComponent } from "./Admin/Examination/exam-category/exam-category.component";
import { ExamGradeComponent } from "./Admin/Examination/exam-grade/exam-grade.component";
import { ExamGroupComponent } from "./Admin/Examination/exam-group/exam-group.component";
import { ExamTrashBoxComponent } from "./Admin/Examination/exam-trash-box/exam-trash-box.component";
import { ViewCoExamScheduleComponent } from "./Admin/Examination/view-co-exam-schedule/view-co-exam-schedule.component";
import { ViewScheduleComponent } from "./Admin/Examination/view-schedule/view-schedule.component";
import { AddHostelComponent } from "./Admin/Hostal/add-hostel/add-hostel.component";
import { ViewHostalComponent } from "./Admin/Hostal/view-hostal/view-hostal.component";
import { ImageFolderComponent } from "./Admin/Leave & Gallery/image-folder/image-folder.component";
import { LeaveComponent } from "./Admin/Leave & Gallery/leave/leave.component";
import { MonthlyCalendarComponent } from "./Admin/Leave & Gallery/monthly-calendar/monthly-calendar.component";
import { PhotoGalleryComponent } from "./Admin/Leave & Gallery/photo-gallery/photo-gallery.component";
import { AddBookComponent } from "./Admin/Library/add-book/add-book.component";
import { BookCodeComponent } from "./Admin/Library/book-code/book-code.component";
import { ImportBooksComponent } from "./Admin/Library/import-books/import-books.component";
import { IssueBookComponent } from "./Admin/Library/issue-book/issue-book.component";
import { IssueReturnBookComponent } from "./Admin/Library/issue-return-book/issue-return-book.component"; 
import { ViewBookComponent } from "./Admin/Library/view-book/view-book.component";
import { AddNoticeComponent } from "./Admin/Notice & SMS/Notice Board/add-notice/add-notice.component";
import { AddProgramsComponent } from "./Admin/Notice & SMS/Notice Board/add-programs/add-programs.component";
import { ImportantListsDatesComponent } from "./Admin/Notice & SMS/Notice Board/important-lists-dates/important-lists-dates.component";
import { StudentDeskComponent } from "./Admin/Notice & SMS/Notice Board/student-desk/student-desk.component";
import { ViewNoticeComponent } from "./Admin/Notice & SMS/Notice Board/view-notice/view-notice.component";
import { ComposeSmsComponent } from "./Admin/Notice & SMS/SMS Board/compose-sms/compose-sms.component";
import { SmsOutboxComponent } from "./Admin/Notice & SMS/SMS Board/sms-outbox/sms-outbox.component";
import { VoiceCallComponent } from "./Admin/Notice & SMS/SMS Board/voice-call/voice-call.component";
import { AddTestOnlineExamComponent } from "./Admin/Online Exam/add-test-online-exam/add-test-online-exam.component";
 import { ViewTestResultOnlineExamComponent } from "./Admin/Online Exam/view-test-result-online-exam/view-test-result-online-exam.component";
import { AddDepartmentComponent } from "./Admin/Payroll/Department/add-department/add-department.component";
import { DepartmentListComponent } from "./Admin/Payroll/Department/department-list/department-list.component";
import { GeneratePayslipComponent } from "./Admin/Payroll/Payroll/generate-payslip/generate-payslip.component";
import { MakePaymentComponent } from "./Admin/Payroll/Payroll/make-payment/make-payment.component";
import { SalaryDetailsComponent } from "./Admin/Payroll/Payroll/salary-details/salary-details.component";
import { SalaryListComponent } from "./Admin/Payroll/Payroll/salary-list/salary-list.component";
import { BankReportComponent } from "./Admin/Payroll/Reports/bank-report/bank-report.component";
import { ChallanReportComponent } from "./Admin/Payroll/Reports/challan-report/challan-report.component";
import { PfReportComponent } from "./Admin/Payroll/Reports/pf-report/pf-report.component";
import { PfStatementComponent } from "./Admin/Payroll/Reports/pf-statement/pf-statement.component";
import { AddCompanyComponent } from "./Admin/Placement Cell/add-company/add-company.component";
import { ViewCompanyComponent } from "./Admin/Placement Cell/view-company/view-company.component";
import { ViewStudentsComponent } from "./Admin/Placement Cell/view-students/view-students.component";
import { ViewProfileComponent } from "./Admin/Profile/view-profile/view-profile.component";
import { AttendanceRowDataComponent } from "./Admin/Student Record/Attendance/attendance-row-data/attendance-row-data.component";
import { GenerateReportsComponent } from "./Admin/Student Record/Attendance/generate-reports/generate-reports.component";
import { MonthlyAttendanceComponent } from "./Admin/Student Record/Attendance/monthly-attendance/monthly-attendance.component";
import { ViewReportsComponent } from "./Admin/Student Record/Attendance/view-reports/view-reports.component";
import { AddAlumniComponent } from "./Admin/Student Record/Registration & Alumni/add-alumni/add-alumni.component";
import { EnquiryComponent } from "./Admin/Student Record/Registration & Alumni/enquiry/enquiry.component";
import { GenerateTcComponent } from "./Admin/Student Record/Registration & Alumni/generate-tc/generate-tc.component";
import { StudentRegistrationComponent } from "./Admin/Student Record/Registration & Alumni/student-registration/student-registration.component";
import { ViewAlumniComponent } from "./Admin/Student Record/Registration & Alumni/view-alumni/view-alumni.component";
import { AddNewStudentComponent } from "./Admin/Student Record/Student Info/add-new-student/add-new-student.component";
import { IdCardReportComponent } from "./Admin/Student Record/Student Info/id-card-report/id-card-report.component";
import { ImportStudentComponent } from "./Admin/Student Record/Student Info/import-student/import-student.component";
import { StudentStatisticsComponent } from "./Admin/Student Record/Student Info/student-statistics/student-statistics.component";
import { StudentTrashBoxComponent } from "./Admin/Student Record/Student Info/student-trash-box/student-trash-box.component";
import { ViewReportComponent } from "./Admin/Student Record/Student Info/view-report/view-report.component";
import { ViewSiblingComponent } from "./Admin/Student Record/Student Info/view-sibling/view-sibling.component";
import { ViewSingleStudentComponent } from "./Admin/Student Record/Student Info/view-single-student/view-single-student.component";
import { ViewStudentComponent } from "./Admin/Student Record/Student Info/view-student/view-student.component";
import { TakeAttendanceComponent } from "./Admin/Teacher & Staff/Attendance/take-attendance/take-attendance.component";
import { ViewAttendanceComponent } from "./Admin/Teacher & Staff/Attendance/view-attendance/view-attendance.component";
import { AddNewFacultyComponent } from "./Admin/Teacher & Staff/Teacher & staff/add-new-faculty/add-new-faculty.component";
import { AlumniTeacherStaffComponent } from "./Admin/Teacher & Staff/Teacher & staff/alumni-teacher-staff/alumni-teacher-staff.component";
import { EvaluationSettingComponent } from "./Admin/Teacher & Staff/Teacher & staff/evaluation-setting/evaluation-setting.component";
import { FacultyIdCardComponent } from "./Admin/Teacher & Staff/Teacher & staff/faculty-id-card/faculty-id-card.component";
import { IcardPopupComponent } from "./Admin/Teacher & Staff/Teacher & staff/faculty-id-card/icard-popup/icard-popup.component";
import { FacultyTrashBoxComponent } from "./Admin/Teacher & Staff/Teacher & staff/faculty-trash-box/faculty-trash-box.component";
import { ImportTeacherStaffComponent } from "./Admin/Teacher & Staff/Teacher & staff/import-teacher-staff/import-teacher-staff.component";
import { TeacherEvaluationComponent } from "./Admin/Teacher & Staff/Teacher & staff/teacher-evaluation/teacher-evaluation.component";
import { ViewFacultyComponent } from "./Admin/Teacher & Staff/Teacher & staff/view-faculty/view-faculty.component";  
import { TrackVehicleComponent } from "./Admin/Transport/Transport Info/track-vehicle/track-vehicle.component";
import { ViewRouteComponent } from "./Admin/Transport/Transport Info/view-route/view-route.component"; 
import { AddVisitorComponent } from "./Admin/Visitors/add-visitor/add-visitor.component";
import { ViewVisitorComponent } from "./Admin/Visitors/view-visitor/view-visitor.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { NotFoundComponent } from "./Layout/not-found/not-found.component";
import { LoginComponent } from "./login/login.component";
import { StuClassWorkComponent } from "./Student/Acedmics L.M.S/stu-class-work/stu-class-work.component";
import { StuCurriculumComponent } from "./Student/Acedmics L.M.S/stu-curriculum/stu-curriculum.component";
import { StuDailyNotesComponent } from "./Student/Acedmics L.M.S/stu-daily-notes/stu-daily-notes.component";
import { StuEContentComponent } from "./Student/Acedmics L.M.S/stu-e-content/stu-e-content.component";
import { StuHomeWorkComponent } from "./Student/Acedmics L.M.S/stu-home-work/stu-home-work.component";
import { StuStudyMaterialComponent } from "./Student/Acedmics L.M.S/stu-study-material/stu-study-material.component";
import { StuImportantListsDatesComponent } from "./Student/Notice Board/stu-important-lists-dates/stu-important-lists-dates.component";
import { StuViewNoticeComponent } from "./Student/Notice Board/stu-view-notice/stu-view-notice.component";
import { StuExamResultsComponent } from "./Student/Online Examination/stu-exam-results/stu-exam-results.component";
import { StuMyExamsComponent } from "./Student/Online Examination/stu-my-exams/stu-my-exams.component";
import { StuApplyForLeaveComponent } from "./Student/stu-apply-for-leave/stu-apply-for-leave.component";
import { StuClassRoutineComponent } from "./Student/stu-class-routine/stu-class-routine.component";
import { StuExamScheduleComponent } from "./Student/stu-exam-schedule/stu-exam-schedule.component";
import { StuFeesHistoryComponent } from "./Student/stu-fees-history/stu-fees-history.component";
import { StuLessonPlanComponent } from "./Student/stu-lesson-plan/stu-lesson-plan.component";
import { StuLibraryBookComponent } from "./Student/stu-library-book/stu-library-book.component";
import { StuLiveClassesComponent } from "./Student/stu-live-classes/stu-live-classes.component";
import { StuPayOnlineComponent } from "./Student/stu-pay-online/stu-pay-online.component";
import { StuPhotoGalleryComponent } from "./Student/stu-photo-gallery/stu-photo-gallery.component";
import { StuProfileReportComponent } from "./Student/stu-profile-report/stu-profile-report.component";
import { StuProfileComponent } from "./Student/stu-profile/stu-profile.component";
import { StuReturnBookComponent } from "./Student/stu-return-book/stu-return-book.component";
import { StuSubjectTeachersComponent } from "./Student/stu-subject-teachers/stu-subject-teachers.component";
import { StuVideoTutorialComponent } from "./Student/stu-video-tutorial/stu-video-tutorial.component";
import { StuViewMarksheetComponent } from "./Student/stu-view-marksheet/stu-view-marksheet.component";
import { CreateSchoolComponent } from "./SuperAdmin/create-school/create-school.component";
import { SuperadminLoginComponent } from "./SuperAdmin/superadmin-login/superadmin-login.component";
import { ViewSchoolComponent } from "./SuperAdmin/view-school/view-school.component";
import { ViewDocumentComponent } from "./Admin/academics/Subcomponent/view-document/view-document.component";
import { EContentDetailComponent } from "./Admin/academics/Subcomponent/e-content-detail/e-content-detail.component";
import { AddChapterComponent } from "./Admin/Class & Subjects/Subject Info/add-chapter/add-chapter.component";
import { AddSyllabusComponent } from "./Admin/Class & Subjects/Subject Info/add-syllabus/add-syllabus.component";
import { ViewSyllabusComponent } from "./Admin/Class & Subjects/Subject Info/view-syllabus/view-syllabus.component";
import { StudyMaterialComponent } from "./Admin/Class & Subjects/Subject Info/study-material/study-material.component";
import { StuSyllabusComponent } from "./Student/Acedmics L.M.S/stu-syllabus/stu-syllabus.component";
import { HomeworkReportComponent } from "./Admin/academics/homework-report/homework-report.component";
import { ViewTestOnlineExamComponent } from "./Admin/Online Exam/view-test-online-exam/view-test-online-exam.component";
import { ViewQuestionsComponent } from "./Admin/Online Exam/view-questions/view-questions.component";
import { InstructionPageComponent } from "./Student/Online Examination/instruction-page/instruction-page.component";
import { StartOnlineExamComponent } from "./Student/Online Examination/start-online-exam/start-online-exam.component";
import { CheckResultComponent } from "./Student/Online Examination/check-result/check-result.component";
import { SubPhotoGalleryComponent } from "./Admin/Leave & Gallery/sub-photo-gallery/sub-photo-gallery.component";
import { FollowUpComponent } from "./Admin/Counsellor & Leads/follow-up/follow-up.component";
import { VendorListAComponent } from "./Admin/Assets & Inventory/Settings/vendor-list/vendor-list.component";
import { ViewAssetDeployeReportComponent } from "./Admin/Assets & Inventory/Assets/view-asset-deploye-report/view-asset-deploye-report.component";
import { PrintSellCounterComponent } from "./Admin/Assets & Inventory/Sell Counter/print-sell-counter/print-sell-counter.component";
import { SmsSettingComponent } from "./Settings/SMS Setting/sms-setting/sms-setting.component";
import { ViewQueriesComponent } from "./Admin/Notice & SMS/Notice Board/view-queries/view-queries.component";
import { ViewCertificateComponent } from "./Admin/Certificate/view-certificate/view-certificate.component";
import { DeviceSettingComponent } from "./Settings/Device Setting/device-setting/device-setting.component";
import { SystemSettingComponent } from "./Settings/System Setting/system-setting/system-setting.component";
import { FeeTypesComponent } from "./Admin/Accounts/Account setting/fee-types/fee-types.component";
import { FeeHeadMappingComponent } from "./Admin/Accounts/Account setting/fee-head-mapping/fee-head-mapping.component";
import { AddDriverComponent } from "./Admin/Transport/Driver Info/add-driver/add-driver.component";
import { ViewDriverComponent } from "./Admin/Transport/Driver Info/view-driver/view-driver.component";
import { VehicleListComponent } from "./Admin/Transport/Vehicle Info/vehicle-list/vehicle-list.component";
import { VehicleModelComponent } from "./Admin/Transport/Vehicle Info/vehicle-model/vehicle-model.component";
import { VendorListComponent } from "./Admin/Transport/Vehicle Info/vendor-list/vendor-list.component";
import { AddVehicleComponent } from "./Admin/Transport/Vehicle Info/add-vehicle/add-vehicle.component";
import { AddRouteComponent } from "./Admin/Transport/Transport Info/add-route/add-route.component";  
import { DefineMemberComponent } from "./Admin/Library/define-member/define-member.component";
import { SearchIssuedBookComponent } from "./Admin/Library/search-issued-book/search-issued-book.component";
import { authGuard } from "./Services/auth.guard";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { DefineExamTermComponent } from "./Admin/Examination/define-exam-term/define-exam-term.component";
import { DefineExamNameComponent } from "./Admin/Examination/define-exam-name/define-exam-name.component";
import { DefineExamTypeComponent } from "./Admin/Examination/define-exam-type/define-exam-type.component";
import { DefineExamSetComponent } from "./Admin/Examination/define-exam-set/define-exam-set.component";
import { DefineWeightageComponent } from "./Admin/Examination/define-weightage/define-weightage.component";
import { DefineMaxMinComponent } from "./Admin/Examination/define-max-min/define-max-min.component";
 
 

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [authGuard] },
  { path: 'superadmin-login', component: SuperadminLoginComponent },

  { path: 'unauthorized', component: UnauthorizedComponent },

  //schoolcreate
  { path: 'super-admin/create-school', component: CreateSchoolComponent, canActivate: [authGuard], data: { roles: ['superadmin'] } },
  { path: 'super-admin/create-school/:id', component: CreateSchoolComponent, canActivate: [authGuard], data: { roles: ['superadmin'] } },
  { path: 'super-admin/view-school', component: ViewSchoolComponent, canActivate: [authGuard], data: { roles: ['superadmin'] } },

  //dashboard
  { path: 'superadmin-dashboard', component: SaDashboardComponent, canActivate: [authGuard], data: { roles: ['superadmin'] } },
  { path: 'admin-dashboard', component: ADashboardComponent, canActivate: [authGuard], data: { roles: ['superadmin', 'admin'] } },
  { path: 'faculty-dashboard', component: TDashboardComponent, canActivate: [authGuard], data: { roles: ['superadmin', 'admin', 'faculty'] } },
  { path: 'student-dashboard', component: SDashboardComponent, canActivate: [authGuard], data: { roles: ['student', 'admin', 'faculty'] } },

  //profile
  { path: 'view-profile', component: ViewProfileComponent, canActivate: [authGuard] },


  //class & Subject
  { path: 'class/live', component: LiveClassComponent, canActivate: [authGuard] },
  { path: 'subject/add', component: AddSubjectComponent, canActivate: [authGuard] },
  { path: 'subject/add/:sub_id', component: AddSubjectComponent, canActivate: [authGuard] },
  { path: 'subject/view', component: ViewSubjectComponent, canActivate: [authGuard] },
  { path: 'subject/question-type', component: QuestionTypeComponent, canActivate: [authGuard] },
  { path: 'subject/question-set', component: QuestionSetComponent, canActivate: [authGuard] },
  { path: 'subject/optional', component: OptionalSubjectComponent, canActivate: [authGuard] },
  { path: 'subject/add-chapter', component: AddChapterComponent, canActivate: [authGuard] },
  { path: 'subject/add-syllabus', component: AddSyllabusComponent, canActivate: [authGuard] },
  { path: 'subject/view-syllabus', component: ViewSyllabusComponent, canActivate: [authGuard] },
  { path: 'subject/study-material', component: StudyMaterialComponent, canActivate: [authGuard] },
  { path: 'class/add', component: AddClassComponent, canActivate: [authGuard] },
  { path: 'class/add/:id', component: AddClassComponent, canActivate: [authGuard] },
  { path: 'class/view', component: ViewClassesComponent, canActivate: [authGuard] },
  { path: 'class/promote', component: PromoteClassesComponent, canActivate: [authGuard] },
  { path: 'class/class-report', component: ClassReportComponent, canActivate: [authGuard] },
  { path: 'api/Class/exporttoexcel', component: ClassReportComponent, canActivate: [authGuard] },
  { path: 'unit-plan', component: UnitPlanComponent, canActivate: [authGuard] },
  { path: 'lesson/plan', component: LessonPlanComponent, canActivate: [authGuard] },

  { path: 'routine/add-routine', component: AddRoutineComponent, canActivate: [authGuard] },
  { path: 'routine/add-routine/:schedule_id', component: AddRoutineComponent, canActivate: [authGuard] },
  { path: 'routine/Offline', component: ViewRoutineComponent, canActivate: [authGuard] },
  { path: 'routine/Online', component: ViewRoutineComponent, canActivate: [authGuard] },
  //{ path: 'routine/online-routine', component: OnlineRoutineComponent, canActivate: [authGuard] },
  { path: 'routine/teacher-routine', component: TeacherRoutineComponent, canActivate: [authGuard] },
  { path: 'routine/view-routine/print/:cls_id', component: ViewRoutinePrintComponent, canActivate: [authGuard] },
   
 

  //students 
  { path: 'student/add', component: AddNewStudentComponent, canActivate: [authGuard] },
  { path: 'student/add/:uid/:status', component: AddNewStudentComponent, canActivate: [authGuard] }, 
  { path: 'student/view', component: ViewStudentComponent, canActivate: [authGuard] },
  { path: 'student/view-report/:uid', component: ViewReportComponent, canActivate: [authGuard] },
  { path: 'student/reg/view-single-stu', component: ViewSingleStudentComponent}, 
  { path: 'student/sibling/view', component: ViewSiblingComponent, canActivate: [authGuard] },
  { path: 'student/statistics', component: StudentStatisticsComponent, canActivate: [authGuard] },
  { path: 'student/import', component: ImportStudentComponent, canActivate: [authGuard] },
  { path: 'student/id-card-report', component: IdCardReportComponent, canActivate: [authGuard] },
  { path: 'student/trash', component: StudentTrashBoxComponent, canActivate: [authGuard] },
  { path: 'alumni/add', component: AddAlumniComponent, canActivate: [authGuard] },
  { path: 'alumni/view', component: ViewAlumniComponent, canActivate: [authGuard] },
  { path: 'alumni/tc-certificate/:uid/:stuId', component: GenerateTcComponent, canActivate: [authGuard] }, 
  { path: 'registration/enquiry', component: EnquiryComponent, canActivate: [authGuard] },
  { path: 'registration/enquiry/:uid', component: EnquiryComponent, canActivate: [authGuard] },
  { path: 'registration', component: StudentRegistrationComponent, canActivate: [authGuard] },

  //attendance
  { path: 'attendance/view', component: ViewReportsComponent, canActivate: [authGuard] },
  { path: 'attendance/take', component: GenerateReportsComponent, canActivate: [authGuard] },
  { path: 'attendance/row-data', component: AttendanceRowDataComponent, canActivate: [authGuard] },
  { path: 'att/monthly-report', component: MonthlyAttendanceComponent, canActivate: [authGuard] },


  //Teacher & Staff
  { path: 'teacher-staff/add', component: AddNewFacultyComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/add/:faculty_id', component: AddNewFacultyComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/view-teacher', component: ViewFacultyComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/view-staff', component: ViewFacultyComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/alumni', component: AlumniTeacherStaffComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/import', component: ImportTeacherStaffComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/teacher-evaluation', component: TeacherEvaluationComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/evaluation-setting', component: EvaluationSettingComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/id-card', component: FacultyIdCardComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/id-card/icard-list', component: IcardPopupComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/trash-box', component: FacultyTrashBoxComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/view-attendance', component: ViewAttendanceComponent, canActivate: [authGuard] },
  { path: 'teacher-staff/take-attendance', component: TakeAttendanceComponent, canActivate: [authGuard] },


  //Academics
  { path: 'academics/course', component: CreateCourseComponent, canActivate: [authGuard] },
  { path: 'academics/edit-course', component: EditCourseComponent, canActivate: [authGuard] },
  { path: 'academics/slm', component: SelfLearningMaterialComponent, canActivate: [authGuard] },
  { path: 'academics/explore-slm/:clsId/:clsname', component: ExploreSlmComponent, canActivate: [authGuard] },
  { path: 'academics/explore-slm-content', component: ExploreSlmContentComponent, canActivate: [authGuard] },
  { path: 'academics/explore-slm-content/:clsId/:clsname/:subjectName/:subj_id', component: ExploreSlmContentComponent, canActivate: [authGuard] },
  { path: 'academics/homework', component: HomeWorkComponent, canActivate: [authGuard] }, 
  { path: 'academics/assignmentreport/:ass_id/:cls_id', component: HomeworkReportComponent, canActivate: [authGuard] }, 
  { path: 'academics/dailynotes', component: HomeWorkComponent, canActivate: [authGuard] },
  //{ path: 'academics/dailynotes', component: DailyNotesComponent, canActivate: [authGuard] },
  { path: 'academics/classwork', component: HomeWorkComponent, canActivate: [authGuard] },
  //{ path: 'academics/classwork', component: ClassWorkComponent, canActivate: [authGuard] },
  { path: 'academics/video-tutorial', component: VideoTutorialComponent, canActivate: [authGuard] },
  { path: 'academics/e-content', component: EContentComponent, canActivate: [authGuard] },
  { path: 'academics/e-content/:cls_id', component: EContentDetailComponent, canActivate: [authGuard] },
  { path: 'academics/copy-correction', component: CopyCorrectionComponent, canActivate: [authGuard] },
  { path: 'academics/addassignment/assignment', component: AddClasswordHomeworkDailynotesComponent, canActivate: [authGuard] }, 
  { path: 'academics/addassignment/assignment/:worktype', component: AddClasswordHomeworkDailynotesComponent, canActivate: [authGuard] },
  { path: 'academics/addassignment/view-documents', component: ViewDocumentComponent, canActivate: [authGuard] },

   
  //Examination
  { path: 'examination/add-schedule', component: AddScheduleComponent, canActivate: [authGuard] },
  { path: 'examination/view-schedule', component: ViewScheduleComponent, canActivate: [authGuard] },
  { path: 'examination/add-co-exam-schedule', component: AddCoExamScheduleComponent, canActivate: [authGuard] },
  { path: 'examination/view-co-exam-schedule', component: ViewCoExamScheduleComponent, canActivate: [authGuard] },
  { path: 'examination/exam-group', component: ExamGroupComponent, canActivate: [authGuard] },
  { path: 'examination/exam-category', component: ExamCategoryComponent, canActivate: [authGuard] },
  {
    path: '', component: ExamCategoryComponent, canActivate: [authGuard], children: [
      { path: 'exam/category/term', component: DefineExamTermComponent },
      { path: 'exam/category/type', component: DefineExamTypeComponent },
      { path: 'exam/category/name', component: DefineExamNameComponent },
      { path: 'exam/category/set', component: DefineExamSetComponent },
      { path: 'exam/category/weightage', component: DefineWeightageComponent },
      { path: 'exam/category/marks', component: DefineMaxMinComponent },
      { path: '', redirectTo: 'term', pathMatch: 'full' }
    ]
  },
  { path: 'examination/exam-term', component: DefineExamTermComponent, canActivate: [authGuard] },
  { path: 'examination/exam-type', component: DefineExamTypeComponent, canActivate: [authGuard] },
  { path: 'examination/exam-name', component: DefineExamNameComponent, canActivate: [authGuard] },
  { path: 'examination/exam-grade', component: ExamGradeComponent, canActivate: [authGuard] },
  { path: 'examination/trash-box', component: ExamTrashBoxComponent, canActivate: [authGuard] },


  //accounts
  { path: 'accounts/collect-fees', component: CollectFeesComponent, canActivate: [authGuard] },
  { path: 'accounts/fee-list', component: FeeListComponent, canActivate: [authGuard] },
  { path: 'accounts/fee-overdue', component: FeeOverdueComponent, canActivate: [authGuard] },
  { path: 'accounts/create-demand-slip', component: CreateDemandSlipComponent, canActivate: [authGuard] },
  { path: 'accounts/print-demand-slip', component: PrintDemandSlipComponent, canActivate: [authGuard] }, 
  { path: 'reports/online-payment', component: OnlinePaymentComponent, canActivate: [authGuard] },
  { path: 'reports/yearly', component: YearlyComponent, canActivate: [authGuard] },
  { path: 'reports/monthly', component: MonthlyComponent, canActivate: [authGuard] },
  { path: 'reports/daily', component: DailyComponent, canActivate: [authGuard] },
  { path: 'reports/fee-paid', component: FeePaidComponent, canActivate: [authGuard] },
  { path: 'reports/audit', component: AuditComponent, canActivate: [authGuard] },
  { path: 'reports/transport', component: TransportComponent, canActivate: [authGuard] },
  { path: 'reports/refundable-amount', component: RefundableAmountComponent, canActivate: [authGuard] },
  { path: 'reports/trash-box', component: TrashBoxComponent, canActivate: [authGuard] },
  { path: 'expense/day-book', component: DayBookComponent, canActivate: [authGuard] },
  { path: 'expense/day-book-with-stu-fee', component: DayBookWithStuFeeComponent, canActivate: [authGuard] },
  { path: 'expense/cash-book', component: CashBookComponent, canActivate: [authGuard] },
  { path: 'account-settings/fee-types', component: FeeTypesComponent, canActivate: [authGuard] },
  { path: 'account-settings/fee-headings', component: FeeHeadingsComponent, canActivate: [authGuard] },
  { path: 'account-settings/fee-head-mapping', component: FeeHeadMappingComponent, canActivate: [authGuard] },
  { path: 'account-settings/fee-structure', component: FeeStructureComponent, canActivate: [authGuard] },
  { path: 'account-settings/expense-category', component: ExpenseCategoryComponent, canActivate: [authGuard] },
  { path: 'account-settings/late-fine', component: LateFineComponent, canActivate: [authGuard] },
  { path: 'account-settings/import-fee-dues-list', component: ImportFeeDuesListComponent, canActivate: [authGuard] },
  { path: 'account-settings/tally-data-sync', component: TallyDataSyncComponent, canActivate: [authGuard] },

  //Online Exam
  { path: 'online-exam/add-test', component: AddTestOnlineExamComponent, canActivate: [authGuard] },
  { path: 'online-exam/add-test/:exam_id', component: AddTestOnlineExamComponent, canActivate: [authGuard] },
  { path: 'online-exam/view-test', component: ViewTestOnlineExamComponent, canActivate: [authGuard] },
  { path: 'online-exam/view-test-result', component: ViewTestResultOnlineExamComponent, canActivate: [authGuard] },
  { path: 'online-exam/question/view', component: ViewQuestionsComponent, canActivate: [authGuard] },
  { path: 'online-exam/question/view/:exam_id/success', component: ViewQuestionsComponent, canActivate: [authGuard] },

  //Certificate
  { path: 'certificate/certificate-list', component: CertificateListComponent, canActivate: [authGuard] }, 
  { path: 'viewcertificate/certificate', component: ViewCertificateComponent, canActivate: [authGuard] }, 
  { path: 'viewcertificate/certificate/:template_id', component: ViewCertificateComponent, canActivate: [authGuard] }, 

  //Payroll
  { path: 'payroll/department/add', component: AddDepartmentComponent, canActivate: [authGuard] },
  { path: 'payroll/department/list', component: DepartmentListComponent, canActivate: [authGuard] },
  { path: 'payroll/salary/details', component: SalaryDetailsComponent, canActivate: [authGuard] },
  { path: 'payroll/salary/list', component: SalaryListComponent, canActivate: [authGuard] },
  { path: 'payroll/make-payment', component: MakePaymentComponent, canActivate: [authGuard] },
  { path: 'payroll/generate-payslip', component: GeneratePayslipComponent, canActivate: [authGuard] },
  { path: 'reports/bank-report', component: BankReportComponent, canActivate: [authGuard] },
  { path: 'reports/pf-report', component: PfReportComponent, canActivate: [authGuard] },
  { path: 'reports/pf-statement', component: PfStatementComponent, canActivate: [authGuard] },
  { path: 'reports/challan-report', component: ChallanReportComponent, canActivate: [authGuard] },

  //library
  { path: 'library/add-book', component: AddBookComponent, canActivate: [authGuard] },
  { path: 'library/add-book/:book_id', component: AddBookComponent, canActivate: [authGuard] },
  { path: 'library/view-book', component: ViewBookComponent, canActivate: [authGuard] },
  { path: 'library/define-member', component: DefineMemberComponent, canActivate: [authGuard] },
  { path: 'library/issue-book', component: IssueBookComponent, canActivate: [authGuard] },
  { path: 'library/search-issued-book', component: SearchIssuedBookComponent, canActivate: [authGuard] },
  { path: 'library/issue-return-book', component: IssueReturnBookComponent, canActivate: [authGuard] },
  { path: 'library/book-code', component: BookCodeComponent, canActivate: [authGuard] },
  { path: 'library/import-books', component: ImportBooksComponent, canActivate: [authGuard] },

  //transport
  { path: 'transport/add-route', component: AddRouteComponent, canActivate: [authGuard] },
  { path: 'transport/add-route/:routeId', component: AddRouteComponent, canActivate: [authGuard] },
  { path: 'transport/view-route', component: ViewRouteComponent, canActivate: [authGuard] },
  { path: 'transport/track-vehicle', component: TrackVehicleComponent, canActivate: [authGuard] },
  { path: 'transport/add-driver', component: AddDriverComponent, canActivate: [authGuard] },
  { path: 'transport/add-driver/:driverId', component: AddDriverComponent, canActivate: [authGuard] },
  { path: 'transport/view-driver', component: ViewDriverComponent, canActivate: [authGuard] },
  { path: 'transport/vehicle-model', component: VehicleModelComponent, canActivate: [authGuard] },
  { path: 'transport/add-vehicle', component: AddVehicleComponent, canActivate: [authGuard] },
  { path: 'transport/add-vehicle/:vehicle_id', component: AddVehicleComponent, canActivate: [authGuard] },
  { path: 'transport/vehicle-list', component: VehicleListComponent, canActivate: [authGuard] },
  { path: 'transport/vendor-list', component: VendorListComponent, canActivate: [authGuard] },

  //hostal
  { path: 'hostel/add-hostel', component: AddHostelComponent, canActivate: [authGuard] },
  { path: 'hostel/add-hostel/:hostal_id', component: AddHostelComponent, canActivate: [authGuard] },
  { path: 'hostel/view-hostel', component: ViewHostalComponent, canActivate: [authGuard] },

  //Notice & board
  { path: 'notice-board/view-notice', component: ViewNoticeComponent, canActivate: [authGuard] },
  { path: 'notice-board/important-lists-dates', component: ImportantListsDatesComponent, canActivate: [authGuard] },
  { path: 'notice-board/add-programs', component: AddProgramsComponent, canActivate: [authGuard] },
  { path: 'notice-board/add-programs/:program_id', component: AddProgramsComponent, canActivate: [authGuard] },
  { path: 'notice-board/student-desk', component: StudentDeskComponent, canActivate: [authGuard] },
  { path: 'notice-board/reply/query/:faculty_id', component: ViewQueriesComponent, canActivate: [authGuard] },
  { path: 'notice-board/add-notice', component: AddNoticeComponent, canActivate: [authGuard] },
  { path: 'notice-board/add-notice/:notice_id', component: AddNoticeComponent, canActivate: [authGuard] },
  { path: 'sms-board/compose-sms', component: ComposeSmsComponent, canActivate: [authGuard] },
  { path: 'sms-board/voice-call', component: VoiceCallComponent, canActivate: [authGuard] },
  { path: 'sms-board/sms-outbox', component: SmsOutboxComponent, canActivate: [authGuard] },

  //assets & inventory
  { path: 'assets-inventory/assets/add', component: AddAssetsComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/assets/add/:purchase_EntryID', component: AddAssetsComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/assets/view', component: ViewAssetsComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/assets/report/asset', component: ViewAssetDeployeReportComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/sell-counter/view-stock', component: ViewStockSellCounterComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/sell-counter/sell-report', component: SellReportSellCounterComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/print-sell-receipt', component: PrintSellCounterComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/print-sell-receipt/:sell_uid', component: PrintSellCounterComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/settings/purchase-entry', component: PurchaseEntryComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/settings/stock-item-list', component: StockItemListComponent, canActivate: [authGuard] },
  { path: 'assets-inventory/settings/vendor-list', component: VendorListAComponent, canActivate: [authGuard] },

  //Counsellor & lead
  { path: 'counsellor-leads/add-lead', component: AddLeadComponent, canActivate: [authGuard] },
  { path: 'counsellor-leads/add-lead/:lead_id', component: AddLeadComponent, canActivate: [authGuard] },
  { path: 'counsellor-leads/view-leads', component: ViewLeadsComponent, canActivate: [authGuard] },
  { path: 'counsellor-leads/follow-up/:lead_id', component: FollowUpComponent, canActivate: [authGuard] },
  { path: 'counsellor-leads/import-leads', component: ImportLeadsComponent, canActivate: [authGuard] },
  { path: 'counsellor-leads/lead-type', component: LeadTypeComponent, canActivate: [authGuard] },

  //Placement cell
  { path: 'placement-cell/add-company', component: AddCompanyComponent, canActivate: [authGuard] },
  { path: 'placement-cell/view-company', component: ViewCompanyComponent, canActivate: [authGuard] },
  { path: 'placement-cell/view-students', component: ViewStudentsComponent, canActivate: [authGuard] },

  //Branch & User
  { path: 'branch-user/users', component: UsersBranchComponent, canActivate: [authGuard] },
  { path: 'branch-user/branch', component: BranchComponent, canActivate: [authGuard] },
  { path: 'branch-user/activity-report', component: ActivityReportBranchComponent, canActivate: [authGuard] },


  //Visitors
  { path: 'visitors/add-visitor', component: AddVisitorComponent, canActivate: [authGuard] },
  { path: 'visitors/add-visitor/:visitor_id', component: AddVisitorComponent, canActivate: [authGuard] },
  { path: 'visitors/view-visitor', component: ViewVisitorComponent, canActivate: [authGuard] },

  //Leave & Gallery
  { path: 'leave-gallery/leave', component: LeaveComponent, canActivate: [authGuard] },
  { path: 'leave-gallery/monthly-calendar', component: MonthlyCalendarComponent, canActivate: [authGuard] },
  { path: 'leave-gallery/photo-gallery', component: PhotoGalleryComponent, canActivate: [authGuard] },
  { path: 'leave-gallery/photo-gallery/:cat_id', component: SubPhotoGalleryComponent, canActivate: [authGuard] },
  { path: 'leave-gallery/image-folder', component: ImageFolderComponent, canActivate: [authGuard] },

  //Download Form
  { path: 'download-form/registration', component: RegistrationDownloadFormComponent, canActivate: [authGuard] },
  { path: 'download-form/schoolship', component: SchoolshipComponent, canActivate: [authGuard] },
  { path: 'download-form/cbse-reg', component: CbseRegComponent, canActivate: [authGuard] },
  { path: 'download-form/upload-form', component: UploadFormComponent, canActivate: [authGuard] },


  //Configuration
  { path: 'configuration/manage-roles', component: ManageRolesComponent, canActivate: [authGuard] },
  { path: 'configuration/role-configuration', component: RoleConfigurationComponent, canActivate: [authGuard] },
  { path: 'configuration/session', component: SessionManagementComponent, canActivate: [authGuard] },
  { path: 'configuration/subject-mapping', component: TSubjectMappingComponent, canActivate: [authGuard] },
  { path: 'configuration/permissions', component: PermissionsComponent, canActivate: [authGuard] }, 


  //Settings
  { path: 'admin/smssetting/setting', component: SmsSettingComponent, canActivate: [authGuard] },
  { path: 'admin/systemsetting/setting', component: SystemSettingComponent, canActivate: [authGuard] },
  { path: 'admin/biodevices/session', component: DeviceSettingComponent, canActivate: [authGuard] },


  //for-student
  
  { path: 'student/profile', component: StuProfileComponent, canActivate: [authGuard] },
  { path: 'students/live-classes', component: StuLiveClassesComponent, canActivate: [authGuard] },
  { path: 'students/class-routine', component: StuClassRoutineComponent, canActivate: [authGuard] },
  { path: 'students/subject-teachers', component: StudentDeskComponent, canActivate: [authGuard] },
  { path: 'students/profile-report', component: StuProfileReportComponent, canActivate: [authGuard] },
  { path: 'students/apply-for-leave', component: StuApplyForLeaveComponent, canActivate: [authGuard] },
  { path: 'students/video-tutorial', component: VideoTutorialComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/stu-lms', component: SelfLearningMaterialComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/homework', component: HomeWorkComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/dailynotes', component: HomeWorkComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/classwork', component: HomeWorkComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/study-material', component: StuStudyMaterialComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/curriculum', component: StuCurriculumComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/stu-syllabus', component: StuSyllabusComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/stu-syllabus/:subject_id/:subject_name', component: StuSyllabusComponent, canActivate: [authGuard] },
  { path: 'students/acedemics/e-content', component: EContentComponent, canActivate: [authGuard] },
  { path: 'students/monthly-calendar', component: MonthlyCalendarComponent, canActivate: [authGuard] },
  { path: 'students/exam-schedule', component: StuExamScheduleComponent, canActivate: [authGuard] },
  { path: 'students/view-marksheet', component: StuViewMarksheetComponent, canActivate: [authGuard] },
  { path: 'students/online-examination/my-exams', component: StuMyExamsComponent, canActivate: [authGuard] },
  { path: 's/instructions/onlineexam/:exam_id', component: InstructionPageComponent, canActivate: [authGuard] },
  { path: 's/start/onlineexam/:exam_id/:student_exam_id', component: StartOnlineExamComponent, canActivate: [authGuard] },
  { path: 's/saveanswer/:exam_id/onlineexam/:student_exam_id', component: CheckResultComponent, canActivate: [authGuard] },
  { path: 'students/online-examination/exams-result', component: StuExamResultsComponent, canActivate: [authGuard] },
  { path: 'students/fee-history', component: StuFeesHistoryComponent, canActivate: [authGuard] },
  { path: 'students/pay-online', component: StuPayOnlineComponent, canActivate: [authGuard] },
  { path: 'students/library-book', component: StuLibraryBookComponent, canActivate: [authGuard] },
  { path: 'students/return-book', component: StuReturnBookComponent, canActivate: [authGuard] },
  { path: 'students/notice-board/view-notices', component: ViewNoticeComponent, canActivate: [authGuard] },
  { path: 'students/notice-board/imp-list-dates', component: ImportantListsDatesComponent, canActivate: [authGuard] },
  //{ path: 'students/notice-board/view-notices', component: StuViewNoticeComponent, canActivate: [authGuard] },
  //{ path: 'students/notice-board/imp-list-dates', component: StuImportantListsDatesComponent, canActivate: [authGuard] },
  //{ path: 'students/photo-gallery', component: StuPhotoGalleryComponent, canActivate: [authGuard] },
  { path: 'students/photo-gallery', component: PhotoGalleryComponent, canActivate: [authGuard] },
  { path: 'students/lesson-plan', component: StuLessonPlanComponent, canActivate: [authGuard] },
  

  { path: 'not-found', component: NotFoundComponent }  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [DatePipe],
  exports: [RouterModule]
})
export class AppRoutingModule { }

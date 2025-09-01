import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';   
import interactionPlugin from '@fullcalendar/interaction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { LoginComponent } from './login/login.component';
import { SaDashboardComponent } from './Admin/Dashboard/sa-dashboard/sa-dashboard.component';
import { ADashboardComponent } from './Admin/Dashboard/a-dashboard/a-dashboard.component';
import { TDashboardComponent } from './Admin/Dashboard/t-dashboard/t-dashboard.component';
import { SDashboardComponent } from './Admin/Dashboard/s-dashboard/s-dashboard.component';
import { HeaderComponent } from './Layout/header/header.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StudentSideBarComponent } from './Layout/student-side-bar/student-side-bar.component';
import { FacultySideBarComponent } from './Layout/faculty-side-bar/faculty-side-bar.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { NotFoundComponent } from './Layout/not-found/not-found.component'; 
import { EditCourseComponent } from './Admin/academics/edit-course/edit-course.component'; 
import { ViewProfileComponent } from './Admin/Profile/view-profile/view-profile.component';   
import { ManageRolesComponent } from './Admin/Configuration/manage-roles/manage-roles.component';
import { RoleConfigurationComponent } from './Admin/Configuration/role-configuration/role-configuration.component'; 
import { FooterComponent } from './Layout/footer/footer.component';
import { CreateCourseComponent } from './Admin/academics/create-course/create-course.component';  
import { UnitPlanComponent } from './Admin/Class & Subjects/unit-plan/unit-plan.component';
import { AddNewStudentComponent } from './Admin/Student Record/Student Info/add-new-student/add-new-student.component'; 
import { SelfLearningMaterialComponent } from './Admin/academics/self-learning-material/self-learning-material.component';
import { HomeWorkComponent } from './Admin/academics/home-work/home-work.component';
import { DailyNotesComponent } from './Admin/academics/daily-notes/daily-notes.component';
import { ClassWorkComponent } from './Admin/academics/class-work/class-work.component';
import { VideoTutorialComponent } from './Admin/academics/video-tutorial/video-tutorial.component';
import { EContentComponent } from './Admin/academics/e-content/e-content.component';
import { AddScheduleComponent } from './Admin/Examination/add-schedule/add-schedule.component';
import { ViewScheduleComponent } from './Admin/Examination/view-schedule/view-schedule.component';
import { AddCoExamScheduleComponent } from './Admin/Examination/add-co-exam-schedule/add-co-exam-schedule.component';
import { ViewCoExamScheduleComponent } from './Admin/Examination/view-co-exam-schedule/view-co-exam-schedule.component';
import { ExamGroupComponent } from './Admin/Examination/exam-group/exam-group.component';
import { ExamCategoryComponent } from './Admin/Examination/exam-category/exam-category.component';
import { ExamGradeComponent } from './Admin/Examination/exam-grade/exam-grade.component';
import { ExamTrashBoxComponent } from './Admin/Examination/exam-trash-box/exam-trash-box.component'; 
import { TakeAttendanceComponent } from './Admin/Teacher & Staff/Attendance/take-attendance/take-attendance.component';
import { ViewAttendanceComponent } from './Admin/Teacher & Staff/Attendance/view-attendance/view-attendance.component';
import { AddNewFacultyComponent } from './Admin/Teacher & Staff/Teacher & staff/add-new-faculty/add-new-faculty.component';
import { AlumniTeacherStaffComponent } from './Admin/Teacher & Staff/Teacher & staff/alumni-teacher-staff/alumni-teacher-staff.component';
import { EvaluationSettingComponent } from './Admin/Teacher & Staff/Teacher & staff/evaluation-setting/evaluation-setting.component';
import { FacultyIdCardComponent } from './Admin/Teacher & Staff/Teacher & staff/faculty-id-card/faculty-id-card.component';
import { FacultyTrashBoxComponent } from './Admin/Teacher & Staff/Teacher & staff/faculty-trash-box/faculty-trash-box.component';
import { ImportTeacherStaffComponent } from './Admin/Teacher & Staff/Teacher & staff/import-teacher-staff/import-teacher-staff.component';
import { TeacherEvaluationComponent } from './Admin/Teacher & Staff/Teacher & staff/teacher-evaluation/teacher-evaluation.component';
import { ViewFacultyComponent } from './Admin/Teacher & Staff/Teacher & staff/view-faculty/view-faculty.component';
import { AttendanceRowDataComponent } from './Admin/Student Record/Attendance/attendance-row-data/attendance-row-data.component';
import { GenerateReportsComponent } from './Admin/Student Record/Attendance/generate-reports/generate-reports.component';
import { ViewReportsComponent } from './Admin/Student Record/Attendance/view-reports/view-reports.component';
import { AddAlumniComponent } from './Admin/Student Record/Registration & Alumni/add-alumni/add-alumni.component'; 
import { ViewAlumniComponent } from './Admin/Student Record/Registration & Alumni/view-alumni/view-alumni.component';
import { IdCardReportComponent } from './Admin/Student Record/Student Info/id-card-report/id-card-report.component';
import { ImportStudentComponent } from './Admin/Student Record/Student Info/import-student/import-student.component';
import { StudentStatisticsComponent } from './Admin/Student Record/Student Info/student-statistics/student-statistics.component';
import { StudentTrashBoxComponent } from './Admin/Student Record/Student Info/student-trash-box/student-trash-box.component';
import { ViewSiblingComponent } from './Admin/Student Record/Student Info/view-sibling/view-sibling.component';
import { ViewStudentComponent } from './Admin/Student Record/Student Info/view-student/view-student.component';
import { StudentRegistrationComponent } from './Admin/Student Record/Registration & Alumni/student-registration/student-registration.component';
import { EnquiryComponent } from './Admin/Student Record/Registration & Alumni/enquiry/enquiry.component';
import { CollectFeesComponent } from './Admin/Accounts/Fee Collection/collect-fees/collect-fees.component';
import { FeeListComponent } from './Admin/Accounts/Fee Collection/fee-list/fee-list.component';
import { FeeOverdueComponent } from './Admin/Accounts/Fee Overdue/fee-overdue/fee-overdue.component';
import { CreateDemandSlipComponent } from './Admin/Accounts/Fee Overdue/create-demand-slip/create-demand-slip.component';
import { PrintDemandSlipComponent } from './Admin/Accounts/Fee Overdue/print-demand-slip/print-demand-slip.component';
import { OnlinePaymentComponent } from './Admin/Accounts/Reports/online-payment/online-payment.component';
import { YearlyComponent } from './Admin/Accounts/Reports/yearly/yearly.component';
import { MonthlyComponent } from './Admin/Accounts/Reports/monthly/monthly.component';
import { DailyComponent } from './Admin/Accounts/Reports/daily/daily.component';
import { FeePaidComponent } from './Admin/Accounts/Reports/fee-paid/fee-paid.component';
import { AuditComponent } from './Admin/Accounts/Reports/audit/audit.component';
import { TransportComponent } from './Admin/Accounts/Reports/transport/transport.component';
import { RefundableAmountComponent } from './Admin/Accounts/Reports/refundable-amount/refundable-amount.component';
import { TrashBoxComponent } from './Admin/Accounts/Reports/trash-box/trash-box.component';
import { DayBookComponent } from './Admin/Accounts/Expense/day-book/day-book.component';
import { DayBookWithStuFeeComponent } from './Admin/Accounts/Expense/day-book-with-stu-fee/day-book-with-stu-fee.component';
import { CashBookComponent } from './Admin/Accounts/Expense/cash-book/cash-book.component';
import { FeeHeadingsComponent } from './Admin/Accounts/Account setting/fee-headings/fee-headings.component';
import { FeeStructureComponent } from './Admin/Accounts/Account setting/fee-structure/fee-structure.component';
import { ExpenseCategoryComponent } from './Admin/Accounts/Account setting/expense-category/expense-category.component';
import { LateFineComponent } from './Admin/Accounts/Account setting/late-fine/late-fine.component';
import { ImportFeeDuesListComponent } from './Admin/Accounts/Account setting/import-fee-dues-list/import-fee-dues-list.component';
import { TallyDataSyncComponent } from './Admin/Accounts/Account setting/tally-data-sync/tally-data-sync.component';
import { AddTestOnlineExamComponent } from './Admin/Online Exam/add-test-online-exam/add-test-online-exam.component';
import { ViewTestResultOnlineExamComponent } from './Admin/Online Exam/view-test-result-online-exam/view-test-result-online-exam.component';
import { CertificateListComponent } from './Admin/Certificate/certificate-list/certificate-list.component';
import { AddDepartmentComponent } from './Admin/Payroll/Department/add-department/add-department.component';
import { DepartmentListComponent } from './Admin/Payroll/Department/department-list/department-list.component';
import { SalaryDetailsComponent } from './Admin/Payroll/Payroll/salary-details/salary-details.component';
import { SalaryListComponent } from './Admin/Payroll/Payroll/salary-list/salary-list.component';
import { MakePaymentComponent } from './Admin/Payroll/Payroll/make-payment/make-payment.component';
import { GeneratePayslipComponent } from './Admin/Payroll/Payroll/generate-payslip/generate-payslip.component';
import { BankReportComponent } from './Admin/Payroll/Reports/bank-report/bank-report.component';
import { PfReportComponent } from './Admin/Payroll/Reports/pf-report/pf-report.component';
import { PfStatementComponent } from './Admin/Payroll/Reports/pf-statement/pf-statement.component';
import { ChallanReportComponent } from './Admin/Payroll/Reports/challan-report/challan-report.component';
import { AddBookComponent } from './Admin/Library/add-book/add-book.component';
import { ViewBookComponent } from './Admin/Library/view-book/view-book.component';
import { IssueBookComponent } from './Admin/Library/issue-book/issue-book.component'; 
import { IssueReturnBookComponent } from './Admin/Library/issue-return-book/issue-return-book.component';
import { BookCodeComponent } from './Admin/Library/book-code/book-code.component';
import { ImportBooksComponent } from './Admin/Library/import-books/import-books.component'; 
import { ViewRouteComponent } from './Admin/Transport/Transport Info/view-route/view-route.component';
import { TrackVehicleComponent } from './Admin/Transport/Transport Info/track-vehicle/track-vehicle.component'; 
import { VendorListAComponent } from './Admin/Assets & Inventory/Settings/vendor-list/vendor-list.component';
import { AddHostelComponent } from './Admin/Hostal/add-hostel/add-hostel.component';
import { ViewHostalComponent } from './Admin/Hostal/view-hostal/view-hostal.component';
import { ViewNoticeComponent } from './Admin/Notice & SMS/Notice Board/view-notice/view-notice.component';
import { ImportantListsDatesComponent } from './Admin/Notice & SMS/Notice Board/important-lists-dates/important-lists-dates.component';
import { AddProgramsComponent } from './Admin/Notice & SMS/Notice Board/add-programs/add-programs.component';
import { StudentDeskComponent } from './Admin/Notice & SMS/Notice Board/student-desk/student-desk.component';
import { AddNoticeComponent } from './Admin/Notice & SMS/Notice Board/add-notice/add-notice.component';
import { ComposeSmsComponent } from './Admin/Notice & SMS/SMS Board/compose-sms/compose-sms.component';
import { VoiceCallComponent } from './Admin/Notice & SMS/SMS Board/voice-call/voice-call.component';
import { SmsOutboxComponent } from './Admin/Notice & SMS/SMS Board/sms-outbox/sms-outbox.component';
import { AddAssetsComponent } from './Admin/Assets & Inventory/Assets/add-assets/add-assets.component';
import { ViewAssetsComponent } from './Admin/Assets & Inventory/Assets/view-assets/view-assets.component';
import { ViewStockSellCounterComponent } from './Admin/Assets & Inventory/Sell Counter/view-stock-sell-counter/view-stock-sell-counter.component';
import { SellReportSellCounterComponent } from './Admin/Assets & Inventory/Sell Counter/sell-report-sell-counter/sell-report-sell-counter.component';
import { PurchaseEntryComponent } from './Admin/Assets & Inventory/Settings/purchase-entry/purchase-entry.component';
import { StockItemListComponent } from './Admin/Assets & Inventory/Settings/stock-item-list/stock-item-list.component';
import { AddLeadComponent } from './Admin/Counsellor & Leads/add-lead/add-lead.component';
import { ViewLeadsComponent } from './Admin/Counsellor & Leads/view-leads/view-leads.component';
import { ImportLeadsComponent } from './Admin/Counsellor & Leads/import-leads/import-leads.component';
import { LeadTypeComponent } from './Admin/Counsellor & Leads/lead-type/lead-type.component';
import { AddCompanyComponent } from './Admin/Placement Cell/add-company/add-company.component';
import { ViewCompanyComponent } from './Admin/Placement Cell/view-company/view-company.component';
import { ViewStudentsComponent } from './Admin/Placement Cell/view-students/view-students.component';
import { UsersBranchComponent } from './Admin/Branch & User/users-branch/users-branch.component';
import { BranchComponent } from './Admin/Branch & User/branch/branch.component';
import { ActivityReportBranchComponent } from './Admin/Branch & User/activity-report-branch/activity-report-branch.component';
import { AddVisitorComponent } from './Admin/Visitors/add-visitor/add-visitor.component';
import { ViewVisitorComponent } from './Admin/Visitors/view-visitor/view-visitor.component';
import { LeaveComponent } from './Admin/Leave & Gallery/leave/leave.component';
import { MonthlyCalendarComponent } from './Admin/Leave & Gallery/monthly-calendar/monthly-calendar.component';
import { PhotoGalleryComponent } from './Admin/Leave & Gallery/photo-gallery/photo-gallery.component';
import { ImageFolderComponent } from './Admin/Leave & Gallery/image-folder/image-folder.component';
import { RegistrationDownloadFormComponent } from './Admin/Download Form/registration-download-form/registration-download-form.component';
import { SchoolshipComponent } from './Admin/Download Form/schoolship/schoolship.component';
import { CbseRegComponent } from './Admin/Download Form/cbse-reg/cbse-reg.component';
import { UploadFormComponent } from './Admin/Download Form/upload-form/upload-form.component';
import { AddClassComponent } from './Admin/Class & Subjects/Class Info/add-class/add-class.component';
import { PromoteClassesComponent } from './Admin/Class & Subjects/Class Info/promote-classes/promote-classes.component';
import { ViewClassesComponent } from './Admin/Class & Subjects/Class Info/view-classes/view-classes.component';
import { LiveClassComponent } from './Admin/Class & Subjects/live-class/live-class.component';
import { AddSubjectComponent } from './Admin/Class & Subjects/Subject Info/add-subject/add-subject.component';
import { OptionalSubjectComponent } from './Admin/Class & Subjects/Subject Info/optional-subject/optional-subject.component';
import { QuestionSetComponent } from './Admin/Class & Subjects/Subject Info/question-set/question-set.component';
import { QuestionTypeComponent } from './Admin/Class & Subjects/Subject Info/question-type/question-type.component';
import { ViewSubjectComponent } from './Admin/Class & Subjects/Subject Info/view-subject/view-subject.component'; 
 import { LessonPlanComponent } from './Admin/Class & Subjects/lesson-plan/lesson-plan.component';  
import { StuClassRoutineComponent } from './Student/stu-class-routine/stu-class-routine.component'; 
import { StuSubjectTeachersComponent } from './Student/stu-subject-teachers/stu-subject-teachers.component';
import { StuProfileReportComponent } from './Student/stu-profile-report/stu-profile-report.component';
import { StuApplyForLeaveComponent } from './Student/stu-apply-for-leave/stu-apply-for-leave.component';
import { StuVideoTutorialComponent } from './Student/stu-video-tutorial/stu-video-tutorial.component'; 
import { StuExamScheduleComponent } from './Student/stu-exam-schedule/stu-exam-schedule.component';
import { StuViewMarksheetComponent } from './Student/stu-view-marksheet/stu-view-marksheet.component';
import { StuFeesHistoryComponent } from './Student/stu-fees-history/stu-fees-history.component';
import { StuPayOnlineComponent } from './Student/stu-pay-online/stu-pay-online.component';
import { StuLibraryBookComponent } from './Student/stu-library-book/stu-library-book.component';
import { StuReturnBookComponent } from './Student/stu-return-book/stu-return-book.component';
import { StuNoticeBoardComponent } from './Student/stu-notice-board/stu-notice-board.component';
import { StuPhotoGalleryComponent } from './Student/stu-photo-gallery/stu-photo-gallery.component';
import { StuDailyNotesComponent } from './Student/Acedmics L.M.S/stu-daily-notes/stu-daily-notes.component';
import { StuHomeWorkComponent } from './Student/Acedmics L.M.S/stu-home-work/stu-home-work.component';
import { StuClassWorkComponent } from './Student/Acedmics L.M.S/stu-class-work/stu-class-work.component';
import { StuStudyMaterialComponent } from './Student/Acedmics L.M.S/stu-study-material/stu-study-material.component';
import { StuCurriculumComponent } from './Student/Acedmics L.M.S/stu-curriculum/stu-curriculum.component';
import { StuEContentComponent } from './Student/Acedmics L.M.S/stu-e-content/stu-e-content.component';
import { StuMyExamsComponent } from './Student/Online Examination/stu-my-exams/stu-my-exams.component';
import { StuExamResultsComponent } from './Student/Online Examination/stu-exam-results/stu-exam-results.component'; 
import { StuImportantListsDatesComponent } from './Student/Notice Board/stu-important-lists-dates/stu-important-lists-dates.component';
import { StuViewNoticeComponent } from './Student/Notice Board/stu-view-notice/stu-view-notice.component';
import { AddLessonPlanComponent } from './Admin/Class & Subjects/lesson-plan/LessonplanAdd/add-lesson-plan/add-lesson-plan.component';
import { StuLiveClassesComponent } from './Student/stu-live-classes/stu-live-classes.component';
import { StuLessonPlanComponent } from './Student/stu-lesson-plan/stu-lesson-plan.component';
import { CopyCorrectionComponent } from './Admin/academics/Subcomponent/copy-correction/copy-correction.component';
import { AddClasswordHomeworkDailynotesComponent } from './Admin/academics/Subcomponent/add-classword-homework-dailynotes/add-classword-homework-dailynotes.component';
import { SuperadminDashboardComponent } from './SuperAdmin/superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminLoginComponent } from './SuperAdmin/superadmin-login/superadmin-login.component';
import { CreateSchoolComponent } from './SuperAdmin/create-school/create-school.component';
import { ViewSchoolComponent } from './SuperAdmin/view-school/view-school.component';
import { UpdateProfileModalComponent } from './Admin/Profile/update-profile-modal/update-profile-modal.component';
import { ViewReportComponent } from './Admin/Student Record/Student Info/view-report/view-report.component';
import { ViewStudentSettingComponent } from './Admin/Student Record/Student Info/view-student/view-student-setting/view-student-setting.component';
import { SecPopupComponent } from './Admin/Class & Subjects/Class Info/view-classes/sec-popup/sec-popup.component';
import { ClassReportComponent } from './Admin/Class & Subjects/Class Info/class-report/class-report.component';
import { IcardPopupComponent } from './Admin/Teacher & Staff/Teacher & staff/faculty-id-card/icard-popup/icard-popup.component'; 
import { ViewSingleStudentComponent } from './Admin/Student Record/Student Info/view-single-student/view-single-student.component';
import { GenerateTcComponent } from './Admin/Student Record/Registration & Alumni/generate-tc/generate-tc.component';
import { MonthlyAttendanceComponent } from './Admin/Student Record/Attendance/monthly-attendance/monthly-attendance.component';
import { BaseChartDirective } from 'ng2-charts';
import { SessionManagementComponent } from './Admin/Configuration/session-management/session-management.component';
import { SubjectPopupComponent } from './Admin/Class & Subjects/Class Info/view-classes/subject-popup/subject-popup.component';
import { ClassTeacherPopupComponent } from './Admin/Class & Subjects/Class Info/view-classes/class-teacher-popup/class-teacher-popup.component';
import { AddRoutineComponent } from './Admin/Class & Subjects/Class Routine/add-routine/add-routine.component';
import { ViewRoutineComponent } from './Admin/Class & Subjects/Class Routine/view-routine/view-routine.component';
import { TeacherRoutineComponent } from './Admin/Class & Subjects/Class Routine/teacher-routine/teacher-routine.component';
import { AddPriodComponent } from './Admin/Class & Subjects/Class Routine/add-priod/add-priod.component';
import { CommonModule } from '@angular/common';
import { ViewRoutinePrintComponent } from './Admin/Class & Subjects/Class Routine/Report Section/view-routine-print/view-routine-print.component';
import { ViewPriodComponent } from './Admin/Class & Subjects/Class Routine/view-priod/view-priod.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component'; 
 import { TSubjectMappingComponent } from './Admin/Configuration/Teacher & Staff Settings/t-subject-mapping/t-subject-mapping.component';
import { PermissionsComponent } from './Admin/Configuration/permissions/permissions.component';
import { SuccessMessagePopupComponent } from './Admin/success-message-popup/success-message-popup.component';
import { StuProfileComponent } from './Student/stu-profile/stu-profile.component'; 
import { ExploreSlmContentComponent } from './Admin/academics/self-learning-material/explore-slm-content/explore-slm-content.component';
import { ExploreSlmComponent } from './Admin/academics/self-learning-material/explore-slm/explore-slm.component';
import { SlmContentPopupComponent } from './Admin/academics/self-learning-material/slm-content-popup/slm-content-popup.component';
import { ViewDocumentComponent } from './Admin/academics/Subcomponent/view-document/view-document.component';
import { EditAssignmentsComponent } from './Admin/academics/Subcomponent/edit-assignments/edit-assignments.component';
import { EContentDetailComponent } from './Admin/academics/Subcomponent/e-content-detail/e-content-detail.component';
import { AddChapterComponent } from './Admin/Class & Subjects/Subject Info/add-chapter/add-chapter.component';
import { AddSyllabusComponent } from './Admin/Class & Subjects/Subject Info/add-syllabus/add-syllabus.component';
import { ViewSyllabusComponent } from './Admin/Class & Subjects/Subject Info/view-syllabus/view-syllabus.component';
import { StudyMaterialComponent } from './Admin/Class & Subjects/Subject Info/study-material/study-material.component';
import { StuSyllabusComponent } from './Student/Acedmics L.M.S/stu-syllabus/stu-syllabus.component';
import { HomeworkReportComponent } from './Admin/academics/homework-report/homework-report.component';
import { ViewTestOnlineExamComponent } from './Admin/Online Exam/view-test-online-exam/view-test-online-exam.component';
import { ViewQuestionsComponent } from './Admin/Online Exam/view-questions/view-questions.component';
import { AddQuestionsComponent } from './Admin/Online Exam/add-questions/add-questions.component';
import { QuestionPermissionComponent } from './Admin/Online Exam/question-permission/question-permission.component';
import { InstructionPageComponent } from './Student/Online Examination/instruction-page/instruction-page.component';
import { StartOnlineExamComponent } from './Student/Online Examination/start-online-exam/start-online-exam.component';
import { CheckResultComponent } from './Student/Online Examination/check-result/check-result.component';
import { ViewAnswerComponent } from './Admin/Online Exam/view-answer/view-answer.component';
import { SubPhotoGalleryComponent } from './Admin/Leave & Gallery/sub-photo-gallery/sub-photo-gallery.component';
import { FollowUpComponent } from './Admin/Counsellor & Leads/follow-up/follow-up.component';
import { InventorySellPopupComponent } from './Admin/Assets & Inventory/Popup/inventory-sell-popup/inventory-sell-popup.component';
import { AssetSellPopupComponent } from './Admin/Assets & Inventory/Popup/asset-sell-popup/asset-sell-popup.component';
import { ViewAssetDeployeReportComponent } from './Admin/Assets & Inventory/Assets/view-asset-deploye-report/view-asset-deploye-report.component';
import { PrintSellCounterComponent } from './Admin/Assets & Inventory/Sell Counter/print-sell-counter/print-sell-counter.component';
//import { SmsSettingComponent } from './settings/sms setting/sms-setting/sms-setting.component';
import { CreateTemplateComponent } from './Settings/SMS Setting/create-template/create-template.component';
import { SmsSettingComponent } from './Settings/SMS Setting/sms-setting/sms-setting.component';
import { SmsOutboxPopupComponent } from './Admin/Notice & SMS/SMS Board/sms-outbox-popup/sms-outbox-popup.component';
import { AskNewQuestionComponent } from './Admin/Notice & SMS/Notice Board/ask-new-query/ask-new-question.component';
import { ViewQueriesComponent } from './Admin/Notice & SMS/Notice Board/view-queries/view-queries.component';
import { AddCertificateComponent } from './Admin/Certificate/add-certificate/add-certificate.component';
import { ViewCertificateComponent } from './Admin/Certificate/view-certificate/view-certificate.component';
import { DeviceSettingComponent } from './Settings/Device Setting/device-setting/device-setting.component';
import { SystemSettingComponent } from './Settings/System Setting/system-setting/system-setting.component';
import { FeeTypesComponent } from './Admin/Accounts/Account setting/fee-types/fee-types.component';
import { FeeHeadMappingComponent } from './Admin/Accounts/Account setting/fee-head-mapping/fee-head-mapping.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentHistoryComponent } from './Admin/Accounts/Fee Collection/collect-fees/fee-collection/payment-history/payment-history.component';
import { SpecialCommandComponent } from './Admin/Accounts/Fee Collection/collect-fees/fee-collection/special-command/special-command.component';
import { ExpectedPaymentComponent } from './Admin/Accounts/Fee Collection/collect-fees/fee-collection/expected-payment/expected-payment.component';
import { AddDriverComponent } from './Admin/Transport/Driver Info/add-driver/add-driver.component';
import { ViewDriverComponent } from './Admin/Transport/Driver Info/view-driver/view-driver.component';
import { VehicleListComponent } from './Admin/Transport/Vehicle Info/vehicle-list/vehicle-list.component';
import { VehicleModelComponent } from './Admin/Transport/Vehicle Info/vehicle-model/vehicle-model.component';
import { VendorListComponent } from './Admin/Transport/Vehicle Info/vendor-list/vendor-list.component';
import { AddVehicleComponent } from './Admin/Transport/Vehicle Info/add-vehicle/add-vehicle.component';
import { AddRouteComponent } from './Admin/Transport/Transport Info/add-route/add-route.component';  
import { DefineMemberComponent } from './Admin/Library/define-member/define-member.component';
import { SearchIssuedBookComponent } from './Admin/Library/search-issued-book/search-issued-book.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DefineExamTermComponent } from './Admin/Examination/define-exam-term/define-exam-term.component';
import { DefineExamTypeComponent } from './Admin/Examination/define-exam-type/define-exam-type.component';
import { DefineExamNameComponent } from './Admin/Examination/define-exam-name/define-exam-name.component';
import { DefineExamSetComponent } from './Admin/Examination/define-exam-set/define-exam-set.component';
import { DefineWeightageComponent } from './Admin/Examination/define-weightage/define-weightage.component';
import { DefineMaxMinComponent } from './Admin/Examination/define-max-min/define-max-min.component';
  
@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    SaDashboardComponent,
    ADashboardComponent,
    TDashboardComponent,
    SDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MainLayoutComponent,
    StudentSideBarComponent,
    FacultySideBarComponent,NotFoundComponent,CreateCourseComponent,EditCourseComponent,ViewProfileComponent,ViewFacultyComponent, 
    ViewReportsComponent, GenerateReportsComponent, ManageRolesComponent, RoleConfigurationComponent, FooterComponent, AddClassComponent,
    ViewClassesComponent, PromoteClassesComponent, LiveClassComponent, AddSubjectComponent, ViewSubjectComponent, QuestionTypeComponent, QuestionSetComponent, OptionalSubjectComponent,
    UnitPlanComponent, AddNewStudentComponent, ViewStudentComponent, ViewSiblingComponent, StudentStatisticsComponent,
    ImportStudentComponent, IdCardReportComponent, StudentTrashBoxComponent, AddAlumniComponent, ViewAlumniComponent,
    StudentRegistrationComponent, EnquiryComponent, AttendanceRowDataComponent, AddNewFacultyComponent, 
    AlumniTeacherStaffComponent, ImportTeacherStaffComponent, TeacherEvaluationComponent, EvaluationSettingComponent, FacultyIdCardComponent,
    FacultyTrashBoxComponent, ViewAttendanceComponent, TakeAttendanceComponent, SelfLearningMaterialComponent, HomeWorkComponent,
    DailyNotesComponent, ClassWorkComponent, VideoTutorialComponent, EContentComponent, AddScheduleComponent, ViewScheduleComponent,
    AddCoExamScheduleComponent, ViewCoExamScheduleComponent, ExamGroupComponent, ExamCategoryComponent, ExamGradeComponent, ExamTrashBoxComponent,
    CollectFeesComponent, FeeListComponent, FeeOverdueComponent, CreateDemandSlipComponent, PrintDemandSlipComponent, OnlinePaymentComponent,
    YearlyComponent, MonthlyComponent, DailyComponent, FeePaidComponent, AuditComponent, TransportComponent, RefundableAmountComponent,
    TrashBoxComponent, DayBookComponent, DayBookWithStuFeeComponent, CashBookComponent, FeeHeadingsComponent, FeeStructureComponent,
    ExpenseCategoryComponent, LateFineComponent, ImportFeeDuesListComponent, TallyDataSyncComponent, AddTestOnlineExamComponent, ViewTestOnlineExamComponent,
    ViewTestResultOnlineExamComponent, CertificateListComponent, AddDepartmentComponent, DepartmentListComponent, SalaryDetailsComponent,
    SalaryListComponent,    MakePaymentComponent, GeneratePayslipComponent, BankReportComponent, PfReportComponent, PfStatementComponent,
    ChallanReportComponent, AddBookComponent, ViewBookComponent, IssueBookComponent,
    SearchIssuedBookComponent, IssueReturnBookComponent, BookCodeComponent, ImportBooksComponent, AddRouteComponent, ViewRouteComponent,
    TrackVehicleComponent, AddDriverComponent, ViewDriverComponent, VehicleModelComponent, VehicleListComponent, VendorListComponent,
    AddHostelComponent, ViewHostalComponent, ViewNoticeComponent,ImportantListsDatesComponent, AddProgramsComponent, StudentDeskComponent,
    AddNoticeComponent, ComposeSmsComponent, VoiceCallComponent, SmsOutboxComponent, AddAssetsComponent, ViewAssetsComponent, VendorListAComponent,
    ViewStockSellCounterComponent, SellReportSellCounterComponent, PurchaseEntryComponent, StockItemListComponent, AddLeadComponent,
    ViewLeadsComponent, ImportLeadsComponent, LeadTypeComponent, AddCompanyComponent, ViewCompanyComponent, ViewStudentsComponent, UsersBranchComponent,
    BranchComponent, ActivityReportBranchComponent, AddVisitorComponent, ViewVisitorComponent, LeaveComponent, MonthlyCalendarComponent,
    PhotoGalleryComponent, ImageFolderComponent, RegistrationDownloadFormComponent, SchoolshipComponent, CbseRegComponent, UploadFormComponent,
    LessonPlanComponent, AddLessonPlanComponent, StuLiveClassesComponent, StuClassRoutineComponent, StuSubjectTeachersComponent, StuSubjectTeachersComponent,
    StuProfileReportComponent, StuApplyForLeaveComponent, StuVideoTutorialComponent,  StuExamScheduleComponent,
    StuViewMarksheetComponent, StuFeesHistoryComponent, StuPayOnlineComponent, StuLibraryBookComponent, StuReturnBookComponent, StuNoticeBoardComponent,
    StuPhotoGalleryComponent,  StuDailyNotesComponent, StuHomeWorkComponent, StuClassWorkComponent,
    StuStudyMaterialComponent, StuCurriculumComponent, StuEContentComponent, StuMyExamsComponent, StuExamResultsComponent, StuViewNoticeComponent,
    StuImportantListsDatesComponent, StuLessonPlanComponent, CopyCorrectionComponent,
    AddClasswordHomeworkDailynotesComponent, SuperadminDashboardComponent, SuperadminLoginComponent, CreateSchoolComponent,
    ViewSchoolComponent, UpdateProfileModalComponent, ViewReportComponent, ViewStudentSettingComponent, SecPopupComponent,
    ClassReportComponent, IcardPopupComponent, ViewSingleStudentComponent, GenerateTcComponent, MonthlyAttendanceComponent,
    SessionManagementComponent, SubjectPopupComponent, ClassTeacherPopupComponent, AddRoutineComponent,
    ViewRoutineComponent, TeacherRoutineComponent, AddPriodComponent, ViewRoutinePrintComponent,
    ViewPriodComponent, ForgetPasswordComponent, TSubjectMappingComponent, PermissionsComponent,
    SuccessMessagePopupComponent, StuProfileComponent, SlmContentPopupComponent, ExploreSlmContentComponent,
    ExploreSlmComponent, ViewDocumentComponent, EditAssignmentsComponent, EContentDetailComponent,
    AddChapterComponent, AddSyllabusComponent, ViewSyllabusComponent, StudyMaterialComponent, StuSyllabusComponent,
    HomeworkReportComponent, ViewQuestionsComponent, AddQuestionsComponent, QuestionPermissionComponent,
    InstructionPageComponent, StartOnlineExamComponent, CheckResultComponent, ViewAnswerComponent, SubPhotoGalleryComponent, FollowUpComponent,
    InventorySellPopupComponent, AssetSellPopupComponent, ViewAssetDeployeReportComponent,
    PrintSellCounterComponent,
    SmsSettingComponent,
    CreateTemplateComponent,
    SmsOutboxPopupComponent,
    AskNewQuestionComponent,
    ViewQueriesComponent,
    AddCertificateComponent,
    ViewCertificateComponent,
    DeviceSettingComponent,
    SystemSettingComponent,
    FeeTypesComponent,
    FeeHeadMappingComponent,
    PaymentHistoryComponent,
    SpecialCommandComponent,
    ExpectedPaymentComponent,
    AddVehicleComponent,
    DefineMemberComponent,
    UnauthorizedComponent,
    DefineExamTermComponent,
    DefineExamTypeComponent,
    DefineExamNameComponent,
    DefineExamSetComponent,
    DefineWeightageComponent,
    DefineMaxMinComponent
  ],
  imports: [
    BrowserModule, FormsModule,CommonModule, BaseChartDirective,  HttpClientModule, ReactiveFormsModule,
    AppRoutingModule, MatDialogModule, BrowserAnimationsModule, ToastrModule.forRoot()   ,
    MatFormFieldModule,
    MatInputModule, QuillModule.forRoot(),
    MatSelectModule,FullCalendarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

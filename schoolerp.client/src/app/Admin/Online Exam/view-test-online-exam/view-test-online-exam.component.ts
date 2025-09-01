import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { ClassService } from '../../../Services/class.service';
import { FacultyService } from '../../../Services/faculty.service';
import { SessionService } from '../../../Services/session.service';
import { SubjectsService } from '../../../Services/subjects.service';
import { ChangeClassService } from '../change-class.service';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-test-online-exam',
  templateUrl: './view-test-online-exam.component.html',
  styleUrl: './view-test-online-exam.component.css'
})
export class ViewTestOnlineExamComponent implements OnInit, AfterViewInit {
  examId: number = 0;
  classList: any[] = [];
  onlineExams: any[] = [];
  filteredonlineExams: any[] = [];
  teacherList: any[] = [];
  sessionList: any[] = [];
  subjectList: any[] = [];
  academicYear = "";
  toggleIndex: number | null = null;

  permissionPopup: boolean = false;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _onlineExamService: OnlineExamService, private _classService: ClassService, private _facultyService: FacultyService
    , private _subjectService: SubjectsService, private _sessionService: SessionService
    , private _changeClassService: ChangeClassService, private _messageService: SuccessMessagePopupService) {

  }

  ngOnInit() {
    this.academicYear = this._sessionService.getActiveSession();
    this.bindClassList();
    this.bindTeacherList();
    this.bindSessionList();
    this.bindSubjectList();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
    
  }
  ngAfterViewInit() { 
    this.bindOnlineExam();
  }

  bindOnlineExam() {
    this._onlineExamService.getOnlineExams().subscribe(
      (exams) => {
        this.onlineExams = exams;
        this.filteredonlineExams = exams;
        console.log("this.filteredonlineExams: ", this.filteredonlineExams);
      },
      (error) => {
        console.log("Error in Online Exam: ", error);
      }
    );
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (clsList) => {
        this.classList = clsList;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error occuring in ClassList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindTeacherList() {
    this._facultyService.getAllFaculty().subscribe(
      (teachers) => {
        this.teacherList = teachers;
        if (this.teacherList.length === 0) {
          this._messageService.addMessage("warning", "No active teacher found. Please add some teachers.");
        }
      },
      (error) => {
        console.log("Error in fetching Teacher List: ", error);
        this._messageService.addMessage("errror", "Error in fetching Teacher List");
      }
    );
  }


  bindSessionList() {
    this._sessionService.getSession().subscribe(
      (success) => {
        this.sessionList = success;
      },
      (error) => {
        console.log("Error in session Fetching! ", error);
      }
    );
  }

  bindSubjectList() {
    this._subjectService.getSubjects().subscribe(
      (success) => {
        this.subjectList = success; 
        if (this.subjectList.length === 0) {
          this._messageService.addMessage("warning", "No subjects found for the selected class. Please add subjects.");
        }
      },
      (error) => {
        console.log("Error found on subject binding! ", error);
        this._messageService.addMessage("error", "Error found on subject binding!");
      }
    );
  }

  subjectName(subj_id: number) {
    const val = this.subjectList.find(s => s.subject_id == subj_id);
    return val ? val.subject_name : '';
  }
  facultyName(fac_id: number) {
    const val = this.teacherList.find(s => s.faculty_id == fac_id);
    return val ? val.first_name : '';
  }

  className(cls_id: number) {
    const val = this.classList.find(s => s.class_id == cls_id);
    return val ? val.dis_name : ''; 
  }

  setTime(time:any) {
    return time.substring(0, 5);
  }

 

  togglebtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }
   
  deleteExam(exam_id: number) {
    this._onlineExamService.deleteExam(exam_id.toString()).subscribe(
      (success) => {
        console.log("Exam deleted Successfully: ", success);
        this.bindOnlineExam();
      },
      (error) => {
        console.log("Error in exam deleting: ",error);
      }
    );
  }

  examPermission(i: number) {
    this.examId = i;
    this.permissionPopup = true;
  }

  close(event:boolean) {
    this.permissionPopup = event;
    this.bindOnlineExam();
  }

  showResult(clsId: number) {
    this._changeClassService.changeClassId(clsId); 
  }

  changefun() { 

    const selectedClass = (document.getElementById("classSelect") as HTMLSelectElement).value;
    const selectedExamType = (document.getElementById('examTypeSelect') as HTMLSelectElement).value;
    const selectedFaculty = (document.getElementById('facultySelect') as HTMLSelectElement).value;
    const selectedAcademicYear = this.academicYear;

    this.filteredonlineExams = this.onlineExams.filter(exam => { 
      const isClassMatch = selectedClass ? exam.ex.class_id == selectedClass : true; 
      const isExamTypeMatch = selectedExamType ? exam.ex.exam_name == selectedExamType : true; 
      const isFacultyMatch = selectedFaculty ? exam.ex.faculty_id == selectedFaculty : true; 
      const isAcademicYearMatch = selectedAcademicYear ? exam.ex.session == selectedAcademicYear : true;
       
      return isClassMatch && isExamTypeMatch && isFacultyMatch && isAcademicYearMatch;
    });
  }
   
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {  
    const clickedElement = event.target as HTMLElement; 
    if (!clickedElement.closest('.action-btn') && !clickedElement.closest('.action-btn-list')) {
      this.toggleIndex = null;
    }  
  }


  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }
 
} 

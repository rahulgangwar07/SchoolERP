import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { ExamPermission } from '../../../models/onlineexam';



@Component({
  selector: 'app-question-permission',
  templateUrl: './question-permission.component.html',
  styleUrls: ['./question-permission.component.css']
})
export class QuestionPermissionComponent implements OnInit {

  @Input() permission: boolean | undefined;
  @Input() examId: number | any;
  @Output() closePopup = new EventEmitter<boolean>();
  showSuccessPopup: boolean = false;

  studentData: any[] = [];
   
  pHeader: ExamPermission = {
    exam_id: 0,
    result_restriction: false,
    exam_restriction: false,
    result_date: '',
    lock_date: '',
    ans_sheet_status: false,
    session: '',
    school_id: ''
  };

  constructor(private _onlineExamService: OnlineExamService) { }

  ngOnInit(): void {
    this.bindexampermission();
    if (this.examId != 0) { 
      this.bindStudentexams();
    }

  }

  bindexampermission() {
    this._onlineExamService.getSingleOnlineExams(this.examId).subscribe(
      (exam) => {
          
        const formattedResultDate = this.formatDate(exam.result_date);
        const formattedLockDate = this.formatDate(exam.lock_date);

        this.pHeader = {
          exam_id: exam.exam_id,
          result_restriction: exam.result_restriction,
          exam_restriction: exam.exam_restriction,
          result_date: formattedResultDate,
          lock_date: formattedLockDate,
          ans_sheet_status: exam.ans_sheet_status,
          session: exam.session,
          school_id: exam.school_id
        } 

      },
      (error) => {
        console.log("Error in exam data: ", error);
      }
    );
  }

  formatDate(date:any) {
    if (date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }; 

  bindStudentexams() {
    this._onlineExamService.bindstuData(this.examId).subscribe(
      (data) => {
        this.studentData = data; 
      },
      (error) => {
        console.log("Error found: ",error);
      }
    );
  }

  close() {
    this.closePopup.emit(false);  
  }
   
  saveHeader() { 
    this._onlineExamService.postExamHeader(this.pHeader).subscribe(
      (success) => { 
        this.showSuccessPopup = true;
      },
      (error) => {
        console.log("Error in online Exam: ",error);
      }
    );
  }
  closepPopup() {
    this.showSuccessPopup = false;
  }

  changeResultDate(stu_exam_id: number, exam_date:string) { 
    this._onlineExamService.updateStudentResultDate(this.examId, stu_exam_id, exam_date).subscribe(
      (update) => {
        this.showSuccessPopup = true; 
      },
      (error) => {
        console.log("Error in result data updating: ",error);
      }
    );
  }

}

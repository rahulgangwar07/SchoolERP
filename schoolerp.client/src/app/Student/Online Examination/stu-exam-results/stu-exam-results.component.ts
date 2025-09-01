import { Component, OnInit } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-stu-exam-results',
  templateUrl: './stu-exam-results.component.html',
  styleUrl: './stu-exam-results.component.css'
})
export class StuExamResultsComponent implements OnInit {

  results: any[] = [];
  questions: any[] = [];
  popupVisible: boolean = false; // Control visibility of the popup

  constructor(private _studentService: StudentService, private _authService: AuthServiceService,
    private _onlineExamService: OnlineExamService) { }

  ngOnInit() {
    const uid = this._authService.getUserID();
    this._studentService.getStudentResult(0, 0, (Number)(uid)).subscribe(
      (response) => {
        this.results = response;
        console.log("This result: ", this.results);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  viewAnswer(exam_id: number, studentExamId: number): void {
    this._onlineExamService.getQuestionWAnswer(exam_id, studentExamId).subscribe(
      (question) => {
        this.questions = question;
        this.popupVisible = true; 
        console.log('Viewing answer: ', question);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  closePopup() {
    this.popupVisible = false; 
  }
}

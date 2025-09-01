import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../Services/class.service';
import { SubjectsService } from '../../../Services/subjects.service';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { ChangeClassService } from '../change-class.service';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-test-result-online-exam',
  templateUrl: './view-test-result-online-exam.component.html',
  styleUrl: './view-test-result-online-exam.component.css'
})
export class ViewTestResultOnlineExamComponent implements OnInit {

  classList: any;
  selectedClassId: number = 0;
  secList: any;
  selectedSecId: number = 0;
  subjectList: any[] = [];

  //exam_id: string = "34";
  exam_id: number = 0;
  student_exam_id: number = 0;
  showPopup: boolean = false;

  results: any[] = []; 

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];


  constructor(private _classService: ClassService, private _subjectService: SubjectsService,
    private _onlineExamService: OnlineExamService, private _changeClassService: ChangeClassService, private _messageService: SuccessMessagePopupService) {

  }

  ngOnInit() {
    this._changeClassService.currentValue.subscribe(
      (cls_id) => {
        this.selectedClassId = cls_id;
        this.bindSection(this.selectedClassId);
      });
    this.bindClassList();
    this.bindSubject();
    this.bindStudentResult();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        } 
      },
      (error) => {
        console.log("Error found when fetching classList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindSection(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (response) => {
        this.secList = response; 
      },
      (error) => {
        console.log("Section List not fetching: ", error);
      }
    );
  }

  changeClass() {
    this.bindSection(this.selectedClassId)
    this.bindStudentResult();
  }

  bindSubject() {
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

  bindStudentResult() {
    this._onlineExamService.getStudentResult(this.selectedClassId, this.selectedSecId).subscribe(
      (response) => {
        this.results = response; 
      },
      (error) => {
        this.results = [];
        console.log("Error: ",error);
      }
    );
  }

  deleteResult(stu_exam_id: number,index:number) {
    this._onlineExamService.deleteStudentResult(stu_exam_id).subscribe(
      (response) => { 
        if (index > -1 && this.results.length > 0) {
          this.results.splice(index, 1);  
        }
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  viewAnswer(exam_id: number, student_exam_id:number) {
    this.exam_id = exam_id; 
    this.student_exam_id = student_exam_id; 
    this.showPopup = true;
  }

  closePopup(event: any) {
    this.showPopup = event; 
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }
   

}

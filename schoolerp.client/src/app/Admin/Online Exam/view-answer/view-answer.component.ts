import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { BaseQuestion, studentAnswer } from '../../../models/onlineexam';

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrl: './view-answer.component.css'
})
export class ViewAnswerComponent implements OnInit {
  isEditing: boolean = false;

  @Input() popup: boolean | undefined;
  @Input() exam_id: number = 0;
  @Input() studentExamId: number = 0;
  @Output() closepopup = new EventEmitter<boolean>();

  questions: any[] = [];

  constructor(private _onlineExamService: OnlineExamService) { }

  ngOnInit() {
    this.bindQuestions();
  }

  // Method to toggle editing mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  bindQuestions() {
    this._onlineExamService.getQuestionWAnswer(this.exam_id, this.studentExamId).subscribe(
      (question) => { 
        this.questions = question; 
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }
   
   
  editAnswer(ques: any, mAwarded:number) { 
    if (ques.answer_id == null) {
      const values: studentAnswer = {
        answer_id: 0,
        student_exam_id: this.studentExamId,
        question_id: ques.question_id,
        selected_option: ques.selected_option ?? 0,
        answer_text: ques.answer_text ?? "",
        marks_awarded: ques.marks_awarded ?? 0,
        school_id: "",
      }
      this._onlineExamService.postSingleAnswer(values).subscribe(
        (success) => { 
        },
        (error) => {
          console.log("Error: ",error);
        }
      );
    }
    else {
      this._onlineExamService.updateAnswer(ques.answer_id, ques.selected_option, ques.answer_text, mAwarded).subscribe(
        (success) => {
          this.bindQuestions();
          console.log(`Editing answer for ans ${ques.ans_id} and option ${ques.s_option}`);
        },
        (error) => {
          console.log("Error found in answer: ", error);
        }
      );
    }
  }
   
  submitSheet() {
    console.log('Answer sheet submitted');
  }
   
  closeSheet() {
    this.closepopup.emit(false); 
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { BaseQuestion } from '../../../models/onlineexam';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.css'
})
export class ViewQuestionsComponent implements OnInit {

  examId: string = "0";
  questionId: number = 0;
  addQuestionPopup: boolean = false;
  questionList: BaseQuestion[] = [];
  exam_title: string = "";
  exam_start: string = '';

  constructor(private route: ActivatedRoute, private _onlineExamService: OnlineExamService) {

  }

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('exam_id') ?? "0";
    this.bindQuestions();
    this._onlineExamService.getSingleOnlineExams(this.examId).subscribe(
      (success) => { 
        this.exam_title = success.exam_title; 
        this.exam_start = success.exam_start_date; 
      },
      (error) => {
        console.log("Error in fetchin Exam Title: ", error);
      }
    );

  }

  bindQuestions() {
    this._onlineExamService.getQuestion(this.examId).subscribe(
      (questions: BaseQuestion[]) => { 
        this.questionList = questions;  
      },
      (error) => {
        console.log("Error in questions fetching: ",error);
      }
    );
  }

  addQuestion() { 
    this.addQuestionPopup = true;
  }

  editQuestion(qu_id: number) {
    this.questionId = qu_id;
    this.addQuestionPopup = true;
  }

  deleteQuestion(qu_id: number) {
    this._onlineExamService.deleteQuestion(this.examId, qu_id).subscribe(
      (success) => {
        console.log("Question is deleted: ", success);
        this.bindQuestions();
      },
      (error) => {
        console.log("Error in questions deleting: ", error);
      }
    );
  }

  closePopup(event: any) {
    this.bindQuestions();
    this.addQuestionPopup = event;
  }


}

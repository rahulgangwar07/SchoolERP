import { Component, OnInit } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { ActivatedRoute } from '@angular/router';
import { BaseQuestion, QuestionDTOs, studentAnswer, studentExam } from '../../../models/onlineexam';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-start-online-exam',
  templateUrl: './start-online-exam.component.html',
  styleUrl: './start-online-exam.component.css'
})
export class StartOnlineExamComponent implements OnInit {

  i: number = 1;
  popupShow: boolean = false;
  exam_id: string = "0"; 
  stu_exam_id: number = 0;

  questions: QuestionDTOs[] = [];
  answers: studentAnswer[] = [];

  examSubmitStatus: boolean = false;

  countDown: Subscription | any;
  counter: number = 0;  
  tick = 1000;
  timeLeft: string = "";
  timeOver: boolean = false;

  constructor(private _onlineExamService: OnlineExamService, private route: ActivatedRoute, private _authService: AuthServiceService) {
    
  }

  ngOnInit() { 
    this.exam_id = this.route.snapshot.paramMap.get('exam_id') ?? "0";
    this.stu_exam_id = (Number)(this.route.snapshot.paramMap.get('student_exam_id')) ?? 0;
    this.checkAttempted();

  }

  checkAttempted() {
    this._onlineExamService.getStudentExambyId(this.stu_exam_id).subscribe(
      (r: studentExam) => {
        if (r.status == "Pending") {
          this.examSubmitStatus = false;
          this.onlineExam();
          this.bindQuestions();
        }
        else {
          this.examSubmitStatus = true;
        } 
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  onlineExam() {
    this._onlineExamService.getSingleOnlineExams(this.exam_id).subscribe(
      (response) => {
        this.counter = response.duration * 60;
        this.startTimer();
      },
      (error) => {
        console.log("Error : ", error);
      }
    );
  }

  startTimer() {
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter > 0) {
        --this.counter;   
        this.updateTimeDisplay();  
      } else {
        this.stopTimer();
      }
    });
  }

  updateTimeDisplay() {
    const minutes = Math.floor(this.counter / 60); 
    const seconds = this.counter % 60;  
    this.timeLeft = `${this.padNumber(minutes)} min ${this.padNumber(seconds)} sec`;
    if (this.counter == 0)
      this.timeOver = true;
  }

  padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;  
  }

  stopTimer() {
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }
   


  bindQuestions() {
    this._onlineExamService.getQuestion(this.exam_id).subscribe(
      (question: BaseQuestion[]) => { 
        this.questions = question.map(q => ({
          ...q,
          student_answer: '',    
          selected_option: ''
        }));
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  saveAnswer(question: any, answer_text: string, selectedOption: number) { 
    const existingAns = this.answers.find(ans => ans.question_id == question.question_id);

    const stuAnswerData: studentAnswer = {
      answer_id: existingAns ? existingAns.answer_id : 0,
      student_exam_id: this.stu_exam_id,
      question_id: question.question_id,
      selected_option: selectedOption,
      answer_text: answer_text,
      marks_awarded: 0,
      school_id: this._authService.getSchoolID(),
    };
     
    if (existingAns) { 
      if (answer_text == "" && selectedOption == 0) {
        const index = this.answers.findIndex(ans => ans.question_id == question.question_id);
        if (index !== -1) {
          this.answers.splice(index, 1); 
        }
      } else { 
        Object.assign(existingAns, stuAnswerData);
      }
    } else { 
      if (answer_text != "" || selectedOption != 0) {
        this.answers.push(stuAnswerData);
      }
    }
  }


  checkColor(question_id: number) {
    return this.answers.some(ans => ans.question_id === question_id && (ans.selected_option != null || ans.answer_text != ""));
  }

  moveForword() {
    this.i++; 
  }

  backword() {
    this.i--; 
  }

  moveQuestion(i: number) { 
    this.i = i; 
  }

  Submit() { 
    this.popupShow = true;
  }

  cancelShow() {
    this.popupShow = false;
  }

  saveTextArea(ques: any, event: any) { 
    this.saveAnswer(ques,event.target.value,0)
  }



  confirmSubmit() { 
    this._onlineExamService.postAnswer(this.stu_exam_id,this.answers).subscribe(
      (response) => { 
        this.popupShow = false;
        this.timeOver = false;
        this.checkAttempted();
      },
      (error) => {
        console.log("Error in answer logging: ",error);
      }
    );

  }
   

  ngOnDestroy() {
    // Cleanup the timer when the component is destroyed
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }

}

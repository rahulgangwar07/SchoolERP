import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrl: './add-questions.component.css'
})
export class AddQuestionsComponent implements OnInit {

  @Input() QuestionPopup: boolean | undefined;
  @Input() exam_Id: string = "";
  @Input() question_Id: number = 0;
  @Output() closePopupval = new EventEmitter<boolean>();

  examTypeVal: string = "objective"; 
  options = new Array(5);

  data: any;
  questionForm: FormGroup;

  constructor(private _onlineExamService: OnlineExamService, private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question_id: [0],
      exam_id: [this.exam_Id, Validators.required],
      question_type: ['objective', Validators.required],
      question_text: ['', Validators.required],
      //duration: ['', Validators.required],
      marks: ['', Validators.required],
      option_1: [''],
      option_2: [''],
      option_3: [''],
      option_4: [''],
      option_5: [''],
      correct_option: ['0'],
      isActive: [true ],
      school_id: ['' ],

    });
  }

  ngOnInit() {

    this.validator();

    if (this.question_Id != 0) {
      this._onlineExamService.getSingleQuestion(this.exam_Id, this.question_Id).subscribe(
        (question) => {
          this.questionForm.patchValue({
            question_id: question.question_id,
            exam_id: question.exam_id,
            question_type: question.question_type,
            question_text: question.question_text,
            //duration: question.duration,
            marks: question.marks,
            option_1: question.option_1,
            option_2: question.option_2,
            option_3: question.option_3,
            option_4: question.option_4,
            option_5: question.option_5,
            correct_option: question.correct_option,
            isActive: question.isActive,
            school_id: question.school_id,
          });
        //values patch ke through set kru ya set ke
          console.log("getSingleQuestion: ",question);
        },
        (error) => {
          console.log("Error: ",error)
        }
      );

    }
  }

  validator() {
    if (this.questionForm.get('question_type')?.value === "objective") { 
      this.questionForm.get('option_1')?.setValidators(Validators.required);
      this.questionForm.get('option_2')?.setValidators(Validators.required);
      this.questionForm.get('correct_option')?.setValidators(Validators.required);
    }
    if (this.questionForm.get('question_type')?.value === "subjective") { 
      this.questionForm.get('option_1')?.clearValidators();
      this.questionForm.get('option_2')?.clearValidators();
      this.questionForm.get('correct_option')?.clearValidators();
    }
  }

  closePopup() { 
    this.closePopupval.emit(false);
  }

  ExamTypeChange(event: any) {
    this.validator();
    this.examTypeVal = event.target.value;
    console.log("Event: ",event.target.value);
  }

  radioChange(event: any) { 
    console.log("radioChange: ", event.target.value);
    this.questionForm.get('correct_option')?.setValue(event.target.value);
  }

  saveQuestion() {
    this.questionForm.get('exam_id')?.setValue(this.exam_Id);
    if (this.questionForm.valid) {

    }
    //Object.keys(this.questionForm.controls).forEach((controlName) => {
    //  console.log(`${controlName}:`, this.questionForm.get(controlName)?.value);

    this._onlineExamService.postQuestion(this.questionForm.value).subscribe(
      (saved) => {
        console.log("Question Saved.", saved);
        this.questionForm.reset();
        this.closePopup();
      },
      (error) => {
        console.log("Error in question saving! ",error);
      }
    ); 

  }

}

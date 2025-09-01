import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../Services/student.service'; 

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css']
})
export class InstructionPageComponent implements OnInit {
  exam: any;
  exam_id: number = 0;
  stu_exam_id: number = 0;

  constructor(private route: ActivatedRoute, private _studentService: StudentService) { }

  ngOnInit() {
    this.exam_id = Number(this.route.snapshot.paramMap.get('exam_id')) ?? 0;
    this.bindOnlineExamIns();  
  }

  bindOnlineExamIns() {
    this._studentService.getOnlineExamInstruction(this.exam_id).subscribe(
      (exams) => {
        this.exam = exams;
        this.stu_exam_id = exams.student_exam_id;
        console.log("Exam details: ", exams);
      },
      (error) => {
        console.log("Error in fetching exam details: ", error);
      }
    );
  }
   
}

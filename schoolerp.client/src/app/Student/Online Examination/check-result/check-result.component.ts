import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../Services/student.service';

@Component({
  selector: 'app-check-result',
  templateUrl: './check-result.component.html',
  styleUrl: './check-result.component.css'
})
export class CheckResultComponent implements OnInit {

  exam_id: number = 0;
  stu_exam_id: number = 0;
  result: any;
  profile: any;

  constructor(private route: ActivatedRoute, private _studentService: StudentService) {
   
  }

  ngOnInit() {
    this.exam_id = (Number)(this.route.snapshot.paramMap.get('exam_id')) ?? 0;
    this.stu_exam_id = (Number)(this.route.snapshot.paramMap.get('student_exam_id')) ?? 0;

    this.bindProfile();
    this.bindStudentResult();

  }

  bindProfile() {
    this._studentService.getStudentProfile().subscribe(
      (profile) => {
        this.profile = profile; 
      },
      (error) => {
        console.log("Error: ", error);
      }
    ); 
  }

  bindStudentResult() {
    this._studentService.getStudentResult(this.exam_id, this.stu_exam_id,0).subscribe(
      (result) => {
        this.result = result; 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

}

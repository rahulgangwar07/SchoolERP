import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { AuthServiceService } from '../../Services/AuthServiceService';

@Component({
  selector: 'app-stu-class-routine',
  templateUrl: './stu-class-routine.component.html',
  styleUrl: './stu-class-routine.component.css'
})
export class StuClassRoutineComponent implements OnInit {

  class_name: string = "";
  sec_name: string = "";
  session: string = "";
  weekSchedule: any ; 

 

  constructor(private _studentService: StudentService, private _authService: AuthServiceService) {

  }

  ngOnInit() {
    this.session = this._authService.getSessionID();
    this.bindClassRoutine();
  }

  bindClassRoutine() {
    this._studentService.classRoutine().subscribe(
      (success) => {
        this.class_name = success.class_name;
        this.sec_name = success.sec_name;
        this.weekSchedule = success.schedules;
        console.log("succes routine: ", success);
      },
      (error) => {
        console.log("Error is: ",error);
      }
    );
  }

}

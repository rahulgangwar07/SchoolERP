import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { SubjectsService } from '../../../Services/subjects.service';

@Component({
  selector: 'app-stu-curriculum',
  templateUrl: './stu-curriculum.component.html',
  styleUrl: './stu-curriculum.component.css'
})
export class StuCurriculumComponent implements OnInit {

  classid: string = "0";
  subjectList: any[] = [];
  constructor(private _authService: AuthServiceService, private _subjectService: SubjectsService) { }

  ngOnInit() {
    this.classid = this._authService.getClassId();
    if (this.classid != "0") {
      this.bindSubjects();
    }
  }
   
  bindSubjects() {
    this._subjectService.getSubjectsbyClass((Number)(this.classid)).subscribe(
      (subj) => {
        this.subjectList = subj;
        console.log("Subjects: ",subj);
      },
      (error) => {
        console.log("Error : ",error);
      }
    );
  }
}

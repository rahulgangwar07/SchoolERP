import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';

@Component({
  selector: 'app-class-report',
  templateUrl: './class-report.component.html',
  styleUrl: './class-report.component.css'
})
export class ClassReportComponent implements OnInit {
  classList: any;
  totalClasses: number = 0;
  totalStudents: number = 0;


  constructor(private _classService: ClassService) {

  }

  ngOnInit() {
    this._classService.getClass().subscribe(
      (response) => {
        this.classList = response; 
        const activeClasses = this.classList.filter((classes: { status: boolean; }) => classes.status === true);
        this.totalClasses = activeClasses.length;
        this.totalStudents = this.classList.reduce((acc: any, classes: { stuCount: any; }) => acc + classes.stuCount, 0); // Sum of all students in each class

      },
      (error) => {
        console.log("error ", error)
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-attendance-row-data',
    templateUrl: './attendance-row-data.component.html',
    styleUrl: './attendance-row-data.component.css',
    standalone: false
})
export class AttendanceRowDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  print() {
    window.print();
  }

}

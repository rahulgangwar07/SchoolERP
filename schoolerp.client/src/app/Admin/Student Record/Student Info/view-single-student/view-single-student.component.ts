import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-view-single-student',
    templateUrl: './view-single-student.component.html',
    styleUrl: './view-single-student.component.css',
    standalone: false
})
export class ViewSingleStudentComponent implements OnInit {

  @Input() childData: any;
  @Output() viewPopup: EventEmitter<string> = new EventEmitter();

 

  constructor() {

  }

  ngOnInit() {
    if (this.childData) { 
      console.log("childData: ", this.childData);
      
    }
  }

  redirectPage() {
    this.viewPopup.emit("false");
  }

}

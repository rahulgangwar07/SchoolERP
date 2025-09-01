import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubjectsService } from '../../../../../Services/subjects.service';

@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject-popup.component.html',
  styleUrl: './subject-popup.component.css'
})
export class SubjectPopupComponent implements OnInit {

  @Input() class_id: number = 0;
  @Input() pshowsubPopup: boolean = false;
  @Input() permissions: any;
  @Output() pclosepopup = new EventEmitter<boolean>();

  subjectList: any[] = [];

  constructor(private _subjectService: SubjectsService) {

  }

  ngOnInit() {
    if (this.class_id != 0) {
      this.bindSubjectList();
    } 
  }

  bindSubjectList() {
    this._subjectService.getSubjectsbyClass(this.class_id).subscribe(
      (sub) => {
        this.subjectList = sub; 
      },
      (error) => {
        console.log("Error when fetching Subjects: ", error);
      }
    );
  }

  deleteSubject(subj_id: number) { 
      this._subjectService.deleteSingleClsSubject(subj_id, this.class_id).subscribe(
        (deleted) => {
          this.bindSubjectList();
        },
        (error) => {
          console.log("Error when fetching Subject: ", error);
        }
      ); 
  }

  closePopup() {
    this.pclosepopup.emit(false);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClassService } from '../../../../../Services/class.service';
import { FacultyService } from '../../../../../Services/faculty.service';
export interface Section {
  sec_id: number;
  class_id: number;
  sec_name: string;
  sec_dis_name: string;
  status: boolean;
  // Add any additional fields you might need here
}
@Component({
  selector: 'app-sec-popup',
  templateUrl: './sec-popup.component.html',
  styleUrl: './sec-popup.component.css'
})
export class SecPopupComponent implements OnInit { 

  @Input() pshowPopup: boolean = false;
  @Input() class_id: number = 0;
  @Input() permissions: any;
  canCreate: boolean = false;
  @Output() pclosepopup = new EventEmitter<boolean>();

  teacherList: any[] = [];

  sectionList: Section[] = [];

  sectionData = {
    sec_id:0,
    class_id: 0,
    sec_name: '',
    status:false,
    sec_dis_name: ''
  };


  constructor(private _classService: ClassService, private _facultyService: FacultyService) { }

  ngOnInit() {
    this.canCreate = this.permissions.canCreate;
    this.sectionData.class_id = this.class_id;
    if (this.sectionData.class_id != 0) {
      this._classService.getSection(this.sectionData.class_id).subscribe(
        (success) => {
          this.sectionList = success;
          this.bindTeacher();
        },
        (error) => {
          console.log("Error Found:  ", error);
        }
      );
    }
  }

  bindTeacher() {
    //getOnlyTeacher
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.teacherList = teachers;
        //console.log("Teachers Detail: ", teachers); 
      },
      (error) => {
        console.log("Error found when fetching teacher details. ", error);
      }
    );
  }
  // Method to handle saving new section data
  saveSection() {
    this.sectionData.status = true;
    this._classService.postSection(this.sectionData).subscribe(
      (response) => {
        this.canCreate = this.permissions.canCreate;
        this.pclosepopup.emit(false);
      },
      (error) => {
        console.log("Error Found: ", error);
      }
    );
  }
   
  //getTeacherName(teacherId: string) {
  //  switch (teacherId) {
  //    case '1':
  //      return 'Ajay Kumar';
  //    case '2':
  //      return 'Amit Kumar';
  //    default:
  //      return 'Unknown';
  //  }
  //}

  closePopup() {  
    this.pclosepopup.emit(false);
  }

  editSection(sec: any) { 
    this.canCreate = true;
    this.sectionData = sec;
  }

  deleteSection(secId: number, class_id: number) {
    this._classService.deleteSection(secId, class_id).subscribe(
      (success) => { 
        this.pclosepopup.emit(false);
      },
      (error) => {
        console.log("Error found! ",error);
      }
    );
  }


  onStatusChange(sec: any, data: any) {
    sec.status = data.target.checked;
    this._classService.postSection(sec).subscribe(
      (response) => { 
      },
      (error) => {
        console.log("Error Found: ", error);
      }
    ); 
  }

}

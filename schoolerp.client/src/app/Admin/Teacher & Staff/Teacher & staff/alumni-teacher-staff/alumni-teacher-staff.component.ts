import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-alumni-teacher-staff',
  templateUrl: './alumni-teacher-staff.component.html',
  styleUrl: './alumni-teacher-staff.component.css'
})
export class AlumniTeacherStaffComponent implements OnInit {

  facultyList: any;

  currentModuleId: number = 0;
  permissions: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(private _facultyService: FacultyService, private _permissionService: PermissionsService, private router: Router
    , private _messageService: SuccessMessagePopupService) {

  }

  ngOnInit() {

    this.bindPermission();

    this.bindfacultyList();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
  }

  bindPermission() {
    const route = this.router.url;
    this._permissionService.checkPermission(route).subscribe(
      (permission) => {
        this.permissions = permission;
        console.log("permissions: ", this.permissions);
      },
      (error) => {
        console.log("Error in fetching Permission! ", error);
      }
    );
  }

  bindfacultyList() {
    this._facultyService.getAlumniFaculty().subscribe(
      (response) => {
        this.facultyList = response;
        if (this.facultyList.length == 0) {
          this._messageService.addMessage("warning", "No alumni faculty found.");
        }
      },
      (error) => {
        console.log("Error found when i am fetching alumni faculty: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching alumni faculty.");
      }
    );
  }



  restoreFaculty(id: number) {
    this._facultyService.changeFacStatus(id, "Active").subscribe(
      (response) => {
        this._messageService.addMessage('restore', 'Faculty has been Restored.');
        this.bindfacultyList();
      },
      (error) => {
        console.log("Error found in restoring faculty! ", error);
        this._messageService.addMessage('error', 'Faculty is not being restored'); 
      }
    );
  }

  deletefaculty(id: number) {
    this._facultyService.deletePermanent(id).subscribe(
      (response) => {
        this._messageService.addMessage('delete', 'Faculty has been Deleted.');
        this.bindfacultyList();
      },
      (error) => {
        console.log("Error found in deleting faculty! ", error);
        this._messageService.addMessage('error', 'Error occuring. Please Contact Administrator');
      }
    );
  }
   

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


  print() {
    window.print();
  }

}

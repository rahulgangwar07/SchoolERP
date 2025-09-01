import { Component, OnInit } from '@angular/core';
import { RoutineService } from '../../../../Services/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../../../../Services/permissions.service';
import { Permissions } from '../../../../models/permissions';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-teacher-routine',
  templateUrl: './teacher-routine.component.html',
  styleUrls: ['./teacher-routine.component.css']
})
export class TeacherRoutineComponent implements OnInit {

  teacherRoutines: any[] = [];
  routineIndex: number | any = null;

  permissions: Permissions | undefined;

  showSuccessPopup: boolean = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _routineService: RoutineService, private router: Router, private _permissionService: PermissionsService
    , private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindPermission(); 
    this.bindTeacherRoutine();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
  }

  bindTeacherRoutine() {
    this._routineService.getTeacherSchedule().subscribe(
      (data) => {
        this.teacherRoutines = data;
        if (this.teacherRoutines.length == 0) {
          this._messageService.addMessage("warning", "No schedules are available."); 
        } 
      },
      (error) => {
        console.log("Error fetching data: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the schedules.");
      }
    );
  }

  toggleBtn(index: number) {
    this.routineIndex = this.routineIndex === index ? null : index;
  }

  deleteSchedule(sch_id: number) {
    if (confirm("Are you sure!")) {
      this._routineService.deleteClassSchedule(sch_id).subscribe(
        (success) => {
          this.bindTeacherRoutine();
          this._messageService.addMessage("success", "Schedule deleted successfully.");
        },
        (error) => {
          console.log("Error found in Schedule Delete! ", error);
          this._messageService.addMessage("error", "An error occurred while deleting the schedule. Please try again.");
        }
      );
    }

  } 
  bindPermission() {
    const route = this.router.url;
    this._permissionService.checkPermission(route).subscribe(
      (permission) => {
        console.log("permission: ", permission);
        this.permissions = permission;
        console.log("this.permissions: ", this.permissions);
      },
      (error) => {
        console.log("Error in fetching Permission! ", error);
      }
    );
  }


  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


}

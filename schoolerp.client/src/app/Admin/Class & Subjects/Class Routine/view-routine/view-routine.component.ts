import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutineService } from '../../../../Services/routine.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissions } from '../../../../models/permissions';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.component.html',
  styleUrl: './view-routine.component.css'
})
export class ViewRoutineComponent implements OnInit,OnDestroy {

  classRoutines: any[] = [];
   
  routineIndex: number | any = null;
  routeName: string = "";

  permissions: Permissions | undefined;

  showSuccessPopup: boolean = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _routineService: RoutineService, private route: ActivatedRoute, private router: Router,
    private _permissionService: PermissionsService, private _messageService: SuccessMessagePopupService) {
     
  }

  ngOnInit() {
    this.bindPermission(); 
    this.routeName = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    if (this.routeName == "Offline") {
      this.bindClassRoutine(this.routeName); 
    }
    else if (this.routeName == "Online"){
      this.bindClassRoutine(this.routeName); 
    }

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length>0
    });
  }

  bindClassRoutine(routeName:string) {
    this._routineService.getSchedule(routeName).subscribe(
      (data) => {
        this.classRoutines = data;
        if (this.classRoutines.length == 0) {
          this._messageService.addMessage("warning", "No schedules are available."); 
        }
      },
      (error) => {
        console.log("Error found when fetching data: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the schedules.");
      }
    );
  }

  toggleBtn(index: number) {
    this.routineIndex = this.routineIndex == index ? null : index;
  }

  bindPermission() {
    const route = this.router.url; 
    this._permissionService.checkPermission(route).subscribe(
      (permission) => { 
        this.permissions = permission; 
      },
      (error) => {
        console.log("Error in fetching Permission! ", error);
      }
    );
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

  deleteSchedule(sch_id: number) {
    if (confirm("Are you sure you want to delete this schedule?")) {
      this._routineService.deleteClassSchedule(sch_id).subscribe(
        (success) => {
          this.bindClassRoutine(this.routeName?.toString());
          this._messageService.addMessage("success", "Schedule deleted successfully.");
        },
        (error) => {
          console.log("Error found in Schedule Delete! ", error);
          this._messageService.addMessage("error", "An error occurred while deleting the schedule. Please try again.");
        }
      );
    }
  }
  ngOnDestroy() {
     
     
    this.classRoutines = [];
    this.routineIndex = null;
    this.permissions = undefined;
  }


}

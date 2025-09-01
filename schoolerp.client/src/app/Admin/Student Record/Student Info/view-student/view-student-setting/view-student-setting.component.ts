import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationService } from '../../../../../Services/registration.service';
 

@Component({
    selector: 'app-view-student-setting',
    templateUrl: './view-student-setting.component.html',
    styleUrl: './view-student-setting.component.css',
    standalone: false
})
export class ViewStudentSettingComponent implements OnInit {

  settingPopup: number | null = null; // Set this to null initially
  @Input() handleData: any;

  @Output() newItemEvent = new EventEmitter<number>();
  //@Input() handleData = new 

  constructor(private _registrationService: RegistrationService) { }

  ngOnInit() {
    console.log('Received data in handleData: ', this.handleData);
  }


  closePopup(value: number) {
    this.newItemEvent.emit(value);
  }

  moveToalumni(uid: number) { 
    this._registrationService.moveToalumni(uid).subscribe(
      (response) => {
        console.log("Move Successfully!", response);
      },
      (error) => {
        console.log("Error found while moving to alumni!", error);
      }
    );
  }


}

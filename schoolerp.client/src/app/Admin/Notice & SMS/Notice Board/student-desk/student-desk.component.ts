import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../../Services/Messages/communication.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-student-desk',
  templateUrl: './student-desk.component.html',
  styleUrl: './student-desk.component.css'
})
export class StudentDeskComponent implements OnInit {

  faculties: any[] = [];

  openPopup: boolean = false;
  faculty_id: number = 0;
  faculty_name: string = "";
  request: string = "Ask";
  userId: number = 0;
  userRole: string = "";
  communication_id: number = 0;

  themeSetting: any;

  constructor(private _communicationService: CommunicationService, private _authService: AuthServiceService,
    private _imageService: ImageServiceService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.userId = (Number)(this._authService.getUserID());
    this.userRole = this._authService.getUserRole();
    this.loadFaculties();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  loadFaculties() {
    this._communicationService.getFaculties().subscribe(
      (response) => {
        this.faculties = response;
        this.faculties.forEach(f => f.image = this._imageService.getImageUrlFaculty(f.image));
        console.log("faculties Response: ",response);
      },
      err => { console.log("Error in faculty loading... ", err); }
    );
  }

  messageList(f_id:number) {
    console.log("f_id");
  }


  askQuestion(fac_id: number,fac_name:string) {
    this.faculty_id = fac_id;
    this.faculty_name = fac_name;
    this.openPopup = true;
  }

  closePopup(event: any) {
    this.openPopup = event;
    this.loadFaculties();
  }

}

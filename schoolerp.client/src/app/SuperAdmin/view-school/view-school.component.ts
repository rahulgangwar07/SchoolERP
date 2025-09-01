
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../Services/school.service';
import { ImageServiceService } from '../../Services/image-service.service';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.css']
})
export class ViewSchoolComponent implements OnInit {
  schools: any[] = [];
  adminLogin: boolean = false;
  adminList: any[] = [];

  constructor(private _schoolService: SchoolService, private _imageService: ImageServiceService) { }

  ngOnInit(): void {
   
    this.loadSchools();
  }

  // Fetch list of schools from the service
  loadSchools(): void {
    this._schoolService.getAllSchools().subscribe(
      (response: any[]) => { 
        this.schools = response;
        this.schools.forEach(school => {
          school.schoolLogo = this._imageService.getImageUrl(school.schoolLogo);
        });

      },
      (error: any) => {
        console.error('Error fetching schools list:', error);
      }
    );
  }

  loginPopup(school_id: string) { 
    console.log("Event: ", school_id);
    this._schoolService.getAdmin(school_id).subscribe(
      (success) => {
        this.adminList = success;
        console.log("Success: ",success);
      },
      (error) => {
        console.log("Error in fetching Admins: ",error);
      }
    );

    this.adminLogin = true;
  }
  closeAdminLogin() {
    this.adminLogin = false;
  }

}

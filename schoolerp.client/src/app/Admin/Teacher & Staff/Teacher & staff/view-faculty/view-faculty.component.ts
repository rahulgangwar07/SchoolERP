import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PermissionsService } from '../../../../Services/permissions.service';
import { Permissions } from '../../../../models/permissions';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-faculty',
  templateUrl: './view-faculty.component.html',
  styleUrl: './view-faculty.component.css'
})
export class ViewFacultyComponent implements OnInit {

  facultyList: any;
  showPasswordPopup: boolean = false;
  faculty_id: number|any;
  faculty_name: string | undefined;
  user_name: string | undefined;
  password: string | any;
  routeName: string | any;
  memberList: string = "Faculty";
  //Faculty Members List
  filteredFacultyList: any[] | any;

  showCurrentIndex: number | any;

  currentModuleId: number = 0;
  permissions: Permissions | undefined;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  constructor(private _facultyService: FacultyService, private _imageService: ImageServiceService, private route: ActivatedRoute,
    private _permissionService: PermissionsService, private router: Router, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
     
    this.bindPermission();

    this.routeName = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    if (this.routeName == "view-teacher") { 
      this.memberList = "Faculty";
    } else {
      this.memberList = "Staff";
    } 

    this.bindfaculty();

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
        },
        (error) => {
          console.log("Error in fetching Permission! ", error);
        }
      ); 
  }

  applyFilter() {
    this.filteredFacultyList = this.facultyList.filter((f: { designation: number; }) => {
      return (this.routeName !== 'view-teacher' && f.designation === 8) ||
        (this.routeName === 'view-teacher' && f.designation !== 8);
    });
 
  }

  bindfaculty() {
    this._facultyService.getAllFaculty().subscribe(
      (success) => {
        this.facultyList = success; 
        this.facultyList.forEach((img: { image: string | null; signature: string | null }) => {
          img.image = this._imageService.getImageUrlFaculty(img.image);
          img.signature = this._imageService.getImageUrlFaculty(img.signature);
        });
        this.applyFilter();   
        
      },
      (error) => {
        console.log("Error found! ", error);
      }
    );
  }

  // Other methods (delete, enable/disable, change password) remain unchanged
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Handle the click event here
    const actionList = document.querySelector('.action-list');
    if (actionList) {
      this.showCurrentIndex = null;
    } 
  }

  toggleBtn(index: number) {
    this.showCurrentIndex = this.showCurrentIndex == index ? null : index;
  }


  enableDisableAcc(id: number, status: string) {
    if (status == "Active") {
      status = "Suspended";
    }
    else {
      status = "Active";
    }
    this._facultyService.changeFacStatus(id, status).subscribe(
      (response) => { 
        this.bindfaculty();
      },
      (error) => {
        console.log("Error in deleting faculty! ", error);
      }
    );
  }
   
  deleteFaculty(id: number) {
    this._facultyService.changeFacStatus(id,"Inactive").subscribe(
      (response) => {
        this._messageService.addMessage('delete', 'Faculty has been Successfully Deleted.');
        this.bindfaculty();
      },
      (error) => { 
        console.log("Error in deleting faculty! ", error); 
        this._messageService.addMessage('error', 'Error occuring Please Contact administrator');
      }
    );
  }

  moveAlumni(id: number) {
    this._facultyService.changeFacStatus(id,"Withdrawn").subscribe(
      (response) => {
        this.bindfaculty();
      },
      (error) => {
        console.log("Error found! ",error);
      }
    );
  }


  changepswd(id: number, name: string, userName: string, password: string) {
    this.showPasswordPopup = true;
    this.faculty_id = id;
    this.faculty_name = name;
    this.user_name = userName;
    this.password = password;
  }

  submitPswd() { 
    this._facultyService.changePswd(this.faculty_id, this.password).subscribe(
      (success) => {
        console.log("Password Change Successfully! ");
        this._messageService.addMessage("success","Password Change Successfully");
      },
      (error) => {
        console.log("Error found on password Change! ", error);
        this._messageService.addMessage("success", "Error found on password Change!");
      }
    );
    this.showPasswordPopup = false;
  }

  hidePopup() {
    this.showPasswordPopup = false;
  }
   
  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}

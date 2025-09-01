import { Component, ElementRef, HostBinding, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RegistrationService } from '../../../../Services/registration.service';
import { ClassService } from '../../../../Services/class.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
    selector: 'app-view-alumni',
    templateUrl: './view-alumni.component.html',
    styleUrls: ['./view-alumni.component.css'],
    standalone: false
})
export class ViewAlumniComponent implements OnInit {

  classList: any[] = [];
  selectedClassId: number = 0;
  rowalumniData: any [] = [];
  alumniData: any[] = [];
  alumni: any;
  showOptions: number | null = null;
  viewSingleStudent: boolean = false;

  currentModuleId: number = 0;
  permissions: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 


  constructor(private renderer: Renderer2,
    private _registrationService: RegistrationService,
    private _classService: ClassService, private router: Router,
    private _permissionService: PermissionsService, private _messageService: SuccessMessagePopupService
  ) { }

  ngOnInit() {
 
    this.bindPermission();

    this.bindClassList();
    this.fetchAlumniData();

    this._messageService.messages$.forEach(messages => {
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

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (success) => {
        this.classList = success;
        if (this.classList.length == 0) {

          this._messageService.addMessage("warning", "No active classes found. Contact administrator.");
        }
      },
      (error) => {
        console.log("Error found when fetching classes! ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  fetchAlumniData() {
    this._registrationService.getAlumniData().subscribe(
      (success) => {
        this.rowalumniData = success;
        if (this.rowalumniData.length == 0)
          this._messageService.addMessage("warning","Alumni data not found.");
        this.alumniData = this.selectedClassId ? this.rowalumniData.filter(sm => sm.studentMaster.class_id === this.selectedClassId) : success;
      },
      (error) => {
        console.log("Error found when fetching alumni! ", error);
      }
    );
  }

  toggleBtn(index: number) {
    console.log("this.showOptions1: ", this.showOptions,index);
    this.showOptions = this.showOptions === index ? null : index;
    console.log("this.showOptions2: ", this.showOptions, index);
  }
  // HostListener for the click event on the div
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const optionsListElement = document.querySelector('.optionList');
    const settingPopupElement = document.querySelector('.setting-popup');

    // Close option list if clicked outside of it
    if (optionsListElement && !optionsListElement.contains(event.target as Node) && this.showOptions !== null) {
      this.showOptions = null;
    }

  }


  deleteStudent(uid: number, stuId: number) { 
    if (confirm('Are you sure you want to delete this student?')) {
      this._registrationService.permanentDelete(uid, stuId).subscribe(
        (response) => { 
          this.fetchAlumniData();  
          this._messageService.addMessage('delete', 'The student has been permanently deleted.');
        },
        (error) => { 
          console.log('Delete error: ', error);
          this._messageService.addMessage('error', 'Failed to delete student. Please try again.');
        }
      );
    }
  }

  passSingleStu(data: any) {
    this.alumni = data; 
    this.viewSingleStudent = true;
  }

  closePopup(event:any) {
    this.viewSingleStudent = false; 
  }
  

  generateTC(uid: number, stuId: number) { 
    // Your logic to generate TC
    // Here you pass both `uid` and `stuId` as route parameters
    this.router.navigate(['/alumni/tc-certificate', uid, stuId]);
  }


  restoreStu(uid: number, stuId: number) {
    this._registrationService.restoreStudent(uid, stuId).subscribe(
      (response) => { 
        this.fetchAlumniData();  
        this._messageService.addMessage('restore', 'Student Restore Successfully.');
      },
      (error) => {
        alert('Failed to restore student.');
        console.log('Restore error: ', error);
      }
    );
  }

  updateDues(uid: number, stuId: number) {
    // Implement dues update logic here
    alert('Updating dues for student ID: ' + stuId);
  }
   

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
     
  }


}

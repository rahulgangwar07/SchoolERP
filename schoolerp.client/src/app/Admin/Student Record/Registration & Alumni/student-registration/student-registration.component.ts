import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { ClassService } from '../../../../Services/class.service';
import { RegistrationService } from '../../../../Services/registration.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { Permissions } from '../../../../models/permissions';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
    selector: 'app-student-registration',
    templateUrl: './student-registration.component.html',
    styleUrl: './student-registration.component.css',
    standalone: false
})
export class StudentRegistrationComponent implements OnInit {

  registrationList: any;
  filteredRegistrationList: any;
  classList: any;
  selectedStatus: string = "Pending";
  showOptions: number | null = null;


  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  permissions: Permissions | undefined;

  constructor(private _registrationService: RegistrationService, private _classService: ClassService, private _authService: AuthServiceService
    , private router: Router, private _permissionService: PermissionsService, private _messageService: SuccessMessagePopupService) {

  }

  ngOnInit() {
    this.bindPermission(); 
    this.bindClassList();

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

  bindRegistrationList() { 
    this._registrationService.getStudent(this.selectedStatus).subscribe(
      (response) => { 
        this.registrationList = response; 

        this.registrationList.forEach((student: { registration: { class_id: string; class_name: any; }; }) => {
          const classInfo = this.classList.find((c: { class_id: any; }) => c.class_id === student.registration.class_id);
          if (classInfo) {
            student.registration.class_name = classInfo.class_name;
          } else {
            student.registration.class_id = "Unknown";
          }
        });
        this.filteredRegistrationList = this.registrationList;
      },
      (error) => {
        console.log('Something went wrong while fetching student details', error); 
      }
    );
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        this.bindRegistrationList();

      },
      (error) => {
        console.error('Error in fetching Class List:', error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  toggleOptions(index: number): void {
    if (this.showOptions === index) { 
      this.showOptions = null;
    } else { 
      this.showOptions = index;
    }  
  }

  deleteStudent(uid:number) {
    this._registrationService.deleteStudent(uid).subscribe(
      (response) => { 
        this.bindRegistrationList(); 
        this._messageService.addMessage('delete', 'The student has been deleted.');
      },
      (error) => {
        console.log("Error on deleting ", error);
        this._messageService.addMessage('error', 'Failed to delete student. Please try again.');
      }
    );
  }

  printSlip(reg: any): void {
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow?.document.write('<html><head><title>Print Slip</title></head><body>');

    // Access the specific printable area by using the student's UID
    const contentToPrint = document.getElementById('printableArea' + reg.student.uid)?.innerHTML;

    if (contentToPrint) {
      printWindow?.document.write(contentToPrint);
    } else {
      printWindow?.document.write('No content to print');
    }

    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  addMessage(type: string, content: string) {
    const messageExists = this.messages.some(msg => msg.content === content);
    if (messageExists) {
      this.messages = this.messages.filter(msg => msg.content !== content);
    }

    this.messages.push({ type, content });
    this.showSuccessPopup = true;
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

}

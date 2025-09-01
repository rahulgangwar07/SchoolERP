import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { ClassService } from '../../../../Services/class.service';
import { RegistrationService } from '../../../../Services/registration.service';
import { StateCityService } from '../../../../Services/state-city.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { SessionService } from '../../../../Services/session.service';
import { PermissionsService } from '../../../../Services/permissions.service';
import { Router } from '@angular/router';
import { Permissions } from '../../../../models/permissions';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
    selector: 'app-view-student',
    templateUrl: './view-student.component.html',
    styleUrls: ['./view-student.component.css'],
    standalone: false
})
export class ViewStudentComponent implements OnInit {

  classList: any;
  secList: any;
  sessionList: any[] = [];
  studentList: any[] = [];
  singleStu: any;
  filteredStudentList: any[] = [];
  selectedClassid: number = 0;
  selectedSecid: number = 0;
  selectedAcademicYear: string = '';
  selectedAdmNo: string = '';
  selectedStatus: string = "Registered";
  showOptions: number | null = null;
  settingPopup: number | null = null;
  showPasswordPopup: boolean = false;
  uid: number = 0;
  student_name: string = "";
  user_id: string = "";
  password: string = "";
   
  permissions: Permissions | undefined; 

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  constructor(
    private _classService: ClassService,
    private _registrationService: RegistrationService, 
    private _cityState: StateCityService,private router:Router,
    private _imageService: ImageServiceService, private _sessionService: SessionService, private _permissionService: PermissionsService,
    private _messageService: SuccessMessagePopupService
  ) { }

  ngOnInit() {

    this.bindPermission(); 

    this.loadClassData();
    this.bindSession();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

  }

  loadClassData() {

    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        } 
        this.loadStudentData();
      },
      (error) => {
        console.error("Error in fetching Class", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindSession() {
    this._sessionService.getSession().subscribe(
      (response) => {
        this.sessionList = response;

        const activeSession = this.sessionList.find(session => session.status === true);

        if (activeSession) {
          const activeSessionName = activeSession.session_name;
          this.selectedAcademicYear = activeSessionName;
        } else {
          console.log("No active session found.");
        }
      },
      (error) => {
        console.error("Error in fetching Session", error);
      }
    );
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

  loadStudentData() { 
    this._registrationService.getStudent(this.selectedStatus).subscribe(
      (response) => {
        this.studentList = response; 
        this.studentList.forEach(student => {
          student.stuImage = this._imageService.getImageUrlStudent(student.student.stuImage);
          const classInfo = this.classList.find((c: { class_id: any; }) => c.class_id === student.registration.class_id);
          if (classInfo) {
            student.registration.class_name = classInfo.class_name;
          } else {
            student.registration.class_name = "Unknown";
          }
        }); 
        this.applyFilters();
      },
      (error) => {
        console.error("Error in fetching Students", error);  
      }
    );
  }

  deleteStudent(uid: number) {
    this._registrationService.deleteStudent(uid).subscribe(
      (response) => {
        this.loadStudentData(); 
        this._messageService.addMessage('delete', 'Student information has been deleted successfully.');
      },
      (error) => {
        console.error("Error on deleting student", error);
        this._messageService.addMessage('error', 'Failed to delete student information. Please try again.');
      }
    );
  }

  classChange() {
    this._classService.getSection(this.selectedClassid).subscribe(
      (response) => {
        this.secList = response;
        this.selectedSecid = 0;
      },
      (error) => {
        console.error("Error in fetching Sections", error);
      }
    );
  }

  enableDisable(uid: number) {
    this._registrationService.isActiveStatus(uid).subscribe(
      (success) => { 
        this.loadClassData();
      },
      (error) => {
        console.log("Error is: ", error);
      }
    );
  }

  onStatusChange() {
    this.loadStudentData();
    this.applyFilters();
  }

  applyFilters() { 
    this.filteredStudentList = this.studentList.filter(student => {
      const matchesStatus = student.registration.status === this.selectedStatus;
      const matchesAcademicYear = this.selectedAcademicYear ? student.registration.session == this.selectedAcademicYear : true;
      const matchesClass = this.selectedClassid == 0 || student.registration.class_id == this.selectedClassid;
      const matchesSecId = this.selectedSecid == 0 || student.studentMaster.sec_id == this.selectedSecid;
      const matchesAdmNo = this.selectedAdmNo ? student.student.reg_no.includes(this.selectedAdmNo) : true;
      return matchesStatus && matchesAcademicYear && matchesClass && matchesAdmNo && matchesSecId;
    });
  }

  toggleBtn(index: number) {
    // Toggle the options visibility for the clicked student row 
    this.showOptions = this.showOptions === index ? null : index;
  }

  onFilterChange() {
    this.classChange();
    this.applyFilters();
  }

  opensettingPopup(index: number, s: any) { 
    if (this.settingPopup === index) {
      this.settingPopup = null;
    } else {
      this.settingPopup = index;
    }
    this.singleStu = s; 
  }

  // Close options and setting popup if clicked outside
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) { 
    const optionsListElement = document.querySelector('.optionList');
    const settingPopupElement = document.querySelector('.setting-popup');

    // Close option list if clicked outside of it
    if (optionsListElement && !optionsListElement.contains(event.target as Node) && this.showOptions !== null) {
      this.showOptions = null;
      this.loadStudentData();
    }

    // Close setting popup if clicked outside of it
    if (settingPopupElement && !settingPopupElement.contains(event.target as Node) && this.settingPopup !== null) {
      this.settingPopup = null;  
    } 
  }

  removeSettingPopup(index: number) {
    if (this.settingPopup === index) {
      this.settingPopup = null;  
    } else {
      this.settingPopup = index;  
    }
  }

  changepswd(uid: number, name: string,psword:string,user_id:string) {
    this.showPasswordPopup = true;
    this.uid = uid;
    this.student_name = name;
    this.password = psword;
    this.user_id = user_id;
  }
  hidePopup() {
    this.showPasswordPopup = false;
  }

  submitPswd() { 
    this._registrationService.changepsw(this.uid, this.password, this.user_id).subscribe(
      (response) => { 
      },
      (error) => {
        console.log("Error found in change password!. ",error);
      }
    );
    this.showPasswordPopup = false;
  } 

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index); 
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../../Services/class.service';
import { RegistrationService } from '../../../../Services/registration.service';
import { SessionService } from '../../../../Services/session.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrls: ['./enquiry.component.css'],
    standalone: false
})
export class EnquiryComponent implements OnInit {

  form: FormGroup;
  sessionList: any[] = [];
  classList: any[] = [];
  studentId: number | undefined;

  themeSetting: any;


  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  constructor(
    private fb: FormBuilder,
    private _sessionService: SessionService,
    private _classService: ClassService,
    private _registrationService: RegistrationService,
    private _authService: AuthServiceService,
    private route: ActivatedRoute,  
    private router: Router, private _messageService: SuccessMessagePopupService, private _settingService: GlobalSettingsService
  ) { 
    this.form = this.fb.group({
      uid: ['0'],
      academic_year: ['', Validators.required],
      class_id: ['0', Validators.required],
      counsellor: [''],
      reference: [''],
      reg_no: [''],
      old_reg_no: [''],
      first_name: ['', Validators.required],
      last_name: [''],
      father_name: [''],
      mother_name: [''],
      gender: ['', Validators.required],
      enquiry_type: [''],
      branch: [''],
      description: [''],
      dob: [new Date()],
      state: [''],
      pin_code: [''],
      city: [''],
      address: [''],
      contact_no: ['908329084'],
      alt_contact: [''],
      email: [''],
      enquiry_date: [new Date()],
      school_id: '',
      student_Other_Info: ['']
    });
  }

  ngOnInit() { 
    this.bindClassList();

    // Fetch session and school info
    this.sessionAndschool();
    const uidParam = this.route.snapshot.paramMap.get('uid');
    if (uidParam) {
      this.studentId = parseInt(uidParam, 10);   
    }
     
    if (this.studentId) {
      this._registrationService.getStudentbyId(this.studentId,"Pending").subscribe(
        (studentData) => { 
          const formData = {
            ...studentData.student,   
            ...studentData.registration  
          }; 
          this.form.patchValue(formData); 
          Object.keys(this.form.controls).forEach(controlName => {
            const control = this.form.controls[controlName];
            console.log(`Control name: ${controlName}, Value: ${control.value}`);
          });
        }
      );
    }

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response; 
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.error("Error in fetching Class");
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  sessionAndschool() {
    // Set school ID for form
    this.form.patchValue({
      school_id: this._authService.getSchoolID()
    });
     
    this._sessionService.getSession().subscribe(
      (response) => {
        this.sessionList = response; 
        const activeSession = this.sessionList.find(session => session.status === true); 
        if (activeSession) {
          this.form.patchValue({
            academic_year: activeSession.session_name   
          }); 
        } 
      },
      (error) => {
        console.error("Error in fetching Session", error);
      }
    );


  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
       
      if (formData.uid == null) {
        formData.uid = 0;
      }

      if (!formData.student_Other_Info) {
        formData.student_Other_Info = '';
      }
       
      this._registrationService.postStudent(formData).subscribe(
        (response) => {
          
          this.form.reset();
          this.ngOnInit();
          this.router.navigateByUrl('/registration/enquiry'); 
          this._messageService.addMessage('success', 'Student Enquiry has been Submitted.');
        },
        (error) => {
          console.log("Data not Submitted! ", error);
          this._messageService.addMessage('error', 'Failed to add student enquiry. Please try again.');
        }
      );
    } else {
      console.log("Form is invalid. Please fill all required fields.");
      this._messageService.addMessage('error', 'Form is invalid. Please fill all required fields.');
    }
  }
   

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
     
  }

}

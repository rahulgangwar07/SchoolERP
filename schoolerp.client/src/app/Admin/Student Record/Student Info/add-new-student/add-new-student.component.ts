import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { RegistrationService } from '../../../../Services/registration.service'; 
import { StateCityService } from '../../../../Services/state-city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { SessionService } from '../../../../Services/session.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
    selector: 'app-add-new-student',
    templateUrl: './add-new-student.component.html',
    styleUrls: ['./add-new-student.component.css'],
    standalone: false
})
export class AddNewStudentComponent implements OnInit {

  currentStep = 1;
  classList: any;
  secList: any[] = [];
  sec_id: number = 0;
  states: any;
  uid: number = 0;
  status: string | null = "";
  regCheck: string = "";
  str_Avaiable_regno: string = "";
  sessionList: any[] = [];

  selectedFile: File | null = null;
  stuImagePreview: string | null | undefined;
  isValid: boolean = true;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  student = {
    first_name: '',
    reg_no:'',
    //userid: '',
    //password: '',
    email: '', 
    dob: '',
    aadhar_card: '',
    pen_card: '',
    class_id: '', 
    sec_id: '0', 
    rollNo: '',
    contact_no: '',
    enquiry_date:'',
    gender: '',
    address: '',
    academic_year: '',
    bloodGroup: '',
    stuImage: '' as string | File,
    school_id: ''
  };

  parentDetails = {
    first_name: this.student.first_name,
    mother_name: '',
    father_name: '',
    father_occupation: '',
    father_email: '',
    fatherQualification: '',
    father_aadhar: '',
    father_income: '',
    father_contact: '',
    village: '',
    post: '',
    pin_code: '',
    city: '',
    state_id: '0',
    permanentAddress: '',
    localAddress: '',
    sec_id: this.sec_id.toString(),
    school_id: this.student.school_id
  };

  general = {
    first_name: this.student.first_name,
    classAdmitted: '',
    mediumOfInstruction: '',
    religion: '',
    general: '',
    medicalHistory: '',
    caste: '',
    lastInstitutionName: '',
    lastInstitutionAddress: '',
    classLastAttended: '',
    resultOfLastClass: '',
    last_institution: '',
    tc_no: '',
    tc_date: '',
    transportRoute: '',
    transportApplicableFrom: '',
    hostel: '',
    roomNumber: '',
    bedNumber: '',
    sec_id: this.sec_id.toString(),
    school_id: this.student.school_id
  };

  account = {
    first_name: this.student.first_name,
    counsellor: '',
    bank_account: '',
    ifsc_code: '',
    sec_id: this.sec_id.toString(),
    school_id: this.student.school_id
  };


  themeSetting: any;

  constructor(private _classService: ClassService, private _registrationService: RegistrationService,
     private _cityState: StateCityService, private route: ActivatedRoute, private router: Router
    , private _imageService: ImageServiceService, private _sessionService: SessionService, private _settingService: GlobalSettingsService) { }



  ngOnInit() {

    this.bindClass();

    this.bindState();

    this.bindSession();


    this.route.paramMap.subscribe(params => {
      this.uid = Number(params.get('uid'));  
      this.status = params.get('status') ? params.get('status'): 'Pending';  

      // For debugging
      if (this.uid && this.uid !== 0) {
        this._registrationService.getStudentbyId(this.uid, this.status).subscribe(
          (studentData) => { 
            this.student = { ...this.student, ...studentData.student }; 
            this.parentDetails = { ...this.parentDetails, ...studentData.student };
            this.general = { ...this.general, ...studentData.student };
            this.account = { ...this.account, ...studentData.student };

            if (studentData.student.stuImage) {
              this.stuImagePreview = studentData.student.stuImage;
              this.stuImagePreview = this._imageService.getImageUrlStudent(studentData.student.stuImage);
                
            }
            this.bindSection((Number)(this.student.class_id));
            this.regCheck = studentData.student.reg_no;
            if (studentData.master.sec_id != 0) {
              this.sec_id = studentData.master.sec_id;
              this.student.sec_id = studentData.master.sec_id;
            }
          },
          (error) => {
            console.error("Error fetching student details:", error);
          }
        );
      } 
    });

    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindClass() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
      },
      (error) => {
        console.error("Error in fetching Class", error);
      }
    );
  }

 

  bindState() {
    this._cityState.getState().subscribe(
      (response) => {
        this.states = response;
      },
      (error) => {
        console.log("Error fetching states:", error);
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
          this.student.academic_year = activeSessionName;
        } else {
          console.log("No active session found.");
        }
        
      },
      (error) => {
        console.error("Error in fetching Session", error);
      }
    );
  }

  clsChange(cls_id: string) {
    this.student.sec_id = '0';
    this.bindSection((Number)(cls_id));
  }

  bindSection(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (success) => {
        this.secList = success; 
        if (!this.student.sec_id || this.student.sec_id === '0') {
          this.student.sec_id = this.secList.length > 0 ? this.secList[0].id : null;
        }
      },
      (error) => {
        console.log("Error on Section Binding: ", error);
      }
    );
  }


  onSelectFile(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) { 
      this.student.stuImage = this.selectedFile;
    }

    if (event.target.files && event.target.files[0]) {
      this.stuImagePreview = URL.createObjectURL(event.target.files[0]);
    }
  }

  goToNextStep(step: number) { 
    const formData: FormData = new FormData();
    if (step == 0) {
      if (this.currentStep < 5) {
        if (this.currentStep === 1) {
          Object.keys(this.student).forEach(key => {
            if (key !== 'stuImage') {
              formData.append(key, this.student[key as keyof typeof this.student]);
            }
          });

          if (this.selectedFile) {
            formData.append('stuImage', this.selectedFile, this.selectedFile.name);
          }

          this._registrationService.postFULLStudent(this.uid, this.currentStep, formData).subscribe(
            (response) => {
              this.currentStep++;
              this.uid = response; 
              this.addMessage('success', 'Student data has been Submitted Successfully.');
            },
            (error) => {
              console.log("Data not Submitted!", formData);
              console.log("Data not Submitted!", error);
              this.addMessage('error', 'Failed to student submittion. Please try again.');
            }
          );
        }

        if (this.uid != 0) {
          if (this.currentStep == 2) {
            this.parentDetails.sec_id = this.sec_id.toString();
            if (this.uid == null) {
              this.uid = (Number)(this.route.snapshot.paramMap.get('uid'));
            }
            Object.keys(this.parentDetails).forEach(key => {
              if (key == 'first_name') {
                formData.append('first_name', this.student.first_name);
              } else if (key == 'school_id') {
                formData.append('school_id', this.student.school_id);
              } else {
                formData.append(key, this.parentDetails[key as keyof typeof this.parentDetails]);
              }
            });
            //formData.sec_id=this.student.sec_id;
            this._registrationService.postFULLStudent(this.uid, this.currentStep, formData).subscribe(
              (response) => {
                this.currentStep++; 
                this.addMessage('success', 'Data has been Saved...');
              },
              (error) => {
                console.log("Data not Submitted! ", error);
                this.addMessage('error', 'Failed to load data. Please try again.');
              }
            );
          }
          if (this.currentStep == 3) {
            this.general.sec_id = this.sec_id.toString();
            if (this.uid == null) {
              this.uid = (Number)(this.route.snapshot.paramMap.get('uid'));
            }
            Object.keys(this.general).forEach(key => {
              if (key == 'first_name') {
                formData.append('first_name', this.student.first_name);
              }
              else if (key == 'school_id') {
                formData.append('school_id', this.student.school_id);
              }
              else {
                formData.append(key, this.general[key as keyof typeof this.general]);
              }
            });
            this._registrationService.postFULLStudent(this.uid, this.currentStep, formData).subscribe(
              (response) => {
                this.currentStep++; 
                this.addMessage('success', 'Data has been Saved...');
              },
              (error) => {
                console.log("Data not Submitted! ", error);
              }
            );
          }
          if (this.currentStep == 4) {
            this.account.sec_id = this.sec_id.toString();
            if (this.uid == null) {
              this.uid = (Number)(this.route.snapshot.paramMap.get('uid'));
            }
            Object.keys(this.account).forEach(key => {
              if (key == 'first_name') {
                formData.append('first_name', this .student.first_name);
              }
              else if (key == 'school_id') {
                formData.append('school_id', this.student.school_id);
              }
              else {
                formData.append(key, this.account[key as keyof typeof this.account]);
              }
            });
            this._registrationService.postFULLStudent(this.uid, this.currentStep, formData).subscribe(
              (response) => {  
                this.currentStep = 1;
                this.router.navigate(['/student/add']);
                this.clear(); 
              },
              (error) => {
                console.log("Data not Submitted! ", error);
              }
            );
          }

        }
      }
    }
  }

  avaiableRegno(event: any) {
    const value = event.target.value; 
    this.checkRegistrationNo(value); 
  }

  avaiableRegnoclick(event: any) {
    const value = event.target.value;
    this.checkRegistrationNo(value);
    if (value == "") { 
    }
     
  }

  checkRegistrationNo(val: string) { 
    if (val == undefined || val == null || val == "") {
      val = "0";
    } 

    this._registrationService.registrationno(val).subscribe(
      (response) => { 
        this.str_Avaiable_regno = response.avaiableRegno;
        if (response.status === true) { 
          //this.student.reg_no = response.avaiableRegno;  

        } else { 
          this.student.reg_no = "";
        }
      },
      (error) => {
        console.log("Error checking registration number", error);
      }
    );
  }

  isRegNoAvailable() {
    if (this.regCheck == null || this.regCheck == "") {
      return false;
    }
    return this.regCheck && this.regCheck.trim() !== '';
  }


  onSubmit() {
    console.log('Form submitted:', {
      student: this.student,
      parentDetails: this.parentDetails,
      general: this.general,
      account: this.account
    });
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
  clear() {
    this.student = {
      first_name: '',
      reg_no:'', 
      email: '', 
      dob: '',
      aadhar_card: '',
      pen_card: '',
      class_id: '',
      sec_id: '',
      rollNo: '',
      contact_no: '',
      gender: '',
      address: '',
      enquiry_date:'',
      academic_year: '',
      bloodGroup: '',
      stuImage: '',
      school_id: ''
    };

    this.parentDetails = {
      first_name: this.student.first_name,
      mother_name: '',
      father_name: '',
      father_occupation: '',
      father_email: '',
      fatherQualification: '',
      father_aadhar: '',
      father_income: '',
      father_contact: '',
      village: '',
      post: '',
      pin_code: '',
      city: '',
      state_id: '0',
      permanentAddress: '',
      localAddress: '',
      sec_id : '0',
      school_id: this.student.school_id
    };

    this.general = {
      first_name: this.student.first_name,
      classAdmitted: '', 
      mediumOfInstruction: '',
      religion: '',
      general: '',
      medicalHistory: '',
      caste: '',
      lastInstitutionName: '',
      lastInstitutionAddress: '',
      classLastAttended: '',
      resultOfLastClass: '',
      last_institution: '',
      tc_no: '',
      tc_date: '',
      transportRoute: '',
      transportApplicableFrom: '',
      hostel: '',
      roomNumber: '',
      bedNumber: '',
      sec_id: '0',
      school_id: this.student.school_id
    };

    this.account = {
      first_name: this.student.first_name,
      counsellor: '',
      bank_account: '',
      ifsc_code: '',
      sec_id: '0',
      school_id: this.student.school_id
    };
  }


}











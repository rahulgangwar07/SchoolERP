import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { RoutineService } from '../../../../Services/routine.service';
import { SubjectsService } from '../../../../Services/subjects.service';
import { FacultyService } from '../../../../Services/faculty.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css']
})
export class AddRoutineComponent implements OnInit {

  priodList : any[] = [];  // Add periods dynamically as required
  priodDiv: boolean = false;
  priodView: boolean = false;
  @ViewChild('formdata', { static: false }) formdata: NgForm | undefined; 

  classList: any[] = [];
  sectionList: any[] = [];
  subjectList: any[] = [];
  facultyList: any[] = [];
  subject_id: number | any;

  permissions: any;

  form: any = {
    schedule_id:0,
    class_id: null,
    sec_id: null,
    subject_id: null,
    routine: 'Offline',
    teacher: null,
    day: null,
    priod: null,
    metting_link: ''
  }

  themeSetting: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(private _classService: ClassService, private _routineService: RoutineService, private _subjectService: SubjectsService,
    private _facultyService: FacultyService, private route: ActivatedRoute, private router: Router, private _permissionService: PermissionsService
    , private _messageService: SuccessMessagePopupService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindPermission();

    this.bindClassList();
    this.bindPeriod();
    this.bindFaculty(); 

    const sch_id = this.route.snapshot.paramMap.get("schedule_id");
    if (sch_id) {
      this._routineService.getSchedulebyId(sch_id).subscribe(
        (data) => {
          this.form.class_id = data.class_id; 
          // Fetch subjects after class is set

          // Assign other data after subjects are fetched
          this.form.schedule_id = data.id;
          this.subject_id = data.subject_id;
          this.form.sec_id = data.sec_id;
          this.form.routine = data.routine;
          this.form.teacher = data.faculty_id;
          this.form.day = data.day_name;
          this.form.priod = data.period_id;
          this.form.subject_id = data.subject_id;
          this.form.metting_link = data.metting_link;
          this.bindSujectList(this.form.class_id);
          this.bindSectionList(this.form.class_id);   
           
        },
        (error) => {
          console.log("Error found in Schedule Fetching! ", error);
        }
      );
    }

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0;
    });

    this.themeSetting = this._settingService.getCurrentTheme();

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
      (classes) => {
        this.classList = classes;
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        } 
      },
      (error) => {
        console.log("Error in classList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }
   
  bindSujectList(cls_id: number) {
    this._subjectService.getSubjectsbyClass(cls_id).subscribe(
      (subjects) => {
        this.subjectList = subjects;
        if (this.subjectList.length == 0) {
          this._messageService.addMessage("warning", "No active subject found for this class.");
        } 
        // Assign the subject_id after the subjects have been loaded
        if (this.subject_id) {
          this.form.subject_id = this.subject_id;
        } 
      },
      (error) => {
        console.log("Error in subjectList: ", error);
        this._messageService.addMessage("error", "Error in subject fetching.");
      }
    );
  }

  bindSectionList(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (sections) => {
        this.sectionList = sections;
        if (this.sectionList.length == 0) {
          this._messageService.addMessage("warning", "Active section not avaiable for this class.");
        } 
      },
      (error) => {
        console.log("Error in sectionList: ", error);
        this._messageService.addMessage("error", "Error in Subject fetching");
      }
    );
  }


  bindFaculty() {
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.facultyList = teachers;
        if (this.facultyList.length == 0) {
          this._messageService.addMessage("warning", "No active Teacher found. Please add some Teacher.");
        } 
      },
      (error) => {
        console.log("Error in subjectList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the Teacher list.");
      }
    );
  }

  classChange() {
    this.bindSujectList(this.form.class_id);
    this.bindSectionList(this.form.class_id);
  }

  bindPeriod() {
    this._routineService.getPeriod().subscribe(
      (priod) => {
        this.priodList = priod;
        if (this.priodList.length == 0) {
          this._messageService.addMessage("warning", "Any Schedule not available.");
        }
      },
      (error) => {
        console.log("Error in priodList: ", error);
      }
    );
  }

  addPriod() {
    this.priodDiv = !this.priodDiv;
  }

  viewPriod() {
    this.priodView = !this.priodView;
  }


  formSubmit() {  
    this._routineService.postSchedule(this.form).subscribe(
      (submitted) => {
        if (this.subject_id != null && this.subject_id > 0) {
          if (this.form.routine == "Offline")
            this.router.navigate(['/routine/Offline']);
          else {
            this.router.navigate(['/routine/Online']);
          }
        } else {
          this._messageService.addMessage('success', 'The routine has been successfully set!');
        }

        this.resetForm();
      },
      (error) => {
        console.log("There was an issue submitting the data: ", error); 
        this._messageService.addMessage('success', 'There was an issue submitting the data: ');
      }
    );
     
  }

  periodFrompopup(event: any) {
    this.priodList.push(event); 
  }

  closepriopdiv(event: any) {
    this.priodDiv = event;
  }

  vpriod(event: any) {
    this.priodView = event;
  }

  resetForm() {
    this.form = {
      class_id: null,
      sec_id: 0,
      subject_id: null,
      routine: 'Offline',
      teacher: null,
      day: null,
      priod: null,
      metting_link: ''
    };

    if (this.formdata) {
      this.formdata.resetForm();  
    }
  }
   

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


}

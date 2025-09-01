import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnlineExamService } from '../../../Services/online-exam.service';
import { ClassService } from '../../../Services/class.service';
import { FacultyService } from '../../../Services/faculty.service';
import { SubjectsService } from '../../../Services/subjects.service';
import { SessionService } from '../../../Services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-add-test-online-exam',
  templateUrl: './add-test-online-exam.component.html',
  styleUrls: ['./add-test-online-exam.component.css']
})
export class AddTestOnlineExamComponent implements OnInit {

  examform!: FormGroup;
  examId: string = "0";

  classList: any[] = [];
  secList: any;
  teacherList: any[] = [];
  subjectList: any[] = [];
  sessionList: any[] = [];
  academicYear = "";

  buttonText: string = "Add Test";
  themeSetting: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private fb: FormBuilder, private _onlineExamService: OnlineExamService, private _classService: ClassService,
    private _facultyService: FacultyService, private _subjectService: SubjectsService,
    private _sessionService: SessionService, private route: ActivatedRoute, private router: Router,
    private _messageService: SuccessMessagePopupService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
     
    this.academicYear = this._sessionService.getActiveSession(); 
    this.examId = this.route.snapshot.paramMap.get('exam_id') ?? "0";
     
    this.examform = this.fb.group({
      exam_id: [this.examId],
      type: ['private', Validators.required],
      exam_name: ['', Validators.required],
      class_id: [''],
      sec_id: [''],
      session: [this.academicYear],
      subject_id: [''],
      exam_title: ['', Validators.required],
      faculty_id: [''],
      exam_start_date: ['', Validators.required],
      exam_end_date: ['', Validators.required],
      duration_type: ['fullDay', Validators.required],
      start_time: [''],
      end_time: [''],
      duration: ['', [Validators.required, Validators.min(1)]],
      instruction_to_condidate: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Listening for changes in duration_type and conditionally applying validators
    this.examform.get('duration_type')?.valueChanges.subscribe(
      value => {
        if (value === 'selectedTime') { 
          this.examform.get('start_time')?.setValidators([Validators.required]);
          this.examform.get('end_time')?.setValidators([Validators.required]);
        } else { 
          this.examform.get('start_time')?.clearValidators();
          this.examform.get('end_time')?.clearValidators();
        } 
        this.examform.get('start_time')?.updateValueAndValidity();
        this.examform.get('end_time')?.updateValueAndValidity(); 
      });

    this.bindClassList();
    this.bindTeacherList();
    this.bindSubject();
    this.bindSessionList();

    if (this.examId != "0") {
      this.buttonText = "Update Test";
      this.loadExamDetails();
    }
     
    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  loadExamDetails() {
    this._onlineExamService.getSingleOnlineExams(this.examId).subscribe(
      (examDetails) => {
        const formattedStartDate = this.formatDateForInput(examDetails.exam_start_date);
        const formattedEndDate = this.formatDateForInput(examDetails.exam_end_date);
        this.examform.patchValue({
          exam_id: examDetails.exam_id,
          exam_name: examDetails.exam_name,
          class_id: examDetails.class_id,
          sec_id: examDetails.sec_id,
          session: examDetails.session,
          subject_id: examDetails.subject_id,
          exam_title: examDetails.exam_title,
          faculty_id: examDetails.faculty_id,
          exam_start_date: formattedStartDate,
          exam_end_date: formattedEndDate,
          duration_type: examDetails.duration_type,
          start_time: examDetails.start_time,
          end_time: examDetails.end_time,
          duration: examDetails.duration,
          instruction_to_condidate: examDetails.instruction_to_condidate,
          description: examDetails.description,
        });
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  
    const day = date.getDate().toString().padStart(2, '0');  
    return `${year}-${month}-${day}`;  
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (clsList) => {
        this.classList = clsList;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error occuring in ClassList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindTeacherList() {
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.teacherList = teachers;
        if (this.teacherList.length === 0) {
          this._messageService.addMessage("warning", "No active teacher found. Please add some teachers.");
        }
      },
      (error) => {
        console.log("Error in fetching Teacher List: ", error);
        this._messageService.addMessage("errror", "Error in fetching Teacher List");
      }
    );
  }

  bindSessionList() {
    this._sessionService.getSession().subscribe(
      (success) => {
        this.sessionList = success; 
      },
      (error) => {
        console.log("Error in session Fetching! ",error);
      }
    );
  }

  changeClass() {
    const clsId = this.examform.get('class_id')?.value ?? 0;
    this.bindSection((Number)(clsId));
    this.bindSubjectClasswise((Number)(clsId));
  }

  bindSection(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (response) => {
        this.secList = response; 
      },
      (error) => {
        console.log("Section List not fetching: ", error);
      }
    );
  }

  bindSubject() {
    this._subjectService.getSubjects().subscribe(
      (success) => {
        this.subjectList = success; 
        if (this.subjectList.length === 0) {
          this._messageService.addMessage("warning", "No subjects found for the selected class. Please add subjects.");
        }
      },
      (error) => {
        console.log("Error found on subject binding! ", error);
        this._messageService.addMessage("error", "Error found on subject binding!");
      }
    );
  }

  bindSubjectClasswise(cls_id: number) {
    this._subjectService.getSubjectsbyClass(cls_id).subscribe(
      (success) => {
        this.subjectList = success; 
        if (this.subjectList.length === 0) {
          this._messageService.addMessage("warning", "No subjects found for the selected class. Please add subjects.");
        }
      },
      (error) => {
        console.log("Error found on subject binding! ", error);
        this._messageService.addMessage("error", "An error occurred while fetching subjects for the class.");
      }
    );
  }

  onSubmit() {
    if (this.examform.valid) {
      this._onlineExamService.postOnlineExam(this.examform.value).subscribe(
        (success) => {
          if (this.buttonText == "Update Test") {
            this.router.navigate(["/online-exam/view-test"]);
          } 
          this.examform.reset(); 
        },
        (error) => {
          console.log("Error in Form Submit! ",error);
        }
      );

      
      // Handle form submission logic here
    } else {
      console.log("Form is invalid.");
    }
  }


  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}

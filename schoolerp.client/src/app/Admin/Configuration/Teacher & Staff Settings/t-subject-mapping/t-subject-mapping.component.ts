import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { SubjectsService } from '../../../../Services/subjects.service';
import { ClassService } from '../../../../Services/class.service'; 
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-t-subject-mapping',
  templateUrl: './t-subject-mapping.component.html',
  styleUrls: ['./t-subject-mapping.component.css']
})
export class TSubjectMappingComponent implements OnInit {

  teacherList: any[] = [];
  subjectList: any[] = [];
  classList: any[] = [];
  selectedTeacher: any = "0";
  selectedSubjectList: number[] = [];
  selectedClassList: number[] = [];

  classSubmitted: boolean = false;
  subjectSubmitted: boolean = false;

  themeSetting: any;

  showSuccessPopup = false;
  messages: { type: string, content: string } [] = [];   
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(private _facultyService: FacultyService, private _subjectService: SubjectsService, private _classService: ClassService
    , private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindFacultyList();
    this.bindSubjectList();
    this.bindClassList();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindFacultyList() {
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.teacherList = teachers;
        if (this.teacherList.length == 0) {
          this.addMessage("warning", "Please create the faculty first before proceeding.");
        }
      },
      (error) => {
        console.log("Error in fetching Teachers: ", error);
        this.addMessage("error", "Error on teacher loading. Please Contact Administrator");
      }
    );
  }

  bindSubjectList() {
    this._subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjectList = subjects;
        this.subjectList.forEach(s => s.checked = false);
        if (this.subjectList.length == 0) {
          this.addMessage("warning", "Please create the subject first before proceeding.");
        }
      },
      (error) => {
        console.log("Error in fetching Subjects: ", error);
        this.addMessage("error", "Error on subject loading. Please Contact Administrator");
      }
    );
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (classes) => {
        this.classList = classes;
        this.classList.forEach(cl => cl.checked = false);
        if (this.classList.length == 0) {
          this.addMessage("warning", "Please create the class first before proceeding.");
        }
      },
      (error) => {
        console.log("Error in fetching Class: ", error);
        this.addMessage("error", "Error on class loading. Please Contact Administrator");
      }
    );
  }

  onSubjectChange(subjectId: number, event: any) {
    if (event.target.checked) {
      this.selectedSubjectList.push(subjectId);
    } else {
      const index = this.selectedSubjectList.indexOf(subjectId);
      this.selectedSubjectList.splice(index, 1);
    }
  }

  onClassChange(classId: number, event: any) {
    if (event.target.checked) {
      this.selectedClassList.push(classId);
    } else {
      const index = this.selectedClassList.indexOf(classId);
      this.selectedClassList.splice(index, 1);
    }
  }

  subjectSubmit() {
    if (this.selectedTeacher == "0") {
      this.addMessage("warning", "Please select a teacher.");
      return;
    }
    if (this.selectedSubjectList.length == 0) {
      this.addMessage("warning", "Please select at least one subject.");
      return;
    }

    const mappingData = {
      teacherId: this.selectedTeacher,
      subjectIds: this.selectedSubjectList
    };
    this._facultyService.mapSubjects(mappingData).subscribe(
      (response) => {
        this.subjectSubmitted = true;
        this.addMessage("success", "Subjects have been successfully submitted.");
      },
      (error) => {
        this.addMessage("error", "Error in submitting subjects.");
      }
    );
  }

  classSubmit() {
    if (this.selectedTeacher == "0") {
      this.addMessage("warning", "Please select a teacher.");
      return;
    }
    if (this.selectedClassList.length == 0) {
      this.addMessage("warning", "Please select at least one class.");
      return;
    }

    const mappingData = {
      teacherId: this.selectedTeacher,
      classIds: this.selectedClassList
    };
    this._facultyService.mapClasses(mappingData).subscribe(
      (response) => {
        this.classSubmitted = true;
        this.addMessage("success", "Classes have been successfully submitted.");
      },
      (error) => {
        this.addMessage("error", "Error in submitting classes.");
      }
    );
  }

  facultyChange() {
    this._facultyService.getmapSubjects(this.selectedTeacher).subscribe(
      (sList) => {
        this.selectedSubjectList = sList;
        this.subjectList.forEach(subject => {
          subject.checked = this.selectedSubjectList.includes(subject.subject_id);
        });
      },
      (error) => {
        console.log("Error found on faculty Subject Loading! ");
      }
    );

    this._facultyService.getmapClasses(this.selectedTeacher).subscribe(
      (cList) => {
        this.selectedClassList = cList;
        this.classList.forEach(cls => {
          cls.checked = this.selectedClassList.includes(cls.class_id);
        });
      },
      (error) => {
        console.log("Error found on faculty Class Loading! ");
      }
    );
  }

  addMessage(type: string, content: string) { 
    const messageExists = this.messages.some(msg => msg.content === content);
    if (!messageExists) {
      this.messages.push({ type, content });
      this.showSuccessPopup = true;
    } 
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

}

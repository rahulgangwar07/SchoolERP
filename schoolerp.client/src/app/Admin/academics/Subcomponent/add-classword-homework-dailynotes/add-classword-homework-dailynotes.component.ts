import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../../Services/class.service';
import { SubjectsService } from '../../../../Services/subjects.service';
import { AcademicsService } from '../../../../Services/academics.service'; 
import { ActivatedRoute } from '@angular/router';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

interface Subject {
  subject_id: number;
  subject_name: string;
  description: string;
}

@Component({
  selector: 'app-add-classword-homework-dailynotes',
  templateUrl: './add-classword-homework-dailynotes.component.html',
  styleUrls: ['./add-classword-homework-dailynotes.component.css']
})
export class AddClasswordHomeworkDailynotesComponent implements OnInit {

  workType:string = "HomeWork"
  workTypeRoute:string = "homework"

  homeworkForm: FormGroup;
  classList: any[] = [];
  sectionList: any[] = [];
  subjects: Subject[] = [];
  subjectList: any[] = [];
  videoLink: string = '';
  fileform: FormArray;
  subjectsArray: FormArray;

  themeSetting: any;

  constructor(
    private _classService: ClassService,
    private _subjectService: SubjectsService,
    private _academicsService: AcademicsService,
    private route: ActivatedRoute, private _settingService: GlobalSettingsService
  ) {
    this.fileform = new FormArray<FormGroup>([]);

    this.homeworkForm = new FormGroup({
      date: new FormControl('', Validators.required),
      type: new FormControl(this.workTypeRoute, Validators.required),
      class_id: new FormControl(0, Validators.required),
      sec_id: new FormControl(0, Validators.required),
      videoLink: new FormControl(''),
      files: this.fileform,
      subjects: new FormArray([])  
    });
    this.subjectsArray = this.homeworkForm.get('subjects') as FormArray;
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const worktypeParam = params.get('worktype');

      if (worktypeParam) {
        if (worktypeParam === "classwork") {
          this.workType = "ClassWork";
        } else if (worktypeParam === "dailynotes") {
          this.workType = "DailyNotes";
        } else {
          this.workType = "HomeWork";
        }

        this.workTypeRoute = worktypeParam;

        this.homeworkForm.patchValue({
          type: this.workTypeRoute
        });
      }
    });

    this.bindClassList();
    this.addFileField();
  }

  // Function to create a new FormGroup for each file input
  createFileGroup(): FormGroup {
    return new FormGroup({
      file: new FormControl(null, Validators.required)
    });
  }

  addFileField() {
    this.fileform.push(this.createFileGroup());
  }

  removeFileField(index: number) {
    if (this.fileform.length > 1) {
      this.fileform.removeAt(index);
    }
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    const fileControl = this.fileform.at(index).get('file');
    fileControl?.setValue(file);
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
      },
      (error) => {
        console.error('Error fetching class list: ', error);
      }
    );
  }

  bindClassSection() {
    const classId = this.homeworkForm.get('class_id')?.value;
    this._classService.getSection(classId).subscribe(
      (response) => {
        this.sectionList = response;
      },
      (error) => {
        console.error('Error fetching section list: ', error);
      }
    );
  }

  bindSubjectList() {
    const classId = this.homeworkForm.get('class_id')?.value;
    this._subjectService.getSubjectsbyClass(classId).subscribe(
      (response) => {
        this.subjects = [];
        this.subjectList = response;
        const subject = {
          subject_id: 0,
          subject_name: "Notes",
          description: ''
        };
        this.subjects.push(subject); // Add the "Notes" subject to the array

        // Map the subjects from subjectList and add them to subjects array
        this.subjects = this.subjects.concat(
          this.subjectList.map(subject => ({
            subject_id: subject.subject_id,
            subject_name: subject.subject_name,
            description: ''
          }))
        );
    
         
        this.subjectsArray.clear();  
        this.subjects.forEach(sub => {
          this.subjectsArray.push(
            new FormGroup({
              subject_id: new FormControl(sub.subject_id),
              subject_name: new FormControl(sub.subject_name),
              description: new FormControl(sub.description)
            })
          );
        });
      },
      (error) => {
        console.error('Error fetching subject list: ', error);
      }
    );
  }



  classChange() {
    this.bindClassSection();
    this.bindSubjectList();
  }

  isFormValid(): boolean {
    return this.homeworkForm.valid;
  }

  submitWork() {
    if (this.isFormValid()) {
      const formData = new FormData();
       
      formData.append('class_id', this.homeworkForm.get('class_id')?.value);
      formData.append('sec_id', this.homeworkForm.get('sec_id')?.value);
      formData.append('date', this.homeworkForm.get('date')?.value);
      formData.append('type', this.homeworkForm.get('type')?.value);
      formData.append('videoLink', this.homeworkForm.get('videoLink')?.value);
       
      const subjectsArray = this.homeworkForm.get('subjects') as FormArray;

      // Loop through each subject and append its details to FormData
      subjectsArray.controls.forEach((control: any, index: number) => {
        const subject = control.value;

        formData.append(`subjects[${index}].subject_id`, subject.subject_id);
        formData.append(`subjects[${index}].subject_name`, subject.subject_name);
        formData.append(`subjects[${index}].description`, subject.description);
      });
       
      const filesArray = this.homeworkForm.get('files') as FormArray;
      filesArray.controls.forEach((control: any) => {
        const file = control.get('file').value;
        if (file) {
          formData.append('file', file, file.name); 
        }
      });
       
      this._academicsService.uploadAssignment(formData).subscribe(
        (response) => {
          console.log('Homework submitted successfully: ', response);
          this.homeworkForm.reset({
            class_id: 0,  
            sec_id: 0,    
            date: '',     
            type: this.workTypeRoute,   
            videoLink: '',
            subjects: []   
          });
          this.fileform.clear();
          this.addFileField();
        },
        (error) => {
          console.error('Error submitting homework: ', error);
        }
      );
    } else {
      console.log('Please fill in all required fields.');
    }
  }


}

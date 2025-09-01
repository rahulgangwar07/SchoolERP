import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SyllabusService } from '../../../../Services/syllabus.service';
import { ClassService } from '../../../../Services/class.service';
import { SubjectsService } from '../../../../Services/subjects.service';
 
@Component({
  selector: 'app-add-syllabus',
  templateUrl: './add-syllabus.component.html',
  styleUrls: ['./add-syllabus.component.css']   
})
export class AddSyllabusComponent implements OnInit {
  syllabus = { 
    chapter_id: '0',
    class_id: '0',
    topic_name: '',
    document: null
  };

  chapters: any;
  documentTypes: string[] = ['PDF', 'Word', 'Excel'];
  classes: any[] = [];
  class_id: number = 0; 
  subjects: any[] = [];
  subject_id: number = 0;

  constructor(
    private router: Router,
    private _syllabusService: SyllabusService, private _classService: ClassService,
    private _subjectService: SubjectsService
    ) { }

  ngOnInit(): void {
    this.bindClassList();  
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (cls) => {
        this.classes = cls; 
      },
      (error) => {
        console.error('Error in getting classes', error);
      }
    );
  }

  bindSubjectList() {
    this._subjectService.getSubjectsbyClass(this.class_id).subscribe(
      (subj) => {
        this.subjects = subj; 
      },
      (error) => {
        console.error('Error in getting subjects', error);
      }
    );
  }
   
  getChapterList(cls_id: number, subj_id: number) {
    // Assuming you have a service to get the chapter list
    this._syllabusService.getChaptersbyClass(cls_id, subj_id).subscribe(
      (chapters) => {
        this.chapters = chapters;
        console.log('Chapters:', this.chapters);
      },
      (error) => {
        console.error('Error fetching chapters', error);
      }
    );
  }

  changeClass() {
    this.bindSubjectList();
    this.getChapterList(this.class_id, this.subject_id);
  }

  changeSubject() {
    this.getChapterList(this.class_id, this.subject_id);
  }

 
   
  // Handle the file input change
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      this.syllabus.document = file; // Store the file in the syllabus object
    }
  }

  // Submit the form to add the syllabus
  onSubmit() {
    const formData = new FormData();
    formData.append('chapter_id', this.syllabus.chapter_id);
    formData.append('class_id', this.class_id.toString());
    formData.append('topic_name', this.syllabus.topic_name);  
    if (this.syllabus.document) {
      formData.append('document', this.syllabus.document);
    } else {
      console.error('No file selected');
      return; // Exit if no file is selected
    }

    // Call the service to add syllabus
    this._syllabusService.addSyllabus(formData).subscribe(
      (response) => {
        this.clear();
        console.log('Syllabus added successfully', response);
        // Uncomment and modify the next line to navigate after success
        // this.router.navigate(['/syllabus']);
      },
      (error) => {
        console.error('Error adding syllabus', error);
      }
    );
  }


  clear() {
    this.subject_id = 0;
    this.syllabus.chapter_id = "0";
    this.syllabus.class_id = "0";
    this.syllabus.topic_name = "";
    this.syllabus.document = null
  }

}

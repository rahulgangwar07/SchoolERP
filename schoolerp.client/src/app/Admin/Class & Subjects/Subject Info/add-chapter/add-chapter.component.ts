import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from '../../../../Services/subjects.service';
import { ClassService } from '../../../../Services/class.service';
import { SyllabusService } from '../../../../Services/syllabus.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css'] // Fix styleUrl to styleUrls
})
export class AddChapterComponent implements OnInit, AfterViewInit {
  chapter = {
    class_id: 0,
    subject_id: 0,
    chapter_name: ''
  };

  classes: any[] = [];
  subjects: any[] = [];
  chapterList: any;
  filteredChapters: any[] = [];  

  constructor(
    private router: Router,
    private _subjectService: SubjectsService,
    private _classService: ClassService,
    private _syllabusService: SyllabusService
  ) { }

  ngOnInit(): void {
    this.bindClassList();
    this.bindSubjectList(0);
  }

  ngAfterViewInit() {
    this.bindChapterList();
  }

  bindChapterList() {
    this._syllabusService.getChapters().subscribe(
      (chapter) => {
        this.chapterList = chapter;
        console.log("this.chapterList: ", this.chapterList);
        this.filterChapters();   
      },
      (error) => {
        console.log("Error in Chapter Fetching: ", error);
      }
    );
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

  // Bind subjects based on selected class
  changeClass() {
    this.bindSubjectList(this.chapter.class_id);
    this.filterChapters();  
  }

  bindSubjectList(clsId: number) {
    this._subjectService.getSubjectsbyClass(clsId).subscribe(
      (subj) => {
        this.subjects = subj; 
      },
      (error) => {
        console.error('Error in getting subjects', error);
      }
    );
  }
   
  filterChapters() {
    this.filteredChapters = this.chapterList.filter((chapter: { class_id: number; subject_id: number; }) => {
      return (
        (this.chapter.class_id == 0 || chapter.class_id == this.chapter.class_id) &&
        (this.chapter.subject_id == 0 || chapter.subject_id == this.chapter.subject_id)
      );
    });
  }
   
  changeSubject() { 
    this.filterChapters();   
  }
   
  onSubmit() {
    this._syllabusService.addChapter(this.chapter).subscribe(
      (response) => {
        this.clear();
        this.bindChapterList(); 
        console.log('Chapter added successfully', response);
      },
      (error) => {
        console.error('Error adding chapter', error);
      }
    );
  }

  ClassName(clsId: number): string | undefined {
    const classObj = this.classes.find(cls => cls.class_id === clsId);
    return classObj ? classObj.class_name : undefined;
  }

  SubjectName(subId: number): string | undefined {
    const subjObj = this.subjects.find(cls => cls.subject_id === subId);
    return subjObj ? subjObj.subject_name : undefined;
  }

  // Clear the form
  clear() {
    this.chapter.class_id = 0;
    this.chapter.subject_id = 0;
    this.chapter.chapter_name = '';
  }
}

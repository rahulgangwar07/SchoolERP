import { Component, OnInit } from '@angular/core';
import { LibraryBook } from '../../../models/library';
import { LibraryService } from '../../../Services/library.service';
import { ClassService } from '../../../Services/class.service';
import { SubjectsService } from '../../../Services/subjects.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
 
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {

  libraryBook: LibraryBook = {
    book_id: 0,
    book_type: 'Book',
    title: '',
    isbn_no: '',
    author: '',
    edition: '',
    volume: '',
    publisher: '',
    price: null,
    no_of_copies: null,
    no_of_pages: 0,
    almeria_no: null,
    rack_no: null,
    position: 'Left',
    accession_no: '',
    book_language: '',
    class_id: 0,
    subject_id: 0,
    status: true,
    school_id: '',
    created_at: new Date(),
    updated_at: undefined
  }

  book_id: number = 0;
  classList: any[] = [];
  subjectList: any[] = [];

  constructor(private _libraryService: LibraryService, private _classService: ClassService, private _subjectService: SubjectsService,
    private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.book_id = Number(this.router.snapshot.paramMap.get('book_id'));

    this.loadClasses();
    this.loadSubjects();

    if (this.book_id != 0) {
      this._libraryService.getLibraryBookById(this.book_id).subscribe(
        res => {
          this.libraryBook = res;
          console.log("getLibraryBookById success: ", this.libraryBook);
        },
        err => {
          console.log("Error: ",err);
        }
      );
    }
    
  }

  loadClasses() {
    this._classService.getActiveClass().subscribe(
      res => { 
        this.classList = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  loadSubjects() {
    this._subjectService.getSubjects().subscribe(
      res => { 
        this.subjectList = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  onSubmit() {
    // Here you would typically send the libraryBook data to your backend service
    if (this.libraryBook.book_id == 0) {
      this._libraryService.addLibraryBook(this.libraryBook).subscribe(
        res => {
          console.log("Book Added Successfullly. ", res);
          this.clearForm();
        },
        err => {
          console.log("Error: ", err);
        }
      );
    }
    else {
      this._libraryService.updateLibraryBook(this.libraryBook).subscribe(
        res => {
          console.log("Book Update Successfullly. ", res);
          this.clearForm();
          this.route.navigate(['/library/view-book']);
        },
        err => {
          console.log("Error: ", err);
        });
    }
    
    console.log('Submitted Book:', this.libraryBook); 
  }

  clearForm() {
    this.libraryBook = {
      book_id: 0,
      book_type: 'Book',
      title: '',
      isbn_no: '',
      author: '',
      edition: '',
      volume: '',
      publisher: '',
      price: null,
      no_of_copies: null,
      no_of_pages: 0,
      almeria_no: null,
      rack_no: null,
      position: 'Left',
      accession_no: '',
      book_language: '',
      class_id: 0,
      subject_id: 0,
      status: true,
      school_id: '',
      created_at: new Date(),
      updated_at: undefined
    };
  }

}

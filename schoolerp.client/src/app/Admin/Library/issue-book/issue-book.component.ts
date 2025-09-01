import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';
import { LibraryIssue } from '../../../models/library';
import { debounce, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {

  bookList: any[] = [];
  filteredBookList: any[] = [];
  bookListStatus: boolean = false;
  bookname: string = "";
  searchSubject: Subject<string> = new Subject();
  member_name:string = ""
  cls:string = ""

  lIssue: LibraryIssue = {
    issue_id: 0,
    book_id: 0,
    accession_no: '',
    member_id: null,
    userType: '',
    issue_date: new Date(),
    due_date: new Date(),
    return_date: undefined,
    status: 'Issued',
    remarks: '',
    created_by: '',
    session: '',
    school_id: ''
  };

  constructor(private _libraryService: LibraryService) { }

  ngOnInit() {
    this.loadBookList();
    this.setupSearchDebounce();
  }

  // Fetch the list of books from the backend
  loadBookList() {
    this._libraryService.getLibraryBooks().subscribe(
      res => {
        this.bookList = res;
        this.filteredBookList = res; 
      },
      err => {
        console.log("Error in fetching books: ", err);
      }
    );
  }

  // Set up debounce for the book name input field
  setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(300),  // Wait for 300ms after the last keystroke
      distinctUntilChanged()  // Only trigger if the value has changed
    ).subscribe(query => {
      this.filterBookList(query);
    });
  }

  // Triggered on every input change
  onBookNameInput() {
    this.searchSubject.next(this.bookname);
  }

  // Filter the book list based on the entered book name
  filterBookList(query: string) {
    if (query !== '') {
      this.filteredBookList = this.bookList.filter(f => f.title.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.filteredBookList = this.bookList;
    }
  }

  // Toggle book list visibility
  toggleBookList(status: boolean) {
    this.bookListStatus = status;
  }

  // Check if the member exists
  existsMember() { 
    if (this.lIssue.member_id) {
      this._libraryService.getLibraryMemberById(this.lIssue.member_id).subscribe(
        (res) => {
          if (!res) {
            this.lIssue.member_id = null;
            this.lIssue.userType = '';
            alert('Member does not exist!');
          }
          else { 
            this.member_name = res.full_name;
            this.lIssue.userType = res.member_type;
          }

          console.log("Member exists:", res);
        },
        (err) => {
          this.lIssue.member_id = null;
          this.lIssue.userType = '';
          console.error("Member not found", err);
        }
      );
    }
  }

  // Handle form submission
  submitForm() {
    this.lIssue.userType = this.lIssue.userType || 'student';
    if (this.lIssue.book_id && this.lIssue.member_id && this.lIssue.issue_date && this.lIssue.return_date) {
      this._libraryService.addLibraryIssue(this.lIssue).subscribe(
        res => {
          alert('Book issued successfully');
          this.clear();
        },
        err => {
          console.error('Error issuing book:', err);
          alert('Failed to issue book. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields!');
    }
  }

  // Select a book from the filtered list
  selectBook(accno: string) {
    this._libraryService.getLibraryBookByAccession(accno).subscribe(
      book => {
        this.bookListStatus = false;
        this.lIssue.book_id = book.book_id;
        this.bookname = book.title;
        this.lIssue.accession_no = book.accession_no;
      },
      err => {
        console.log("Error in book fetching: ", err);
      }
    );
  }

  // Clear the form after successful submission
  clear() {
    this.lIssue = {
      issue_id: 0,
      book_id: 0,
      accession_no: '',
      member_id: null,
      userType: '',
      issue_date: new Date(),
      due_date: new Date(),
      return_date: undefined,
      status: 'Issued',
      remarks: '',
      created_by: '',
      session: '',
      school_id: ''
    };
    this.bookname = '';
    this.member_name = '';
  }
}

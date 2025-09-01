import { Component, HostListener, OnInit } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';
import { ClassService } from '../../../Services/class.service';
import { LibraryIssue } from '../../../models/library';

@Component({
  selector: 'app-search-issued-book',
  templateUrl: './search-issued-book.component.html',
  styleUrls: ['./search-issued-book.component.css']
})
export class SearchIssuedBookComponent implements OnInit {

  issueList: any[] = [];
  userType: string = 'student';
  fullName: string = '';
  class: string = "";
  classList: any[] = [];
  classListMap: Map<number, string> = new Map();

  isPopupVisible = false;
  currentIssue: LibraryIssue | null = null;

  toggleIndex: number | null = null;

  constructor(private _libraryService: LibraryService, private _classService: ClassService) { }

  ngOnInit() {
    this.loadClassList();
  }

  loadClassList() {
    this._classService.getActiveClass().subscribe(
      cls => {
        this.classList = cls,
          this.classListMap = new Map(cls.map((cl: { class_id: any; dis_name: any; }) => [cl.class_id, cl.dis_name])),
          this.searchIssuedBooks();
      },
      err => console.log("Error found: ", err)
    );
  }

  searchIssuedBooks() {
    const searchData = {
      userType: this.userType,
      fullName: this.fullName,
      class: this.class
    };

    this._libraryService.getSearchedIssuebook(searchData).subscribe(
      res => {
        this.issueList = res;
        console.log('  getSearchedIssuebook:', this.issueList);
      },
      err => {
        console.error('Error fetching issued books', err);
      }
    );
  }

  // Method to show the popup and pass the current issue
  showSubmitPopup(issue: any) {
    this.currentIssue = issue;
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.currentIssue = null;  // Clear the selected issue
  }

  submitBook(): void {
    if (this.currentIssue) {
       //Implement the actual submit book logic here
      this._libraryService.updateLibraryBookSubmitData(this.currentIssue).subscribe(
         res => {
           alert('Book submitted successfully');
           this.searchIssuedBooks();
           this.closePopup();
         },
         err => {
           console.error('Error submitting book', err);
         }
       );
    }
  }

  deleteIssue(issue: any) {
    if (confirm('Are you sure you want to delete this record?')) {
      this._libraryService.deleteLibraryIssue(issue.issue_id).subscribe(
        res => {
          alert('Record deleted successfully');
          this.searchIssuedBooks();  // Re-fetch the updated list
        },
        err => {
          console.error('Error deleting record', err);
        }
      );
    }
  }

  changeUserType() {
    this.searchIssuedBooks();
  }

  toggleActions(index: number) {
    this.toggleIndex = this.toggleIndex === index ? null : index;
  }

  className(clsId: number): string {
    return this.classListMap.get(clsId) || "";
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element.closest('.action-container')) {
      this.toggleIndex = null;
    }
  }

}

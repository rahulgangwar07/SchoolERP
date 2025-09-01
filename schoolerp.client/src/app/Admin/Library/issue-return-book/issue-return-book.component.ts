import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';

@Component({
  selector: 'app-issue-return-book',
  templateUrl: './issue-return-book.component.html',
  styleUrl: './issue-return-book.component.css'
})
export class IssueReturnBookComponent implements OnInit {

  date: Date | null = null;
  itemType: string = "issueDate";
  itemTypeDis: string = "Issued Book";

  bookList: any[] = [];

  constructor(private _libraryService: LibraryService) { }

  ngOnInit() {
    if (this.itemType == "issueDate") {
      this.itemTypeDis = "Issued Book";
    } else {
      this.itemTypeDis = "Return Book";
    }
  }

  getbooks() {
    if (this.date == null) return;
    this._libraryService.getLibraryIssueReturnBookbyDate(this.itemType, this.date).subscribe(
      res => {
        console.log("Response: ", res);
        this.bookList = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  search() {
    this.getbooks();
  }

  removeDate() {
    this.date = null;
  }

  onItemTypeChange() {
    this.itemTypeDis = this.itemType === 'issueDate' ? 'Issued Book' : 'Return Book';
  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';
import { LibraryBook } from '../../../models/library';
import { Router } from '@angular/router';
import { ClassService } from '../../../Services/class.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit {

  classList: any[] = [];
  bookList: LibraryBook[] = [];

  currentIndex: number | null = null;

  constructor(private _classService: ClassService, private _libraryService: LibraryService, private router: Router) {

  }

  ngOnInit() {
    this.loadClassList();
    this.loadBookList();
  }

  loadClassList() {
    this._classService.getClass().subscribe(
      res => {
        this.classList = res;
        console.log("Class List : ", this.classList);
      },
      err => {
        console.log("Error in class fetching: ",err);
      }
    );
  }

  loadBookList() {
    this._libraryService.getLibraryBooks().subscribe(
      res => {
        this.bookList = res;
        console.log("Library Data: ", this.bookList);
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  editLibraryBook(book_id: number) {
    this.router.navigate(['/library/add-book', book_id]);
  }

  deleteLibraryBook(book_id: number, index: number) {
    this._libraryService.deleteLibraryBook(book_id).subscribe(
      deleted => {
        console.log("Book delete Successfully. ", deleted);
        this.bookList.splice(index,1);
      },
      err => {
        console.log("Error in book deletion: ",err);
      }
    );
  }

  toggleAction(index: number) { 
    this.currentIndex = this.currentIndex == index ? null : index;
  }

  className(clsId: number): string {
    const val = this.classList.find(f => f.class_id == clsId);
    return val.dis_name ?? "";
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.btn-action')) {
      this.currentIndex = null;
    }
  }

}

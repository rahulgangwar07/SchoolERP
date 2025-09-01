import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';

@Component({
  selector: 'app-import-books',
  templateUrl: './import-books.component.html',
  styleUrl: './import-books.component.css'
})
export class ImportBooksComponent implements OnInit {

  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private _libraryService: LibraryService) { }

  ngOnInit() {
 
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this._libraryService.importBooks(formData).subscribe(
      res => {
        alert("Books imported successfully");
        this.fileInput.nativeElement.value = '';
        this.selectedFile = null;
      },
      err => {
        console.error("Import failed:", err);
        alert("Failed to import books. Please try again.");
      }
    );
  }


}

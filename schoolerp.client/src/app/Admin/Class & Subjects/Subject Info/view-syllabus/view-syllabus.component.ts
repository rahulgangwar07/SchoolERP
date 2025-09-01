import { Component, OnInit } from '@angular/core';
import { SyllabusService } from '../../../../Services/syllabus.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { ClassService } from '../../../../Services/class.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';

@Component({
  selector: 'app-view-syllabus',
  templateUrl: './view-syllabus.component.html',
  styleUrl: './view-syllabus.component.css'
})
export class ViewSyllabusComponent implements OnInit {

  syllabusList: any;
  classList: any[] = [];
  class_id:number = 0;
  isLoading: boolean = true;
  error: string = '';

  constructor(private _syllabusService: SyllabusService, private _imageService: ImageServiceService,
    private _classService: ClassService, private _authService: AuthServiceService) { }

  ngOnInit(): void {
    this.bindClassList();
    this.loadSyllabus();
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response; 
      },
      (error) => {
        console.log("Error in fetcing ClassList: ",error);
      }
    );
  }

  // Fetch the syllabus data from the API
  loadSyllabus(): void {
    this._syllabusService.getSyllabus(this.class_id).subscribe(
      (response) => {
        this.syllabusList = response;
        console.log("this.syllabusList: ", this.syllabusList);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching syllabus:', error);
        this.error = 'There was an error fetching the syllabus data.';
        this.isLoading = false;
      }
    );
  }

  classChange() {
    this.loadSyllabus();
  }

  // A helper method to download the document
  downloadDocument(documentName: string): void {
    const image = this._imageService.getImageUrlSyllabus(documentName);
    if (image)
    window.open(image, '_blank');  
  }

}

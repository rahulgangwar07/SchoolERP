import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { SyllabusService } from '../../../../Services/syllabus.service';

@Component({
  selector: 'app-study-material',
  templateUrl: './study-material.component.html',
  styleUrl: './study-material.component.css'
})
export class StudyMaterialComponent implements OnInit {

  syllabusList: any;
  classList: any[] = [];
  class_id: number = 0;
  isLoading: boolean = true;
  error: string = '';

  constructor(private _syllabusService: SyllabusService, private _imageService: ImageServiceService,
    private _classService: ClassService) { }

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
        console.log("Error in fetcing ClassList: ", error);
      }
    );
  }

  // Fetch the syllabus data from the API
  loadSyllabus(): void {
    this._syllabusService.getSyllabus(this.class_id).subscribe(
      (response) => {
        this.syllabusList = response; 
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

  deleteSyllabus(syllabus_id: number) {

    this._syllabusService.deleteSyllabus(syllabus_id).subscribe(
      (response) => {
        this.loadSyllabus(); 
      },
      (error) => {
        console.log("Error in deleted Syllabus: ",error);
      }
    );
  }


}


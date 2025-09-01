import { Component, OnInit } from '@angular/core';
import { SyllabusService } from '../../../Services/syllabus.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-stu-study-material',
  templateUrl: './stu-study-material.component.html',
  styleUrl: './stu-study-material.component.css'
})
export class StuStudyMaterialComponent implements OnInit {

  studyMaterials: any;
  class_id: number = 0; 

  constructor(private _syllabusService: SyllabusService, private _authService: AuthServiceService,
    private _imageService: ImageServiceService) { }

  ngOnInit() {
    this.class_id = (Number)(this._authService.getClassId()) ?? 0;
    this.loadSyllabus();
  }

  loadSyllabus(): void {
    this._syllabusService.getSyllabus(this.class_id).subscribe(
      (response) => {
        this.studyMaterials = response;
        console.log("this.syllabusList: ", this.studyMaterials);
      },
      (error) => {
        console.error('Error fetching syllabus:', error); 
      }
    );
  }

  downloadDocument(d: any) {
    const image = this._imageService.getImageUrlSyllabus(d);
    if (image)
      window.open(image, '_blank');
  }

}

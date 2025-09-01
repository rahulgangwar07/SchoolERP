import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicsService } from '../../../../Services/academics.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';

@Component({
  selector: 'app-explore-slm-content',
  templateUrl: './explore-slm-content.component.html',
  styleUrls: ['./explore-slm-content.component.css']
})
export class ExploreSlmContentComponent implements OnInit {
  classId: number = 0;
  className: string = "";
  subj_id: number = 0;
  subjectName: string = "";
  showPopup: boolean = false;

  userRole: string | undefined;

  syllabus: any[] = [];

  values = {
    clsid: this.classId,
    clsname: this.className,
    subj_id: this.subj_id,
    subjectname: this.subjectName
  }

  constructor(private route: ActivatedRoute, private _academicService: AcademicsService, private _imageService: ImageServiceService,private _authService:AuthServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param) => { 
        this.classId = param["clsId"];
        this.className = param["clsname"];
        this.subj_id = param["subj_id"];
        this.subjectName = param["subjectName"];
        this.values.clsid = this.classId;
        this.values.clsname = this.className;
        this.values.subj_id = this.subj_id;
        this.values.subjectname = this.subjectName;
      }
    );

    this.userRole = this._authService.getUserRole(); 

    this.bindLearningMaterial();
  }

  bindLearningMaterial() {
    this._academicService.getlearningMaterialbyIds(this.classId, this.subj_id).subscribe(
      (success) => {
        this.syllabus = success.map((data: { fileName: string | null, fileType: string }) => {
          // Determine the file extension
          const fileExtension = data.fileName?.split('.').pop()?.toLowerCase() ?? "";
           
          if (fileExtension === 'pdf') {
            data.fileType = 'pdf';  
          } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            data.fileType = 'image';  
          } else {
            data.fileType = 'unknown'; 
          }
          data.fileName = this._imageService.getImageUrlAcademics(data.fileName); 
          return data;
        });
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }


  popupStatus() {
    this.showPopup = true;
  }

  handlePopupClose(status: boolean) {
    this.showPopup = status;
    this.bindLearningMaterial();  
  }

  handleSyllabusUpdate(updatedSyllabus: any) { 
    const index = this.syllabus.findIndex(item => item.material_id === updatedSyllabus.material_id);
    if (index !== -1) {
      this.syllabus[index] = updatedSyllabus;   
    }
  }
   
 

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcademicsService } from '../../../../Services/academics.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

interface learningMaterial {
  material_id: number;
  class_id: number;
  subject_id: number;
  file: File | null;
  content_type: string;
  content_title: string;
  content_url: string;
}

@Component({
  selector: 'app-slm-content-popup',
  templateUrl: './slm-content-popup.component.html',
  styleUrls: ['./slm-content-popup.component.css']
})
export class SlmContentPopupComponent implements OnInit {

  @Input() popupStatus: boolean = false;
  @Output() popupStatusChange = new EventEmitter<boolean>();

  @Input() clsNsub: any;

  formData: learningMaterial = {
    material_id: 0,
    class_id: 0,
    subject_id: 0,
    file: null,
    content_type: '',
    content_title: '',
    content_url: ''
  };

  file?: File;
  themeSetting: any;

  constructor(private _academicsService: AcademicsService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  selectFile(event: any) {
    this.file = event.target.files[0];  
    console.log("File selected: ", this.file);
  }

  contentSubmit() {
    if (!this.file) {
      console.error('No file selected!');
      return;
    }
     

    // Create FormData for file upload
    const formData = new FormData(); 
    formData.append('class_id', this.clsNsub.clsid);
    formData.append('subject_id', this.clsNsub.subj_id);
    formData.append('file', this.file);
    formData.append('content_type', "testingRahul");
    formData.append('content_title', this.formData.content_title);
    formData.append('content_url', this.formData.content_url);  
    this._academicsService.uploadLearningMaterial(formData).subscribe(
      (response) => {
        console.log('Upload Success:', response); 
        this.closePopup();
      },
      (error) => {
        console.error('Upload Error:', error);
      }
    );
  }

  closePopup() {
    this.popupStatusChange.emit(false);
  }
}

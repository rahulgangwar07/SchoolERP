import { Component, OnInit } from '@angular/core';
import { DownloadFormService } from '../../../Services/download-form.service';
import { downloadForm } from '../../../models/downloadForm';
import { ImageServiceService } from '../../../Services/image-service.service'; 

@Component({
  selector: 'app-registration-download-form',
  templateUrl: './registration-download-form.component.html',
  styleUrls: ['./registration-download-form.component.css']
})
export class RegistrationDownloadFormComponent implements OnInit {

  registrationForm!: downloadForm;
  isPdf: boolean = false;   

  constructor(
    private _downloadformService: DownloadFormService,
    private _imageService: ImageServiceService) { }

  ngOnInit() {
    this._downloadformService.getFormbyType("registration").subscribe(
      (response: downloadForm) => {
        this.registrationForm = response;
        this.isPdf = this.registrationForm.form_url.toLowerCase().endsWith('.pdf');
        this.registrationForm.form_url = this._imageService.getImageUrlDownloadForm(response.form_url) ?? ""; 
      },
      (error) => {
        console.log("Error fetching registration form: ", error);
      }
    );
  }
   
    

}

import { Component, OnInit } from '@angular/core';
import { downloadForm } from '../../../models/downloadForm';
import { DownloadFormService } from '../../../Services/download-form.service';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-cbse-reg',
  templateUrl: './cbse-reg.component.html',
  styleUrls: ['./cbse-reg.component.css']
})
export class CbseRegComponent implements OnInit {

  cbseForm!: downloadForm;
  isPdf: boolean = false;   

  constructor(
    private _downloadformService: DownloadFormService,
    private _imageService: ImageServiceService
  ) { }

  ngOnInit() {
    this._downloadformService.getFormbyType("cbsereg").subscribe(
      (response: downloadForm) => {
        this.cbseForm = response;
        //this.cbseForm.form_url = encodeURIComponent(this.cbseForm.form_url);
        this.isPdf = this.cbseForm.form_url.toLowerCase().endsWith('.pdf');
        const imageUrl = this._imageService.getImageUrlDownloadForm(response.form_url) ?? "";
        this.cbseForm.form_url = imageUrl;
         
      },
      (error) => {
        console.log("Error fetching registration form: ", error);
      }
    );
  }

}

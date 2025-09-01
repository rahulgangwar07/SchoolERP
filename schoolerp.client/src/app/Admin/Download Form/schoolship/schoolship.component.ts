import { Component, OnInit } from '@angular/core';
import { DownloadFormService } from '../../../Services/download-form.service';
import { ImageServiceService } from '../../../Services/image-service.service';
import { downloadForm } from '../../../models/downloadForm';

@Component({
  selector: 'app-schoolship',
  templateUrl: './schoolship.component.html',
  styleUrl: './schoolship.component.css'
})
export class SchoolshipComponent implements OnInit {

  scholershipForm!: downloadForm;
  isPdf: boolean = false;   

  constructor(
    private _downloadformService: DownloadFormService,
    private _imageService: ImageServiceService
  ) { }

  ngOnInit() {
    this._downloadformService.getFormbyType("scholarship").subscribe(
      (response: downloadForm) => {
        this.scholershipForm = response;
        this.isPdf = this.scholershipForm.form_url.toLowerCase().endsWith('.pdf');
        this.scholershipForm.form_url = this._imageService.getImageUrlDownloadForm(response.form_url) ?? "";
      },
      (error) => {
        console.log("Error fetching registration form: ", error);
      }
    );
  }
   

}

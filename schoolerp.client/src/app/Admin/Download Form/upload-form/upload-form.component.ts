import { Component, HostListener, OnInit } from '@angular/core';
import { DownloadFormService } from '../../../Services/download-form.service';
import { downloadForm, downloadFormDTOs } from '../../../models/downloadForm';
import { ImageServiceService } from '../../../Services/image-service.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent implements OnInit {

  downloadForm: downloadFormDTOs = {
    form_id: 0,
    form_name:'',
    form_url: null,
    form_type: '0'
  };

  form_url: any;
  toggleIndex: number | null = null;
  downloadFormList: downloadForm[] = [];
  filtereddownloadFormList: downloadForm[] = [];

  themeSetting: any;

  constructor(private _downloadFormService: DownloadFormService, private _imageService: ImageServiceService, private _settingService: GlobalSettingsService) {

  }

  ngOnInit() {
    this.bindDownloadForm();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindDownloadForm() {
    this._downloadFormService.getForms().subscribe(
      (response: downloadForm[]) => {
        this.downloadFormList = response;
        this.downloadFormList = this.downloadFormList.map(s => {
          s.form_url = this._imageService.getImageUrlDownloadForm(s.form_url) ?? "";
          return s;
        });
        this.filtereddownloadFormList = this.downloadFormList;
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  fileUpload(event: any) {
    this.downloadForm.form_url = event.target.files[0]; 
  }

  submitForm() { 
    this._downloadFormService.insertForms(this.downloadForm).subscribe(
      (success: downloadForm) => {
        this.bindDownloadForm();
        this.clear();
        this.form_url = "";
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
     
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }

  editForm(form_id: number) {
    this._downloadFormService.getFormbyId(form_id).subscribe(
      (response: downloadForm) => { 
        this.downloadForm.form_id = response.form_id;
        this.downloadForm.form_name = response.form_name;
        this.form_url = response.form_url;
        this.downloadForm.form_type = response.form_type; 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  deleteForm(form_id: number, index: number) {

    this._downloadFormService.deleteForm(form_id).subscribe(
      (deleted) => {
        this.downloadFormList.splice(index, 1);
        this.toggleIndex = null; 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  filter() {
    this.filtereddownloadFormList = this.downloadFormList.filter(f => {
      return f.form_type == this.downloadForm.form_type;
    })
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement; 
    if (!clickedElement.closest('.action-container')) {
      this.toggleIndex = null;
    } 
  }
 

  clear() {
    this.downloadForm = {
      form_id: 0,
      form_name: '',
      form_url: null,
      form_type: '0'
       
    }
    const fileInput = document.querySelector('#upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

}

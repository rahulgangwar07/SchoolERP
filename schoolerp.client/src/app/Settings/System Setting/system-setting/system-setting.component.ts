import { Component, OnInit } from '@angular/core';
import { applicationThemeSetting, globalheader, signatureSettings, supportContact } from '../../../models/globalSettings';
import { GlobalSettingsService } from '../../../Services/global-settings.service';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {

  toogleIndex: number | null = null;

  header_image: File | null = null;
  logo_url: File | null = null;
  image_change: boolean = false;


  headerSettings: globalheader = {
    setting_id: 0,
    school_id: '',
    global_header: '',
    header_image: '',
    header_bgcolor: '#ffffff',
    header_text_color: '#000000',
    logo_url: '',
    font_family: 'Arial',
    is_active: true,
    last_updated: new Date(),
    created_by: ''
  };

  signature_type: string = "";  
  signature_sign!: File;  

  signatureSetting: signatureSettings = {
    setting_id: 0,
    school_id: '',
    examination_controller_signature: '',
    center_controller_signature: '',
    director_signature: '',
    icard_signature: '',
    last_updated_date: new Date()
  }

  supportContact: supportContact = {
    setting_id: 0,
    school_id: '',
    support_email: '',
    support_phone: '',
    grievance_cell: '',
    accountdepartment: '',
    examcell: '',
    admissioncell: '',
    support_address: ''
  }

  applicationThemeSetting: applicationThemeSetting = {
    setting_id: 0, 
    school_id: '',
    appTheme_website_url: '',
    youtube_url: '',
    primary_color: '',
    secondary_color: '',
    button_color: '',
    sidebar_bgcolor: '',
    sidebar_color: '',
    favicon_url: ''
  };


  constructor(private _settingsService: GlobalSettingsService, private _imageService: ImageServiceService) { }

  ngOnInit(): void {
    // Optionally, load existing settings here if needed
     this.loadHeaderSettings();
    this.loadSignatures();
    this.loadContacts();
    this.loadApplicationTheme();
  }

  openHeader(index: number): void {
    this.toogleIndex = this.toogleIndex === index ? null : index; 
  }

  // Upload Logo
  uploadLogo(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        this.headerSettings.logo_url = base64;
      });
      this.logo_url = file;
      this.image_change = true;
    }
  }

  // Upload Footer Image
  uploadHeaderImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.convertToBase64(file).then((base64: string) => {
        this.headerSettings.header_image = base64;
      });
      this.header_image = file;
      this.image_change = true;
      console.log("Header File: ", file);
    }
  }

  // Convert image to Base64 (mock)
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  loadHeaderSettings() {
    this._settingsService.getGlobalHeader().subscribe(
      res => {
        res.header_image = this._imageService.getImageUrlSettings(res.header_image);
        res.logo_url = this._imageService.getImageUrlSettings(res.logo_url); 
        this.headerSettings = res
      },
      err => console.log("Error in global header fetching! ")
    );
  }

  loadContacts() {
    this._settingsService.getSupportContactSetting().subscribe(
      (res) => {
        this.supportContact = res;
      },
      err => {
        console.log("Error : ",err);
      }
    );
  }

  loadSignatures() {
    this._settingsService.getSignatureSettings().subscribe(
      (res) => {
        this.signatureSetting = res;
        if (this.signatureSetting.examination_controller_signature)
        this.signatureSetting.examination_controller_signature = this._imageService.getImageUrlSettings(this.signatureSetting.examination_controller_signature) ?? "";

        if (this.signatureSetting.center_controller_signature)
          this.signatureSetting.center_controller_signature = this._imageService.getImageUrlSettings(this.signatureSetting.center_controller_signature) ?? "";

        if (this.signatureSetting.director_signature)
          this.signatureSetting.director_signature = this._imageService.getImageUrlSettings(this.signatureSetting.director_signature) ?? "";

        if (this.signatureSetting.icard_signature)
          this.signatureSetting.icard_signature = this._imageService.getImageUrlSettings(this.signatureSetting.icard_signature) ?? ""; 
      },
      err => {
        console.log("Error : ",err);
      }
    );
  }

  loadApplicationTheme() {
    this._settingsService.getApplicationTheme().subscribe(
      res => { 
        this.applicationThemeSetting = res;
      },
      err => console.log("Error: ",err)
    );
  }

  // Save Header Settings
  saveHeaderSettings(): void {

    const formData = new FormData();
    formData.append('setting_id', this.headerSettings.setting_id.toString());
    formData.append('school_id', this.headerSettings.school_id);
    formData.append('global_header', this.headerSettings.global_header);
    formData.append('header_image', this.header_image ?? "");
    formData.append('header_bgcolor', this.headerSettings.header_bgcolor);
    formData.append('header_text_color', this.headerSettings.header_text_color);
    formData.append('logo_url', this.logo_url ?? "");
    formData.append('image_change', this.image_change.toString());
    formData.append('font_family', this.headerSettings.font_family);  
    formData.append('created_by', this.headerSettings.created_by);

    this._settingsService.postGlobalHeader(formData).subscribe({
      next: (res) => {
        console.log('Saved successfully', res);
        this.loadHeaderSettings();
        this._settingsService.notifyHeaderReload(); 
      },
      error: (err) => {
        console.error('Error saving header settings:', err);
        alert('Failed to save header settings.');
      }
    });
  }

  selectExaminationImg(event:any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      var reader = new FileReader();
      this.convertToBase64(file).then((base64: string) => {
        this.signatureSetting.examination_controller_signature = base64;
      });
      this.signature_type = "Examination";
      this.signature_sign = file;
    }
  }

  selectCenterControllerImg(event:any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      var reader = new FileReader();
      this.convertToBase64(file).then((base64: string) => {
        this.signatureSetting.center_controller_signature = base64;
      });
      this.signature_type = "CenterControl";
      this.signature_sign = file;
    }
  }  



  selectDirectorImg(event:any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      var reader = new FileReader();
      this.convertToBase64(file).then((base64: string) => {
        this.signatureSetting.director_signature = base64;
      });
      this.signature_type = "Director";
      this.signature_sign = file;
    }
  }

  selectICardImg(event:any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      var reader = new FileReader();
      this.convertToBase64(file).then((base64: string) => {
        this.signatureSetting.icard_signature = base64;
      });
      this.signature_type = "ICard";
      this.signature_sign = file;
    }
  }

  submitSignature() { 
    this._settingsService.posSignatureSetting(this.signature_type, this.signature_sign)
      .subscribe(
        res => {
          console.log("Submit: ",res);
        },
        err => {
          console.log("Error: ",err);
        }
    );
  }

  saveSupportContact() {  

    // Post the data to the backend
    this._settingsService.postSupportContantSettings(this.supportContact)
      .subscribe(
        res => {
          this.loadContacts();
          console.log("Support contact settings saved successfully", res);
        },
        err => {
          console.error("Error saving support contact settings", err);
        }
      );
  }

  submitApplicationTheme() {
    this._settingsService.postApplicationTheme(this.applicationThemeSetting).subscribe(
      res => {
        console.log("response generated: ", res);
        this.loadApplicationTheme();
        this._settingsService.notifyHeaderReload(); 
      },
      err => console.log("Error found: ")
    );
  }
 

}

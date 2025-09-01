import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CertificateService } from '../../../Services/certificate.service';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrl: './add-certificate.component.css'
})
export class AddCertificateComponent implements OnInit {

  @Input() template_id: number = 0;
  certificateType: string = '';
  header: File | null = null;
  footer: File | null = null;
  headerImage: string | ArrayBuffer | null = null;
  footerImage: string | ArrayBuffer | null = null;
  title: string = '';
  templateBody: string = '';
  backgroundImage: string = 'assets/images/certificate-bg.png';  
  previewImage: string = 'assets/images/sample-preview.jpg';     

  @Input() showCertificate: boolean = false;
  @Output() hideCertificate = new EventEmitter<boolean>(false);

  constructor(private _certificateService: CertificateService, private _imageService: ImageServiceService) { }

  ngOnInit(): void {
    //alert(this.template_id);
    if (this.template_id != 0) {
      this.loadSingleTemplate();
    }
  }

  loadSingleTemplate() {
    this._certificateService.getCertificatebyId(this.template_id).subscribe(
      res => {
        this.certificateType = "";
        this.title = res.title;
        this.headerImage = this._imageService.getImageUrlCertificate(res.header);
        this.footerImage = this._imageService.getImageUrlCertificate(res.footer);
        this.templateBody = res.template_body;
        console.log("Response: ", res);
      },
      err => console.log("Error: ",err)
    );

  }

  submit() {
    const formData = new FormData();
    formData.append('template_id', this.template_id.toString());
    formData.append('header', this.header as File);
    formData.append('footer', this.footer as File);
    formData.append('title', this.title);
    formData.append('templateBody', this.templateBody);

    this._certificateService.insertCertificate(formData).subscribe(
      res => {
        console.log("Response: ", res);
        this.close();
      },
      err => { console.log("Error: ",err); }
    );
     
  }

  onHeaderUpload(event: any) {
    const file = event.target.files[0];
    this.header = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.headerImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onFooterUpload(event: any) {
    const file = event.target.files[0];
    this.footer = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.footerImage = reader.result;
      reader.readAsDataURL(file);
    }
  } 

  close(): void {
    this.hideCertificate.emit(false);
    this.clear();
  }

  clear() {
    this.certificateType = '';
    this.header = null;
    this.footer = null;
    this.title = '';
    this.templateBody = '';
  }

}

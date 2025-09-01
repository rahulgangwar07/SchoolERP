import { Component, OnInit } from '@angular/core';
import { SmsSettingService } from '../../../Services/Messages/sms-setting.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CertificateService } from '../../../Services/certificate.service';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.css'
})
export class CertificateListComponent implements OnInit {

  showAddCertificate: boolean = false;

  macros: any[] = [];
  templates: any[] = [];
  template_id: number = 0;
  name: string = "";
  copyclip: boolean = false;

  constructor(private _smsSettingsService: SmsSettingService, private _certificateService: CertificateService, private clipboard: Clipboard) { }

  ngOnInit() {
    this.loadSmsSettings();
    this.loadTemplates();
  }

  loadTemplates() {
    this._certificateService.getCertificate().subscribe(
      res => {
        this.templates = res; 
      },
      err =>  console.log("Error: ",err)
    );
  }

  loadSmsSettings() {
    this._smsSettingsService.templateMacroUsagebyId(2).subscribe(
      (res) => { 
        this.macros = res;
      },
      err => { console.log("Error: ",err); }
    );
  }

  editTemplate(template_id: number) { 
    this.template_id = template_id;
    this.showAddCertificate = true;
  }

  copyElement(name: string) {
    this.clipboard.copy(name); 
    this.name = name;
    this.copyclip = true;
    setTimeout(() => {
      this.copyclip = false;
    }, 3000);  
  }

 

  addCertificate() {
    this.showAddCertificate = true;
  }

  closePopup(event: any) {
    this.template_id = 0;
    this.showAddCertificate = event;
  }

}

import { Component, OnInit } from '@angular/core';
import { SmsSettingService } from '../../../Services/Messages/sms-setting.service';
import { SMSGatewaySettings, SMSTemplates, templateTypes } from '../../../models/sms';

@Component({
  selector: 'app-sms-setting',
  templateUrl: './sms-setting.component.html',
  styleUrl: './sms-setting.component.css'
})
export class SmsSettingComponent implements OnInit {
   
  macroNames: string = ""; 
  closePopup: boolean = false;
  template_id: number = 0;

  smsGSetting: SMSGatewaySettings = {
    setting_id: 0,
    school_id: '',
    sms_enabled: false,
    sms_service: 0,
    voice_sms_enabled: false,
    forget_password_sms_enabled: false,
    sms_username: '',
    sms_password: '',
    primary_sender_id: '',
    secondary_sender_id: '',
    api_url: '',
    delivery_api_url: '',
    check_balance_api_url: '',
    route_id: 0,
    api_status: '',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: '',
    updated_by: ''
  };

  templateList: SMSTemplates[] = [];
  templateType: any[] = [];

  constructor(private _smsSettingService: SmsSettingService) { }

  ngOnInit() {
    this.bindMacroList();
    this.bindGatewaySetting();
    this.bindTemplates();
    this.bindTemplateType();
  }

  bindTemplates() {
    this._smsSettingService.getTemplates().subscribe(
      (next) => {
        console.log("next: ", next);
        this.templateList = next;
        console.log("templateList: ", this.templateList);
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }


  bindMacroList() {
    this._smsSettingService.templateMacroUsagebyId(1).subscribe(
      (response) => { 
        this.macroNames = response.map((f: { macroName: any; }) => f.macroName).join(", "); 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  bindGatewaySetting() {
    this._smsSettingService.getGatewaySetting().subscribe(
      (response: SMSGatewaySettings) => {
        this.smsGSetting = response; 
      },
      (error) => {
        console.log("Error loading gateway settings: ", error);
      }
    );
  }

  bindTemplateType() {
    this._smsSettingService.templateType().subscribe(
      (next: templateTypes[]) => { console.log("this.templateType: ", next); this.templateType = next; },
      (error) => { console.log("Error : ", error); }
    );
  }


  deleteTemplate(t_id: number,index:number) {
    this._smsSettingService.deleteTemplate(t_id).subscribe(
      (next: SMSTemplates) => { console.log("this.templateType: ", next); this.templateList.splice(index,1) },
      (error) => { console.log("Error : ", error); }
    );
  }

  saveGatewaySetting() {
    this._smsSettingService.insertGatewaySetting(this.smsGSetting).subscribe(
      (next: SMSGatewaySettings) => { console.log("Setting Submit Successfully: ", next); },
      (error) => { console.log("Error: ",error); }
    );
  }

  editTemplate(id: any) { 
    this.template_id = id;
    this.closePopup = true;

    setTimeout(() => {
      const input = document.querySelector('.template-container input[name="name"]') as HTMLInputElement;
      input?.focus();
    }, 0);
  }

  templateName(type_id: number) {
    const value = this.templateType.find(f => f.typeid == type_id);
    return value.typename ?? "";
  }


  togglePopup() {
    this.closePopup = true;
  }

  closePopupClick(event:any) {
    this.closePopup = event;
    this.bindTemplates();
  }

}

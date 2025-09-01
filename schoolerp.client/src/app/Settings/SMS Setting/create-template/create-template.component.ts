import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SmsSettingService } from '../../../Services/Messages/sms-setting.service';
import { SMSTemplatesDTOs, templateTypes } from '../../../models/sms';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrl: './create-template.component.css'
})
export class CreateTemplateComponent implements OnInit, OnChanges {

  //templateMessage: string = `Dear Parents, {#var#} This is inform to you that {#var#} will remain closed {#var#}{#var#} Thanks {#var#} sms By CAMPUS COVER`;
  @Input() status: boolean = false;
  @Input() template_id: number = 0;
  @Output() popupStatus = new EventEmitter<boolean>();

  templateType: any[] = [];

  smsTemplate: SMSTemplatesDTOs = {
    id:0,
    template_id:'',
    template_Name:'',
    template_type_id:0,
    template_Content:'',
    isDLTApproved:false
  }

  constructor(private _smsSettingService: SmsSettingService) { }

  ngOnInit() { 
    this.bindTemplateType(); 
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['template_id'] && this.template_id > 0) {
      this.editTemplate();  
    }
  }

  bindTemplateType() {
    this._smsSettingService.templateType().subscribe(
      (next: templateTypes[]) => { this.templateType = next; },
      (error) => { console.log("Error : ",error); }
    );
  }

  updateTemplate() {
    this._smsSettingService.insertTemplate(this.smsTemplate).subscribe(
      (next) => { this.close(); },
      (error) => { console.log("Error: ",error); }
    );
  }

  editTemplate() { 
    this._smsSettingService.getTemplatesbyId(this.template_id).subscribe(
      (response) => {
        this.smsTemplate = {
          id : response.id,
          template_id: response.template_id,
          template_Name: response.template_Name,
          template_type_id: response.template_type_id,
          template_Content: response.template_Content,
          isDLTApproved: response.isDLTApproved,
        }
        //this.smsTemplate = response;
        console.log("Response: ", response);
      }
    );
  }

  close() {
    this.popupStatus.emit(false);
    this.smsTemplate = {
      id: 0,
      template_id: '',
      template_Name: '',
      template_type_id: 0,
      template_Content: '',
      isDLTApproved: false
    }
  }


}

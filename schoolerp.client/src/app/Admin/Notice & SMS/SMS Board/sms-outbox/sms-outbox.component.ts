import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../../Services/Messages/messaging.service';
import { SMSGatewaySettings } from '../../../../models/sms';

export interface smsOutboxData {
  sender_id:string,
  template:any,
  message:string
}


@Component({
  selector: 'app-sms-outbox',
  templateUrl: './sms-outbox.component.html',
  styleUrl: './sms-outbox.component.css'
})
export class SmsOutboxComponent implements OnInit {

  composedSMS: any[] = [];
  smsGateway!: SMSGatewaySettings;

  popup: boolean = false;
  data: smsOutboxData = {
    sender_id:'',
    template: '',
    message: ''
  };

  constructor(private _messagingService: MessagingService) { }

  ngOnInit() {
    this.loadComposedSMS();
  }

  loadComposedSMS() {
    this._messagingService.getComposeSMS().subscribe(
      (sms) => {
        this.composedSMS = sms.data;
        this.smsGateway = sms.smsGateway;
        console.log("SMS: ",sms);
      },
      (error) => { console.log("Error in message composing. "); }
    );
  }

  openPopup(sender_id:string,template:any,message:string) {
    this.data.sender_id = sender_id;
    this.data.template = template;
    this.data.message = message;
    this.popup = true;
  }

  changePopup(event: any) {
    this.popup = event;
  }

}

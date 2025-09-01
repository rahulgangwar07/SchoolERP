import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { smsOutboxData } from '../sms-outbox/sms-outbox.component';
import { MessagingService } from '../../../../Services/Messages/messaging.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';


@Component({
  selector: 'app-sms-outbox-popup',
  templateUrl: './sms-outbox-popup.component.html',
  styleUrl: './sms-outbox-popup.component.css'
})
export class SmsOutboxPopupComponent implements OnInit {

  @Input() popupStatus: boolean = false;
  @Input() data!: smsOutboxData;
  @Output() status = new EventEmitter<boolean>();

  themeSetting: any;

  constructor(private _messagingService: MessagingService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.themeSetting = this._settingService.getCurrentTheme();
  }

 

  closePopup() {
    this.status.emit(false);
  }

}

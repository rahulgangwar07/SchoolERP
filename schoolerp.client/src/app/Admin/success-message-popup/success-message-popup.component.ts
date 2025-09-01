import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewChecked, SimpleChanges, OnInit } from '@angular/core';
import { SuccessMessagePopupService } from '../../Services/success-message-popup.service';

@Component({
  selector: 'app-success-message-popup',
  templateUrl: './success-message-popup.component.html',
  styleUrls: ['./success-message-popup.component.css']
})
export class SuccessMessagePopupComponent implements AfterViewChecked {

  @Input() messages: { content: string; type: string; } | any;
  @Input() showSuccessPopup: boolean = false;

  @Output() closePopup = new EventEmitter<number>();
  @ViewChild('popupElement') popupElement: ElementRef | undefined;

  private wasFocused: boolean = false;

  

  ngAfterViewChecked() {
 
    if (this.showSuccessPopup && !this.wasFocused) {
      setTimeout(() => {
        this.popupElement?.nativeElement.focus();
        this.wasFocused = true;  
      }, 0);
    }
  }

  closeMessagePopup() {
    this.closePopup.emit(1);
    this.wasFocused = false; 
  }

  getMessageBackgroundColor(messageType: string) {
    return messageType === 'success' ? '#28a745' :   
      (messageType === 'delete' ? '#f5c6cb' :   
        (messageType === 'restore' ? '#bee5eb' :   
          (messageType === 'error' ? '#dc3545' :   
            (messageType === 'clear' ? '#f8f9fa' :  
              (messageType === 'warning' ? '#ffc107' :   
                (messageType === 'info' ? '#17a2b8' :  
                  (messageType === 'loading' ? '#fff3cd' :  
                    (messageType === 'update' ? '#e2e3e5' :  
                      '#ffffff'))))))));
  }


  getMessageTextColor(messageType: string) {
    return messageType === 'success' ? '#ffffff' :  
      (messageType === 'delete' ? '#721c24' :  
        (messageType === 'restore' ? '#004085' :  
          (messageType === 'error' ? '#ffffff' :   
            (messageType === 'clear' ? '#6c757d' :  
              (messageType === 'warning' ? '#856404' :   
                (messageType === 'info' ? '#ffffff' : 
                  (messageType === 'loading' ? '#6c757d' :   
                    (messageType === 'update' ? '#155724' :  
                      '#000000'))))))));
  }


}

import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../Services/class.service';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-e-content',
  templateUrl: './e-content.component.html',
  styleUrl: './e-content.component.css'
})
export class EContentComponent implements OnInit {

  classList: any[] = [];

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _classService: ClassService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this._classService.getActiveClass().subscribe(
      (cls) => {
        this.classList = cls;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error found: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


}

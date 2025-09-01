import { Component, OnInit } from '@angular/core';
import { HostalService } from '../../../Services/hostal.service';
import { hostal } from '../../../models/hostal';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-hostal',
  templateUrl: './view-hostal.component.html',
  styleUrl: './view-hostal.component.css'
})
export class ViewHostalComponent implements OnInit {

  hostalData: hostal[] = [];
   
  calenderMonth: {
    [x: string]: any;[key: number]: { name: string, checked: boolean }
  } = {
      1: { name: 'Jan', checked: false },
      2: { name: 'Feb', checked: false },
      3: { name: 'March', checked: false },
      4: { name: 'April', checked: false },
      5: { name: 'May', checked: false },
      6: { name: 'June', checked: false },
      7: { name: 'July', checked: false },
      8: { name: 'Aug', checked: false },
      9: { name: 'Sep', checked: false },
      10: { name: 'Oct', checked: false },
      11: { name: 'Nov', checked: false },
      12: { name: 'Dec', checked: false }
    };

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _hostalService: HostalService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindHostals();
  }

  feeMonth(h: hostal, fee_month: string) {
    let localCheckedList: string[] = [];
    const feeMonths = fee_month.split(',').map(month => month.trim()); 
    Object.entries(this.calenderMonth).forEach(([key, value]) => {
      if (feeMonths.includes(key)) {  
        localCheckedList.push(value.name);   
      }
    });
    return localCheckedList.join(', '); 
  }


  bindHostals() {
    this._hostalService.getHostal().subscribe(
      (data: hostal[]) => {
        this.hostalData = data;
        if (this.hostalData.length == 0) {
          this._messageService.addMessage("warning", "hostal data not avaiable.");
        } 
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  deleteHostal(hostal_id: number, index: number) {
    this._hostalService.deleteHostal(hostal_id).subscribe(
      (response) => { 
        this._messageService.addMessage("success", "The hostal has been successfully deleted.");
        this.hostalData.splice(index, 1);
      },
      (error) => { 
        this._messageService.addMessage("error", "An error occurred while deleting the hostal. Please try again later.");
      }
    );
  }


  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}

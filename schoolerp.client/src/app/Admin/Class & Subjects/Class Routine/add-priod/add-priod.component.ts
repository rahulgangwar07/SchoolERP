import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutineService } from '../../../../Services/routine.service';

@Component({
  selector: 'app-add-priod',
  templateUrl: './add-priod.component.html',
  styleUrl: './add-priod.component.css'
})
export class AddPriodComponent implements OnInit {

  @Input() ppriodDiv: boolean = true;
  @Output() pclosePopup = new EventEmitter<boolean>();
  @Input() ppriodList: any[] = [];
  @Output() rpriod = new EventEmitter<any>();

  priodForm: any = {
    period_no: null,
    shour: null,
    sminute : 0,
    sClock : "AM",
    ehour:  null,
    eminute: 0,
    eClock : "AM"
  }
   
  startingTime: string = "";
  endingTime: string = "";
 

  constructor(private _priodService: RoutineService) { }

  ngOnInit() { 
  }

  submitPriod() {
    if (this.priodForm.period_no != null && this.priodForm.period_no != 0) {
      const val = this.ppriodList.find(p => p.period_number === this.priodForm.period_no);

      if (val) {
   
        this.priodForm.period_no = null;
        alert("Period number exists: " + val.period_number);
      } else { 
        let sminute = "00";
        let eminute = "00";
        if (this.priodForm.sminute != 0) {
          sminute = this.priodForm.sminute;
        }
        if (this.priodForm.eminute != 0) {
          eminute = this.priodForm.eminute;
        }
        const data = {
          period_number: this.priodForm.period_no,
          start_time: this.priodForm.shour + ":" + sminute + "" + this.priodForm.sClock,
          end_time: this.priodForm.ehour + ":" + eminute + "" + this.priodForm.eClock
        };
        this._priodService.postPriod(data).subscribe(
          (success) => {
            this.pclosePopup.emit(false);
            this.rpriod.emit(success);
          },
          (error) => {
            console.log("Error in submission! ", error);
          }
        );
      }
    }
  }

  priodChange(pNo: any) {
    this.priodForm.period_no = pNo;
  }

  ppclosePopup() {
    this.pclosePopup.emit(false);  // Emit false when closing
  }

}

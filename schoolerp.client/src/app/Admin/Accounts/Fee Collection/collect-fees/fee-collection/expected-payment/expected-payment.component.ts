import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FeeCollectionService } from '../../../../../../Services/fee-collection.service';

@Component({
  selector: 'app-expected-payment',
  templateUrl: './expected-payment.component.html',
  styleUrls: ['./expected-payment.component.css']
})
export class ExpectedPaymentComponent implements OnChanges {

  monthlyFees: any[] = [];

  @Input() session: string = "";
  @Input() classId: number = 0;
  @Input() selectedMonths: any[] = [];
  grandTotal: string = "0";
  transportTotal: string = "0";
  actualTotal: number = 0;
  payTotal: number = 0;

  constructor(private _feecollectionService: FeeCollectionService) { }

  ngOnInit() {
    console.log("Init triggered....");
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if (this.session && this.classId > 0 && this.selectedMonths.length > 0) {
      this.loadMonthlyFees(this.session, this.classId, this.selectedMonths);
    }
  }

  loadMonthlyFees(session: string, clsId: number, monthIds: number[]) {
    this._feecollectionService.getMonthlyFee(session, clsId, monthIds).subscribe(
      data => {
        this.monthlyFees = data;
        const val = this.monthlyFees.map(f => {
          return f.total_amount
        }).reduce((acc, curr) => acc + curr, 0);
        this.grandTotal = val;
        this.payTotal = (Number)(this.grandTotal) + (Number)(this.transportTotal)
        this.actualTotal = this.payTotal;
        console.log('Monthly Fees:', this.monthlyFees);
      },
      error => {
        console.error('Error fetching monthly fees:', error);
      }
    );
  }
}

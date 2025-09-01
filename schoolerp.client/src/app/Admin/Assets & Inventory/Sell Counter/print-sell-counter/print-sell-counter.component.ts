import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';

@Component({
  selector: 'app-print-sell-counter',
  templateUrl: './print-sell-counter.component.html',
  styleUrl: './print-sell-counter.component.css'
})
export class PrintSellCounterComponent implements OnInit {

  sell_uid: string = "";
  inventoryData: any;
  studentInfo: any;
  totalAmount: number = 0;

  constructor(private route: ActivatedRoute, private _assetInventoryService: AssetsInventoryService) { }

  ngOnInit() {
    this.sell_uid = this.route.snapshot.paramMap.get('sell_uid') ?? "";

    this._assetInventoryService.getSingleInventorySell(this.sell_uid).subscribe(
      (response) => {
        this.inventoryData = response[0]; 
        if (response.length > 0) {
          this.studentInfo = response[0];  
          this.totalAmount = response.reduce((sum: number, item: any) => sum + item.total_amount, 0);
        }
      },
      (error) => {
        console.log("Error:", error);
      }
    );
  }

}

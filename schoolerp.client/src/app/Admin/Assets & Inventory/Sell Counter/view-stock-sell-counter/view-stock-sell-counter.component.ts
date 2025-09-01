import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { InventoryDTO } from '../../../../models/assetInventory';

@Component({
  selector: 'app-view-stock-sell-counter',
  templateUrl: './view-stock-sell-counter.component.html',
  styleUrl: './view-stock-sell-counter.component.css'
})
export class ViewStockSellCounterComponent implements OnInit {

  popupType: string = "Inventory";
  popupOpen: boolean = false;

  inventoryData: InventoryDTO[] = [];

  constructor(private _inventoryService: AssetsInventoryService) { }

  ngOnInit() {
    this._inventoryService.getInventories().subscribe(
      (next) => {
        this.inventoryData = next;  
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  printReport() {
    const printContents = document.querySelector('.printableInventory')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); 
    } else {
      console.error("Printable Inventory not found.");
    }
  }

  toggleCounter(str: string) {

  }

  openSellCounter() {
    this.popupOpen = true;
  }

  closePopup(event:any) {
    this.popupOpen = event;  
  }

}

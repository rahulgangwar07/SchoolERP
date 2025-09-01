import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { Inventory } from '../../../../models/assetInventory';
import { ClassService } from '../../../../Services/class.service';

@Component({
  selector: 'app-sell-report-sell-counter',
  templateUrl: './sell-report-sell-counter.component.html',
  styleUrl: './sell-report-sell-counter.component.css'
})
export class SellReportSellCounterComponent implements OnInit {

  today: Date = new Date();
  downloadedAt: string = '';
  invList: any;

  inventoryList: Inventory[] = [];
  classList: any[] = [];
   

  constructor(private _invetoryService: AssetsInventoryService, private _classService: ClassService) { }

  ngOnInit() {
    this.bindInventroy();
    this.bindClasses();
      this._invetoryService.getInventorySell().subscribe(
          (next) => { this.invList = next; },
      (error) => {
        console.log("Error in inventory List: ",error);
      }
    );
  }

  bindInventroy() {
    this._invetoryService.getInventories().subscribe(
      (response) => {
            this.inventoryList = response; 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  bindClasses() {
    this._classService.getActiveClass().subscribe(
      (next) => { this.classList = next; },
      (error) => {
        console.log("Error in class List: ", error);
      });
  }

  totalAmount(inv: any[]): number {
    return inv.reduce((sum, item) => sum + item.total_amount, 0);
  }
  totalDiscount(inv: any[]): number {
    return inv.reduce((sum, item) => sum + item.discount, 0);
  }
  totalDues(inv: any[]): number {
    return inv.reduce((sum, item) => sum + item.balance, 0);
  }

  itemName(inv: any[]): string {
    return inv.reduce((sum, item, index) => {
      return sum + (index > 0 ? ' | ' : '') + item.item_name;
    }, '');
  }

  className(cls_id: number): string {
    const cls = this.classList.find(f => f.class_id = cls_id);
    return cls.class_name;
  }

  

  printReport() {
    const printContents = document.querySelector('.printableArea')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();  
    } else {
      console.error("Printable area not found.");
    }
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Inventory,
  sellCounter,
} from '../../../../models/assetInventory';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { ClassService } from '../../../../Services/class.service';
import { SessionService } from '../../../../Services/session.service';
import { MatSelectChange } from '@angular/material/select'; 
import { SubjectsService } from '../../../../Services/subjects.service';

@Component({
  selector: 'app-inventory-sell-popup',
  templateUrl: './inventory-sell-popup.component.html',
  styleUrls: ['./inventory-sell-popup.component.css'],
})
export class InventorySellPopupComponent implements OnInit {
  @Input() requestType: string = '';
  @Input() popupOpen: boolean = false;
  @Output() popupClose = new EventEmitter<boolean>();

  inventoryList: Inventory[] = [];
  classList: any[] = [];
  activeSession: string = '';
  sessionList: any[] = []; 
  variantDataList: any[] = [];
  studentList: any[] = [];

  sC: sellCounter = {
    sell_id: 0,
    item_type: 'Inventory',
    item_id: 0,
    sub_item_id: 0,
    sell_uid: '',
    deployment_area_id: '0',
    student_id: 0,
    sell_date: '',
    quantity: 0,
    unit_price: 0,
    total_amount: 0,
    discount: 0,
    balance: 0,
    remark: '',
    sold_by: '',
    school_id: '',
  };

  mainAmount: number = 0;
  dues: number = 0;
  selectedVariant: { [key: number]: number } = {};

  constructor(
    private _assetInventoryService: AssetsInventoryService,
    private _classService: ClassService,
    private _sessionService: SessionService, private _studentService: SubjectsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  // Fetch all necessary data
  loadData() {
    this.bindInventoryList();
    this.bindClassList();
    this.bindSessionList();
  }

  classChange(cls_id: number) {
    this.bindStudentList(cls_id);
  }

  bindStudentList(cls_id:number) {
    this._studentService.getStudentOptionalSubject(cls_id, 0).subscribe(
      (response) => {
        this.studentList = response.optionalSubjectDtosList; 
      },
      (error) => { console.log("Error in fetching student"); }
    );
  }

  itemChange(event: MatSelectChange) {
    const selectedItemIds = event.value; 
    this.fetchVariantDetails(selectedItemIds);   
  }

  fetchVariantDetails(itemIds: number[]) {
    this._assetInventoryService.getInvVariantbyinv_ids(itemIds).subscribe({
      next: (variant) => {
        this.variantDataList = variant.map((vd: any[]) => ({
          inventory_id: vd[0]?.inventory_id,
          selectedVariantId: vd[0]?.variant_id,  
          newQuantity: 1,  
          value: vd.map((v: any) => ({
            ...v,
            newQuantity: 1,
            newAmount: v.unit_price
          }))
        })); 
      },
      error: (err) => console.error('Error fetching variants:', err),
    });
  } 

  selectVariant(inv_id: number) {
    const allVariants = this.variantDataList
      .map(group => group.value)  
      .flat();  

    return allVariants.filter(v => v.inventory_id === inv_id);
  }

  onVariantChange(group: any, selectedId: number) { 
    group.newQuantity = 1;
    const selected = group.value.find((v: any) => v.variant_id === selectedId);
    if (selected) { 
      selected.newQuantity = selected.newQuantity || 1;
      selected.newAmount = selected.unit_price;
       
    }
  }

  getSelectedVariant(group: any) { 
    return group.value.find((v: any) => v.variant_id === group.selectedVariantId);
  }


  changeAmount() {
    this.mainAmount = this.sC.total_amount - this.sC.discount;
    this.sC.balance = this.mainAmount;
  }

  changeBalance() {
    this.dues = this.sC.total_amount - this.sC.discount - this.sC.balance;
    this.mainAmount = this.sC.balance;
  }

  deployInventory() {
    this.sC.item_type = this.requestType;
    this.sC.sell_date = new Date().toISOString();  

    const itemDetails = this.variantDataList.map((group: any) => {
      const selectedVariant = group.value.find((v: any) => v.variant_id === group.selectedVariantId);
      return {
        inventory_id: group.inventory_id,
        variant_id: group.selectedVariantId,
        quantity: group.newQuantity,
        unit_price: selectedVariant.unit_price,
        total_price: selectedVariant.unit_price * group.newQuantity
      };
    });

    const payload = {
      ...this.sC,
      itemDetails: itemDetails
    };
     

    this._assetInventoryService.insertInventorySell(payload).subscribe({
      next: (res) => {
        console.log("Inventory deployed successfully", res);
        alert("Inventory sold successfully!");
        this.closePopup(); // close modal
      },
      error: (err) => {
        console.error("Error during inventory deployment:", err);
        alert("Error while selling inventory.");
      }
    });
  }


  closePopup() {
    this.popupClose.emit(false);
  }

  onQuantityChange(group: any) { 
    const selectedVariant = this.getSelectedVariant(group);

    if (selectedVariant) {
      selectedVariant.newAmount = selectedVariant.unit_price * group.newQuantity;
    }
     
    this.calculateTotalAmount();
  }

  calculateTotalAmount() { 

    this.mainAmount = this.variantDataList.reduce((total: number, group: any) => { 
      const selectedVariant = group.value.find((v: any) => v.variant_id === group.selectedVariantId); 
      if (selectedVariant) {
        return total + (selectedVariant.unit_price * group.newQuantity);
      }

      return total;
    }, 0);

    this.sC.total_amount = this.mainAmount;
    this.changeAmount();  
  }
   
  bindInventoryList() {
    this._assetInventoryService.getInventories().subscribe({
      next: (res) => (this.inventoryList = res),
      error: (err) => console.error('Error loading inventory:', err),
    });
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe({
      next: (res) => (this.classList = res),
      error: (err) => console.error('Error loading classes:', err),
    });
  }

  bindSessionList() {
    this._sessionService.getSession().subscribe({
      next: (res) => {
        this.sessionList = res;
        const active = this.sessionList.find((s) => s.status === true);
        this.activeSession = active ? active.session_name : '';
      },
      error: (err) => console.error('Error loading sessions:', err),
    });
  }
}

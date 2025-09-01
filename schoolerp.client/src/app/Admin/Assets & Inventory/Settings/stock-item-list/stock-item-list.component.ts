import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { Assets, Inventory, invVariant } from '../../../../models/assetInventory';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-stock-item-list',
  templateUrl: './stock-item-list.component.html',
  styleUrls: ['./stock-item-list.component.css']
})
export class StockItemListComponent implements OnInit {

  asset: Assets = {
    asset_id: 0,
    asset_name: '',
    description: '',
    asset_status: '',
    school_id: ''
  };

  assetList: Assets[] = [];

  inventory: Inventory = {
    inventory_id: 0,
    item_name: '',
    description: '',
    school_id: ''
  };

  inventory_id: number = 0;
  inventory_name: string = '';
  variantpPopup: boolean = false;

  variantList: invVariant[] = [];
  varient: invVariant = {
    variant_id:0,
    inventory_id:0,
    variant_name: '', 
    quantity:0,
    unit_price: 0,
    created_date: new Date(),
    school_id: '',
  }

  inventoryList: Inventory[] = [];

  selectedCategory: string = 'Asset';
  txtname: string = '';
  description: string = '';

  themeSetting: any;

  constructor(private _assetInventoryService: AssetsInventoryService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.variantList.push(this.varient);
    this.bindAssetList();
    this.bindInventoryList();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindAssetList() {
    this._assetInventoryService.getAssets().subscribe(
      (assets: Assets[]) => {
        this.assetList = assets; 
      },
      (error) => {
        console.log("Error in fetching Assets: ", error);
      }
    );
  }

  bindInventoryList() {
    this._assetInventoryService.getInventories().subscribe(
      (inventories: Inventory[]) => {
        this.inventoryList = inventories; 
      },
      (error) => {
        console.log("Error in fetching inventories: ", error);
      }
    );
  }

  onSubmit() {
    if (this.selectedCategory === "Asset") {
      this.asset.asset_name = this.txtname;
      this.asset.description = this.description;
      if (this.asset.asset_id == 0) {
        this.insertAssets();
      }
      else {
        this.updateAssets();
      } 
      
    } else if (this.selectedCategory === "Inventory") {
      this.inventory.item_name = this.txtname;
      this.inventory.description = this.description;
      if (this.inventory.inventory_id == 0) {
        this.insertInventory();
      }
      else {
        this.updateInventory();
      }
      
    }
  }

  insertAssets() {
    this._assetInventoryService.insertAssets(this.asset).subscribe(
      (response: Assets) => {
        this.assetList.push(response); 
        this.clear();
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  updateAssets() {
    this._assetInventoryService.updateAsset(this.asset).subscribe(
      (response: Assets) => {
        const index = this.assetList.findIndex(ass => ass.asset_id == this.asset.asset_id);
        this.assetList[index] = this.asset; 
      },
      (error) => {
        console.log("Error in updation: ",error);
      }
    );
  }

  insertInventory() {
    this._assetInventoryService.insertInventory(this.inventory).subscribe(
      (response: Inventory) => {
        this.inventoryList.push(response); 
        this.clear();
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  updateInventory() {
    this._assetInventoryService.updateInventory(this.inventory).subscribe(
      (response: Inventory) => {
        const index = this.inventoryList.findIndex(inv => inv.inventory_id == this.inventory.inventory_id);
        this.inventoryList[index] = this.inventory; 
      },
      (error) => {
        console.log("Error in updation: ", error);
      }
    );
  }

  // Edit Asset
  editAsset(asset: Assets) {
    this.asset.asset_id = asset.asset_id;
    this.txtname = asset.asset_name;
    this.description = asset.description;
    this.selectedCategory = "Asset";
  }

  // Edit Inventory
  editInventory(inventory: Inventory) {
    this.inventory.inventory_id = inventory.inventory_id;
    this.txtname = inventory.item_name;
    this.description = inventory.description;
    this.selectedCategory = "Inventory";
  }

  // Delete Asset
  deleteAssets(asset_id: number, index: number) {
    this._assetInventoryService.deleteAsset(asset_id).subscribe(
      (response) => {
        this.assetList.splice(index, 1);
        console.log("Asset deleted: ", response);
      },
      (error) => {
        console.log("Error deleting asset: ", error);
      }
    );
  }

  // Delete Inventory
  deleteInventory(inventory_id: number, index: number) {
    this._assetInventoryService.deleteInventory(inventory_id).subscribe(
      (response) => {
        this.inventoryList.splice(index, 1); 
      },
      (error) => {
        console.log("Error deleting inventory: ", error);
      }
    );
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  variantPopup(inv_id: number, inv_name: string) { 
    this._assetInventoryService.getInvVariantbyinv_id(inv_id).subscribe(
      (next) => { 
        if (next != 0)
          this.variantList = next[0];
        else {
          this.variantList = [];
          this.variantList.push(this.varient);   
        }
          
      },
      (error) => { console.log("Error in variant fetching: ", error); }
    );
    this.inventory_id = inv_id;
    this.inventory_name = inv_name;
    this.variantpPopup = true;
  }

  addVariant() { 
    this.variantList.push({
      variant_id: 0,
      inventory_id: 0,
      variant_name: '', 
      quantity: 0,
      unit_price: 0,
      created_date: new Date(),
      school_id: ''
    });
  }

  removeVariant(variant_id: number, index: number) { 
    this._assetInventoryService.deleteInvVariant(variant_id).subscribe(
      (next) => { this.variantList.splice(index, 1); },
      (error) => { console.log("Error in variant Deletion: ",error); }
    );
    this.variantList.splice(index, 1);
  }

  closePopupbtn() {
    this.variantpPopup = false;
  }

  insertVariant() { 
    this._assetInventoryService.insertInvvariant(this.variantList, this.inventory_id).subscribe(
      (next) => { 
        this.variantList = [];
        this.variantpPopup = false; 
      },
      (error) => {
        console.log("Error in variant insertion: ", error); 
      }
    );
  }

  clear() {
    this.selectedCategory = "Asset";
    this.txtname = "";
    this.description = "";
    this.asset.asset_id = 0;
    this.inventory.inventory_id = 0;
  }
}

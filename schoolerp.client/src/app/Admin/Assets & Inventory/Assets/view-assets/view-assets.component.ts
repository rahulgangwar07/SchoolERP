import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { Assets, purchaseEntries, Vendor } from '../../../../models/assetInventory';

@Component({
  selector: 'app-view-assets',
  templateUrl: './view-assets.component.html',
  styleUrl: './view-assets.component.css'
})
export class ViewAssetsComponent implements OnInit {

  assetList: Assets[] = [];
  vendorList: Vendor[] = [];

  purchase_entriesList: purchaseEntries[] = [];
  Fpurchase_entriesList: purchaseEntries[] = [];

  popupType: string = "Asset";
  popupOpen: boolean = false;

  constructor(private _assetInventoryService: AssetsInventoryService) { }

  ngOnInit() {
    this.bindAssetList();
    this.bindVendorList();
    this.bindPurchaseList();
  }

  bindPurchaseList() {
    this._assetInventoryService.getPurchaseEntries().subscribe(
      (purchase: purchaseEntries[]) => {
        this.purchase_entriesList = purchase;
        this.Fpurchase_entriesList = purchase; 
      },
      (error) => {
        console.log("Error in purchase entities : ",error);
      }
    );
  }

  bindAssetList() {
    this._assetInventoryService.getAssets().subscribe(
      (assets: Assets[]) => {
        this.assetList = assets;
      },
      (error) => {
        console.log("Error in assets fetching: ", error);
      }
    );
  }

  bindVendorList() {
    this._assetInventoryService.getVendors().subscribe(
      (vendors: Vendor[]) => {
        this.vendorList = vendors;
      },
      (error) => {
        console.log("Error in vendor fetching: ", error);
      }
    );
  }

  assetName(asset_id: number): string {
    const asset = this.assetList.find(al => al.asset_id == asset_id);
    return asset?.asset_name ?? "";
  }
  
  vendorName(vendor_id: number): string {
    const vendor = this.vendorList.find(al => al.vendor_id == vendor_id);
    return vendor?.vendor_name ?? "";
  }

  changeInput(event: any) {  
    const value = event.target.value.toLowerCase();
    this.Fpurchase_entriesList = this.purchase_entriesList.filter(pe => {
      const assetName = this.assetName(pe.asset_id).toLowerCase().includes(value);
      const vendorName = this.vendorName(pe.vendor_id).toLowerCase().includes(value);
      return assetName || vendorName;
    });
    
  }

  deletePurchase(purchase_EntryID: number, index: number) {
    this._assetInventoryService.deletePurchaseEntries(purchase_EntryID).subscribe(
      (purchase: purchaseEntries) => {
        this.Fpurchase_entriesList.splice(index, 1);
        console.log("Purchase: ", purchase);
      },
      (error) => {
        console.log("Error in purchase deletion. ",error);
      }
    );

  }

  openSellCounter() {
    this.popupOpen = true;
  }

  closePopup(event: any) {
    this.bindPurchaseList();
    this.popupOpen = event; 
  }

}

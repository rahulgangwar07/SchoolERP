import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { Assets, Inventory, purchaseEntries, Vendor } from '../../../../models/assetInventory';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.css']
})
export class AddAssetsComponent implements OnInit {

  assetList: Assets[] = []; 
  vendorList: Vendor[] = [];

  pEntry: purchaseEntries = {
    purchase_EntryID: 0,
    item_type: 1,
    asset_id: 0,
    vendor_id: 0,
    purchase_date: '',
    quantity: 0,
    unit_price: 0,
    total_amount: 0,
    weight: '',
    location: '',
    warranty_ExpiryDate: '',
    school_id: '',
  }

  purchase_EntryID: number = 0;
  themeSetting: any;

  constructor(private _assetInventoryService: AssetsInventoryService, private route: ActivatedRoute, private router: Router, private _settingService: GlobalSettingsService) { }

  ngOnInit() {

    this.purchase_EntryID = (Number)(this.route.snapshot.paramMap.get('purchase_EntryID')) ?? 0;

    this.bindAssetList(); 
    this.bindVendorList();
    if (this.purchase_EntryID != 0) {
      this.bindExistingPurchase();
    }
    this.themeSetting = this._settingService.getCurrentTheme();

  }

  calculateTotalAmount() {
    this.pEntry.total_amount = this.pEntry.quantity * this.pEntry.unit_price;
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

  bindExistingPurchase() {
    this._assetInventoryService.getPurchaseEntrybyId(this.purchase_EntryID).subscribe(
      (response: purchaseEntries) => {
        this.pEntry = response; 
      },
      (error) => {
        console.log("Error found: ",error);
      }
    );
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      // If the form is invalid, don't submit
      return;
    }
    if (this.pEntry.purchase_EntryID == 0) {
      this._assetInventoryService.insertPurchaseEntries(this.pEntry).subscribe(
        (success: purchaseEntries) => {
          this.clear(); 
        },
        (error) => {
          console.log("Error in submission: ", error);
        }
      );
    }
    else {
      this._assetInventoryService.updatePurchaseEntries(this.pEntry).subscribe(
        (success: purchaseEntries) => {  
          this.router.navigate(['/assets-inventory/assets/view']);
        },
        (error) => {
          console.log("Error in submission: ", error);
        }
      );
    }
    
  }

  clear() {
    this.pEntry = {
      purchase_EntryID: 0,
      item_type: 1,
      asset_id: 0,
      vendor_id: 0,
      purchase_date: '',
      quantity: 0,
      unit_price: 0,
      total_amount: 0,
      weight: '',
      location: '',
      warranty_ExpiryDate: '',
      school_id: '',
    }
  }

}

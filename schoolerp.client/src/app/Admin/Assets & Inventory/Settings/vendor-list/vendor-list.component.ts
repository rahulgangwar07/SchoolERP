import { Component, HostListener, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { Vendor } from '../../../../models/assetInventory';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListAComponent implements OnInit {

  vendor: Vendor = {
    vendor_id:0,
    vendor_name:'',
    contact:'',
    email:'',
    address:'',
    isactive:true,
    school_id:'',
  }

  vendorList: Vendor[] = [];
  toggleIndex: number | null = null;
  themeSetting: any;



  constructor(private _vendorService: AssetsInventoryService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindVendors();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindVendors() {
    this._vendorService.getVendors().subscribe(
      (success) => {
        this.vendorList = success; 
      },
      (error) => {
        console.log("Error: ",error);
      }

    );
  }

  toggleBtn(index: number) { 
    this.toggleIndex = this.toggleIndex === index ? null : index; 
  }

  editVendor(v: Vendor) {
    this.vendor = v;
  }

  deleteVendor(vendor_id: number, index: number) {
    this._vendorService.deleteVendor(vendor_id).subscribe(
      (success) => { 
        this.vendorList.splice(index,1);
        this.toggleIndex = null;
      },
      (error) => {
        console.log("Error in vendor deletion. ");
      }
    );
    
  }

  submitVendor() {
    if (this.vendor.vendor_name != "" && this.vendor.contact != "" && this.vendor.email != "") {
      if (this.vendor.vendor_id == 0) {
        this.insertVendor();
      } else {
        this.updateVendor();
      } 
    }
     
  }

  insertVendor() {
    this._vendorService.insertVendor(this.vendor).subscribe(
      (response: Vendor) => {
        this.vendorList.push(response); 
        this.clear();
      },
      (error) => {
        console.log("Error in vendor fetching.. ", error);
      }
    );
  }
  updateVendor() {
    this._vendorService.updateVendor(this.vendor).subscribe(
      (response: Vendor) => { 
        const index = this.vendorList.findIndex(v => v.vendor_id = response.vendor_id);
        if (index !== -1) {
          this.vendorList[index] = response;
        }
        this.clear();
      },
      (error) => {
        console.log("Error in vendor fetching.. ", error);
      }
    );
  }

  @HostListener("document:click", ['$event'])
  onChange(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-container') && !target.closest('.action-list')) {
      this.toggleIndex = null;
    }

  }

  clear() {
    this.vendor.vendor_id = 0;
    this.vendor.vendor_name = '';
    this.vendor.contact = '';
    this.vendor.email = '';
    this.vendor.address = '';
  }

  printVendorTable() {
    const printContents = document.querySelector('.printableVendorList')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();  
    } else {
      console.error("Vendor table not found!");
    }
  }


}

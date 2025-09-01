import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Assets, Inventory, InventoryDTO, invVariant, purchaseEntries, PurchaseTransaction, sellCounter, Vendor } from '../models/assetInventory';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class AssetsInventoryService {

  private apiurlVendor = environment.apiUrl + '/Vendor';
  private apiurlAssetsNInventory = environment.apiUrl + '/AssetsNInventory';
  private apiurlSellNParchase = environment.apiUrl + '/SellNParchase';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }


  //vendor apis
  getVendors() {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<Vendor[]>(`${this.apiurlVendor}/get-vendors?school_id=${school_id}`);
  }

  getVendorbyId(vendor_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Vendor>(`${this.apiurlVendor}/get-vendor-by-id?school_id=${school_id}&vendor_id=${vendor_id}`);
  }

  insertVendor(data: Vendor) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<Vendor>(`${this.apiurlVendor}/post-vendors?school_id=${school_id}`,data);
  }

  updateVendor(data: Vendor) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<Vendor>(`${this.apiurlVendor}/put-vendors?school_id=${school_id}`,data);
  }

  deleteVendor(vendor_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<Vendor>(`${this.apiurlVendor}/delete-vendor?school_id=${school_id}&vendor_id=${vendor_id}`);
  }

  //assets
  getAssets() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Assets[]>(`${this.apiurlAssetsNInventory}/get-assets?school_id=${school_id}`);
  }
   
  getAssetbyId(asset_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Assets>(`${this.apiurlAssetsNInventory}/get-asset-by-id?school_id=${school_id}&asset_id=${asset_id}`);
  }

  getAssetDeployeReport() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlAssetsNInventory}/get-asset-dep-report?school_id=${school_id}`);
  }

  
  insertAssets(data:Assets) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<Assets>(`${this.apiurlAssetsNInventory}/post-assets?school_id=${school_id}`,data);
  }
  
  updateAsset(data: Assets) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<Assets>(`${this.apiurlAssetsNInventory}/put-assets?school_id=${school_id}`, data);
  }

  deleteAsset(asset_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<Assets>(`${this.apiurlAssetsNInventory}/delete-asset?school_id=${school_id}&asset_id=${asset_id}`);
  }
  
  //inventory
  getInventories() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlAssetsNInventory}/get-inventories?school_id=${school_id}`);
  }
   
  getInventorybyId(inventory_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Inventory>(`${this.apiurlAssetsNInventory}/get-inventory-by-id?school_id=${school_id}&inventory_id=${inventory_id}`);
  }

  insertInventory(data: Inventory) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id; 
    return this.http.post<Inventory>(`${this.apiurlAssetsNInventory}/post-inventory?school_id=${school_id}`,data);
  }

  getInventorySell() {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurlSellNParchase}/get-inventory-sell?school_id=${school_id}`);
  }
  
  getSingleInventorySell(u_id:string) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurlSellNParchase}/get-uid-inventory-sell?school_id=${school_id}&Suid=${u_id}`);
  }

  insertInventorySell(data: any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post<any>(`${this.apiurlSellNParchase}/post-inventory-sell?school_id=${school_id}`, data);
  }

  updateInventory(data: Inventory) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<Inventory>(`${this.apiurlAssetsNInventory}/put-inventory?school_id=${school_id}`, data);
  }

  deleteInventory(inventory_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<Inventory>(`${this.apiurlAssetsNInventory}/delete-inventory?school_id=${school_id}&inventory_id=${inventory_id}`);
  }



  //inventory variant
  getInventoryVariant() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<invVariant[]>(`${this.apiurlAssetsNInventory}/get-inv-variant?school_id=${school_id}`);
  }
  
  getInvVariantbyinv_ids(inventory_id:number[]) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurlAssetsNInventory}/get-inv-variant-by-inv-id?school_id=${school_id}&inventory_id=${inventory_id}`);
    }
      
  getInvVariantbyinv_id(inventory_id:number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurlAssetsNInventory}/get-inv-variant-by-inv-id?school_id=${school_id}&inventory_id=${inventory_id}`);
    }

    insertInvvariant(data: invVariant[],inv_id:number) {
        const school_id = this._authService.getSchoolID(); 
        data.map(m => {
            return m.school_id = school_id, m.inventory_id = inv_id;
        })
      console.log("data: ",data);
      console.log("inv_id: ", inv_id);
        return this.http.post<invVariant[]>(`${this.apiurlAssetsNInventory}/post-inv-variant?school_id=${school_id}`,data);
    }

    deleteInvVariant(variant_id: number) { 
        const school_id = this._authService.getSchoolID();
        return this.http.delete<invVariant>(`${this.apiurlAssetsNInventory}/delete-inv-variant?school_id=${school_id}&variant_id=${variant_id}`);

    }

  

  //purchase Entries
  getPurchaseEntries() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<purchaseEntries[]>(`${this.apiurlSellNParchase}/get-purchase_entries?school_id=${school_id}`);
  }

  getPurchaseEntrybyId(purchase_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<purchaseEntries>(`${this.apiurlSellNParchase}/get-purchase_entries-by-id?school_id=${school_id}&purchase_id=${purchase_id}`);
  }

  getPurchaseEntrybyAsset(asset_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<purchaseEntries[]>(`${this.apiurlSellNParchase}/get-purchase_entries-by-asset-id?school_id=${school_id}&asset_id=${asset_id}`);
  }

  insertPurchaseEntries(data: purchaseEntries) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<purchaseEntries>(`${this.apiurlSellNParchase}/post-purchase_entries?school_id=${school_id}`,data);
  }

  updatePurchaseEntries(data: purchaseEntries) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<purchaseEntries>(`${this.apiurlSellNParchase}/put-purchase_entries?school_id=${school_id}`,data);
  }
  
  deletePurchaseEntries(purchase_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<purchaseEntries>(`${this.apiurlSellNParchase}/delete-purchase_entries?school_id=${school_id}&purchase_id=${purchase_id}`);
  }

  //Sell Entries
  getsellCounters() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<sellCounter[]>(`${this.apiurlSellNParchase}/get-sell-counter?school_id=${school_id}`);
  }

  getsellCountersbyId(sell_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<sellCounter>(`${this.apiurlSellNParchase}/get-sell-counter-by-id?school_id=${school_id}&sell_id=${sell_id}`);
  }

  insertsellCounters(data: sellCounter) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<sellCounter>(`${this.apiurlSellNParchase}/post-sell-counter?school_id=${school_id}`,data);
  }

  insertMultiplesellCounters(data: any) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<sellCounter>(`${this.apiurlSellNParchase}/post-multiple-sell-counter?school_id=${school_id}`,data);
  }

  updatesellCounters(data: sellCounter) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<sellCounter>(`${this.apiurlSellNParchase}/put-sell-counter?school_id=${school_id}`,data);
  }
  
  deletesellCounters(sell_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<sellCounter>(`${this.apiurlSellNParchase}/delete-sell-counter?school_id=${school_id}&sell_id=${sell_id}`);
  }

  //transaction Apis

  getTransaction() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<PurchaseTransaction[]>(`${this.apiurlVendor}/get-transaction?school_id=${school_id}`);
  }
  
  getTransactionbyId(trans_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<PurchaseTransaction[]>(`${this.apiurlVendor}/get-transaction-id?school_id=${school_id}&id=${trans_id}`);
  }

  insertTransaction(data: PurchaseTransaction) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<PurchaseTransaction>(`${this.apiurlVendor}/post-transaction?school_id=${school_id}`,data);
  }
  
  updateTransaction(trans_id:number,data: PurchaseTransaction) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<any>(`${this.apiurlVendor}/post-transaction?school_id=${school_id}&id=${trans_id}`,data);
  }
  
  deleteTransaction(trans_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurlVendor}/delete-transaction?school_id=${school_id}&id=${trans_id}`);
  }


}

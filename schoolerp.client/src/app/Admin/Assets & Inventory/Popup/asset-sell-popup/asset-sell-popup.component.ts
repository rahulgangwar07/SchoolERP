import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assets, purchaseEntries, purchaseEntriesAsset, sellCounter } from '../../../../models/assetInventory';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';
import { SessionService } from '../../../../Services/session.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-asset-sell-popup',
  templateUrl: './asset-sell-popup.component.html',
  styleUrls: ['./asset-sell-popup.component.css']
})
export class AssetSellPopupComponent implements OnInit {

  @Input() requestType: string = "";
  @Input() popupOpen: boolean = false;
  @Output() popupClose = new EventEmitter<boolean>();

  assetList: Assets[] = [];
  sessionList: any[] = [];
  purchaseData: purchaseEntriesAsset[] = [];

  sC: sellCounter = {
    sell_id: 0,
    item_type: 'Asset',
    item_id: 0,
    sub_item_id: 0,
    sell_uid: '',
    deployment_area_id: 'office',
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
  }

  activeSession: string = "";
  mainAmount: number = 0;
  dues: number = 0;

  themeSetting: any;


  constructor(
    private _assetInventoryService: AssetsInventoryService,
    private _sessionService: SessionService, private _settingService: GlobalSettingsService
  ) { }

  ngOnInit() {
    this.bindAssetList();
    this.bindSessionList();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindAssetList() {
    this._assetInventoryService.getAssets().subscribe(
      (assets: Assets[]) => {
        this.assetList = assets; 
      },
      (error) => {
        console.log("Error fetching asset list:", error);
      }
    );
  }

  bindSessionList() {
    this._sessionService.getSession().subscribe(
      (sessions) => {
        this.sessionList = sessions;
        const activeSession = this.sessionList.find(session => session.status === true);
        if (activeSession) {
          this.activeSession = activeSession.session_name;
        }
      },
      (error) => {
        console.log("Error fetching session list:", error);
      }
    );
  }

  itemChange(event: any) {
    const itemId = event.target.value;
    this.fetchPurchaseDetails(itemId);
  }

  fetchPurchaseDetails(itemId: number) {
    this._assetInventoryService.getPurchaseEntrybyAsset(itemId).subscribe(
      (purchase: purchaseEntries[]) => {
        let data = purchase.map(d => {
          return {
            ...d,
            newQuantity : 1
          }
        })
        this.purchaseData = data; 
        this.calculateAmount();
      },
      (error) => {
        console.log("Error fetching purchase details:", error);
      }
    );
  }

  assetName(asset_id: number): string {
    const asset = this.assetList.find((ass) => ass.asset_id === asset_id);
    return asset?.asset_name ?? "Unknown Asset";
  }

  calculateAmount() {
    if (this.purchaseData && this.sC.quantity) {
      const itemPrice = this.purchaseData[0]?.unit_price ?? 0; 
      this.sC.total_amount = itemPrice * this.sC.quantity;
      this.mainAmount = this.sC.total_amount - this.sC.discount;
      this.sC.balance = this.mainAmount;
      this.dues = this.sC.balance;
    }
  }

  deployAsset() {
    let value = {
      sell_1: this.sC,
      purchase_1: this.purchaseData
    }
    this._assetInventoryService.insertMultiplesellCounters(value).subscribe(
      (response) => { 
        this.closePopup();
      },
      (error) => {
        console.log("Error: ",error);
      }
    ); 
    // Add the deployment logic here, for example, updating the backend with the deployed asset details
  }

  closeAsset(index: number) {
    this.purchaseData.splice(index, 1);
  }

  closePopup() {
    this.popupClose.emit(false);
  }
}


export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  contact: string;
  email: string;
  address: string;
  isactive: boolean;
  school_id: string;
}

export interface Assets { 
  asset_id: number;
  asset_name: string;
  description: string; 
  asset_status: string; 
  school_id: string;
}

export interface Inventory {
  inventory_id: number;
  item_name: string;
  description: string; 
  school_id: string;
}

export interface InventoryDTO {
  inventory_id: number;
  item_name: string;
  description: string; 
  school_id: string;
  inventory_s: invVariant[]
}

export interface invVariant { 
  variant_id: number;
  inventory_id: number;
  variant_name: string; 
  quantity: number; 
  unit_price: number;
  created_date: Date | string;
  school_id: string;
}

export interface invVariantEntries extends invVariant {
  newQuantity: number;
  newAmount:number
}

//export interface invVariantEntriesGroup {
//  value: invVariantEntries[]
//}

export interface purchaseEntries {
  [x: string]: any;
  purchase_EntryID: number;
  item_type: number; 
  asset_id: number; 
  vendor_id: number;
  purchase_date: Date | string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  weight: string;
  location: string;
  warranty_ExpiryDate: Date | string;
  school_id: string;
}

export interface purchaseEntriesAsset extends purchaseEntries {
  newQuantity:number
}

export interface sellCounter {
  sell_id: number;
  item_type: string;
  item_id: number; 
  sub_item_id: number; 
  sell_uid: string; 
  deployment_area_id: string; 
  student_id: number; 
  sell_date: Date | string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  discount: number;
  balance: number;
  remark: string;
  sold_by: string;
  school_id: string;
}

export interface PurchaseTransaction {
  transaction_id: number;
  vendor_id: number | null;
  item_id: number;
  contact: string;
  transaction_date: Date;
  amount: number;
  dues: number;
  notes?: string;
  isActive: boolean;
  entered_by?: string;
  school_id: string;
  created_at?: Date;
}



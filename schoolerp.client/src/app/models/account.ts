

export interface fee_type_master {
  fee_type_id: number;
  fee_type_name: string;
  month: number;
  description: string;
  IsDeleted: boolean;
  cDate: Date;
  mDate: Date;
  school_id: string;
}

export interface fee_head_master {
  fee_head_id: number; 
  fee_head_name: string;
  description: string;
  IsMandatory: boolean;
  school_id: string;
  IsDeleted: boolean;
  cDate: Date;
  mDate: Date; 
}
 
export interface fee_head_master_DTOs {
  fee_head_id: number; 
  fee_head_name: string;
  description: string;
  IsMandatory: boolean;
  school_id: string;
  IsDeleted: boolean;
  cDate: Date;
  mDate: Date;
  feeType: feeTypeDto;
}

export interface feeTypeDto {
  fee_type_id: number;
  fee_type_name: number;
  description: number;
}

export interface fee_head_mapping {
  fee_head_mapping_id: number;
  fee_head_id: number;
  fee_type_id: number;
  session: string;
  school_id: string;
  IsDeleted?: boolean;
  cDate?: Date;
  mDate?: Date;
}


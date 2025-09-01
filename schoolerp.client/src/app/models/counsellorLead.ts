

export interface lead_type {
  lead_type_id:number,
  name: string,
  category_type: string,
  isActive: boolean,
  school_id:string,
}


export interface leads {
  lead_id:number,
  lead_type_id:number,
  name: string,
  father_name: string,
  mother_name: string,
  phone: string,
  address: string,
  date: Date | string,
  next_followup: Date | string,
  comment: string,
  isActive: boolean,
  school_id: string,
  followups?: follow_up[];
}


export interface follow_up {
  followup_id:number,
  lead_id:number,
  followup_date: Date,
  followup_action: string,
  followup_result: string,
  isActive: boolean,
  school_id:string,
}

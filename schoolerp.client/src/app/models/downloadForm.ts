
export interface downloadForm {
  form_id:number,
  form_name:string,
  form_url: string,
  form_type: string,
  isActive: boolean,
  created_at:Date,
  school_id: string,
}

export interface downloadFormDTOs {
  form_id:number,
  form_name: string,
  form_url: File | null,
  form_type: string, 
}

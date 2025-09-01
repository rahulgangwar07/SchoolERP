
export interface certificate_t {
  template_id:number,
  title: string,
  template_body: string,
  header: string,
  footer: string,
  macros_used: string, 
  background_image: string,
  is_active: boolean,
  school_id:string,
  created_at:Date,
  updated_at: Date,
}

export interface issue_cert {
  issue_id:number,
  stu_id:number,
  template_id:number,
  issue_date: Date,
  issued_by:number,
  issued_role: string,
  reason: string,
  remarks: string,
  generated_file_path: string,
  is_active: boolean,
  session:string, 
  school_id:string, 
}

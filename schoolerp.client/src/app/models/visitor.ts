
export interface visitor {
  visitor_id:number,
  visitor_name:string,
  visitor_contact: string,
  visitor_email: string,
  meeting_with: string,
  purpose_of_visit: string,
  appointment_date:Date | string,
  check_in_time: Date | string,
  check_out_time: Date | string,
  visitor_status: string,
  addres: string,
  visitor_image: string,
  school_id: string,
  created_at: Date,
  updated_at: Date,
  [key: string]: any;
} 

import { publish } from "rxjs";


export interface Macro {
  marco_id: number;
  macro_name: string;
  description: string;
  created_At: string;  
  updated_At: string;  
}

export interface templateTypes {
  typeid: number;
  typename: string;
  isActive: boolean; 
  description: string;  
}

export interface SMSTemplates {
  id: number;
  template_id: string;
  template_Name: string;
  template_type_id: number;
  template_Content: string;
  isDLTApproved: boolean;  
  DLT_submissionDate: Date;  
  approval_Status: string;  
  remarks: string;    
  isActive: boolean;  
  school_id: string;  
  created_At: Date;  
  updated_At: Date;  
  created_by: string;  
  updated_by: string;  
}

export interface SMSTemplatesDTOs {
  id: number;
  template_id: string;
  template_Name: string;
  template_type_id: number;
  template_Content: string;
  isDLTApproved: boolean;    
}

export interface SMSGatewaySettings {
  setting_id: number;
  school_id: string;
  sms_enabled: boolean;
  sms_service: number;
  voice_sms_enabled: boolean;  
  forget_password_sms_enabled: boolean;  
  sms_username: string;  
  sms_password: string;  
  primary_sender_id: string;  
  secondary_sender_id: string;  
  api_url: string;  
  delivery_api_url: string;  
  check_balance_api_url: string;  
  route_id: number;  
  api_status: string;  
  created_at: Date;
  updated_at: Date;  
  created_by: string;  
  updated_by: string;     
}

export interface SMSLogDtos {
  id: number,
  template_id: string,
  sentby: string,
  messageTo:string,
  orignal_Message:string,
  mobileNos: string,
  class_ids: string
}


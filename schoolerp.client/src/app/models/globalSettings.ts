
export interface globalheader {
  setting_id: number,
  school_id: string,
  global_header: string,
  header_image: string,
  header_bgcolor: string,
  header_text_color: string,
  logo_url: string,
  font_family: string,
  is_active: boolean,
  last_updated: Date,
  created_by: string,

}

export interface signatureSettings {
  setting_id: number,
  school_id: string,
  examination_controller_signature: string,
  center_controller_signature: string,
  director_signature: string,
  icard_signature: string,
  last_updated_date: Date 
}


export interface supportContactSettings {
  setting_id: number,
  school_id: string,
  support_email: string,
  support_phone: string,
  grievance_cell: string,
  accountdepartment: string,
  examcell: string 
  admissioncell: string 
  support_address: string 
}

export interface supportContact {
  setting_id: number,
  school_id: string,
  support_email: string,
  support_phone: string,
  grievance_cell: string,
  accountdepartment: string, 
  examcell: string, 
  admissioncell: string, 
  support_address: string
}

export interface applicationThemeSetting {
  setting_id: number,
  school_id: string,
  appTheme_website_url: string,
  youtube_url: string,
  primary_color: string,
  secondary_color: string, 
  button_color: string, 
  sidebar_bgcolor: string, 
  sidebar_color: string
  favicon_url: string 
}





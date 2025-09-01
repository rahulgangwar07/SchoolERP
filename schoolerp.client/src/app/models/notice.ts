
export interface notices {
  notice_id:number,
  subject:string,
  notice:string,
  notice_for:string,
  notice_type:string,
  class_ids:string,
  sec_id: number,
  video_link:string,
  file_path: string,
  created_At: Date,
  created_By: string,
  isActive: boolean,
  school_id:string,
}


export interface important_Programs {
  program_id:number,
  title:string,
  description:string,
  program_For:string,
  filePath:string,
  created_On: Date, 
  created_date: Date, 
  isActive: boolean,
  school_id:string
}

export interface communication {
  communication_id: number,
  subject: string,
  created_by: number,
  created_role: string,
  class_id: number,
  question: string,
  answer: string,
  asked_at: Date,
  asked_to: number,
  answered_by: string,
  answered_role: string, 
  answered_at: Date,
  isOpen: boolean,
  isActive: boolean,
  school_id: string
}




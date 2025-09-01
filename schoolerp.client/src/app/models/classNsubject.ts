
export interface Subject {
  subject_id:number,
  subject_name:string,
  subjectCode: string,
  IsActive: boolean,
  optional: boolean,
  priority:number,
  created_date:Date | string,
  school_id: string,
}

export interface ClassSubjects {
  class_id:number,
  subject_id:number, 
  IsActive: boolean,  
  session: string,
  school_id: string,
}

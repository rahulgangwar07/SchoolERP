 
export interface LibraryBook {
  book_id: number;
  book_type: string;
  title: string;
  isbn_no: string;
  author: string;
  edition: string;
  volume: string;
  publisher: string;
  price: number | null;
  no_of_copies: number | null;
  no_of_pages: number;
  almeria_no: string | null;
  rack_no: string | null;
  position: string | null;
  accession_no: string;
  book_language: string;
  class_id: number;  
  subject_id: number; 
  status: boolean; 
  school_id: string;
  created_at: Date;  
  updated_at?: Date;  
}
 
export interface LibraryMember {
  member_id: number;
  member_type: string;  
  member_unique_id: number; 
  full_name: string;    
  class_id?: string;  
  department?: string;  
  mobile_no: string;
  email: string;
  status: boolean;  
  created_by: string;
  school_id: string;
}

 

export interface LibraryIssue {
  issue_id: number;
  book_id: number;   
  accession_no: string;   
  member_id: number | null; 
  userType: string; 
  issue_date: Date;  
  due_date: Date;    
  return_date?: Date; 
  submitted_date?: Date; 
  status: string;    
  remarks?: string;
  created_by: string;
  session: string;
  school_id: string;
}
 

export interface LibraryFine {
  finr_id: number;
  issue_id: number;  
  fine_amount: number;
  is_paid: boolean;  
  paid_date?: Date;  
  session: string;
  school_id: string;
}



export interface holiday {
  id:number,
  title: string,
  description: string, 
  start_date:Date,
  end_date:Date,
  event_type: string,
  user_type: string,
  isDeleted: boolean,
  school_id: string,
  created_by: string,
  created_at: Date,
  updated_at: Date,
}

export interface galleryCategory {
  category_id:number,
  category_name: string,
  isActive: boolean,
  created_at:Date,
  updated_at:Date,
  school_id: string,
}

export interface imageGallery {
  img_id:number,
  img_url: string,
  category_id:number,
  title: string,
  description: string,
  isActive: boolean,
  uploaded_at: Date | string, 
  school_id: string,
}
 

export interface imageGImage extends imageGallery {
  image: File
}


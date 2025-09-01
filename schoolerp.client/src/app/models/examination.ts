
 
export interface exam_term {
  id: number;
  exam_term_id: number;
  term_name: string;
  start_date: Date;
  end_date: Date;
  isActive: boolean;
  session: string;
  school_id: string;
}
 

export interface exam_type {
  exam_type_id: number;
  exam_type_name: string;
  exam_type_cat: number;
  description: string;
  orderid: number;
  school_id: string;
}
 

export interface exam_name {
  exam_name_id: number;
  term_id: number; 
  exam_type_id: number;
  exam_title: string;
  start_date: Date | string | null;
  end_date: Date | string | null;
  is_active: boolean;
  order_id: number;
  session: string;
  school_id: string;
}

export interface exam_name_DTOs {
  exam_name_id: number;
  term_id: number;
  exam_term: exam_term;
  exam_type_id: number;
  exam_title: string;
  start_date: Date | string | null;
  end_date: Date | string | null;
  is_active: boolean;
  order_id: number;
  session: string;
  school_id: string;
}
 

export interface exam_set {
  exam_set_id: number;
  exam_name_id: number;
  common_exam_set_id: number; 
  session: string;
  school_id: string;
}

export interface exam_set_DTOs {
  exam_set_id: number;
  exam_name_id: number;
  exam_name: exam_name_DTOs;
  common_exam_set_id: number; 
  session: string;
  school_id: string;
}

export interface GroupedExamSetDto {
  common_exam_set_id: number;
  exam_sets: exam_set_DTOs[];
  assign_exam_sets: assign_exam_set[];
}
 
export interface assign_exam_set {
  assign_id: number;
  common_exam_set_id: number;
  class_id: number;
  session: string;
  school_id: string;
}

export interface define_weightage {
  exam_set_weightage_id: number;
  exam_set_id: number;
  weightage: number;
  session: string;
  school_id: string;
}

export interface define_max_min {
  exam_set_marks_id: number;
  exam_set_id: number;
  max_marks: number;
  min_marks: number;
  session: string;
  school_id: string;
}

interface MaxMinItem {
  exam_set_id: number;
  max_marks: number;
  min_marks: number;
}

export interface SaveMaxMinPayload {
  common_exam_set_id: number;
  maxMinList: MaxMinItem[];
}
 

export interface marks_entry {
  marks_entry_id: number;
  student_id: number;
  set_id: number;
  exam_id: number;
  term_id: number;
  class_id: number;
  sec_id: number;
  subject_id: number;
  obtained_marks?: number | null;
  is_absent: boolean;
  marks_entry_date: Date;
  graded_by?: number | null;
  session: string;
  school_id: string;
}

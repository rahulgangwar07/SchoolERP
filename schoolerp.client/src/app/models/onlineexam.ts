
export interface ExamPermission {
  exam_id: number;
  result_restriction: boolean;
  exam_restriction: boolean;
  result_date: string;
  lock_date: string;
  ans_sheet_status: boolean;
  session: string;
  school_id: string;
}

export interface studentExam {
  student_exam_id:number,
  stu_id:number,
  exam_id:number,
  exam_date:Date,
  result_date:Date,
  status: string,
  marks_obtained:number,
  school_id:string,
}

export interface BaseQuestion {
  question_id: number;
  exam_id: number;
  question_text: string;
  question_type: string;
  marks: number;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  correct_option: number;
  isActive: boolean;
  school_id: string;
  select_class: boolean;
}


export interface QuestionDTOs extends BaseQuestion {
  student_answer: string;
  selected_option: string;
}

export interface studentAnswer {
  answer_id: number,
  student_exam_id: number,
  question_id: number,
  selected_option: number,
  answer_text: string,
  marks_awarded: number,
  school_id: string,

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';
import { studentAnswer, studentExam } from '../models/onlineexam';

@Injectable({
  providedIn: 'root'
})
export class OnlineExamService {

  private readonly apiurl = environment.apiUrl + '/Exam';
  private readonly apiurlans = environment.apiUrl + '/StudentExam';
  private readonly apiurlresult = environment.apiUrl + '/StudentExam';
  private readonly apiurlQA = environment.apiUrl + '/QuestionAnswer';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }


  getOnlineExams() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/get-exams?school_id=${school_id}&session=${session}`);
  }

  getSingleOnlineExams(exam_id:string) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/get-exam-by-id?school_id=${school_id}&session=${session}&exam_id=${exam_id}`);
  }

  postOnlineExam(data:any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID(); 
    return this.http.post<any>(`${this.apiurl}/post-exams?school_id=${school_id}&session=${session}`,data);
  }

  postExamHeader(pHeader: any) { 
    return this.http.post<any>(`${this.apiurl}/exam-permissions`, pHeader);
  }

  deleteExam(exam_id: string) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.delete<any>(`${this.apiurl}/delete-exam?school_id=${school_id}&session=${session}&exam_id=${exam_id}`);
  }

  bindstuData(exam_id:number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurlans}/get-stu-exams?school_id=${school_id}&session=${session}&exam_id=${exam_id}`);
  }

  updateStudentResultDate(exam_id: number, student_exam_id: number, exam_date:string) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const values = {
      exam_id: exam_id,
      student_exam_id: student_exam_id,
      exam_date: exam_date
    }
    return this.http.put<any>(`${this.apiurl}/update-stu-result-date?school_id=${school_id}`, values);
  }
   

  getQuestion(exam_id: string) {
    const school_id = this._authService.getSchoolID();  
    return this.http.get<any>(`${this.apiurlQA}/get-question?school_id=${school_id}&exam_id=${exam_id}`)
  }

  getQuestionWAnswer(exam_id: number, stu_exam_id: number) {
    const school_id = this._authService.getSchoolID();  
    return this.http.get<any>(`${this.apiurlQA}/get-question-with-ans?school_id=${school_id}&exam_id=${exam_id}&stu_exam_id=${stu_exam_id}`)
  }

  getSingleQuestion(exam_id:string, question_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlQA}/get-single-question?school_id=${school_id}&exam_id=${exam_id}&question_id=${question_id}`)
  }

  postQuestion(data: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    data.school_id = school_id; 
    return this.http.post<any>(`${this.apiurlQA}/add-question?session=${session}`, data)
  }

  deleteQuestion(exam_id: string, question_id: number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.delete<any>(`${this.apiurlQA}/delete-question?school_id=${school_id}&exam_id=${exam_id}&question_id=${question_id}`)
  }

  postAnswer(stu_exam_id: number, answers: studentAnswer[]) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<studentAnswer>(`${this.apiurlQA}/post-answers?school_id=${school_id}&stu_exam_id=${stu_exam_id}`, answers);
  }

  postSingleAnswer(quesAns: studentAnswer) {
    const school_id = this._authService.getSchoolID();
    quesAns.school_id = school_id; 
    return this.http.post<studentAnswer>(`${this.apiurlQA}/post-single-answer?school_id=${school_id}`,quesAns);
  }

  updateAnswer(ans_id: number, option: number, answer_text: string,marks: number) {
    const school_id = this._authService.getSchoolID();
    const headers = new HttpHeaders({
      'option': option.toString(),
      'answer_text': answer_text,
      'marks': marks
    });
    return this.http.put<any>(`${this.apiurlQA}/put-answers?school_id=${school_id}&ans_id=${ans_id}`, null, { headers });
  }

  getStudentExambyId(stu_exam_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<studentExam>(`${this.apiurlans}/get-student-exam-by-id?school_id=${school_id}&stu_exam_id=${stu_exam_id}`);
  }

  getStudentResult(cls_id: number, sec_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlresult}/all-student-result?school_id=${school_id}&class_id=${cls_id}&sec_id=${sec_id}`);
  }

  deleteStudentResult(stu_exam_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurlresult}/delete-student-result?school_id=${school_id}&stu_exam_id=${stu_exam_id}`);
  }

}



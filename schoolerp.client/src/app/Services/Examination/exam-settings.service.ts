import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthServiceService } from '../AuthServiceService';
import { SaveMaxMinPayload, exam_term } from '../../models/examination';

@Injectable({
  providedIn: 'root'
})
export class ExamSettingsService {

  private apiurl = environment.apiUrl + '/ExamTypes';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }
        
  GetExamTerms() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamTerms?school_id=${school_id}`);
  } 

  GetExamTermById(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamTermById/${id}?school_id=${school_id}`);
  }

  GetExamTermBySession(session: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamTermBySession/${session}?school_id=${school_id}`);
  }

  GetExamTypes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamTypes?school_id=${school_id}`);
  }

  GetExamTypeById(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamTypeById/${id}?school_id=${school_id}`);
  }

  GetExamTypeByCatId(catid: number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurl}/GetExamTypeByCatId/${catid}?school_id=${school_id}`);
  }

  GetExamNames() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamNames?school_id=${school_id}`);
  }

  GetExamNameById(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamNameById/${id}?school_id=${school_id}`);
  }
   

  GetExamSets() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamSets?school_id=${school_id}`);
  }

  GetExamSetById(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamSetById/${id}?school_id=${school_id}`);
  }

  GetExamSetAssignments() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamSetAssignments?school_id=${school_id}`);
  }

  GetExamSetAssignmentsById(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamSetAssignmentsById/${id}?school_id=${school_id}`);
  }
   
  GetExamWeightage() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetExamWeightage?school_id=${school_id}`);
  }
   
  GetWeightagesByCommonSetId(common_exam_set_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/GetWeightagesByCommonSetId/${common_exam_set_id}?school_id=${school_id}`);
  }

  SaveExamTerm(examTerm: exam_term) {
    const school_id = this._authService.getSchoolID();
    examTerm.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamTerm?school_id=${school_id}`, examTerm);
  }

  SaveExamType(examType: any) {
    const school_id = this._authService.getSchoolID();
    examType.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamType?school_id=${school_id}`, examType);
  }

  SaveExamName(examName: any) {
    const school_id = this._authService.getSchoolID();
    examName.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamName?school_id=${school_id}`, examName);
  }

  SaveExamSet(examSet: any) {
    const school_id = this._authService.getSchoolID();
    examSet.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamSet?school_id=${school_id}`, examSet);
  }

  SaveExamSetAssignment(examSetAssignment: any) {
    const school_id = this._authService.getSchoolID();
    examSetAssignment.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamSetAssignment?school_id=${school_id}`, examSetAssignment);
  }
  

  SaveExamWeightage(examWeigthage: any) {
    debugger;
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    examWeigthage.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/CreateExamWeightage?school_id=${school_id}&session=${session}`, examWeigthage);
  }

  SaveMaxMinMarks(examMaxMin: SaveMaxMinPayload) {
    debugger;
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID(); 
    return this.http.post<any>(`${this.apiurl}/CreateExamMaxMin?school_id=${school_id}&session=${session}`, examMaxMin);
  }

  UpdateExamTerm(id: number, examTerm: any) {
    const school_id = this._authService.getSchoolID();
    examTerm.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamTerm/${id}?school_id=${school_id}`, examTerm);
  }

  UpdateExamType(id: number, examType: any) {
    const school_id = this._authService.getSchoolID();
    examType.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamType/${id}?school_id=${school_id}`, examType);
  }

  UpdateExamName(id: number, examName: any) {
    const school_id = this._authService.getSchoolID();
    examName.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamName/${id}?school_id=${school_id}`, examName);
  }

  UpdateExamSet(id: number, examSet: any) {
    const school_id = this._authService.getSchoolID();
    examSet.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamSet/${id}?school_id=${school_id}`, examSet);
  }

  UpdateExamSetAssignment(id: number, examSetAssignment: any) {
    const school_id = this._authService.getSchoolID();
    examSetAssignment.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamSetAssignment/${id}?school_id=${school_id}`, examSetAssignment);
  }

  UpdateExamWeightage(id: number, define_Weightage: any) {
    const school_id = this._authService.getSchoolID();
    define_Weightage.school_id = school_id;
    return this.http.put<any>(`${this.apiurl}/UpdateExamWeightage/${id}?school_id=${school_id}`, define_Weightage);
  }

  DeleteExamTerm(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamTerm/${id}?school_id=${school_id}`);
  }

  DeleteExamType(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamType/${id}?school_id=${school_id}`);
  }

  DeleteExamName(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamName/${id}?school_id=${school_id}`);
  }

  DeleteExamSet(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamSet/${id}?school_id=${school_id}`);
  }

  DeleteExamSetAssignment(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamSetAssignment/${id}?school_id=${school_id}`);
  }
    
  DeleteExamWeightage(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/DeleteExamWeightage/${id}?school_id=${school_id}`);
  }
    

}

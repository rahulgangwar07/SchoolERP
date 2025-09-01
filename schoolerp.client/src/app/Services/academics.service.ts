import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {

  private apiurl = environment.apiUrl + '/Academics';

  constructor(private http: HttpClient,private _authService:AuthServiceService) { }

  getlearningMaterial() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/learning-material?school_id=${school_id}`);
  }
  getlearningMaterialbyIds(clsId:number,subId:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/learning-material-id?school_id=${school_id}&clsId=${clsId}&subid=${subId}`);
  }

  uploadLearningMaterial(formdata: FormData) {
    const school_id = this._authService.getSchoolID();
    formdata.append('school_id', school_id);
    console.log("Formdata: ",formdata);
    return this.http.post<any>(`${this.apiurl}/upload-learning-material`,formdata);
  }

  uploadAssignment(formData: FormData) {
    const school_id = this._authService.getSchoolID(); 
    const user_id = this._authService.getUserID();
      //formData.forEach((value, key) => {
      //  console.log(key + ': ' + value);
      //}); 
    return this.http.post<any>(`${this.apiurl}/submit-assignment?school_id=${school_id}&created_by=${user_id}`, formData,);
  }

  getAssignment(type: string) {
    const school_id = this._authService.getSchoolID();
    const desig_id = this._authService.getDsignationID();
    const user_id = this._authService.getUserID();
    return this.http.get<any>(`${this.apiurl}/get-assignment?school_id=${school_id}&desig_id=${desig_id}&user_id=${user_id}&type=${type}`);
  }

  getAssignmentReport(class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID(); 
    return this.http.get<any>(`${this.apiurl}/get-student-report?school_id=${school_id}&session=${session}&class_id=${class_id}`);
  }

  getAssignmentReply(reply_id:number,assignment_id:string,uid:string) { 
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/get-assignment-reply?school_id=${school_id}&session=${session}&reply_id=${reply_id}&assignment_id=${assignment_id}&uid=${uid}`);
  }

  submitAssignmentReply(type:string,data: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    data.session = session;
    return this.http.post<any>(`${this.apiurl}/submit-assignment-reply?school_id=${school_id}&session=${session}&type=${type}`, data);
  }

  updateAssignment(data: any) {
    const school_id = this._authService.getSchoolID();
    const userid = this._authService.getUserID();
    data[0].created_by = userid; 
    return this.http.put<any>(`${this.apiurl}/put-assignment?school_id=${school_id}`, data[0]);
  }

  deleteAssignment(assignment_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-assignment?school_id=${school_id}&assignment_id=${assignment_id}`);
  }

  getVideoTutorial(userRole: string, userId: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-videoTutorial?school_id=${school_id}&userRole=${userRole}&userId=${userId}`);
  }

  getVideoTutorialbyId(assignment_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-video-Tutorial-by-id?school_id=${school_id}&assignment_id=${assignment_id}`);
  }

}

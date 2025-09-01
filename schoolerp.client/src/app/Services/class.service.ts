import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment'; // Import environment
import { Subject } from '../models/classNsubject';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiurl = environment.apiUrl + '/Class';  

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  addClass(clsDetail: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    clsDetail.school_id = school_id;
    clsDetail.session = session;
    return this.http.post<any>(`${this.apiurl}/postClass`, clsDetail);
  }

  getClass() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getClass?school_id=${school_id}`);
  }

  getActiveClass() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const isAdmin = this._authService.getUserRole() == "Faculty";
    if (isAdmin) {
      const user = this._authService.getUserID();
      return this.http.get<any>(`${this.apiurl}/getActiveClassforFaculty?school_id=${school_id}&session=${session}&teacherId=${user}`);
    } else {
      return this.http.get<any>(`${this.apiurl}/getActiveClass?school_id=${school_id}&session=${session}`);
    }
  }

  getClassbyId(clsId: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/getClassbyId/${clsId}?school_id=${school_id}&session=${session}`);
  }

  deleteClass(clsId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deleteClass?clsId=${clsId}&school_id=${school_id}`);
  }

  getSection(cls_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/getSection/${cls_id}?school_id=${school_id}&session=${session}`);
  }

  getActiveSection(cls_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/getActiveSection/${cls_id}?school_id=${school_id}&session=${session}`);
  }

  postSection(sec_detail: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    sec_detail.school_id = school_id;
    sec_detail.session = session;
    return this.http.post<any>(`${this.apiurl}/postSection`, sec_detail);
  }

  deleteSection(sec_id: number, class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.delete<any>(`${this.apiurl}/deleteSection/${class_id}?sec_id=${sec_id}&school_id=${school_id}&session=${session}`);
  }

}

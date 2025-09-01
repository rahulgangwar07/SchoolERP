import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment'; // Import the environment configuration
import { ClassSubjects, Subject } from '../models/classNsubject';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  private apiurl = environment.apiUrl + '/Subjects';
  private apiOptional = environment.apiOptional;

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getSingleSubject(sub_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Subject>(`${this.apiurl}/getSingleSubject?school_id=${school_id}&sub_id=${sub_id}`);
  }

  getSubjects() {
    const school_id = this._authService.getSchoolID();
    const isAdmin = this._authService.getUserRole() == "Faculty";
    if (isAdmin) {
      const faculty_id = this._authService.getUserID();
      return this.http.get<Subject[]>(`${this.apiurl}/getSubjectsforFaculty?school_id=${school_id}&teacherId=${faculty_id}`);
    } else {
      return this.http.get<Subject[]>(`${this.apiurl}/getSubjects?school_id=${school_id}`);
    }
  }

  getSubjectsbyClass(class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const isAdmin = this._authService.getUserRole() == "Faculty";
    if (isAdmin) {
      const faculty_id = this._authService.getUserID();
      return this.http.get<Subject[]>(`${environment.apiUrl}/Subjects/getSubjectsbyClassforFaculty?school_id=${school_id}&session=${session}&class_id=${class_id}&teacherId=${faculty_id}`);
    } else {
      return this.http.get<Subject[]>(`${this.apiurl}/getSubjectsbyClass?school_id=${school_id}&session=${session}&class_id=${class_id}`);
    }
  }

  insertSubject(formdata: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/postSubjects?school_id=${school_id}`, formdata);
  }

  deleteSubjects(sub_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deleteSubjects?school_id=${school_id}&subject_id=${sub_id}`);
  }

  deleteSingleClsSubject(sub_id: number, class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'school_id': school_id,
      'session': session,
      'class_id': class_id.toString(),
      'sub_id': sub_id.toString()
    });
    return this.http.delete<ClassSubjects>(`${this.apiurl}/deleteSubjectinCls`, { headers });
  }

  insertClassSubject(cls_id: number, data: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const headers = {
      'Content-Type': 'application/json',
      'class_id': cls_id.toString(),
      'school_id': school_id,
      'session': session
    };
    return this.http.post<any>(`${this.apiurl}/insertClassSubject`, data, { headers });
  }

  // Working with Optional Subject

  getStudentOptionalSubject(class_id: number, sec_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'school_id': school_id,
      'session': session,
      'class_id': class_id.toString(),
      'sec_id': sec_id.toString()
    });

    return this.http.get<any>(`${this.apiOptional}/optionalSubject`, { headers });
  }

  insertDeleteStudentOptionalSubject(stu_id: number, subject_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'school_id': school_id,
      'session': session,
      'subject_id': subject_id.toString(),
      'stu_id': stu_id.toString()
    });
    return this.http.post<any>(`${this.apiOptional}/insertNdeleteOptSubject`, null, { headers });
  }

}

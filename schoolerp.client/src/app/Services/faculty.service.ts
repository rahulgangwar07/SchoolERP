import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private apiurl = environment.apiUrl + '/Faculty'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  facultyLogin() { 
    return this.http.get<any>(`${this.apiurl}/login`);
  }

  getAllFaculty() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getAll?school_id=${school_id}`);
  }

  getOnlyTeacher() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getTeachers?school_id=${school_id}`);
  }

  getFacultybyId(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getFaculty/${id}?school_id=${school_id}`);
  }

  insertClassTeacher(fac_id: number, class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'school_id': school_id,
      'session': session,
      'class_id': class_id.toString(),
      'faculty_id': fac_id.toString()
    });
     
    return this.http.post<any>(`${this.apiurl}/insertClassTeacher`, {}, { headers });
  }

  postFaculty(faculty: any) {
    const school_id = this._authService.getSchoolID(); 
    faculty.school_id = school_id; 
    return this.http.post<any>(`${this.apiurl}/create`, faculty);
  }

  updateFaculty(id: number, faculty: any) {
    return this.http.put<any>(`${this.apiurl}/update/${id}`, faculty);
  }

  changePswd(id: number, password: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/changePswd/${id}?school_id=${school_id}&pswd=${password}`);
  }

  changeFacStatus(id: number, status: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/changeStatusofFaculty/${id}?status=${status}&school_id=${school_id}`);
  }

  getWithdrawnFaculty() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getdeletedFaculty?school_id=${school_id}`)
  }

  getAlumniFaculty() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getAlumni?school_id=${school_id}`)
  }

  deletePermanent(id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deletePermanent/${id}?school_id=${school_id}`);
    //return this.http.delete<any>(`${this.apiurl}/changeStatusofFaculty/${id}?status=${status}&school_id=${school_id}`);
  }
    
  
  //faculty Attendance APIs

  facultyAttendaceData(date: any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurl}/getAttendanceInfo?school_id=${school_id}&date=${date}`);
  }

  facultyAttendaceInsert(facultyList: any[], dateTime: any) {
    const school_id = this._authService.getSchoolID(); 

    return this.http.post<any>(`${this.apiurl}/postAttendanceInfo?school_id=${school_id}&dateTime=${dateTime}`, facultyList);
  }

  monthlyAttendanceReport(date: any) {
    const selectedDate = new Date(date); 

    const param = {
      month: (selectedDate.getMonth() + 1).toString().padStart(2, '0'),
      year: selectedDate.getFullYear(),
      school_id: this._authService.getSchoolID()
    };

    const params = new HttpParams()
      .set('month', param.month.toString())
      .set('year', param.year.toString())
      .set('school_id', param.school_id.toString());
       
    return this.http.get<any>(`${this.apiurl}/facultyAttendanceReport`, {params})
  }


  //mappign with Subject And class
  mapSubjects(mappingData: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/mapSubject?school_id=${school_id}`, mappingData);
  }

  mapClasses(mappingData: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/mapClasses?school_id=${school_id}`, mappingData);
  }

  getmapSubjects(teacherId:string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getmapSubject?school_id=${school_id}&teacherId=${teacherId}`);
  }

  getmapClasses(teacherId: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getmapClasses?school_id=${school_id}&teacherId=${teacherId}`);
  }


  


  //deleteFaculty(id: number) {
  //  const school_id = this._authService.getSchoolID();
  //  return this.http.delete<any>(`${this.apiurl}/delete/${id}?school_id=${school_id}`);
  //}

  //moveAlumni(id: number) {
  //  const school_id = this._authService.getSchoolID();
  //  return this.http.delete<any>(`${this.apiurl}/moveAlumni/${id}?school_id=${school_id}`);
  //}

}

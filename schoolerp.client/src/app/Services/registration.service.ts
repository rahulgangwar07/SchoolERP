import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { of } from 'rxjs/internal/observable/of';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService implements OnInit {

  private apiurl = environment.apiUrl + '/Registration';
  //private apiurl = 'https://localhost:7030/api/Registration';
  //school_id: string = "";

  constructor(private http: HttpClient, private _authService: AuthServiceService) {
  }

  ngOnInit() {
     
    //this.school_id = this._authService.getSchoolID();
  }

  getStudent(status: string) {
    const schoolId = this._authService.getSchoolID();
    const isAdmin = this._authService.getUserRole() == "Faculty";
    if (isAdmin) {
      const faculty_id = this._authService.getUserID();
      return this.http.get<any>(`${this.apiurl}/getStudentforFaculty?status=${status}&school_id=${schoolId}&teacherId=${faculty_id}`);
    }
    else {
      return this.http.get<any>(`${this.apiurl}/getStudent?status=${status}&school_id=${schoolId}`);
    }
    
  }

  getStudentbyId(id: number, status: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    if (school_id) {
      return this.http.get<any>(`${this.apiurl}/getStudentbyId/${id}?status=${status}&school_id=${school_id}&session=${session}`);
    }
    return of(null);  
  }

  postStudent(formData: any) { 
    return this.http.post<any>(`${this.apiurl}/postStudent`, formData);
  }


  postFULLStudent(nuid: number, step: number, formData: any) {
    const school_id = this._authService.getSchoolID();  
    formData.set('school_id', school_id); 
    for (let key in formData.entities) {
      if (formData.entities.hasOwnProperty(key)) {
        let value = formData.entities[key]; 
      }
    } 

    return this.http.post<any>(`${this.apiurl}/postFULLStudent/${nuid}/${step}`, formData);
  }


  deleteStudent(uid: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deletestu/${uid}?school_id=${school_id}`);
  }
  restoreStudent(uid: number,stu_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/restorestu/${uid}?stu_id=${stu_id}&school_id=${school_id}`,null);
  }

  registrationno(regno:string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getRegistrationno/${regno}?school_id=${school_id}`);
  }

  isActiveStatus(uid:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/stuisActive/${uid}?school_id=${school_id}`,null);
  }

  moveToalumni(uid: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/moveToalumni/${uid}?school_id=${school_id}`, null);
  }

  changepsw(uid: number, psword: string, user_id: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/changePassword/${uid}?school_id=${school_id}&psword=${psword}&user_id=${user_id}`);
  }
  /*uid: number, psword: string, user_id: string*/
  trashboxData() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/trashboxAlumniData?school_id=${school_id}&status=Inactive`);
  }

  getAlumniData() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/trashboxAlumniData?school_id=${school_id}&status=Withdrawn`);
  }

  permanentDelete(uid:number,stu_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/permanentDelete/${uid}?school_id=${school_id}`,stu_id);
  }

  generateTC(uid: number, stuId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/generateTC/${uid}/${stuId}?school_id=${school_id}`);
  }

  //postEnquiry() {
  //  return this.http.post();
  //}

}

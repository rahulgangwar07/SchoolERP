import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  private apiurl = environment.apiUrl + '/Routine';
  //private apiurl = 'https://localhost:7030/api/Routine';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getPeriod() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getPriod?school_id=${school_id}`);
  }
  
  postPriod(data:any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post<any>(`${this.apiurl}/postPriod?school_id=${school_id}`,data)
  }

  deletePriod(number: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deletePriod/?period_id=${number}&school_id=${school_id}`);
  }

  getSchedule(routine: string) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    
    return this.http.get<any>(`${this.apiurl}/getClassSchedule?school_id=${school_id}&session=${session}&routine=${routine}`);
  }

  getSchedulebyId(sche_id: string) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
     const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'school_id': school_id,
      'session': session,
      'schedule_id': sche_id
     });
    return this.http.get<any>(`${this.apiurl}/getSchedulebyId`,  {  headers });
  }

  postSchedule(data:any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    data.school_id = school_id;
    data.session = session;
    console.log("DAta is : ", data)
    //return true;
    return this.http.post<any>(`${this.apiurl}/postSchedule`,data)
  }

  deleteClassSchedule(sch_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.delete<any>(`${this.apiurl}/deleteClassSchedule?school_id=${school_id}&session=${session}&schedule_id=${sch_id}`)
  }

  getTeacherSchedule() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/getTeacherSchedule?school_id=${school_id}&session=${session}`);
  }

  getSchedulePeriodPrint(class_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();

    return this.http.get<any>(`${this.apiurl}/getSchedulePeriodPrint?school_id=${school_id}&session=${session}&class_id=${class_id}`)
  }
 
}

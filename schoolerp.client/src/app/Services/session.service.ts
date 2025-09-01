import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiurl = environment.apiUrl + '/Session';
  //private apiurl = 'https://localhost:7030/api/Session';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getActiveSession(): string {
    return localStorage.getItem('session') || "";
  }

  getSingleSession(school_id: string, desig_id:number) { 
    return this.http.get<any>(`${this.apiurl}/getSingleSession?school_id=${school_id}&desig_id=${desig_id}`); 
  }

  getSession() { 
    const school_id = this._authService.getSchoolID();
    const desig_id = this._authService.getDsignationID(); 
    return this.http.get<any>(`${this.apiurl}/getSession?school_id=${school_id}&desig_id=${desig_id}`);
  }

  postSession(data:any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post<any>(`${this.apiurl}/postSession?school_id=${school_id}`,data);
  }

  updateSession(sessionData:any) {
    const desig_id = this._authService.getDsignationID(); 
    return this.http.put<any>(`${this.apiurl}/updateSession/${desig_id}`,sessionData);
  }

  deleteSession(session_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/deleteSession?school_id=${school_id}&session_id=${session_id}`);
  }

}

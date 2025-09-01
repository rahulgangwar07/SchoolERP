import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiurl = environment.apiUrl + '/Designation';
  //private apiurl = 'https://localhost:7030/api/Designation';

  constructor(private http: HttpClient,private _authService:AuthServiceService) { }

  getAllDesignation() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiurl}/getDesignation`, { headers });
  }

  checkDesignation(facultyId: number) {
    //const token = localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const schoolId = this._authService.getSchoolID();

    return this.http.get<any>(`${this.apiurl}/checkDesignation/${facultyId}?schoolId=${schoolId}`);
  }

  assignDesignation(facultyId: number, selectedDesignationId: number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/assignDesignation/${facultyId}?des_id=${selectedDesignationId}&school_id=${schoolId}`, selectedDesignationId, { withCredentials: true });
  }
}

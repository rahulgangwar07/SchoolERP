import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';
import { hostal } from '../models/hostal';

@Injectable({
  providedIn: 'root'
})
export class HostalService {

  private apiurl = environment.apiUrl + '/Hostal';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getHostal() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<hostal[]>(`${this.apiurl}/get-hostal?school_id=${school_id}`);
  }
  
  getHostalbyId(hostal_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<hostal>(`${this.apiurl}/get-hostal-by-id?school_id=${school_id}&hostal_id=${hostal_id}`);
  }
  
  postHostal(hostal:hostal) {
    const school_id = this._authService.getSchoolID();
    hostal.school_id = school_id;
    return this.http.post<hostal>(`${this.apiurl}/post-hostal?school_id=${school_id}`, hostal);
  }
  
  updateHostal(hostal: hostal) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<hostal>(`${this.apiurl}/update-hostal?school_id=${school_id}`,hostal);
  }
  
  deleteHostal(hostal_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<hostal>(`${this.apiurl}/delete-hostal?school_id=${school_id}&hostal_id=${hostal_id}`);
  }

}

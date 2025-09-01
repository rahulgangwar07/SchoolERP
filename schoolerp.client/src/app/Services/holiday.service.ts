import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private apiurl = environment.apiUrl + '/Holiday';
  //private apiurl = 'https://localhost:7030/api/Holiday';

  constructor(private http: HttpClient,private _authService:AuthServiceService) { }

  getHolidays() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getHolidays?school_id=${school_id}`);
  }


  insertHolidays(data: any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();

    data.school_id = school_id;
    data.created_by = created_by; 
    return this.http.post<any>(`${this.apiurl}/insert-holiday`, data);
  }

  deleteHoliday(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-holiday?school_id=${school_id}&id=${id}`);
  }

}

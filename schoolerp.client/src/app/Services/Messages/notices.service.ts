import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../AuthServiceService';
import { important_Programs } from '../../models/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  private apiurl = environment.apiUrl + '/Notice';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }


  getNotices() {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurl}/get-notices?school_id=${school_id}`);
  }

  getNoticebyId(notice_id:number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurl}/get-notice-by-id?school_id=${school_id}&notice_id=${notice_id}`);
  }

  insertNotice(data: any, file: File) {
    const school_id = this._authService.getSchoolID();
    const user_id = this._authService.getUserID();
     
    data.school_id = school_id;
    data.created_By = user_id;
    data.created_At = new Date().toISOString();  
    const formData = new FormData();
     
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        console.log("hasOwnProperty: ", key, data[key]);
        formData.append(key, data[key]);
      }
    } 
    formData.append('file', file);
     
    return this.http.post<any>(`${this.apiurl}/post-notices?school_id=${school_id}`, formData);
  }


  deleteNotices(notice_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-notices?school_id=${school_id}&notice_id=${notice_id}`);
  }

  getPrograms() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<important_Programs[]>(`${this.apiurl}/get-programs?school_id=${school_id}`);
  }

  getProgrambyid(program_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<important_Programs>(`${this.apiurl}/get-program-by-id?school_id=${school_id}&program_id=${program_id}`);
  }

  insertPrograms(data: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/post-programs?school_id=${school_id}`,data);
}

}

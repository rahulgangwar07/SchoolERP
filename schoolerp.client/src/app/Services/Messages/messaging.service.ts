import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../AuthServiceService';
import { SMSLogDtos } from '../../models/sms';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private apiurl = environment.apiUrl + '/Messaging';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getComposeSMS() {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<any>(`${this.apiurl}/get-composed-sms?school_id=${school_id}`);
  }

  insertSMS(data: SMSLogDtos) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const user_id = this._authService.getUserID();
    data.sentby = user_id ?? "";
    return this.http.post<any>(`${this.apiurl}/post-sms?school_id=${school_id}&session=${session}`, data);
  }

}

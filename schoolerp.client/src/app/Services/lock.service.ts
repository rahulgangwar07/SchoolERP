import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class LockService {

  private apiurl = environment.apiUrl + '/Lock'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  checkStatus(lock_type:number,session:string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/status?school_id=${school_id}&session=${session}&lock_type=${lock_type}`,);
     
  }

  lockInstallment(lockData:any) {
    const school_id = this._authService.getSchoolID();
    const user_id = this._authService.getUserID();
    lockData.school_id = school_id;
    lockData.locked_by = user_id; 

    return this.http.post<any>(`${this.apiurl}/lock-module`, lockData);
  }

}

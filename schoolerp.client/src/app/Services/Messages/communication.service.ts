import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthServiceService } from '../AuthServiceService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private apiurl = environment.apiUrl + '/Communication';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }



  getFaculties() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const userRole = this._authService.getUserRole();
    const userId = this._authService.getUserID();
    const class_id = this._authService.getClassId();
    if (userRole == 'Student') {
      return this.http.get<any>(`${this.apiurl}/get-faculties-classwise?school_id=${school_id}&session=${session}&uid=${userId}&class_id=${class_id}`);
    }
    else {
      return this.http.get<any>(`${this.apiurl}/get-faculties?school_id=${school_id}&session=${session}`);
    }

  }

  getCommunications() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/get-communications?school_id=${school_id}&session=${session}`);
  }

  getCommunicationbyId(communcation_id:number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.apiurl}/get-communication-by-id?school_id=${school_id}&session=${session}&com_id=${communcation_id}`);
  }
  

  getCommunicationbyFId(f_id:number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const userRole = this._authService.getUserRole(); 
    if (userRole == "Student") {
      const stu_uid = this._authService.getUserID();
      return this.http.get<any>(`${this.apiurl}/get-comm-by-stu?school_id=${school_id}&session=${session}&f_id=${f_id}&stu_uid=${stu_uid}`);
    }
    else {
      return this.http.get<any>(`${this.apiurl}/get-comm-by-fid?school_id=${school_id}&session=${session}&f_id=${f_id}`);
    } 
  }

  insertCommunication(request:string,data: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/post-communication?school_id=${school_id}&request=${request}`,data);
  }

  deleteCommunication(communcation_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-communication?school_id=${school_id}&com_id=${communcation_id}`);
  }

}

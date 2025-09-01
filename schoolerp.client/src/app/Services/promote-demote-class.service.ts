import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class PromoteDemoteClassService {

  private apiurl = environment.apiUrl + '/Promote';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getStudentsforPromote(session:string,class_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-StudentsforPromote?school_id=${school_id}&session=${session}&class_id=${class_id}`);
  }
  
  getStudentsforDemote(session: string, class_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-StudentsforDemote?school_id=${school_id}&session=${session}&class_id=${class_id}`);
  }
  
  insertPromoteDemoteStundent(data:any) {
    const school_id = this._authService.getSchoolID();
    console.log("insertPromoteDemoteStundent: ", data); 
    return this.http.post<any>(`${this.apiurl}/post-promote-demote-stundent?school_id=${school_id}`,data);
  }



}

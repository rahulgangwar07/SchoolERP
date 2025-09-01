import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private apiurl = environment.apiUrl + '/Certificate';  

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getCertificate() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-certificate?school_id=${school_id}`);
  }

  getCertificatebyId(template_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-certificate-by-id?school_id=${school_id}&template_id=${template_id}`);
  }

  insertCertificate(data:any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/post-certificate?school_id=${school_id}`, data);
  }

  issueCertificate(data: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    data.school_id = school_id;
    data.session = session;
    return this.http.post<any>(`${this.apiurl}/issue-certificate?school_id=${school_id}`, data); 
  }

}

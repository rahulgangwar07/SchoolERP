import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiurl = environment.apiUrl + '/School';
  private apiurlCredential = environment.apiUrl + '/Login';
  //private apiurl = 'https://localhost:7030/api/School';
  //private apiurlCredential = 'https://localhost:7030/api/Login';

  constructor(private http: HttpClient) { }


  getAllSchools(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiurl}`);
  }

  getSchoolById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getSchoolById/${id}`);
  }

  postSchool(schoolData: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}`, schoolData);
  }

  putSchool(schoolData: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/${id}`, schoolData);
  }

  sendpasswordviaMail(school_id: string, email: string,user_id: string, password: string) {
    return this.http.post<any>(`${this.apiurlCredential}/send-credentials?school_id=${school_id}&UserEmail=${email}&UserId=${user_id}&UserPassword=${password}`, null);
  }

  getAdmin(school_id: string) {
    return this.http.get<any>(`${this.apiurl}/get-admins?school_id=${school_id}`);
  }


}

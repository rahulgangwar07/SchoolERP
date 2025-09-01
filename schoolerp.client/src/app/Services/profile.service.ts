import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiurl = environment.apiUrl + '/Profile';
  //private apiurl = 'https://localhost:7030/api/Profile';

  constructor(private http: HttpClient) { }

  getProfile(faculty_id: number,school_id: string) {

    return this.http.get(`${this.apiurl}/getProfile/${faculty_id}?school_id=${school_id}`);
  }

  updateProfile(faculty_id: number, profile: any) { 
    return this.http.post<any>(`${this.apiurl}/updateProfile/${faculty_id}`, profile);
  }

  updatePassword(faculty_id: number, profile: any) { 
    return this.http.post<any>(`${this.apiurl}/updatePassword/${faculty_id}`, profile);
  }
  

}

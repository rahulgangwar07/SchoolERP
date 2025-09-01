import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperadminService {

  private apiurl = environment.apiUrl + '/Dashboard'

  constructor(private http: HttpClient) { }

  header() {
    return this.http.get<any>(`${this.apiurl}/superadmin-header`);
  }

  sessionwise_stuData() {
    return this.http.get<any>(`${this.apiurl}/sessionwise-data`);
  }

}

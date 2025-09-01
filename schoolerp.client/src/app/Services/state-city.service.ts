import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateCityService {

  private apiurl = environment.apiUrl + '/CityState';
  //private apiurl = 'https://localhost:7030/api/CityState';

  constructor(private http: HttpClient) { }

  getState() {
    return this.http.get<any>(`${this.apiurl}/getStates`);
  }

}

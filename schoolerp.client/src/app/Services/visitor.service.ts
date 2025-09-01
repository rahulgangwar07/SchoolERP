import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { visitor } from '../models/visitor';
import { AuthServiceService } from './AuthServiceService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private readonly apiurl = environment.apiUrl + '/Visitor';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getVisitors(): Observable<visitor[]> {
    const school_id = this._authService.getSchoolID();
    return this.http.get<visitor[]>(`${this.apiurl}/get-visitors?school_id=${school_id}`);
  }

  getVisitorbyId(visitor_id: number): Observable<visitor> {
    const school_id = this._authService.getSchoolID();
    return this.http.get<visitor>(`${this.apiurl}/get-visitor-by-id?school_id=${school_id}&visitor_id=${visitor_id}`);
  }

  addVisitor(visitor: visitor, file: File): Observable<any> {
    const school_id = this._authService.getSchoolID();
    visitor.school_id = school_id;

    const formData = new FormData();
    for (const key in visitor) {
      if (visitor.hasOwnProperty(key)) {
        formData.append(key, visitor[key]);
      }
    }
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiurl}/post-visitor?school_id=${school_id}`, formData);
  }

  updateVisitor(visitor: visitor, file: File): Observable<any> {
    const school_id = this._authService.getSchoolID();
    const formData = new FormData();
    for (const key in visitor) {
      if (visitor.hasOwnProperty(key)) {
        formData.append(key, visitor[key]);
      }
    }
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http.put<any>(`${this.apiurl}/update-visitor?school_id=${school_id}`, formData);
  }

  deleteVisitor(visitor_id: number): Observable<any> {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-visitor?school_id=${school_id}&visitor_id=${visitor_id}`);
  }
}

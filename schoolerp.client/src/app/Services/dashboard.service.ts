import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiurl = environment.apiUrl + '/Dashboard';  // Dynamically set API URL from environment
  private adminDashboard = environment.adminDashboardUrl; // Dynamically set Admin Dashboard URL
  private studentDashboard = environment.studentDashboardUrl; // Dynamically set Student Dashboard URL

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  schoolDetail() {
    return this.http.get<any>(`${this.apiurl}/school-info`);
  }

  getHeaderDetail(school_id: string, session: string) {
    return this.http.get<any>(`${this.adminDashboard}/getHeader?school_id=${school_id}&session=${session}`);
  }

  getClasswiseStatics(school_id: string) {
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.adminDashboard}/classwiseStatics?school_id=${school_id}&session=${session}`);
  }

  upComingBirthday() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    return this.http.get<any>(`${this.adminDashboard}/upComingBirthday?school_id=${school_id}&session=${session}`);
  }

  getStudentHeader(stu_id: number) {
    const school_id = this._authService.getSchoolID();
    const session = "2024 - 2025";  // This should be dynamically set if required
    return this.http.get<any>(`${this.studentDashboard}/headerDashboard?school_id=${school_id}&session=${session}&stu_id=${stu_id}`);
  }

}

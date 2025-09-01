import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment"; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Replace the hardcoded API URL with the one from environment configuration
  private apiurl = environment.apiUrl;  // Dynamically set API URL

  private userRoleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || ""); // Initialize with value from localStorage
  userRole$ = this.userRoleSubject.asObservable(); // Observable to allow subscription

  constructor(private http: HttpClient) { }

  // Login request to backend
  loginRequest(request: any) {
    return this.http.post<any>(`${this.apiurl}/Login`, request); // Use environment URL
  }

  // Handle SuperAdmin login
  loginRequestforSuperAdmin(request: any) {
    return this.http.post<any>(`${this.apiurl}/Login/SuperAdminLogin`, request); // Use environment URL
  }

  // Set role, user ID, and token in localStorage
  setUserRole(role: string, user_id: string, desig_id: string, token: string, school_id: string, session: string, class_id: string) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', user_id);
    localStorage.setItem('desig_id', desig_id);
    localStorage.setItem('token', token);
    localStorage.setItem('school_id', school_id);
    localStorage.setItem('session', session);
    localStorage.setItem('class_id', class_id);

    this.userRoleSubject.next(role);
  }
   
  // Retrieve the user ID from localStorage
  getUserID(): string | null {
    return localStorage.getItem('userId');
  }

  getSchoolID(): string {
    return localStorage.getItem('school_id') || "";
  }

  getSessionID(): string {
    return localStorage.getItem('session') || "";
  }

  getDsignationID(): string {
    return localStorage.getItem('desig_id') || "";
  }

  // Retrieve the user role from the BehaviorSubject or localStorage
  getUserRole(): string {
    return this.userRoleSubject.getValue();
  }

  getClassId(): string {
    return localStorage.getItem('class_id') || "0";
  }

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Clear user role, user ID, and token from localStorage
  clearUserRole() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('desig_id');
    localStorage.removeItem('token');
    localStorage.removeItem('school_id');
    localStorage.removeItem('session');
    localStorage.removeItem('class_id');
    this.userRoleSubject.next("");
  }
   
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  generateImageAccessToken(imageName: string,folder:string): string {
    const schoolId = this.getSchoolID();
    if (!schoolId || !imageName || !folder) {
      throw new Error('School ID or Image Name or folder is not avaiable!');
    } 
    const tokenData = `${schoolId}:${imageName}:${folder}`; 
    return btoa(tokenData);  
  }


}

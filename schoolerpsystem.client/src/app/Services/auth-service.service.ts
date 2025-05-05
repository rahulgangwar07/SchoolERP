import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiurl = 'https://localhost:7030/api';
  private userRoleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || "");  // Initialize with value from localStorage
  userRole$ = this.userRoleSubject.asObservable();  // Observable to allow subscription

  constructor(private http: HttpClient) { }

  // Login request to backend
  loginRequest(request: any) {
    return this.http.post<any>(`${this.apiurl}/Login`, request);
  }

  // Handle SuperAdmin login
  loginRequestforSuperAdmin(request: any) {
    console.log("SuperAdmin request:", request);
    return this.http.post<any>(`${this.apiurl}/Login/SuperAdminLogin`, request);
  }

  // Set role, user ID, and token in localStorage
  setUserRole(role: string, user_id: string, token: string, school_id: string) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', user_id);
    localStorage.setItem('token', token);  // Store the token
    localStorage.setItem('school_id', school_id);

    this.userRoleSubject.next(role);  // Update the role in BehaviorSubject
  }

  // Retrieve the user ID from localStorage
  getUserID(): string | null {
    return localStorage.getItem('userId');
  }
  getSchoolID(): string {
    return localStorage.getItem('school_id') || "";
  }
   
  getUserRole(): string {
    return this.userRoleSubject.getValue();
  }
   
  getToken(): string | null {
    return localStorage.getItem('token');
  }
   
  clearUserRole() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');  
    localStorage.removeItem('school_id');
    this.userRoleSubject.next(""); 
  }
   
  isAuthenticated(): boolean {
    return !!this.getToken();  
  }
}

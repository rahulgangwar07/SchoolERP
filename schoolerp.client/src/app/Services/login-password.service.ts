import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginPasswordService {
  private apiurl = environment.apiUrl + '/Login';
  //private apiurl = 'https://localhost:7030/api/Login';

  constructor(private http: HttpClient) { }

  sendOtps(email: string, otp: string, otpExpiry: Date, requestDate: Date) {
    const head = {
      'email': email,
      'otp': otp,
      'otpExpiry': otpExpiry.toISOString(),
      'requestDate': requestDate.toISOString()
    }

    console.log("Head: ",head);

    return this.http.post<any>(`${this.apiurl}/sendOTPs`,head);
  }

  savePassword(email: string, password: string,OTP:string) {
    const value = {
      'email': email,
      'password': password,
      'otp':OTP
    }

    console.log("Value: ",value);
      return this.http.post<any>(`${this.apiurl}/saveNewPassword`,value);
  }
 

}

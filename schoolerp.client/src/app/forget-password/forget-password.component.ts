import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { LoginPasswordService } from '../Services/login-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  email: string = '';                   // User's email input
  otpInput: boolean = false;            // Flag to show OTP input field
  responseOTP: string = "-1";           // OTP received from backend
  userOTP: string = "";                 // User's OTP input for verification
  timerObservable$: Observable<number> | undefined; // Timer observable for countdown
  remainingTime: number = 0;            // Remaining time for OTP validity in seconds
  otpVerified: boolean = false;
  newPassword: string = "";

  constructor(
    private _forgetpasswordService: LoginPasswordService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  // Send OTP to backend and initiate the countdown timer
  sendOTPfun() {
    const currentDateTime = new Date(new Date().setSeconds(0, 0));  // Current time (no seconds/milliseconds)
    const otpExpiry = new Date(new Date().getTime() + 5 * 60000);   // OTP expiry time set for 5 minutes
    const otp = this.generateOTP();  // Generate OTP

    // Call the service to send OTP to backend
    this._forgetpasswordService.sendOtps(this.email, otp, otpExpiry, currentDateTime).subscribe(
      (success) => {
        this.responseOTP = success.requests.otp;  // Store the OTP received from backend
        this.startTimer();  // Start the countdown timer
        this.otpInput = true;  // Show OTP input field
        console.log("OTP sent successfully: ", success);
      },
      (error) => {
        console.log("Error occurred while sending OTP: ", error);
      }
    );
  }

  // Check the OTP entered by the user
  otpVerfication() {
    if (this.remainingTime > 0) {  
      if (this.responseOTP == this.userOTP) {  
       
        this.otpVerified = true; 

      } else {
        console.log("Invalid OTP!");
        alert("Invalid OTP! Please try again.");
      }
    } else {
      this.responseOTP = "";  
      console.log("OTP expired!");
      alert("OTP expired! Please request a new OTP.");
    }
  }

  saveNewPassword() {
    this._forgetpasswordService.savePassword(this.email, this.newPassword, this.responseOTP).subscribe(
      (success) => {
        console.log("Password Saved Successfully! ", success);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log("Error in Password Submittion! ",error);
      }
    );
    
  }

  // Generate a random 6-digit OTP
  generateOTP(): string {
    return (Math.floor(100000 + Math.random() * 900000)).toString();
  }

  // Start the countdown timer for OTP validity (5 minutes)
  startTimer(): void {
    const countdownStartTime = 5 * 60;   
    this.remainingTime = countdownStartTime;

    this.timerObservable$ = timer(0, 1000).pipe(
      map(() => this.remainingTime--),   
      takeWhile(() => this.remainingTime >= 0)   
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/AuthServiceService';
import { Router } from '@angular/router';
import { SessionService } from '../Services/session.service'; 
import { GlobalSettingsService } from '../Services/global-settings.service';

export interface ILogin {
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  role: string = '';
  UserRole: string = "";

  constructor(private route: Router, private _authService: AuthServiceService, private _sessionService: SessionService) { }

  ngOnInit() { 
    const userRole = this._authService.clearUserRole(); 
  }

  login() {
    if (!this.username || !this.password) {
      console.log('Please fill all fields');
      return;  
    }

    const loginData: ILogin = {
      username: this.username,
      password: this.password,
      role: this.role
    };
 
    this._authService.loginRequest(loginData).subscribe(
      (response) => {
        //console.log("Login Successful!", response);
        if (!response.desig_id) {
          response.desig_id = 2;
        }
        this._authService.setUserRole(response.role, response.user_id, response.desig_id, response.token, response.school_id, response.session_name, response.class_id);
        
         
        this.loginInfo(response.role);
      },
      (error) => {
        console.log("Login Error: ", error);
      }
    );
  }

    

  loginInfo(role: string) { 
    if (role.toLowerCase() === "admin") {
      this.route.navigate(['admin-dashboard']);
    }
    else if (role.toLowerCase() === "faculty") {
      this.route.navigate(['faculty-dashboard']);
    }
    else if (role.toLowerCase() === "student") {
      this.route.navigate(['student-dashboard']);
    }
    else {
      this.route.navigate(['not-found']);
    }
  }

   

}

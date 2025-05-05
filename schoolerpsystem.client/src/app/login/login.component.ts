import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';

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

  constructor(private route: Router, private _authService: AuthServiceService) { }

  ngOnInit() {
    // Clear any previous session data if required
    const userRole = this._authService.clearUserRole();
  }

  login() {
    if (!this.username || !this.password) {
      console.log('Please fill all fields');
      return; // Prevent form submission if fields are empty
    }

    const loginData: ILogin = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    // Make login request to the backend
    this._authService.loginRequest(loginData).subscribe(
      (response) => {   
        this._authService.setUserRole(response.role, response.user_id, response.token, response.school_id);  

        // Navigate based on user role
        this.loginInfo(response.role);
      },
      (error) => {
        console.log("Login Error: ", error);
      }
    );
  }



  loginInfo(role: string) {
    // This method will handle route navigation based on the role
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

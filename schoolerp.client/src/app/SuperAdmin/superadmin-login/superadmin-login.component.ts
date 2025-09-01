import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/AuthServiceService';

interface User {
  Username: string;
  Password: string;
  Role: string;
}

@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.css']
})
export class SuperadminLoginComponent implements OnInit {

  user: User = {
    Username: "",
    Password: "",
    Role: ""
  };

  errorMessage: string = "";  // To store error messages

  constructor(private route: Router, private _authService: AuthServiceService) { }

  ngOnInit(): void {
    this._authService.clearUserRole();
  }

  login() {
    if (!this.user.Username || !this.user.Password) {
      this.errorMessage = "Please enter both username and password.";
      return;
    }

    this.errorMessage = "";

    this._authService.loginRequestforSuperAdmin(this.user).subscribe(
      (response) => { 
        this._authService.setUserRole(response.role, "1", '0', response.token, response.school_id, '2025 - 2026', "0");

        //console.log(  "SuperAdmin Login Successful!", response);
         
        this.route.navigate(['superadmin-dashboard']);

        // Clear the input fields after successful login
        this.user.Username = "";
        this.user.Password = "";
      },
      (error) => {
        console.error("Error Found on SuperAdmin Login!", error);

        this.errorMessage = "Invalid username or password.";
      }
    );
  }
}

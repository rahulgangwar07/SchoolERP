import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/AuthServiceService';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  userRole: string | null = "";

  constructor(private _authService: AuthServiceService) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();  
  }

}

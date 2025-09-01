import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../Services/dashboard.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
    selector: 'app-s-dashboard',
    templateUrl: './s-dashboard.component.html',
    styleUrl: './s-dashboard.component.css',
    standalone: false
})
export class SDashboardComponent implements OnInit {

  studentHeader: any;

  constructor(private _dashboardService: DashboardService, private settingsService: GlobalSettingsService) {

  }

  ngOnInit() {
    this._dashboardService.getStudentHeader(3).subscribe(
      (response) => {
        this.studentHeader = response;
        console.log("Student Header: ",response);
      },
      (error) => {
        console.log("Error found! ",error);
      }
    );
    this.settingsService.notifyHeaderReload();

  }


}

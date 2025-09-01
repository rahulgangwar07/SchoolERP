import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { DashboardService } from '../../../Services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-t-dashboard',
  templateUrl: './t-dashboard.component.html',
  styleUrls: ['./t-dashboard.component.css'],
})
export class TDashboardComponent implements OnInit {

  public config: any = {
    type: 'bar',   
    data: {
      labels: ['Present', 'Absent', 'Leave'],   
      datasets: [
        {
          label: 'Student Attendance',
          data: [0, 0, 0],   
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',   
            'rgba(255, 99, 132, 0.2)',   
            'rgba(255, 159, 64, 0.2)'    
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  chart: any;
  userRole: string = '';

  constructor(private _authService: AuthServiceService, private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.chart = new Chart('FacultyAttendanceChart', this.config);
    this.userRole = this._authService.getUserRole(); 
    if (this.userRole === 'Faculty') { 
      this.loadFacultyAttendanceData();  
    }
  }

  loadFacultyAttendanceData() {
    const school_id = this._authService.getSchoolID(); 
    const session = this._authService.getSessionID();  
     
    this._dashboardService.getHeaderDetail(school_id, session).subscribe(
      (response) => {  
         
        const stuData = response.students;
        const attendanceData = [stuData.present, stuData.absent, stuData.leave];   
         
        this.config.data.datasets[0].data = attendanceData;
         
        if (this.chart) {
          this.chart.update();
        }
      },
      (error) => {
        console.error("Error fetching attendance data: ", error);
      }
    );
  }
}

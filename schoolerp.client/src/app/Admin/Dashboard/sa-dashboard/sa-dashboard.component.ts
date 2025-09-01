import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SchoolService } from '../../../Services/school.service';
import { SuperadminService } from '../../../Services/superadmin.service';
import { SessionService } from '../../../Services/session.service';
import { DashboardService } from '../../../Services/dashboard.service';

Chart.register(...registerables);

@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.css']
})
export class SaDashboardComponent implements OnInit {
   
  public barChartConfig: any;
  public lineChartConfig: any;
  public pieChartConfig: any;
   
  header: any = [];
  school_id: string = "";
  userRole: string = "SuperAdmin";
   
  activeSchools: number = 0;
  inactiveSchools: number = 0;
  totalStudents: number = 0;
  totalFaculties: number = 0;
  schoolList: any[] = [];
  schoolsData: any[] = [];

  constructor(
    private _schoolService: SchoolService,
    private _superadminService: SuperadminService,
    private _sessionService: SessionService,
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getAllSchool();
    this.fetchSuperadminData();
    this.bindSchoolComparision();
    this.updateLineChartConfig();
    this.updatePieChartConfig();
  }
   
  fetchSuperadminData() {
    this._superadminService.header().subscribe(
      (response) => {
        this.activeSchools = response.activeSchools;
        this.inactiveSchools = response.inactiveSchools;
        this.totalStudents = response.totalStudents;
        this.totalFaculties = response.totalFaculties;
      }
    );
  }
   
  getAllSchool() {
    this._schoolService.getAllSchools().subscribe(
      (success) => {
        this.schoolList = success;
      },
      (error) => {
        console.log("Error in fetching SchoolList: ", error);
      }
    );
  }
   
  schoolChange(event: any): void {
    const school = event.target.value;
    this._sessionService.getSingleSession(school, 2).subscribe(
      (response) => {
        this.bindHeader(school, response.session_name);
      }
    );
  }
   
  bindHeader(school_id: string, session: string) {
    this._dashboardService.getHeaderDetail(school_id, session).subscribe(
      (response) => {
        this.header = response;
        this.bindSchoolComparision(); 
      },
      (error) => {
        console.log("Error found: ", error);
      }
    );
  }
   
  bindSchoolComparision() {
    this._superadminService.sessionwise_stuData().subscribe(
      (success) => {
        this.schoolsData = success;
        this.updateCharts();
      },
      (error) => {
        console.log("Error in Session Fetching: ", error);
      }
    );
  }
   
  updateCharts() {
    if (this.schoolsData.length > 0) {
      this.updateBarChartConfig();
      this.updateLineChartConfig();
      this.updatePieChartConfig();
      this.createCharts();   
    }
  }
   
  updateBarChartConfig() {
    const schoolNames = this.schoolsData.map(item => item.school_name);
    const currentSessionData = this.schoolsData.map(item => Number(item.totalStuCurrentSession));
    const previousSessionData = this.schoolsData.map(item => Number(item.totalStuPreviousSession));
    const session = this.schoolsData[0].session;
    const presession = this.schoolsData[0].pre_session;

    this.barChartConfig = {
      type: 'bar',
      data: {
        labels: schoolNames,
        datasets: [
          {
            label: presession,
            data: previousSessionData,
            backgroundColor: 'lightblue',
          },
          {
            label: session,
            data: currentSessionData,
            backgroundColor: 'mediumseagreen',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    };
  }
   
  updateLineChartConfig() {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const sales2024 = [300, 350, 400, 420, 500, 600];
    const sales2025 = [280, 320, 390, 410, 490, 580];

    this.lineChartConfig = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales in 2024',
            data: sales2024,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Sales in 2025',
            data: sales2025,
            borderColor: 'green',
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    };
  }
   
  updatePieChartConfig() {
    const departments = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
    const departmentCounts = [120, 80, 50, 60, 40];

    this.pieChartConfig = {
      type: 'pie',
      data: {
        labels: departments,
        datasets: [
          {
            data: departmentCounts,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300'],
            hoverBackgroundColor: ['#D04E29', '#28A745', '#1E67A6', '#F23D7F', '#FF9800'],
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    };
  }
   
  createCharts() { 
    const ctx = document.getElementById('MyChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, this.barChartConfig);
    }
     
    const lineCtx = document.getElementById('MyLineChart') as HTMLCanvasElement;
    if (lineCtx) {
      new Chart(lineCtx, this.lineChartConfig);
    }
     
    const pieCtx = document.getElementById('MyPieChart') as HTMLCanvasElement;
    if (pieCtx) {
      new Chart(pieCtx, this.pieChartConfig);
    }
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../Services/dashboard.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { SchoolService } from '../../../Services/school.service';
import { SessionService } from '../../../Services/session.service';

Chart.register(...registerables);

@Component({
  selector: 'app-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements OnInit,AfterViewInit {

  public config: any = {
    type: 'bar',
    data: {
      labels: [],   
      datasets: [
        {
          label: '',   
          data: [],    
          backgroundColor: 'lightblue'
        },
        {
          label: '',    
          data: [],    
          backgroundColor: 'mediumseagreen'
        }
      ]
    },
    options: {
      aspectRatio: 1,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  chart: any;
  header: any = [];
  school_id: string = "";
  session: string = "";
  userRole: string = "";
  schoolList: any[] = [];
  upComingbirthday: any[] = [];

  constructor(private _dashboardService: DashboardService, private _authService: AuthServiceService, private _schoolService: SchoolService
    , private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config);

    this.userRole = this._authService.getUserRole();
    if (this.userRole == "SuperAdmin") {
      this.getAllSchool();
    }
    else {
      this.school_id = this._authService.getSchoolID();
      this.session = this._authService.getSessionID();
      
      
      this.loadClasswiseStatics(this.school_id);   
    }

    this.bindupComingBirthday();

  }

  ngAfterViewInit() { 
    this.bindHeader(this.school_id, this.session); 
  }
   
  loadClasswiseStatics(school_id: string) {
    this._dashboardService.getClasswiseStatics(school_id).subscribe(
      (response) => {
        const labels = response.map((item: any) => item.class_name);  
        const currentSessionData = response.map((item: any) => item.stuCount_currentSession);   
        const previousSessionData = response.map((item: any) => item.stuCount_previousSession); 
         
        this.config.data.labels = labels;
        this.config.data.datasets[1].data = currentSessionData;
        this.config.data.datasets[1].label = response[0].session;
        this.config.data.datasets[0].data = previousSessionData;
        this.config.data.datasets[0].label = response[0].previousSession; 
        this.chart.update();
      },
      (error) => {
        console.log("Error found: ", error);
      }
    );
  }

  bindHeader(school_id: string, session:string) {
    this._dashboardService.getHeaderDetail(school_id,session).subscribe(
      (response) => {
        this.header = response;
      },
      (error) => {
        console.log("Error found: ", error);
      }
    );
  }
   
  schoolChange(event: any) {
    const school = event.target.value;
    this._sessionService.getSingleSession(school, 2).subscribe(
      (response) => { 
        this.bindHeader(school, response.session_name);
        this.loadClasswiseStatics(school);
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

  bindupComingBirthday() {
    this._dashboardService.upComingBirthday().subscribe(
      (success) => {
        this.upComingbirthday = success; 
      },
      (error) => {
        console.log("Something went Wrong: ",error);
      }
    );
  }

}

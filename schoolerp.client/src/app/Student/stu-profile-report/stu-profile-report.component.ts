import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service'; 
import { ImageServiceService } from '../../Services/image-service.service';
import { SessionService } from '../../Services/session.service';
import { CalenderService } from '../../Services/calender.service';

@Component({
  selector: 'app-stu-profile-report',
  templateUrl: './stu-profile-report.component.html',
  styleUrl: './stu-profile-report.component.css'
})
export class StuProfileReportComponent implements OnInit {

  activeTab: string = "attendance";

  attendanceData: any;
  selectedMonth!: number;
  selectedYear!: number;
   
  calenderMonth: { [key: number]: string } = {};
  calenderYear: number[] = []; 

  //attendanceData: any = {
  //  total: { present: 20, absent: 2, leave: 1 },
  //  data: [
  //    { date: '1/2/2025', status: 'Present', In: '09:44 pm', out: '-', SMS: false },
  //    { date: '2/2/2025', status: 'Absent', In: '-', out: '-', SMS: true },
  //    { date: '3/2/2025', status: 'Present', In: '09:44 pm', out: '-', SMS: false },
  //    { date: '4/2/2025', status: 'Present', In: '10:10 am', out: '06:00 pm', SMS: false },
  //    { date: '5/2/2025', status: 'Absent', In: '-', out: '-', SMS: true },
  //    { date: '6/2/2025', status: 'Leave', In: '08:50 am', out: '04:30 pm', SMS: false },
  //    { date: '7/2/2025', status: 'Present', In: '09:00 am', out: '05:00 pm', SMS: false },
  //    { date: '8/2/2025', status: 'Absent', In: '-', out: '-', SMS: true },
  //    { date: '9/2/2025', status: 'Present', In: '09:30 am', out: '05:00 pm', SMS: false },
  //    { date: '10/2/2025', status: 'Leave', In: '09:45 am', out: '06:00 pm', SMS: false },
  //    { date: '11/2/2025', status: 'Absent', In: '-', out: '-', SMS: true },
  //    { date: '12/2/2025', status: 'Present', In: '08:40 am', out: '04:00 pm', SMS: false },
  //  ]
  //};

  sessionList: any[] = [];

  constructor(private _studentService: StudentService, private _sessionService: SessionService, private _calenderService: CalenderService) {

  }

  ngOnInit() {
    this.calenderYear = this._calenderService.calenderYear;
    this.calenderMonth = this._calenderService.calenderMonth; 

    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1; 

    this._studentService.student_Attendance(this.selectedMonth, this.selectedYear).subscribe(
      (response) => {
        this.attendanceData = response; 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );  
  }
   
     
  setActiveTab(tab: string) {
    this.activeTab = tab; 
  }

}

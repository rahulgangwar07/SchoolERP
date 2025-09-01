import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { ClassService } from '../../../../Services/class.service';
import { StudentService } from '../../../../Services/student.service';

@Component({
    selector: 'app-monthly-attendance',
    templateUrl: './monthly-attendance.component.html',
    styleUrl: './monthly-attendance.component.css',
    standalone: false
})
export class MonthlyAttendanceComponent implements OnInit {

  selectAttType: string = "All";
  class_id: number = 0;
  classList: any[] = [];
  secList: any[] = [];
  sec_id: number = 0;
  reportData: any[] = [];
  filteredData: any[] = [];

  // Default date selection
  startDate: Date = new Date();
  endDate: Date = new Date();

  // Show and hide columns according to the requirement
  showPresentColumn: boolean = true;
  showAbsentColumn: boolean = true;
  showLeaveColumn: boolean = true;

  constructor(
    private _studentService: StudentService,
    private _classService: ClassService,
    private datePipe: DatePipe,
    private _authService: AuthServiceService
  ) { }

  ngOnInit() { 
    // Fetch class data
    this._classService.getClass().subscribe(
      (response) => {
        this.classList = response;
      },
      (error) => {
        console.log("Error found when fetching classId : ", error);
      }
    );

    // Fetch the attendance report on initialization
    this.monthlyReport();
  }

  // Format the date for input[type="date"]
  get formattedStartDate(): string {
    return this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
  }

  get formattedEndDate(): string {
    return this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;
  }


  sDate(event: any) {
    this.startDate = new Date(event.target.value);
  }

  // Method to handle date change for end date
  eDate(event: any) {
    this.endDate = new Date(event.target.value);
  }

  monthlyReport() {
    // Convert the Date objects to 'yyyy-MM-dd' string format
    const startDateString = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')!;
    const endDateString = this.datePipe.transform(this.endDate, 'yyyy-MM-dd')!;

    this._studentService.stuMonthlyAttReport(this.class_id,this.sec_id, startDateString, endDateString).subscribe(
      (response) => {
        this.reportData = response;
        this.filteredData = [...this.reportData];
        this.filter(); 
      },
      (error) => {
        console.log("Monthly Report Error is: ", error);
      }
    );
  }

  bindSection(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (response) => {
        this.secList = response;
      },
      (error) => {
        console.log("Section List not fetching: ", error);
      }
    );
  }

  // Method to handle class change
  onSubmit() {
    this.bindSection(this.class_id);
    this.monthlyReport();

  }

  secChange() {
    this.monthlyReport();
  }

  // Method to filter data based on selected filter criteria (if any)
  filter() {
    if (this.selectAttType === "Present") {
      this.showPresentColumn = true;
      this.showAbsentColumn = false;
      this.showLeaveColumn = false;
    } else if (this.selectAttType === "Absent") {
      this.showPresentColumn = false;
      this.showAbsentColumn = true;
      this.showLeaveColumn = true;
    } else {
      this.showPresentColumn = true;
      this.showAbsentColumn = true;
      this.showLeaveColumn = true;
    }

    this.filteredData = this.reportData.filter(res => {
      // Filtering logic for attendance type (present, absent, etc.)
      if (this.selectAttType === 'Present') {
        return res.present_count > 0 && res.absent_count === 0 && res.leave_count === 0;
      } else if (this.selectAttType === 'Absent') {
        return (res.absent_count > 0 || res.leave_count > 0) && res.present_count === 0;
      } else {
        return true;
      }
    });
  }

  // Method to get class name (for display)
  getClassName(id: number) {
    return id;
  }

  printReport() {
    // Explicitly reference the global window object using the global `window` keyword

    const data = window.open();
 
    data?.document.write('<html><head><style>');
    data?.document.write(`
      body { font-family: Arial, sans-serif; }
      table { width: 100%; border-collapse: collapse; }
      table, th, td { border: 1px solid black; padding: 8px; text-align: left; }
      .table th { background-color: #d0d6d0;color: #202b5d;font-weight: bold;  }
      .totalrow { color: #21bd1d;font-weight: 400; }

    `);
    data?.document.write('</style></head><body>');

    const divdata = document.getElementById("reportData")?.innerHTML;
    if (divdata) {
      data?.document.write(divdata);
    }
    else {
      data?.document.write("<p>Data not Found!</p>");
    }
      
    data?.document.write('</style></head><body>'); 
    data?.document.close();
    data?.print();
  }


}


import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrl: './view-attendance.component.css'
})
export class ViewAttendanceComponent implements OnInit {
  monthlyAttendanceReport: any;
   
  selectedMonth: number | any;
  selectedYear: number | any; 

  calenderMonth: { [key: number]: string } = {
    1: 'January', 2: 'February', 3: 'March',
    4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  calenderYear: number[] = [2023, 2024, 2025, 2026, 2027];


  constructor(private _facultyService:FacultyService) {

  }

  ngOnInit() {

    this.dataList(); 
  }

  dataList(){
    const date = this.getSelectedDate();
    const fdate = this.convert(date); 
    this._facultyService.monthlyAttendanceReport(fdate).subscribe(
      (success) => {
        this.monthlyAttendanceReport = success; 
      },
      (error) => {
        console.log("Error in Monthly Attendance Report: ", error);
      }
    );

  }

  //getMonthNames() {
  //  return Object.keys(this.calenderMonth).map((key) => ({
  //    key: Number(key),
  //    value: this.calenderMonth[Number(key)]
  //  }));
  //}

  getSelectedDate(): Date {
    if (this.selectedMonth && this.selectedYear) {
      const monthIndex = this.selectedMonth - 1;
      const dayIndex = 1;
      return new Date(this.selectedYear, monthIndex, dayIndex);
    }
    return new Date();  
  }

  convert(date: any) {
    const selectedDate = new Date(date);
    this.selectedYear = selectedDate.getFullYear();
    this.selectedMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    //this.selectedDay = (selectedDate.getDay() + 1).toString().padStart(2, '0');
    this.selectedMonth = (Number)(this.selectedMonth); 
    return `${this.selectedYear}-${this.selectedMonth}-${("01").toString() }`;
  }
   

  getMonthDates(): string[] {
    const dates: string[] = [];
    //const now = new Date();

    const now = this.getSelectedDate();

    const month = now.getMonth();  
    const year = now.getFullYear();
     
    const lastDate = new Date(year, month + 1, 0);
    const totalDays = lastDate.getDate();
     
    for (let day = 1; day <= totalDays; day++) {
      dates.push(`${year}-${month + 1}-${day}`);
    } 

    return dates;
  }

  getFormattedTime(inTime: string): string {
    const timeParts = inTime.split(':');

    const hours = timeParts[0];
    const minutes = timeParts[1];

    return `${hours}:${minutes}`;
  }

  dateFilter() {
    this.dataList(); 
  }

   

  printReport() {
    const printWindow = window.open();

    // Write the HTML structure of the print document
    printWindow?.document.write('<html><head><style>');

    // Include your CSS styles here
    printWindow?.document.write(`
    table {
      width: 96%;
      min-width: 1000px;
      border-collapse: collapse;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {  
      font-size: 12px;
      color: #333;
    }
    th {
      background-color: #6a726a;
      color: white;
      font-weight: bold;
    }
    td {
      background-color: #f9f9f9;
      color: #333;
    }
    tr:nth-child(even) td {
      background-color: #f2f2f2;
    }
    .status {
      //display: inline-block;
      width: 35px;
      padding: 2px 0px;
      text-align: center;
      font-size: 10px;
      font-weight: bold; 
    }
    .status.P {
      background-color: #4CAF50;
      color: white;
    }
    .status.outtime {
      background-color: #4c8caf;
      color: white;
    }
    .status.A {
      background-color: #f44336;
      color: white;
    }
    .status.L {
      background-color: #ff9800;
      color: white;
    }
    .status.waiting {
      background-color: #9e9e9e;
      color: white;
    }
    .fName{
      font-size:20px;
      font-weigth:600;
    }
    h2{
      text-align:center;
      display:block !important;
    }
  `);

    printWindow?.document.write('</style></head><body>');
 

    // Add the content of the printable area
    const printContents = document.getElementById('printableArea')?.innerHTML;
    if (printContents) {
      printWindow?.document.write(printContents);
    } else {
      printWindow?.document.write('No content to print');
    }

    printWindow?.document.write('</body></html>');

    // Close the document and trigger the print dialog
    printWindow?.document.close();
    printWindow?.print();
  }



}

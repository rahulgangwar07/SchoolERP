import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { StudentService } from '../../../../Services/student.service';
import { Observable } from 'rxjs';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { CalenderService } from '../../../../Services/calender.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

interface Student {
  first_name: string;    
  stu_id: number;        
  registration_no: number;   
  father_name: string;  
  attendance: string;
  remark: string;
  attstatus: string;     
}

interface Class {
  classId: number;
  className: string;
  // Add other properties as needed
}

@Component({
    selector: 'app-generate-reports',
    templateUrl: './generate-reports.component.html',
    styleUrls: ['./generate-reports.component.css'],
    standalone: false
})
export class GenerateReportsComponent implements OnInit {

  classList: any;  
  selectedClassId: number = 0;
  secList: any;
  selectedSecId: number = 0;
  students: Student[] = [];
  selectedDay: number | any;
  selectedMonth: number | any;
  selectedYear: number | any = 2025;

  calenderDay: number[] = [];
  calenderMonth: { [key: number]: string } = { };
  calenderYear: number[] = []; 

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  isLoading: boolean = false;
  errorMessage: string | null = null;

  themeSetting: any;

  constructor(private _classService: ClassService, private _studentService: StudentService,
    private _messageService: SuccessMessagePopupService, private _calenderService: CalenderService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.calenderYear = this._calenderService.calenderYear;
    this.calenderMonth = this._calenderService.calenderMonth;
    this.calenderDay = this._calenderService.calenderDay;
    
    const currentDate = new Date();
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonth = currentDate.getMonth() + 1;
    this.selectedDay = currentDate.getDate();

    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        } 
        this.filterbyClassNdate();
      },
      (error) => {
        console.log("Error found when fetching classList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

    this.themeSetting = this._settingService.getCurrentTheme();
  }

  filterbyClassNdate() {
    const formattedDate = this.getSelectedDate();
    this.isLoading = true; 
    this._studentService.attendanceGrid(this.selectedClassId, this.selectedSecId, formattedDate).subscribe(
      (response) => {
        this.students = response;

        console.log("students: ", this.students);
        this.isLoading = false;

      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error found when fetching student records: ' + error;
        console.log(this.errorMessage);
      }
    );
  }

  getSelectedDate(): string {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      return this.getFormattedDate(this.selectedYear, this.selectedMonth, this.selectedDay);
    }
    return this.getFormattedDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  }

  getFormattedDate(year: number, month: number, day: number): string {
    const monthIndex = month - 1; 
    const date = new Date(year, monthIndex, day);
    date.setHours(0, 0, 0, 0);  
    return date.toISOString();
  }

  onSubmit() {
    this.filterbyClassNdate();
  }

  takeAttendance() {
    const formattedDate = this.getSelectedDate();
    this._studentService.postAttendance(this.students, formattedDate).subscribe(
      (response) => {
        console.log("Attendance Taken: ", response); 
        this.addMessage('success', 'Student attendance has been successfully submitted.');
      },
      (error) => {
        console.log("Error found in attendance: ", error);
        this.addMessage('error', 'Failed to add Attendance. Please try again!'); 
      }
    );
  }

  clearRecord() {
    const newDate = this.getSelectedDate();
    this._studentService.deleteAttendance(this.selectedClassId, newDate).subscribe(
      (response) => { 
        this.filterbyClassNdate();
      },
      (error) => {
        console.log("Error found in attendance delete: ", error);
      }
    );
  }

  formatDate(date: string): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    return `${day} ${month} (${dayOfWeek})`;
  }

  changeClass() {
    this.bindSection(this.selectedClassId);
    this.filterbyClassNdate();
  }

  bindSection(cls_id: number) {
    this._classService.getActiveSection(cls_id).subscribe(
      (response) => {
        this.secList = response;
        console.log("this.secList: ", this.secList);
      },
      (error) => {
        console.log("Section List not fetching: ", error);
      }
    );
  }
 


  addMessage(type: string, content: string) {
    const messageExists = this.messages.some(msg => msg.content === content);
    if (messageExists) {
      this.messages = this.messages.filter(msg => msg.content !== content);
    }

    this.messages.push({ type, content });
    this.showSuccessPopup = true;
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

}

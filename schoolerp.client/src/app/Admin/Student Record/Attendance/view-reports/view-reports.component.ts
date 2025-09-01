import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../Services/student.service';
import { ClassService } from '../../../../Services/class.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
    selector: 'app-view-reports',
    templateUrl: './view-reports.component.html',
    styleUrl: './view-reports.component.css',
    standalone: false
})

export class ViewReportsComponent implements OnInit {
  selectedMonth: number | any = 2;
  selectedYear: number | any = 2025;
  selectedDay: number | any = 1;

  calenderDay: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  calenderMonth: { [key: number]: string } = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  calenderYear: number[] = [2023, 2024, 2025, 2026, 2027];

  stu_record: any;
  class_id: number = 0;
  classList: any[] = [];
  secList: any[] = [];
  sec_id: number = 0;

  themeSetting: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];  

  constructor(private _studentService: StudentService, private _classService: ClassService, private _messageService: SuccessMessagePopupService
    , private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindClassList();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
      this.showSuccessPopup = messages.length > 0
    });

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        console.log("this.classList: ", this.classList);
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        } 
        else {
          this.class_id = response[0].class_id;
          this.getStudentAttendance();
          this.bindSection(this.class_id);
        } 
      },
      (error) => {
        console.log("Error found when fetching classId : ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  getStudentAttendance() {
    const date1 = this.getSelectedDate();
    const fdate = this.convert(date1);
    if (this.class_id != 0) { 
      this._studentService.getStudentAttendance(this.class_id,this.sec_id, fdate).subscribe(
        (response) => {
          this.stu_record = response; 
        },
        (error) => {
          console.log("Error found when fetching student attendance report: ", error);
        }
      );
    }
    
  }

  getSelectedDate(): Date {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      const monthIndex = this.selectedMonth - 1;
      return new Date(this.selectedYear, monthIndex, this.selectedDay);
    }
    return new Date(); // Return current date if any selection is missing
  }

  convert(date: any) {
    const selectedDate = new Date(date);
    this.selectedYear = selectedDate.getFullYear();
    this.selectedMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = (Number)(this.selectedMonth);
    this.selectedDay = selectedDate.getDate().toString().padStart(2, '0');
    return `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`;
  }

  formatDate(date: string): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    return `${day} ${month} (${dayOfWeek})`;
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

  previousMonth: number = this.selectedMonth;
  previousYear: number = this.selectedYear;
  previousClassId: number = this.class_id;
  previousDay: number = this.selectedDay;

  changeSubmit() { 
    if (
      this.selectedMonth !== this.previousMonth ||
      this.selectedYear !== this.previousYear ||
      this.class_id !== this.previousClassId ||
      this.selectedDay !== this.previousDay
    ) { 
      this.previousMonth = this.selectedMonth;
      this.previousYear = this.selectedYear;
      this.previousClassId = this.class_id;
      this.previousDay = this.selectedDay;
      this.sec_id = 0;
      
      this.getStudentAttendance();;
    }
      this.bindSection(this.class_id)
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

  changeSession() {
    this.getStudentAttendance();
  }

}




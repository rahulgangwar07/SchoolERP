import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { DatePipe } from '@angular/common';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.css']
})
export class TakeAttendanceComponent implements OnInit, AfterViewChecked {
  attendanceList: any[] = [];
  attendanceListFilter: any[] = [];
  selectedDay: number | any;
  selectedMonth: number | any;
  selectedYear: number | any;
  selectedTypeValue: string = "all";

  themeSetting: any;

  calenderDay: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  calenderMonth: { [key: number]: string } = {
    1: 'January', 2: 'February', 3: 'March',
    4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  calenderYear: number[] = [2023, 2024, 2025, 2026, 2027];

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(
    private _facultyService: FacultyService,
    private _imageService: ImageServiceService,
    private datePipe: DatePipe, private _settingService: GlobalSettingsService
  ) { }

  ngOnInit() {
    console.log("Calender Month: ",this.calenderMonth);
    this.dataList();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  ngAfterViewChecked() { 
    if (this.showSuccessPopup && this.successMessagePopup) {
      this.successMessagePopup.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  dataList() {
    const date = this.getSelectedDate();
    const fdate = this.convert(date);

    this.selectedDay = (Number)(this.selectedDay);

    // Fetch attendance data
    this._facultyService.facultyAttendaceData(fdate).subscribe(
      (response: any) => {
        console.log("Response generated: ", response);
        this.attendanceList = response;
        this.attendanceListFilter = [...this.attendanceList];
        this.formatTimes();
        this.setImages();
        this.facultyType(this.selectedTypeValue);
      },
      (error) => {
        console.error("Error fetching faculty attendance data: ", error);
      }
    );
  }

  dateFilter() {
    this.dataList();
  }
 

  convert(date: any) {
    const selectedDate = new Date(date);
    this.selectedYear = selectedDate.getFullYear();
    this.selectedMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = (Number)(this.selectedMonth);
    this.selectedDay = selectedDate.getDate().toString().padStart(2, '0');
    return `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`;
  }

  getSelectedDate(): Date {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      const monthIndex = this.selectedMonth - 1;
      return new Date(this.selectedYear, monthIndex, this.selectedDay);
    }
    return new Date(); // Return current date if any selection is missing
  }

  formatTimes() {
    this.attendanceListFilter.forEach((att) => {
      att.inTime = this.formatTime(att.inTime);
      att.outTime = this.formatTime(att.outTime);
    });
  }

  setImages() {
    this.attendanceListFilter.forEach((img: { image: string | null; signature: string | null }) => {
      img.image = this._imageService.getImageUrlFaculty(img.image);
      img.signature = this._imageService.getImageUrlFaculty(img.signature);
    });
  }

  formatTime(time: any): string {
    if (time) {
      let validTime: Date;
      if (time instanceof Date) {
        validTime = time;
      } else {
        validTime = new Date(`1970-01-01T${time}`);
      }
      const hours = validTime.getHours().toString().padStart(2, '0');
      const minutes = validTime.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '00:00';
  }

  attendanceChange(event: any) {
    const checked = event.target.checked;
    this.attendanceListFilter.forEach(att => {
      if (checked) {
        att.status = att.status || 'P'; // Set to 'P' if status is empty
      } else {
        att.status = (att.status === 'P' && att.inTime === '00:00' && !att.active) ? '' : att.status;
      }
    });
  }

  onchange(event: any, id: number) {
    const status = event.target.value;
    const user = this.attendanceListFilter.find(user => user.facultyId === id);
    if (user) {
      user.status = status;
    }
  }

  facultyType(value: string) {
    if (value === "staff") {
      this.attendanceListFilter = this.attendanceList.filter(desig => desig.designation_id === "8");
    } else if (value === "faculty") {
      this.attendanceListFilter = this.attendanceList.filter(desig => desig.designation_id !== "8");
    } else {
      this.attendanceListFilter = [...this.attendanceList]; // Show all
    }
  }

  clearStatus(id: number) {
    const user = this.attendanceListFilter.find(user => user.facultyId === id);
    if (user) {
      user.status = '';
    }
  }

  clearAllAttendance() {
    const isConfirmed = window.confirm("Are you sure you want to clear all attendance status?");
    if (isConfirmed) {
      this.attendanceListFilter.forEach(af => {
        af.status = "";
      });

      const selectedDate = this.getSelectedDate();
      if (selectedDate) {
        const fdate = this.convert(selectedDate);
        this._facultyService.facultyAttendaceInsert(this.attendanceListFilter, fdate).subscribe(
          (response) => {
            this.addMessage('clear', 'Attendance records have been successfully cleared.');
          },
          (error) => {
            console.error("Data not Submitted! ", error);
            this.addMessage('clear', 'Failed to clear attendance records. Please try again.');
          }
        );
      }
    }
  }

  SubmitAttendance(list: any) {
    const selectedDate = this.getSelectedDate();
    if (selectedDate) {
      const fdate = this.convert(selectedDate);
      this._facultyService.facultyAttendaceInsert(list, fdate).subscribe(
        (response) => {
          this.addMessage('success', 'Faculty attendance has been successfully submitted.');
        },
        (error) => {
          console.error("Data not Submitted! ", error);
          this.addMessage('error', 'There was an issue submitting the faculty attendance. Please try again.');
        }
      );
    } else {
      console.error("Invalid date selection.");
    }
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

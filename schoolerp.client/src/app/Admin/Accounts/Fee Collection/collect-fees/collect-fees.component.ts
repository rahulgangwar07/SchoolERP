// collect-fees.component.ts
import { Component, OnInit } from '@angular/core';
import { FeeCollectionService } from '../../../../Services/fee-collection.service';
import { SessionService } from '../../../../Services/session.service';
import { ClassService } from '../../../../Services/class.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { CalenderService } from '../../../../Services/calender.service';
import { StudentService } from '../../../../Services/student.service';

@Component({
  selector: 'app-collect-fees',
  templateUrl: './collect-fees.component.html',
  styleUrls: ['./collect-fees.component.css']
})
export class CollectFeesComponent implements OnInit {
  activeTab: string = 'expectedPayment';
  classload: boolean = false;
  demandNo: string = "registration_no";
  demandValue: string = "";
  studentName: string = "";
  studentList: any[] = [];
  filteredStudentList: any[] = [];
  classList: any[] = [];
  stuImage: string = 'assets/img/default-avatar.png';
  fatherName: string = "";
  motherName: string = "";
  dob: string = "";
  address: string = "";
  rollNo: string = "";
  contactNo: string = "";
  admNo: string = "";
  regNo: string = "";
  feeGroup: string = "";
  class_id: number = 0; 
  months = [
    { key: '1', name: 'April' },
    { key: '2', name: 'May' },
    { key: '3', name: 'June' },
    { key: '4', name: 'July' },
    { key: '5', name: 'August' },
    { key: '6', name: 'September' },
    { key: '7', name: 'October' },
    { key: '8', name: 'November' },
    { key: '9', name: 'December' },
    { key: '10', name: 'January' },
    { key: '11', name: 'February' },
    { key: '12', name: 'March' },
  ];
  paymentDate: string = new Date().toISOString().split('T')[0];
  activeSession: string = "No Active Session!";
  selectedMonths: string[] = [];
  toggleAll: boolean = false;

  constructor(
    private _feecollectionService: FeeCollectionService,
    private _sessionService: SessionService,
    private _classService: ClassService,
    private _imageService: ImageServiceService,
    private _studentService: StudentService,
    private _calendarService: CalenderService
  ) { }

  ngOnInit(): void {
    this.activeSession = this._sessionService.getActiveSession(); 
    this.loadClassList();
  }

  showTab(tabName: string): void {
    this.activeTab = tabName;
  }

  clsName(cls_id: number): string {
    const found = this.classList.find(cls => cls.class_id === cls_id);
    return found ? found.class_name : '';
  }

  loadClassList(): void {
    this._classService.getActiveClass().subscribe({
      next: (res) => this.classList = res,
      error: (err) => {
        console.error("Error loading class list: ", err);
        alert("Error fetching class list.");
      }
    });
  }

  classChange(): void {
    if (this.class_id > 0) {
      this.loadStudentList();
    }
  }

  loadStudentList(): void {
    this._studentService.getStudentList(this.activeSession, this.class_id).subscribe({
      next: (res) => {
        this.studentList = res;
        this.filterStudentByName();
      },
      error: (err) => console.error("Error loading student list: ", err)
    });
  }

  stuNameChange(): void {
    this.demandValue = "";
    this.classload = true;
    if (this.studentName.trim().length < 1) {
      this.filteredStudentList = [];
      return;
    }
    this.filterStudentByName();
  }

  filterStudentByName(): void {
    const name = this.studentName.trim().toLowerCase();
    this.filteredStudentList = this.studentList.filter(stu =>
      stu.first_name?.toLowerCase().includes(name)
    );
    if (this.filteredStudentList.length == 0) {
      this.clearData();
    }
  }

  onDemandNoChange(): void {
    if (this.demandNo !== 'all-search') {
      this.getStudentDetails();
    } else {
      console.warn("All-search feature not implemented.");
    }
  }

  getStudentDetails(): void {
    if (!this.demandValue.trim()) {
      alert("Please enter a valid value for search.");
      return;
    }
    this._feecollectionService.getStudentData(this.activeSession, this.demandNo, this.demandValue).subscribe({
      next: (data: any[]) => {
        if (data.length == 0) {
          this.clearData();
          return;
        }
        this.bindData(data[0])
      },
      error: (error) => console.error('Error fetching student data:', error)
    });
  }

  loadSingleStudentData(reg_no: string): void {
    this.demandNo = "registration_no";
    this.demandValue = reg_no;
    this.onDemandNoChange();
    this.classload = false;
  }

  onToggleAllMonths(): void {
    this.toggleAll = !this.toggleAll;
    if (this.toggleAll) {
      this.selectedMonths = this.months.map(m => m.key);
    } else {
      this.selectedMonths = [];
    }
  }

  onMonthCheckboxChange(month: string, event: any): void {
    const monthStr = month.toString();
    if (event.target.checked) {
      this.selectedMonths = [...this.selectedMonths, monthStr];
    } else {
      this.selectedMonths = this.selectedMonths.filter(m => m !== monthStr);
    }
    console.log("This selectedMonth: ", month);
  }

  bindData(data: any): void {
    if (!data) return;
    this.activeSession = data.academic_year || this.activeSession;
    this.class_id = data.class_id || 0;
    this.studentName = data.first_name?.trim() || '';
    this.fatherName = data.father_name?.trim() || '';
    this.motherName = data.mother_name?.trim() || ''; 
    this.dob = data.dob || '';
    this.address = data.address?.trim() || '';
    this.rollNo = data.roll_no?.toString() || '';
    this.contactNo = data.contact_no?.toString() || '';
    this.admNo = data.admission_no || '';
    this.regNo = data.registration_no || '';
    this.feeGroup = data.fee_group || '';
    this.stuImage = this._imageService.getImageUrlStudent(data.stuImage) || 'assets/img/default-avatar.png';
  }

  clearData(): void {
    this.studentName = '';
    this.fatherName = '';
    this.motherName = '';
    this.dob = '';
    this.address = '';
    this.rollNo = '';
    this.contactNo = '';
    this.admNo = '';
    this.regNo = '';
    this.feeGroup = '';
    this.stuImage = 'assets/img/default-avatar.png';
    this.class_id = 0;
    this.filteredStudentList = [];
  }
}

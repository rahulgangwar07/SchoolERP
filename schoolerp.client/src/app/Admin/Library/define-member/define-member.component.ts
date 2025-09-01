import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../Services/library.service';
import { LibraryMember } from '../../../models/library';
import { ClassService } from '../../../Services/class.service';
import { StudentService } from '../../../Services/student.service';
import { RegistrationService } from '../../../Services/registration.service';
import { SessionService } from '../../../Services/session.service';
import { FeeCollectionService } from '../../../Services/fee-collection.service';
import { FacultyService } from '../../../Services/faculty.service';

@Component({
  selector: 'app-define-member',
  templateUrl: './define-member.component.html',
  styleUrls: ['./define-member.component.css']
})
export class DefineMemberComponent implements OnInit {

  classList: any[] = [];
  classload = false;
  studentList: any[] = [];
  facultyList: any[] = [];
  filteredStudentList: any[] = [];
  filteredFacultyList: any[] = [];
  demandNo = 'student_id';
  demandValue = '';
  activeSession = '';

  library_member: LibraryMember = {
    member_id: 0,
    member_type: '',
    member_unique_id: 0,
    full_name: '',
    class_id: '',
    department: '',
    mobile_no: '',
    email: '',
    status: true,
    created_by: '',
    school_id: ''
  };

  constructor(
    private _libraryService: LibraryService,
    private _classService: ClassService,
    private _studentService: StudentService,
    private _feecollectionService: FeeCollectionService,
    private _sessionService: SessionService,
    private _facultyService: FacultyService
  ) { }

  ngOnInit() {
    this.activeSession = this._sessionService.getActiveSession();
    this.loadClassList();
  }

  loadClassList() {
    this._classService.getActiveClass().subscribe({
      next: res => this.classList = res,
      error: err => console.error("Error in class fetching:", err)
    });
  }

  changeUserName() {
    if (this.library_member.member_type.toLowerCase() === 'staff') {
      this.loadFacultyData();
    }
    else if (this.library_member.member_type.toLowerCase() === 'student') {

    }
    else {
      this.clear();
    }

  }

  loadFacultyData() {
    this._facultyService.getAllFaculty().subscribe({
      next: res => {
        this.facultyList = res; console.log("This facult List: ", this.facultyList);
        this.filteredFacultyList = this.facultyList;
      },
      error: err => console.error("Error fetching faculty:", err)
    });
  }
  
  loadSingleFacultyData(facID:number) {
    this._facultyService.getFacultybyId(facID).subscribe({
      next: res => {
        console.log("This Filtered facult List: ", res);
        this.filteredFacultyList = res; 
        this.library_member.member_type = 'staff';
        this.library_member.member_unique_id = res.faculty_id;
        //this.library_member.class = res.class_id;
        this.library_member.full_name = res.first_name + ' ' + res.last_name;
        this.library_member.mobile_no = res.phone;
        this.library_member.email = res.email;
      },
      error: err => console.error("Error fetching faculty:", err)
    });
  }
   

  changeClass() {
    if (this.library_member.class_id) {
      this.loadStudentList();
    }
  }

  loadStudentList() {
    this._studentService.getStudentList(this.activeSession, Number(this.library_member.class_id)).subscribe({
      next: res => {
        this.studentList = res;
        this.filterStudentByName();
      },
      error: err => console.error("Error in Student Fetching: ", err)
    });
  }

  onFullNameInput() {
    const name = this.library_member.full_name.trim();
    if (!name) {
      this.classload = false;
      this.filteredStudentList = [];
      this.filteredFacultyList = [];
      return;
    }

    this.classload = true;

    if (this.library_member.member_type === 'student') {
      this.filterStudentByName();
    } else {
      this.filterFacultyByName();
    }
  }

  filterStudentByName() {
    const name = this.library_member.full_name.trim().toLowerCase();
    this.filteredStudentList = this.studentList.filter(stu =>
      stu.first_name?.toLowerCase().includes(name)
    );
    if (this.filteredStudentList.length === 0) {
      this.clearData();
    }
  }

  filterFacultyByName() {
    const name = this.library_member.full_name.trim().toLowerCase();
    this.filteredFacultyList = this.facultyList.filter(fac =>
      fac.first_name?.toLowerCase().includes(name)
    );
    if (this.filteredFacultyList.length === 0) {
      this.clearData();
    }
  }

  loadSingleStudentData(stu_id: string) {
    this.classload = false;
    this.demandValue = stu_id;
    this.getStudentDetails();
  }

  getStudentDetails() {
    this._feecollectionService.getStudentData(this.activeSession, this.demandNo, this.demandValue).subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          const stu = data[0];
          this.library_member.member_type = 'student';
          this.library_member.member_unique_id = stu.stu_id;
          this.library_member.class_id = stu.class_id;
          this.library_member.full_name = stu.first_name + ' ' + stu.last_name;
          this.library_member.mobile_no = stu.contact_no;
          this.library_member.email = stu.email;
        }
      },
      error: err => console.error("Error fetching student data:", err)
    });
  }

  submitForm() {
    debugger;
    if (this.library_member.full_name && this.library_member.member_type) {
      this._libraryService.addLibraryMember(this.library_member).subscribe({
        next: res => {
          alert('Library member saved successfully.');
          this.clear();
        },
        error: err => {
          console.error('Error saving member:', err);
        }
      });
    } else {
      alert('Please fill the required fields.');
    }
  }

  clear() {
    this.library_member = {
      member_id: 0,
      member_type: '',
      member_unique_id: 0,
      full_name: '',
      class_id: '',
      department: '',
      mobile_no: '',
      email: '',
      status: true,
      created_by: '',
      school_id: ''
    };
    this.filteredStudentList = [];
    this.filteredFacultyList = [];
    this.classload = false;
  }

  clearData() {
    this.library_member.full_name = '';
    this.filteredStudentList = [];
    this.filteredFacultyList = [];
  }
}

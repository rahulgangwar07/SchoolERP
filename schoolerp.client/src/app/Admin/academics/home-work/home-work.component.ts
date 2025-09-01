import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../Services/class.service';
import { FacultyService } from '../../../Services/faculty.service';
import { AcademicsService } from '../../../Services/academics.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-home-work',
  templateUrl: './home-work.component.html',
  styleUrl: './home-work.component.css'
})
export class HomeWorkComponent implements OnInit {
   
  class_id: number = 0;
  faculty_id: number = 0;
  userRole: string = "Admin";

  workType: string = "HomeWork";
  workTypeRoute: string = "";
  openPopup: boolean = false;

  classList: any[] = [];
  teacherList: any[] = [];
   
  documents: any;
  assignmentUrls: string[] = [];
    
  homeworkData: any;
  filteredhomeworkData: any;
  homeworkDataEdit: any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private route: ActivatedRoute, private _classService: ClassService, private _facultyService: FacultyService
    , private _academicsService: AcademicsService, private _authService: AuthServiceService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    const val = this.route.snapshot.routeConfig?.path;
    const lastSegment = val?.split('/').pop();    
    this.workType = lastSegment == "classwork" ? "ClassWork" : lastSegment == "dailynotes" ? "DailyNotes" : "HomeWork";
    this.workTypeRoute = lastSegment ?? "homework";
    this.userRole = this._authService.getUserRole();
    if (this.userRole == "Student") {
      const clsid = this._authService.getClassId();
      this.class_id = (Number)(clsid);
    }

    this.bindClassList();
    this.bindTeacherList();
    this.bindWorkType();

  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (clsList) => {
        this.classList = clsList;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error occuring in ClassList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindTeacherList() {
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.teacherList = teachers;
        console.log("this.teacherList: ", this.teacherList);
        if (this.teacherList.length === 0) {
          this._messageService.addMessage("warning", "No active teachers found. Please add some teacher.");
        }
      },
      (error) => {
        console.log("Error in fetching Teacher List: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the Teacher list.");
      }
    );
  }

  bindWorkType() {
    this._academicsService.getAssignment(this.workType).subscribe(
      (response) => {
        this.homeworkData = response; 
         
        this.homeworkData.forEach((homework: any) => {
          if (homework.assignments && Array.isArray(homework.assignments)) { 
            homework.assignmentUrls = homework.assignments.map((assignment: { attachment: string }) => assignment.attachment);
          } else { 
            homework.assignmentUrls = [];
          }
        });
        this.filteredhomeworkData = this.homeworkData;
        this.filter();
          
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  filter() {
    if (this.userRole == "Student") {
      this.filteredhomeworkData = this.homeworkData.filter((f: { class_id: number}) => {
        return (f.class_id == this.class_id);
      })
    } else {
      this.filteredhomeworkData = this.homeworkData.filter((f: { class_id: number, created_by: number }) => {
        return (f.class_id == this.class_id || this.class_id == 0) && (f.created_by == this.faculty_id || this.faculty_id == 0);
      })
    }
    
    console.log("this.filteredhomeworkData: ", this.filteredhomeworkData);
  }

  editDetail(assignment_id: number) {
    this.homeworkDataEdit = this.homeworkData.filter(
      (d: { assignment_id: number; }) => d.assignment_id === assignment_id
    );
    this.openPopup = true;
     
    if (this.homeworkDataEdit.length > 0) {
      this.homeworkDataEdit[0].date = this.convertToDateFormat(this.homeworkDataEdit[0].date);
    }
  }

  convertToDateFormat(dateString: string): string {
    const date = new Date(dateString);  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  
    const day = date.getDate().toString().padStart(2, '0');  
    return `${year}-${month}-${day}`;  
  }

  deleteAssignment(assignment_id: number) {
    this._academicsService.deleteAssignment(assignment_id).subscribe(
      (response) => {
        this.bindWorkType(); 
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
  }

  closePopup(status: any) { 
    this.openPopup = status;
  }

  getTeacherNameById(teacherId: number): string { 
    const teacher = this.teacherList.find(t => t.faculty_id == teacherId); 
    return teacher ? teacher.first_name : 'Admin';
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}

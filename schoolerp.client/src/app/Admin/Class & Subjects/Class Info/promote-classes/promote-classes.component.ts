import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../Services/session.service';
import { ClassService } from '../../../../Services/class.service';
import { PromoteDemoteClassService } from '../../../../Services/promote-demote-class.service';
// import { StudentService } from '../../../../Services/student.service'; // if using real API

@Component({
  selector: 'app-promote-classes',
  templateUrl: './promote-classes.component.html',
  styleUrls: ['./promote-classes.component.css']
})
export class PromoteClassesComponent implements OnInit {

  // Dropdown data
  session1: any[] = [];
  session2: any[] = [];
  classList1: any[] = [];
  classList2: any[] = [];
  studentList1: any[] = [];

  // Selected values
  selectedSession1: string = '';
  selectedSession2: string = '';
  selectedClass1: number = 0;
  selectedClass2: number = 0;
  selectedStudent1: number = 0;


  // Control logic
  actionType: string = 'promote';
  fromLabel: string = 'From Class';
  toLabel: string = 'To Class';
   
  showDropDown: boolean = false;
  promotedemoteList: any[] = [];

  constructor(
    private _sessionService: SessionService,
    private _classService: ClassService,
    private _promotedemoteService: PromoteDemoteClassService
    // private _studentService: StudentService // If real student API exists
  ) {

    
  }

  ngOnInit(): void {
    this.loadSessions();
    this.loadClasses();
    this.updateLabels();
  }

  getSelectedValue(status: boolean,registration_no: string, name: string) {
    if (status) {
      if (!this.promotedemoteList.includes(registration_no)) {
        this.promotedemoteList.push(registration_no);
      }
    } else {
      const index = this.promotedemoteList.indexOf(registration_no);
      if (index > -1) {
        this.promotedemoteList.splice(index, 1);
      }
    }

    //this.currentSelected = { checked: status, name: value };
  }

  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }
 
 

   
  loadSessions(): void {
    this._sessionService.getSession().subscribe((response) => {
      this.debugLog('Sessions', response);
      this.session1 = response;
      this.session2 = response;
    });
  }
   
  loadClasses(): void {
    this._classService.getClass().subscribe((res) => {
      this.debugLog('Classes', res);
      this.classList1 = res;
      this.classList2 = res;
    });
  }
   
  updateLabels(): void {
    this.fromLabel = this.actionType === 'promote' ? 'From Class' : 'To Class';
    this.toLabel = this.actionType === 'promote' ? 'To Class' : 'From Class';
    this.onFromClassChange();
  }
   
  onFromClassChange(): void {
    this.selectedStudent1 = 0;
    this.studentList1 = [];

    if (this.selectedClass1 > 0 && this.selectedSession1) { 
      if (this.actionType == "promote") {
         this._promotedemoteService.getStudentsforPromote(this.selectedSession1, this.selectedClass1).subscribe((res) => {
           this.studentList1 = res;
           this.studentList1.map(f => f.checked = false);
           console.log("This studentList: ", this.studentList1);
               });
      }
     
      if (this.actionType == "demote") {
         this._promotedemoteService.getStudentsforDemote(this.selectedSession1, this.selectedClass1).subscribe((res) => {
           this.studentList1 = res;
           this.studentList1.map(f => f.checked = false);
                  console.log("This studentList: ", this.studentList1);
               });
      }
     

      this.debugLog('Students loaded for class', this.selectedClass1);
    }
  }
   
  formIsValid(): boolean { 
    return (
      !!this.selectedSession1 &&
      !!this.selectedSession2 &&
      this.selectedClass1 > 0 &&
      this.selectedClass2 > 0 &&
      this.promotedemoteList.length > 0
    );
  }
   
  processClass(): void {
    if (!this.formIsValid()) {
      alert('Please fill all required fields.');
      return;
    }
    console.log("studentRegs: ", this.promotedemoteList);
    const payload = {
      action: this.actionType,
      fromSession: this.selectedSession1,
      toSession: this.selectedSession2,
      fromClass: this.selectedClass1,
      toClass: this.selectedClass2,
      studentRegs: this.promotedemoteList.toString()
    };

    this._promotedemoteService.insertPromoteDemoteStundent(payload).subscribe(
      succ => {
        console.log("Students promoted....", succ);
        this.onFromClassChange();
      },
      err => {
        console.log("Error : ",err);
      }
    );
    // Future: this.classService.promoteOrDemote(payload).subscribe(...)
    this.debugLog(`${this.actionType === 'promote' ? 'Promoting' : 'Demoting'} student`, payload);
  }

 


  // 🧩 Utility for clean debug logs
  debugLog(label: string, data: any): void {
    console.log(`[DEBUG] ${label}:`, data);
  }
}

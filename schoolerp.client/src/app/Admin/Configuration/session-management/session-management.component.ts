import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownsService } from '../../../Services/dropdowns.service';
import { SessionService } from '../../../Services/session.service';
import { NgForm } from '@angular/forms';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css']
})
export class SessionManagementComponent implements OnInit {
  months: { [key: number]: string; } | any;
  calenderYear: any;
  sessionList: any[] = [];
  d = {
    session_id: 0,
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
  };

  themeSetting: any;

  @ViewChild('sessionForm') sessionForm!: NgForm;
  checkEdit: boolean = false;

  constructor(private _dropdownService: DropdownsService, private _sessionService: SessionService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.months = this._dropdownService.getSortedMonths();
    this.calenderYear = this._dropdownService.calenderYear;
    this.bindSessionList();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindSessionList() {
    this._sessionService.getSession().subscribe(
      (response) => {
        this.sessionList = response; 
      },
      (error) => {
        console.log("Error in session fetching", error);
      }
    );
  }

  checkedUpdate(data: any) {
    this.sessionList.forEach(s => {
      s.status = (data.session_id === s.session_id) ? true : false; // Set status of selected session
    });

    this._sessionService.updateSession(data).subscribe(
      (success) => {
        console.log("Update Successfully!", success);
      },
      (error) => {
        console.log("Error found!", error);
      }
    );
  }

  submitSession() { 
    this._sessionService.postSession(this.d).subscribe(
      (response) => {
        if (this.sessionForm) {
          this.sessionForm.reset(); // Reset form
        }
        this.bindSessionList();
        this.clear();
        
      },
      (error) => {
        console.log("Error in session fetching", error);
      }
    );
  }

  sendForEdit(session_id: number) {
    const sessionToEdit = this.sessionList.find(res => res.session_id === session_id);
    this.checkEdit = true;

    if (sessionToEdit) {
      this.d.session_id = session_id;
      this.d.startMonth = sessionToEdit.start_month;
      this.d.endMonth = sessionToEdit.end_month;
      this.d.startYear = sessionToEdit.start_year;
      this.d.endYear = sessionToEdit.end_year;
    }
  }

  deleteSession(session_id: number) {
    if (confirm('Are you sure you want to delete this session?')) {
      this._sessionService.deleteSession(session_id).subscribe(
        (response) => { 
          this.bindSessionList();  
          this.clear();
        },
        (error) => {
          console.log("Error deleting session", error);
        }
      );
    }
  }

  clear() {
    this.d = {
      session_id: 0,
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    };
    this.checkEdit = false;
  }

}

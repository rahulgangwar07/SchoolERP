import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { communication } from '../../../../models/notice';
import { CommunicationService } from '../../../../Services/Messages/communication.service';

@Component({
  selector: 'app-ask-new-question',
  templateUrl: './ask-new-question.component.html',
  styleUrl: './ask-new-question.component.css'
})
export class AskNewQuestionComponent implements OnInit {

  @Input() status: boolean = false; 
  @Input() askedTo: number = 0; 
  @Input() name: string = ""; 
  @Input() communication_id: number = 0; 
  @Input() request: string = ""; 
  @Output() cStatus = new EventEmitter<boolean>(false);

  userId: string = "";
  userRole: string = "";
  classId: number = 0; 

  com: communication = {
    communication_id: 0,
    subject: '',
    created_by: 0,
    created_role: '',
    class_id: 0,
    question: '',
    answer: '',
    asked_at: new Date(),
    asked_to: 0,
    answered_by: '',
    answered_role: '',
    answered_at: new Date(),
    isOpen: false,
    isActive: true,
    school_id: ''
  }

  constructor(private _authService: AuthServiceService, private _communicationService: CommunicationService) { }

  ngOnInit() { 
    if (this.communication_id != 0) {
      this._communicationService.getCommunicationbyId(this.communication_id).subscribe(
        res => {
          this.com = res;
          this.com.answered_by = this._authService.getUserID() ?? "";
          this.com.answered_role = this._authService.getUserRole();
        },
        err => console.log("Error: ", err)
      );
    } else { 
    this.userId = this._authService.getUserID() ?? "";
    this.userRole = this._authService.getUserRole();
    this.classId = (Number)(this._authService.getClassId());
      this.com.school_id = this._authService.getSchoolID();
      this.com.created_by = (Number)(this.userId);
      this.com.created_role = this.userRole;
    if (this.userRole == "Student") {
      this.com.class_id = this.classId;
      }
      this.com.asked_to = this.askedTo;
   }

    

  }

  closePopup() {
    this.cStatus.emit(false);
  }

  submit() {
    console.log("this.com: ", this.com);
    if (this.com.subject != "" && this.com.question != "") {
      this._communicationService.insertCommunication(this.request,this.com).subscribe(
        (res) => { 
          this.closePopup();
          this.com.subject = "";
          this.com.question = "";
        },
        err => { console.log("Error: ",err); }
      );
    }
    else {
      alert("Please fill both Fields. ");
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../Services/class.service';
import { Permissions } from '../../../models/permissions';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-self-learning-material',
  templateUrl: './self-learning-material.component.html',
  styleUrl: './self-learning-material.component.css'
})
export class SelfLearningMaterialComponent implements OnInit {

  classList: any[] = [];
  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  permissions!: Permissions; 

  constructor(private _classService: ClassService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindClassList();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

  }


  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error found on class list binding");
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


  //selfLearningM = [
  //  { class: '12TH', description: "Explore resources designed for 12th-grade students in various streams."},
  //  { class: '11th', description: "Resources tailored for 11th-grade students covering key subjects."},
  //  { class: '10TH', description: "Browse through resources designed for 10th-grade students to excel in their studies."},
  //  { class: '9TH', description: "Materials focused on strengthening the foundation for Class 9 students."},
  //  { class: '8TH', description: "Explore materials for Class 8 students to understand key concepts easily."},
  //  { class: '7TH', description: "Materials designed for Class 7 students to boost their learning journey."}
  //];

}

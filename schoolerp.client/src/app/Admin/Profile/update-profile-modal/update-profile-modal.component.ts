import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrl: './update-profile-modal.component.css'
})
export class UpdateProfileModalComponent implements OnInit {

  @Input() profile: any;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<any>();
  bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'  // Blood groups array
  ];

  constructor() {
    console.log("Popup content",this.profile);
  }

  ngOnInit() {
    console.log("Popup content", this.profile);
  }

  closeModal(event: any) { 
    this.close.emit(false);
  }

  onSubmit() {
    this.update.emit(this.profile);
    this.close.emit(false);
  }

}

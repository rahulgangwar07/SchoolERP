import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-class-teacher-popup',
  templateUrl: './class-teacher-popup.component.html',
  styleUrl: './class-teacher-popup.component.css'
})
export class ClassTeacherPopupComponent {
  @Input() message: string = '';
  @Output() closepopup = new EventEmitter<void>();

  closePopup() {
    this.closepopup.emit();
  }

}


import { Component } from '@angular/core';

@Component({
  selector: 'app-stu-apply-for-leave',
  templateUrl: './stu-apply-for-leave.component.html',
  styleUrls: ['./stu-apply-for-leave.component.css']
})
export class StuApplyForLeaveComponent {

  leaveData = {
    startDate: '',
    endDate: '',
    leaveReason: ''
  };

  // Method to handle the submission of a new leave request
  applyLeave(form: any) {
    if (form.valid) {
      // Logic for submitting a new leave request can be added here.
      console.log('New leave request:', this.leaveData);

      // After submission, reset the form
      form.reset();
      this.leaveData = { startDate: '', endDate: '', leaveReason: '' };  // Reset the leaveData object
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent {
  // List of students
  studentId: Number | null = null
  openModelpopup: boolean = true;
  students = [
    { name: 'Jatin Sharma', fatherName: 'Mr. Ashutosh Sharma', regNo: 600, class: 'I', paid: 1500, dues: '', receiptNo: 122 },
    { name: 'Rahul Kumar', fatherName: 'Mr. Rajesh Kumar', regNo: 601, class: 'I', paid: 1500, dues: '', receiptNo: 123 },
    // Add more students if needed
  ];

  // Store the index of the active modal (row)
  activeIndex: number | null = null;
  currectIndex: Number | null = null;

  // Open modal and show actions for the clicked row
  openModal(index: number) {
    this.activeIndex = index;
    if (!this.openModelpopup && this.activeIndex == this.currectIndex) {
      this.closeModal();
    }
    this.openModelpopup = !this.openModelpopup;
    this.currectIndex = this.activeIndex;
  }

  // Close modal (optional - you can manually close it)
  closeModal() {
    this.activeIndex = null;  // Clear active index to close modal
  }

  // Action functions
  editStudent(index: number) {
    alert(`Editing student: ${this.students[index].name}`);
    this.closeModal();
  }

  collectFee(index: number) {
    alert(`Collecting fee for: ${this.students[index].name}`);
    this.closeModal();
  }

  deleteStudent(index: number) {
    if (confirm(`Are you sure you want to delete ${this.students[index].name}?`)) {
      alert(`${this.students[index].name} has been deleted.`);
      // Implement delete logic if required
    }
    this.closeModal();
  }
}

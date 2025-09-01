import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-lesson-plan',
  templateUrl: './add-lesson-plan.component.html',
  styleUrl: './add-lesson-plan.component.css'
})
export class AddLessonPlanComponent {

  lessonForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddLessonPlanComponent>
  ) {
    this.lessonForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teacherName: ['', Validators.required],
      className: ['', Validators.required],
      subject: ['', Validators.required],
      lessonName: ['', Validators.required],
      topic: [''],
      lessonDescription: [''],
      holidaysInWeek: ['', Validators.required],
      periodsInWeek: ['', Validators.required],
      amountTaught: ['', Validators.required],
      assignment: [''],
      notes: [''],
      remarks: ['']
    });
  }

  onSave() {
    if (this.lessonForm.valid) { 
      this.dialogRef.close();  // Close the dialog
    }
  }

  onClose() {
    this.dialogRef.close();  // Close the dialog
  }

}

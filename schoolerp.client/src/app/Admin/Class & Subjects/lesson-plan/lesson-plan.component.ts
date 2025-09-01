import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  
import { AddLessonPlanComponent } from './LessonplanAdd/add-lesson-plan/add-lesson-plan.component';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.component.html',
  styleUrl: './lesson-plan.component.css'
})
export class LessonPlanComponent {

  activeRow: number | null = null;

  constructor(public dialog: MatDialog) {

  }

  openDialog(): void {
    this.dialog.open(AddLessonPlanComponent, {
     /* width: '250px', */
      data: { name: 'Pick one' }
    });
    this.openactionbtn(0);
  }

  openactionbtn(rowIndex: number): void{
    this.activeRow = this.activeRow === rowIndex ? null : rowIndex;
  }
 
}

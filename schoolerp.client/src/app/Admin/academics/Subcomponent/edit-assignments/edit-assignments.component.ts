import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AcademicsService } from '../../../../Services/academics.service';
import { ClassService } from '../../../../Services/class.service';

@Component({
  selector: 'app-edit-assignments',
  templateUrl: './edit-assignments.component.html',
  styleUrl: './edit-assignments.component.css'
})
export class EditAssignmentsComponent implements OnInit, AfterViewInit{
  @Input() open: boolean | undefined;
  @Input() data: any;
  @Output() popupValue = new EventEmitter<boolean>();

  classList: any[] = [];
  secList: any[] = [];

  @ViewChild('popup') popup: ElementRef | undefined;
  constructor(private _academicService: AcademicsService, private _classService: ClassService,) { }

  ngOnInit() {
    this.bindClassList();
  }

  ngAfterViewInit() { 
    if (this.open) {
      this.bindSecList(this.data[0].class_id);
    } 
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (success) => {
        this.classList = success; 
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  bindSecList(cls: number) {
    this._classService.getActiveSection(cls).subscribe(
      (response) => {
        this.secList = response; 
      },
      (error) => {
        console.log("Error: ");
      }
    );
  }

  submitEdits() {
    this._academicService.updateAssignment(this.data).subscribe(
      (response) => { 
        this.popupValue.emit(false);
      },
      (error) => {
        console.log("Error: ",error);
      }
    );
    console.log("submitEdits: ", this.data);
  }

  close() { 
    this.popupValue.emit(false);
  }

}

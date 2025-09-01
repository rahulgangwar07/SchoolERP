import { Component, OnInit } from '@angular/core';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';
import { GroupedExamSetDto } from '../../../models/examination';
import { ClassService } from '../../../Services/class.service';

@Component({
  selector: 'app-define-exam-set',
  templateUrl: './define-exam-set.component.html',
  styleUrl: './define-exam-set.component.css'
})
export class DefineExamSetComponent implements OnInit {

  exam_sets: GroupedExamSetDto[] = [];

  classList: any[] = [];

  constructor(private _examSetService: ExamSettingsService, private _classService: ClassService) { }

  ngOnInit() {
    this.loadClassList();
    this.loadExamSet();
  }

  loadClassList() {
    this._classService.getActiveClass().subscribe(
      res => {
        console.log("Class List: ", res);
        this.classList = res;
      },
      err => console.log("Error in fetching Class List: ")
    );
  }

  loadExamSet() {
    this._examSetService.GetExamSets().subscribe(
      res => {
        console.log("GetExamSets Res: ", res);
        this.exam_sets = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }


  className(clsId: number): string {
    const val = this.classList.find(cl => cl.class_id == clsId); 
    return val.dis_name ?? "";
  }

}

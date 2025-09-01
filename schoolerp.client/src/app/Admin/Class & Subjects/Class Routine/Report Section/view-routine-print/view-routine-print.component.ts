import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutineService } from '../../../../../Services/routine.service';

@Component({
  selector: 'app-view-routine-print',
  templateUrl: './view-routine-print.component.html',
  styleUrls: ['./view-routine-print.component.css']
})
export class ViewRoutinePrintComponent implements OnInit {

  class_id: number | undefined;
  routineData: any; 
   

  constructor(private route: ActivatedRoute, private _routineService: RoutineService) { }

  ngOnInit() {
    this.class_id = (Number)(this.route.snapshot.paramMap.get('cls_id')?.toString());
    if (this.class_id) {
      this._routineService.getSchedulePeriodPrint(this.class_id).subscribe(
        (response) => { 
          this.routineData = response;
          console.log("this.routineData: ", this.routineData);

        },
        (error) => {
          console.log("Error: ",error);
        }
      );
    }
    
   }
}

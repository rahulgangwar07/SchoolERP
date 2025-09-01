import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoutineService } from '../../../../Services/routine.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-view-priod',
  templateUrl: './view-priod.component.html',
  styleUrls: ['./view-priod.component.css']
})
export class ViewPriodComponent implements OnInit {

  periods: any[] = [];
  selectedPeriod: any = {};
  editMode: boolean = false;

  starthour: number = 0;
  startmin: number = 0;
  startperiod: string = "";

  endhour: number = 0;
  endmin: number = 0;
  endperiod: string = "";

  themeSetting: any;

  @Input() permissions: any;
  @Output() ppriodView = new EventEmitter<boolean>();


  hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
  minutes = ["00", "05", "15", "30", "45", "55"];

  constructor(private _routineService: RoutineService, private _priodService: RoutineService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    console.log("Permission : ", this.permissions);
    this.loadPeriods();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  // Function to load periods
  loadPeriods() {
    this._routineService.getPeriod().subscribe(
      (data) => { 
        this.periods = data.map((period: { start_time: string; end_time: string; }) => ({
          ...period,
          start_time: this.formatTime(period.start_time),
          end_time: this.formatTime(period.end_time)
        })); 
      },
      (error) => {
        console.log("Error is : ", error);
      }
    );
  }
   
  formatTime(time: string): string {
    const [hour, minute] = time.split(':');   
    let formattedHour = parseInt(hour, 10);  
    const period = formattedHour >= 12 ? 'PM' : 'AM';   
    if (formattedHour > 12) {
      formattedHour -= 12;   
    } else if (formattedHour === 0) {
      formattedHour = 12;  
    }
     
    const formattedHourStr = formattedHour < 10 ? `0${formattedHour}` : `${formattedHour}`; 
    const formattedMinute = minute.padStart(2, '0');   

    return `${formattedHourStr}:${formattedMinute} ${period}`;   
  }


    
  editPeriod(index: number) {
    this.selectedPeriod = { ...this.periods[index] };

    // Splitting start time
    const startTime = this.selectedPeriod.start_time.split(' '); 
    const [startHour, startMin] = startTime[0].split(':');  
    this.starthour = startHour;  
    this.startmin = startMin;
    this.startperiod = startTime[1]; 

    // Splitting end time
    const endTime = this.selectedPeriod.end_time.split(' ');  
    const [endHour, endMin] = endTime[0].split(':');  
    this.endhour = endHour;  
    this.endmin = endMin;
    this.endperiod = endTime[1];   
    this.editMode = true;
  }

  saveEditPeriod(id: number) {
    const index = this.periods.findIndex(p => p.period_number === this.selectedPeriod.period_number);

    if (index !== -1) {
       
      const formattedStartTime = `${this.starthour}:${this.startmin}${this.startperiod}`;
      const formattedEndTime = `${this.endhour}:${this.endmin}${this.endperiod}`;

      this.periods[index] = {
        ...this.selectedPeriod,
        id:id,
        start_time: formattedStartTime,
        end_time: formattedEndTime
      };
      this.selectedPeriod = this.periods[index]; 

      this._priodService.postPriod(this.selectedPeriod).subscribe(
        (success) => {
          console.log("Data successfully Sent. ",success);
        },
        (error) => {
          console.log("Error in submission! ", error);
        }
      );

      this.editMode = false;
    }
  }


   
  cancelEdit() {
    this.editMode = false;
  }
   
  deletePeriod(index: number,period_id:number) {
    this._routineService.deletePriod(period_id).subscribe(
      (success) => {
        console.log("Period Deleted", success);
        if (success.message == "Schedule Exists") {

        }
        else {
          this.periods.splice(index, 1);
        }
        
      },
      (error) => {
        console.log("Something went Wrong! ",error);
      }
    );
     

    
  }
   
  closeView() {
    this.ppriodView.emit(false);
  }
}

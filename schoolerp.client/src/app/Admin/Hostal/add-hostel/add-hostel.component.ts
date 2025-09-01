import { Component, OnInit } from '@angular/core';
import { HostalService } from '../../../Services/hostal.service';
import { hostal } from '../../../models/hostal';
import { CalenderService } from '../../../Services/calender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-add-hostel',
  templateUrl: './add-hostel.component.html',
  styleUrls: ['./add-hostel.component.css']
})
export class AddHostelComponent implements OnInit {

  hData: hostal = {
    hostal_name: '',
    phone: '',
    fee_month: '',
    monthly_fee: 0,
    address: '',
    room_type: '',
    occupancy_status: '',
    facilities: '',
    hostal_id: 0,
    isActive: true,
    school_id: ''
  };

  hostal_id: number = 0;
  themeSetting: any;

  // Updated calenderMonth to include 'checked' property
  calenderMonth: {
      [x: string]: any; [key: number]: { name: string, checked: boolean } 
  } =
    {
    1: { name: 'January', checked: false },
    2: { name: 'February', checked: false },
    3: { name: 'March', checked: false },
    4: { name: 'April', checked: false },
    5: { name: 'May', checked: false },
    6: { name: 'June', checked: false },
    7: { name: 'July', checked: false },
    8: { name: 'August', checked: false },
    9: { name: 'September', checked: false },
    10: { name: 'October', checked: false },
    11: { name: 'November', checked: false },
    12: { name: 'December', checked: false }
  };

  showDropDown: boolean = false;
  checkedList: number[] = [];  

  constructor(private route: ActivatedRoute, private _hostalService: HostalService, private _calendarService: CalenderService,
    private router: Router, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.hostal_id = Number(this.route.snapshot.paramMap.get('hostal_id')) ?? 0;
    if (this.hostal_id !== 0) {
      this.getHostalbyId(this.hostal_id);
    }
    this.getSelectedValue();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  addHostal(hostalForm: any) { 
    if (hostalForm.valid) { 
      this.hData.fee_month = this.checkedList.join(', ');
      console.log("this.hData.fee_month: ", this.hData.fee_month);
      
      if (this.hData.hostal_id === 0) {
        this.insertHostal(hostalForm);
      } else {
        this.updateHostal(hostalForm);
      }
    }
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown; 
  }

  getSelectedValue() {
    this.checkedList = []; 
    Object.keys(this.calenderMonth).forEach(key => {
      const month = this.calenderMonth[Number(key)];
      if (month.checked) { 
        this.checkedList.push(Number(key));
      }
    });
     
    this.hData.fee_month = this.checkedList.join(', ');
  }

  checkboxName(cc: any) { 
    let localCheckedList: string[] = [];
     
    Object.entries(this.calenderMonth).forEach(([key, value]) => {
      if (value.checked) { 
        localCheckedList.push(value.name);
      }
    }); 
     
    return localCheckedList;
  }

  selectAllcheckbox(event: any) {
    console.log("Event.target.value: ", event.target.checked);
    this.checkedList = [];  
    Object.entries(this.calenderMonth).forEach(([key, value]) => {
      if (event.target.checked) {
        value.checked = true;
      }
      else {
        value.checked = false;
      }
      this.checkedList.push(Number(key));  
    });
  }

  getHostalbyId(hostal_id: number) {
    this._hostalService.getHostalbyId(this.hostal_id).subscribe(
      (h: hostal) => {
        this.hData = h;
        const feeMonths = this.hData.fee_month.split(',').map(month => month.trim());
        Object.entries(this.calenderMonth).forEach(([key, value]) => {
          this.calenderMonth[Number(key)].checked = feeMonths.includes(key);
          if (this.calenderMonth[Number(key)].checked) {
            this.checkedList.push(value.name);
          }
        });
      },
      (error) => {
        console.error("Error fetching hostel data: ", error);  
      }
    );
  }


  insertHostal(hostalForm: any) {
    this._hostalService.postHostal(this.hData).subscribe(
      (response) => {
        hostalForm.reset();
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }

  updateHostal(hostalForm: any) {
    this._hostalService.updateHostal(this.hData).subscribe(
      (response) => {
        hostalForm.reset();
        this.router.navigate(['/hostel/view-hostel']);
      },
      (error) => {
        console.error("Error: ", error);
      }
    );
  }


}

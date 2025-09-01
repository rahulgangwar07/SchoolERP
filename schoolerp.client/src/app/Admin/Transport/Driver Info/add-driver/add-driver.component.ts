import { Component, OnInit } from '@angular/core';
import { Drivers } from '../../../../models/transport';
import { TransportService } from '../../../../Services/transport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent implements OnInit {

  driverID: number = 0;
  selectedFile: File | null = null;

  driverData: Drivers = {
    driver_id: 0,
    name: '',
    dob: '', 
    license_no: '',
    phoneNumber: '', 
    address: '',
    joiningDate: '',
    school_id: '',
    CreateDate: new Date(),
    Photo: ''
  }

  constructor(private _trasnportService: TransportService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.driverID = Number(this.route.snapshot.paramMap.get('driverId'));
    if (this.driverID !== 0) {
      this._trasnportService.GetTransportDriversbyID(this.driverID).subscribe(
        res => { 
          const joining = new Date(res.joiningDate);
          const formattedJoiningDate = `${joining.getFullYear()}-${(joining.getMonth() + 1).toString().padStart(2, '0')}-${joining.getDate().toString().padStart(2, '0')}`;

          this.driverData = res;
          this.driverData.joiningDate = formattedJoiningDate;
           
        },
        err => {
          console.log("Error: ", err);
        }
      );
    }
  }

  get dobStr(): string {
    return this.driverData.dob
      ? new Date(this.driverData.dob).toISOString().substring(0, 10)
      : '';
  }

  set dobStr(val: string) {
    this.driverData.dob = val ? new Date(val).toISOString() : '';
  }


  addDriver() {
    console.log('Driver Data:', this.driverData);
    if (this.driverID == 0) {
      this._trasnportService.PostTransportDriver(this.driverData, this.selectedFile).subscribe(
        res => {
          console.log('Driver added successfully:', res);
          this.clear(); 
        },
        err => {
          console.error('Error adding driver:', err);
          // Logic to handle error in adding driver
        }
      );
    }
    else {
      this._trasnportService.UpdateTransportDriver(this.driverID, this.driverData, this.selectedFile).subscribe(
        res => {
          console.log("Response: ", res);
          this.router.navigate(['/transport/add-driver']);
          this.clear();
        },
        err => {
          console.log("Error: ",err);
        }
      );
    }
     
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  clear() {
    this.driverData = {
      driver_id: 0,
      name: '',
      dob: '',
      license_no: '',
      phoneNumber: '', 
      address: '',
      joiningDate: '',
      school_id: '',
      CreateDate: new Date(),
      Photo: ''
    };
    console.log('Driver data cleared');
  }

}

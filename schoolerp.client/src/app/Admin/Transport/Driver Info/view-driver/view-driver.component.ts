import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../Services/transport.service';
import { Drivers } from '../../../../models/transport';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrl: './view-driver.component.css'
})
export class ViewDriverComponent implements OnInit {

  driverList: Drivers[] = [];

  constructor(private _trasnportService: TransportService, private router: Router) { }

  ngOnInit() {
    this.loadDriverList();
  }

  loadDriverList() {
    this._trasnportService.GetTransportDrivers().subscribe(
      res => {
        this.driverList = res;
        console.log("Driver List: ", this.driverList);
      },
      err => {
        console.log("Error found: ",err);
      }
    );
  }

  editDriverDetail(driverId: number) {
    this.router.navigate(['/transport/add-driver', driverId]);
  }

  deleteDriverDetail(driverId: number, index: number) {
    if (confirm("Are you sure you want to delete this driver?")) {
      this._trasnportService.DeleteTransportDriver(driverId).subscribe(
        res => {
          this.driverList.splice(index, 1);   
        },
        err => {
          console.error("Deletion failed", err);
          alert("Something went wrong while deleting.");
        }
      );
    }
  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { TransportService } from '../../../../Services/transport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {

  vehicleInfo: any;

  currentIndex: number | null = null;

  constructor(private _transportService: TransportService, private router: Router) {

  }

  ngOnInit() {
    this.loadVehicleData();
  }

  loadVehicleData() {
    this._transportService.GetTransportVehicleForVehicleList().subscribe(
      res => {
        this.vehicleInfo = res;
        console.log("Res Vehicle List: ",res);
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  editVehicleInfo(vehicle_id: number) {
    console.log("Vehicle Id: ", vehicle_id);
    this.router.navigate(['/transport/add-vehicle', vehicle_id]);
  }

  deleteVehicleInfo(vehicle_id: number,index:number) {
    console.log("Vehicle Id: ", vehicle_id);
    this._transportService.DeleteTransportVehicle(vehicle_id).subscribe(
      succ => {
        console.log("Vehicle Info Deleted ", succ);
        this.vehicleInfo.splice(index, 1);
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  toggleAction(index:number) {
    this.currentIndex = this.currentIndex == index ? null : index;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.action-container')) {
      this.currentIndex = null;
    }
  }

}

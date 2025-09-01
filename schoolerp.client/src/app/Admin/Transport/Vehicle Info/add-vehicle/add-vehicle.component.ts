import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../Services/transport.service';
import { Drivers, Vehicle, VehicleType } from '../../../../models/transport';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'] // spelling fix: styleUrl -> styleUrls
})
export class AddVehicleComponent implements OnInit {

  driverData: Drivers[] = [];
  vehicleTypeData: VehicleType[] = [];

  routesWithStops: any[] = [];
  mappedRouteStopIds: {route_id:number,stop_id:number}[] = [];

  vehicle_id: number = 0;

  gpsSettings: boolean = false;

  VehicleData: Vehicle = {
    vehicle_id: 0, 
    vehicle_number: '',
    insurance_no: '',
    insurance_expiry: '',
    pollution_no: '',
    pollution_expiry: '',
    vehicle_owner: '',
    vehicle_model: '',
    assigned_driverID: 0,
    IsActive: true,
    school_id: '',
    imeI_no: '',
    gpS_Username: '',
    apI_URL: '',
    status: '0',
    data_Key: '',
    LastUpdated: new Date()
  };

  constructor(private _transportService: TransportService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {

    this.vehicle_id = (Number)(this.router.snapshot.paramMap.get('vehicle_id')); 
    this.loadDriverData();
    this.loadVehicleTypeData();

    this._transportService.GetTransportRouteWithStops().subscribe(routes => {
      this.routesWithStops = routes;
      console.log("This RouteWithStops: ", this.routesWithStops);
    });


    if (this.vehicle_id != 0) {
      this._transportService.GetTransportVehicleSingle(this.vehicle_id).subscribe(
        res => {
          this.VehicleData = res;
          if (this.VehicleData.insurance_expiry) {
            this.VehicleData.insurance_expiry = this.formatDateString(this.VehicleData.insurance_expiry);
          }

          if (this.VehicleData.pollution_expiry) {
            this.VehicleData.pollution_expiry = this.formatDateString(this.VehicleData.pollution_expiry);
          }      
        },
        err => {
          console.log("Error in fetching vehicleData: ",err);
        }
      );

      this._transportService.GetTransportVehiclesMappings(this.vehicle_id).subscribe(mapping => {
        this.mappedRouteStopIds = mapping.map((m: { routeId: number, stopId: number; }) => ({
            route_id: m.routeId,
            stop_id: m.stopId 
        }));
        console.log("Mapping: ",mapping);
      });

    }

  }

  formatDateString(dateInput: any): string {
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0]; // returns 'YYYY-MM-DD'
  } 

  loadDriverData() {
    this._transportService.GetTransportDrivers().subscribe(
      res => {
        this.driverData = res;
      },
      err => {
        console.error("Error loading drivers:", err);
      }
    );
  }

  loadVehicleTypeData() {
    this._transportService.GetTransportVehiclesType().subscribe(
      res => {
        this.vehicleTypeData = res;
      },
      err => {
        console.error("Error loading vehicle types:", err);
      }
    );
  }

  addVehicle() {
    // Set selected values into VehicleData
    this.VehicleData.vehicle_model = this.VehicleData.vehicle_model;
    this.VehicleData.assigned_driverID = Number(this.VehicleData.assigned_driverID);

    if (!this.VehicleData.vehicle_number || this.VehicleData.vehicle_model == '') {
      alert("Please fill all mandatory fields.");
      return;
    }
    if (this.VehicleData.vehicle_id == 0) {
      this._transportService.PostTransportVehicle(this.VehicleData).subscribe(
        res => {
          console.log("REsponse: asa: ",res);
          this._transportService.PostTransportVehicleMapping(res.vehicle_id, this.mappedRouteStopIds).subscribe(
            routes => {
              console.log("Routes: ", routes);
              alert("Vehicle added successfully!");
              this.clear();
            },
            err => {
              console.log("Error: ",err);
            }
          );
          
        },
        err => {
          console.error("Error adding vehicle:", err);
          alert("Failed to add vehicle.");
        }
      );
    }
    else {
      this._transportService.UpdateTransportVehicle(this.VehicleData, this.VehicleData.vehicle_id).subscribe(
        res => {
          this._transportService.PostTransportVehicleMapping(this.vehicle_id, this.mappedRouteStopIds).subscribe(
            routes => {
              console.log("Routes: ", routes);
              alert("Vehicle added successfully!");
              this.clear();
              this.route.navigate(['/transport/vehicle-list']);
            },
            err => {
              console.log("Error: ", err);
            }
          );
        },
        err => {
          console.log("Error: ",err);
        }
      );
    }
     
  }

  isStopChecked(route_id:number,stopid: number) {
    return this.mappedRouteStopIds.some(x => x.route_id === route_id && x.stop_id === stopid);
  }

  onStopToggle(event: any, route_id: number, stop_id: number) {
    if (!event.target.checked) {
      this.mappedRouteStopIds = this.mappedRouteStopIds.filter(
        x => !(x.route_id === route_id && x.stop_id === stop_id)
      );
    }
    else {
      const exists = this.mappedRouteStopIds.some(
        x => x.route_id === route_id && x.stop_id === stop_id
      );
      if (!exists) {
        this.mappedRouteStopIds.push({ route_id, stop_id });
      }
    }
  }

  toggleGPSSetting() {
    this.gpsSettings = !this.gpsSettings; 
  }

  clear() {
    this.VehicleData = {
      vehicle_id: 0, 
      vehicle_number: '',
      insurance_no: '',
      insurance_expiry: '',
      pollution_no: '',
      pollution_expiry: '',
      vehicle_owner: '',
      vehicle_model: '',
      assigned_driverID: 0,
      IsActive: true,
      school_id: '',
      imeI_no: '',
      gpS_Username: '',
      apI_URL: '',
      status: '',
      data_Key: '',
      LastUpdated: new Date()
    };
    this.mappedRouteStopIds = []
  }
}

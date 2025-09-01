import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../Services/transport.service';
import { VehicleType } from '../../../../models/transport';

@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.css']
})
export class VehicleModelComponent implements OnInit {
  vehicleTypeData: VehicleType = this.initializeVehicleType();
  vehicleTypeList: VehicleType[] = [];
  isEditMode: boolean = false;

  constructor(private _transportService: TransportService) { }

  ngOnInit(): void {
    this.loadVehicleModelType();
  }

  initializeVehicleType(): VehicleType {
    return {
      vehicle_type_id: 0,
      model_name: '',
      model_type: '',
      isActive: true,
      school_id: ''
    };
  }

  loadVehicleModelType(): void {
    this._transportService.GetTransportVehiclesType().subscribe({
      next: (res) => {
        this.vehicleTypeList = res;
      },
      error: (err) => {
        console.error('Error fetching vehicle types:', err);
      }
    });
  }

  saveVehicleModelType(): void {
    if (!this.vehicleTypeData.model_name || !this.vehicleTypeData.model_type) {
      alert('Please enter required fields.');
      return;
    }

    if (this.isEditMode) {
      this._transportService.UpdateTransportVehicleType(this.vehicleTypeData).subscribe({
        next: (res) => {
          this.resetForm();
          this.loadVehicleModelType();
          alert('Vehicle model updated successfully.');
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this._transportService.PostTransportVehicleType(this.vehicleTypeData).subscribe({
        next: (res) => {
          this.resetForm();
          this.loadVehicleModelType();
          alert('Vehicle model added successfully.');
        },
        error: (err) => console.error('Save failed:', err)
      });
    }
  }

  editVehicleType(vdata: VehicleType): void {
    this.vehicleTypeData = { ...vdata };
    this.isEditMode = true;
  }

  deleteVehicleType(vehicle_type_id: number, index:number): void {
    const confirmDelete = confirm('Are you sure you want to delete this vehicle model?');
    if (!confirmDelete) return;

    this._transportService.DeleteTransportVehicleType(vehicle_type_id).subscribe({
      next: () => {
        this.vehicleTypeList.splice(index, 1); 
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

  resetForm(): void {
    this.vehicleTypeData = this.initializeVehicleType();
    this.isEditMode = false;
  }
}

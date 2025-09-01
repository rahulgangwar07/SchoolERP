import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';
import { Drivers, VehicleType } from '../models/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private readonly apiurl = environment.apiUrl + '/Transport';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  GetTransportRoutes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-routes?school_id=${school_id}`);
  }

  GetTransportStops() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-stops?school_id=${school_id}`);
  }

  GetTransportVehiclesType() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<VehicleType[]>(`${this.apiurl}/get-transport-vehicle-types?school_id=${school_id}`);
  }

  GetTransportVehicles() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-vehicles?school_id=${school_id}`);
  }

  GetTransportVehicleSingle(vehicle_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-transport-vehicle-by-id/${vehicle_id}?school_id=${school_id}`);
  }

  GetTransportVehiclesMappings(vehicle_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-transport-vehicles-mapping/${vehicle_id}?school_id=${school_id}`);
  }

  GetTransportDrivers() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Drivers[]>(`${this.apiurl}/get-transport-drivers?school_id=${school_id}`);
  }

  GetTransportDriversbyID(driverID:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<Drivers>(`${this.apiurl}/get-transport-drivers-by-id/${driverID}?school_id=${school_id}`);
  }
  
  GetTransportAssignments() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-assignments?school_id=${school_id}`);
  }

  GetTransportFees() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-fees?school_id=${school_id}`);
  }

  GetTransportVehicleTypes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-vehicle-types?school_id=${school_id}`);
  }

  GetTransportRouteWithStops() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-transport-route-with-stops?school_id=${school_id}&`);
  }

  GetSingleTransportRouteWithStops(routeId:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-single-transport-route-with-stops/${routeId}?school_id=${school_id}`);
  }

  GetTransportVehicleWithType() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-vehicle-with-type?school_id=${school_id}`);
  }
  
  GetTransportVehicleForVehicleList() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-vehicle-for-list?school_id=${school_id}`);
  }

  GetTransportAssignmentWithDetails() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-assignment-with-details?school_id=${school_id}`);
  }

  GetTransportFeeWithDetails() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-fee-with-details?school_id=${school_id}`);
  }

  GetTransportVehicleWithDriver() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-vehicle-with-driver?school_id=${school_id}`);
  }

  GetTransportStopWithRoute() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-stop-with-route?school_id=${school_id}`);
  }

  GetTransportRouteWithVehicle() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-route-with-vehicle?school_id=${school_id}`);
  }

  GetTransportDriverWithVehicle() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-driver-with-vehicle?school_id=${school_id}`);
  }

  GetTransportAssignmentWithVehicle() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-assignment-with-vehicle?school_id=${school_id}`);
  }

  GetTransportAssignmentWithStop() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-assignment-with-stop?school_id=${school_id}`);
  }

  GetTransportAssignmentWithDriver() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-assignment-with-driver?school_id=${school_id}`);
  }

  GetTransportFeeWithRoute() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-fee-with-route?school_id=${school_id}`);
  }

  GetTransportFeeWithStop() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-fee-with-stop?school_id=${school_id}`);
  }

  GetTransportFeeWithVehicle() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-transport-fee-with-vehicle?school_id=${school_id}`);
  }

  PostTransportRoute(route: any) {
    const school_id = this._authService.getSchoolID();
    route.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/add-transport-route?school_id=${school_id}`, route);
  }

  PostTransportStop(stop: any,route_id:number) {
    const school_id = this._authService.getSchoolID(); 
    // Set school_id on each stop
    const updatedStops = stop.map((s: any) => ({
      ...s,
      school_id: school_id,
      route_id: route_id
    }));
    console.log("Ppost Transport: ", updatedStops);
    return this.http.post(`${this.apiurl}/add-transport-stop?school_id=${school_id}`, updatedStops);
  }


  PostTransportVehicleType(vehicleType: VehicleType) {
    const school_id = this._authService.getSchoolID();
    vehicleType.school_id = school_id;
    return this.http.post(`${this.apiurl}/add-transport-vehicle-type?school_id=${school_id}`, vehicleType);
  }


  PostTransportVehicle(vehicle: any) {
    const school_id = this._authService.getSchoolID();
    vehicle.school_id = school_id;
    return this.http.post<any>(`${this.apiurl}/add-transport-vehicle?school_id=${school_id}`, vehicle);
  }

  PostTransportVehicleMapping(vehicle_id: number, mappedIds: { route_id: number, stop_id: number }[]) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post(`${this.apiurl}/add-transport-vehicle-mapping/${vehicle_id}?school_id=${school_id}`, mappedIds);
  }

  PostTransportDriver(driver: Drivers, file: File | null) {
    const school_id = this._authService.getSchoolID();
    driver.school_id = school_id; 
    const formData = new FormData();
    formData.append('driver', JSON.stringify(driver));

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post(`${this.apiurl}/add-transport-driver?school_id=${school_id}`, formData);
  }

  PostTransportAssignment(assignment: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post(`${this.apiurl}/add-transport-assignment?school_id=${school_id}`, assignment);
  }

  PostTransportFee(fee: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post(`${this.apiurl}/add-transport-fee?school_id=${school_id}`, fee);
  }


  UpdateTransportRoute(route: any) {
    const school_id = this._authService.getSchoolID();
    console.log("UpdateTransportRoute: ",route);
    return this.http.put(`${this.apiurl}/update-transport-route/${route.route_id}?school_id=${school_id}`, route);
  }

  UpdateTransportStop(stop: any) {
    const school_id = this._authService.getSchoolID();
    console.log("UpdateTransportStop: ", stop);
    return this.http.put(`${this.apiurl}/update-transport-stop/?school_id=${school_id}`, stop);
  }

  UpdateTransportVehicleType(vehicleType: any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.put(`${this.apiurl}/update-transport-vehicle-type/${vehicleType.vehicle_type_id}?school_id=${school_id}`, vehicleType);
  }

  UpdateTransportVehicle(vehicle: any,v_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.put(`${this.apiurl}/update-transport-vehicle/${v_id}?school_id=${school_id}`, vehicle);
  }

  UpdateTransportDriver(driverID:number,driver: any,file:File | null) {
    const school_id = this._authService.getSchoolID();

    const formData = new FormData();
    formData.append('driver', JSON.stringify(driver));

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.put(`${this.apiurl}/update-transport-driver/${driverID}?school_id=${school_id}`, formData);
  }

  UpdateTransportAssignment(assignment: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.put(`${this.apiurl}/update-transport-assignment?school_id=${school_id}`, assignment);
  }

  UpdateTransportFee(fee: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.put(`${this.apiurl}/update-transport-fee?school_id=${school_id}`, fee);
  }

  DeleteTransportRoute(route_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-route?school_id=${school_id}&route_id=${route_id}`);
  }

  DeleteTransportStop(stop_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-stop?school_id=${school_id}&stop_id=${stop_id}`);
  }

  DeleteTransportVehicleType(vehicle_type_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-vehicle-type/${vehicle_type_id}?school_id=${school_id}`);
  }

  DeleteTransportVehicle(vehicle_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-vehicle/${vehicle_id}?school_id=${school_id}`);
  }

  DeleteTransportDriver(driver_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-driver?school_id=${school_id}&driver_id=${driver_id}`);
  }
    
  DeleteTransportAssignment(driver_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-assignment?school_id=${school_id}&driver_id=${driver_id}`);
  }

  
  DeleteTransportFee(driver_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-transport-fee?school_id=${school_id}&driver_id=${driver_id}`);
  }







}

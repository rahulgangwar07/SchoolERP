import { publish } from "rxjs";


export interface TransportRoute {
  route_id: number;
  route_Code: string;
  route_name: string;
  description: string;
  start_location: string;
  end_location: string;
  aaplied_month: string;
  maximum_stop_fare: string;
  isActive: boolean;
  school_id: string;
}

export interface TransportStop {
  stop_id: number;
  route_id: number;
  stop_name: string;
  amount: number;
  picktime: string; // Use string to handle TimeOnly
  stoptime: string; // Use string to handle TimeOnly
  sequenceNo: number;
  school_id: string;
}

export interface VehicleType {
  vehicle_type_id: number;
  model_name: string;
  model_type: string;
  isActive: boolean;
  school_id: string;
}

export interface Vehicle {
  vehicle_id: number; 
  vehicle_number: string;
  insurance_no: string;
  insurance_expiry: Date | string;
  pollution_no: string;
  pollution_expiry: Date | string;
  vehicle_owner: string;
  vehicle_model: string; 
  assigned_driverID: number; 
  //route_id: number;
  IsActive: boolean;
  school_id: string;
  imeI_no: string;
  gpS_Username: string;
  apI_URL: string;
  status: string;
  data_Key: string;
  LastUpdated: Date;
}

export interface VehicleRouteMapping {
  mapping_id: number;
  vehicle_id: number;
  route_id: number; 
  assigned_date: Date | "";
  isActive: boolean;
  school_id: string;  
}

export interface Drivers {
  driver_id: number;
  name: string;
  dob: string; 
  license_no: string;
  phoneNumber: string; 
  address: string;
  joiningDate: string;
  school_id: string;
  CreateDate: Date | "";
  Photo: string;
}

export interface TransportAssignments {
  assignment_id: number;
  student_id: number;
  route_id: number;
  stop_id: number;
  vehicle_id: number;
  driver_id: number;
  assignedDate: Date; // Use Date to handle DateOnly
  isActive: boolean;
  session: string;
  school_id: string;
}

export interface TransportFees {
  fee_id: number;
  student_id: number;
  route_id: number;
  stop_id: number;
  month: number; // 1-12
  year: number;
  amount: number;
  paid: boolean;
  paymentDate: Date;
  receiptNo: string;
  session: string;
  school_id: string;
}


export interface TransportRouteWithStops {
  route: TransportRoute;
  stops: TransportStop[]; 
}

export interface TransportVehicleWithType {
  vehicle: Vehicle;
  vehicleType: VehicleType;
}

export interface TransportAssignmentWithDetails {
  assignment: TransportAssignments;
  studentName: string; // Assuming you will fetch student name from another service
  routeName: string; // Assuming you will fetch route name from another service
  stopName: string; // Assuming you will fetch stop name from another service
  vehicleNumber: string; // Assuming you will fetch vehicle number from another service
  driverName: string; // Assuming you will fetch driver name from another service
}

export interface TransportFeeWithDetails {
  fee: TransportFees;
  studentName: string; // Assuming you will fetch student name from another service
  routeName: string; // Assuming you will fetch route name from another service
  stopName: string; // Assuming you will fetch stop name from another service
  monthName: string; // Assuming you will convert month number to month name
}

export interface TransportVehicleWithDriver {
  vehicle: Vehicle;
  driver: Drivers;
}

export interface TransportStopWithRoute {
  stop: TransportStop;
  route: TransportRoute;
}

export interface TransportRouteWithVehicle {
  route: TransportRoute;
  vehicles: Vehicle[]; // Assuming a route can have multiple vehicles
}

export interface TransportDriverWithVehicle {
  driver: Drivers;
  vehicle: Vehicle;
}

export interface TransportAssignmentWithVehicleAndDriver {
  assignment: TransportAssignments;
  vehicle: Vehicle;
  driver: Drivers;
}

export interface TransportStopWithAssignment {
  stop: TransportStop;
  assignments: TransportAssignments[]; // Assuming a stop can have multiple assignments
}

export interface TransportRouteWithAssignments {
  route: TransportRoute;
  assignments: TransportAssignments[]; // Assuming a route can have multiple assignments
}

export interface TransportFeeWithAssignment {
  fee: TransportFees;
  assignment: TransportAssignments; // Assuming a fee is linked to an assignment
}

export interface TransportVehicleWithAssignments {
  vehicle: Vehicle;
  assignments: TransportAssignments[]; // Assuming a vehicle can have multiple assignments
}

export interface TransportDriverWithAssignments {
  driver: Drivers;
  assignments: TransportAssignments[]; // Assuming a driver can have multiple assignments
}

export interface TransportRouteWithVehicleAndStops {
  route: TransportRoute;
  vehicles: Vehicle[]; // Assuming a route can have multiple vehicles
  stops: TransportStop[]; // Assuming a route can have multiple stops
}
export interface TransportRouteWithDriverAndVehicle {
  route: TransportRoute;
  driver: Drivers;
  vehicle: Vehicle;
}

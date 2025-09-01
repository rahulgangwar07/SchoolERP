import { Component, OnInit, HostListener } from "@angular/core";
import { TransportRoute, TransportStop } from "../../../../models/transport";
import { TransportService } from "../../../../Services/transport.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrl: './add-route.component.css'
})
export class AddRouteComponent implements OnInit {

  transportRoute: TransportRoute = {
    route_id: 0,
    route_Code: '',
    route_name: '',
    description: '',
    start_location: '',
    end_location: '',
    aaplied_month: '',
    maximum_stop_fare: '',
    isActive: true,
    school_id: ''
  };

  stopWiseFare: string = '';

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  selectedMonths: string[] = [];
  monthDropdownOpen = false;

  stops: TransportStop[] = [{
    stop_id: 0,
    route_id: 0,
    stop_name: '',
    amount: 0,
    picktime: '',
    stoptime: '',
    sequenceNo: 0,
    school_id: ''
  }];

  routerId: number = 0;

  constructor(private _tarnsportService: TransportService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerId = Number(this.router.snapshot.paramMap.get('routeId'));
    if (this.routerId > 0) {
      this._tarnsportService.GetSingleTransportRouteWithStops(this.routerId).subscribe(
        res => { 
          this.transportRoute = res.route;
          this.selectedMonths = this.transportRoute.aaplied_month.split(",");
          this.stops = res.stops;
          console.log("Response: ", res);
        },
        err => {
          console.log("Error: ", err);
        }
      );
    }
  }



  toggleMonthDropdown() {
    this.monthDropdownOpen = !this.monthDropdownOpen;
  }

  onMonthCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedMonths.push(value);
    } else {
      this.selectedMonths = this.selectedMonths.filter(v => v !== value);
    }
  }

  getSelectedMonthsText(): string {
    if (this.selectedMonths.length === 0) return 'Select month(s)';
    return this.selectedMonths.join(', ');
  }

  addStop() {
    this.stops.push({
      stop_id: 0,
      route_id: 0,
      stop_name: '',
      amount: 0,
      picktime: '',
      stoptime: '',
      sequenceNo: 0,
      school_id: ''
    }); 
  }

  removeStop(i: number) { 
     this.stops.splice(i, 1); 
  }

  onSubmit() {
    debugger;
    this.transportRoute.aaplied_month = this.selectedMonths.join(', ');
    if (this.routerId == 0) {
      this._tarnsportService.PostTransportRoute(this.transportRoute).subscribe(
        res => {
          console.log("Response: ", res);
          this._tarnsportService.PostTransportStop(this.stops, (Number)(res.route_id)).subscribe(
            res => {
              console.log("Stop Res : ", res);
            },
            err => {
              console.log("Error: ", err);
            }
          );
          this.clear();
        },
        err => {
          console.log("Error: ", err);
        }
      );
      console.log('Transport Route:', this.transportRoute);
      console.log('Stops:', this.stops);
    }
    else {
      this._tarnsportService.UpdateTransportRoute(this.transportRoute).subscribe(
        res => {
          console.log("Update Transport Res: ", res);
          this._tarnsportService.UpdateTransportStop(this.stops).subscribe(
            res => {
              console.log("Update Transport Stop Res: ",res);
            },
            err => {
              console.log("Error: ",err);
            }
          );
        },
        err => {
          console.log("Error Transport: ",err);
        }
      );
    }
    

    // TODO: Add API/service call here
  }

  clear() {
    this.transportRoute = {
      route_id: 0,
      route_Code: '',
      route_name: '',
      description: '',
      start_location: '',
      end_location: '',
      aaplied_month: '',
      maximum_stop_fare: '',
      isActive: true,
      school_id: ''
    };
    this.selectedMonths = [];
    this.stopWiseFare = '';
    this.stops = [{
      stop_id: 0,
      route_id: 0,
      stop_name: '',
      amount: 0,
      picktime: '',
      stoptime: '',
      sequenceNo: 0,
      school_id: ''
    }];
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.monthDropdownOpen = false;
    }
  }
}

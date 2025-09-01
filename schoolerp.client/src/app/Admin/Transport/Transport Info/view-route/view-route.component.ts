import { Component, OnInit } from '@angular/core';
import { TransportService } from '../../../../Services/transport.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrl: './view-route.component.css'
})
export class ViewRouteComponent implements OnInit {

  transportRoutes: any[] = [];
  toggleIndex: number | null = null;
  toggleStops: Set<number> = new Set();
 
  nativeEle: string = "none";


  constructor(private _tarnsportService: TransportService, private route: Router) { }

  ngOnInit(): void {
    this.loadTransportData();

  }

  loadTransportData() {
    this._tarnsportService.GetTransportRouteWithStops().subscribe(
      res => {
        this.transportRoutes = res;
        console.log("Response: ",res);
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  toggleStopsbtn(index: number) {
    if (this.toggleStops.has(index)) {
      this.toggleStops.delete(index); 
    } else {
      this.toggleStops.add(index);  
    }
  }

  actionToggle(index:number) {
    this.toggleIndex = this.toggleIndex === index ? null : index;
  }

  editTransportRoute(route_id:number) {
    this.route.navigate(['/transport/add-route', route_id]);
  }

  deleteTransportRoute(route_id: number) {
    alert("Delete Route: " + route_id);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../../../Services/Messages/communication.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';

@Component({
  selector: 'app-view-queries',
  templateUrl: './view-queries.component.html',
  styleUrls: ['./view-queries.component.css']
})
export class ViewQueriesComponent implements OnInit {

  facultyId: number = 0;
  askedName: string = "";
  communicationId: number = 0;
  isPopupOpen: boolean = false;
  requestType: string = "Add Response";
  userRole: string = "";
  userId: number = 0;
  communications: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.facultyId = Number(this.route.snapshot.paramMap.get('faculty_id'));
    this.userRole = this.authService.getUserRole();
    this.userId = Number(this.authService.getUserID());
    this.loadCommunications();
  }

  loadCommunications(): void {
    this.communicationService.getCommunicationbyFId(this.facultyId).subscribe({
      next: (res: any[]) => {
        this.communications = res;
        console.log("Loaded communications:", this.communications);
      },
      error: (err) => {
        console.error("Error loading communications:", err);
      }
    });
  }

  openResponsePopup(comm: any, askedName:string): void {
    this.communicationId = comm.communication_id;
    this.askedName = askedName;
    this.isPopupOpen = true;
  }

  closePopup(event: boolean): void {
    this.isPopupOpen = event;
    if (!event) this.loadCommunications();  
  }
}

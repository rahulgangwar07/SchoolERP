import { Component, HostListener, OnInit } from '@angular/core';
import { follow_up, leads } from '../../../models/counsellorLead';
import { CounsellorService } from '../../../Services/counsellor.service';
import { Router } from '@angular/router';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-leads',
  templateUrl: './view-leads.component.html',
  styleUrl: './view-leads.component.css'
})
export class ViewLeadsComponent implements OnInit {

  leads: leads[] = [];
  filteredleads: leads[] = [];
  toggleIndex: number | null = null;
  searchText: string = "";

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  constructor(private _counsellorService: CounsellorService, private router: Router, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindLeadType();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

  }

  bindLeadType() {
    this._counsellorService.getLeads().subscribe(
      (response: leads[]) => {
        this.leads = response;
        this.filteredleads = this.leads;
        if (this.leads.length === 0) {
          this._messageService.addMessage("info", "No leads available at the moment.");
        } else {
          this._messageService.addMessage("success", `Successfully loaded ${this.leads.length} lead(s).`);
        }
      },
      (error) => {
        console.log("Error in lead Type: ", error);
        this._messageService.addMessage("error", "An error occurred while loading the lead data. Please try again later.");
      }
    );
  }

  deletelead(lead_id: number, index: number) {
    this._counsellorService.deleteLead(lead_id).subscribe(
      (lead: leads) => {
        console.log("Lead: ", lead);
        this.leads.splice(index, 1);
        this.filteredleads.splice(index, 1);
        this.toggleIndex = null;
        this._messageService.addMessage("success", "The lead has been successfully deleted.");
      },
      (error) => {
        console.log("Error in lead  : ", error);
        this._messageService.addMessage("error", "An error occurred while deleting the lead. Please try again later.");
      }
    ); 

  }

  sendFollowupData(lead_id: number, followup: follow_up[]) { 
    this.router.navigate(['/counsellor-leads/follow-up', lead_id]);
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element.closest('.action-container') && !element.closest('.action-list'))
      this.toggleIndex = null;
  }

  filter(name: any) {
    console.log("Name: ",name);
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


}

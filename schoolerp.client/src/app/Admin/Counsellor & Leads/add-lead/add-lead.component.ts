import { Component, OnInit } from '@angular/core';
import { CounsellorService } from '../../../Services/counsellor.service';
import { lead_type, leads } from '../../../models/counsellorLead'; 
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.css']
})
export class AddLeadComponent implements OnInit {

  leadTypeList: lead_type[] = [];
  lead: leads = {
    lead_id: 0,
    lead_type_id: 0, 
    name: '',
    father_name: '',
    mother_name: '',
    phone: '',
    address: '',
    date: new Date(),
    next_followup: new Date(),
    comment: '',
    isActive: true,
    school_id: ''  
  };

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];

  themeSetting: any;
   

  constructor(private _counsellorService: CounsellorService, private route: ActivatedRoute, private router: Router
    , private datepipe: DatePipe, private _messageService: SuccessMessagePopupService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindLeadType();
    const lead_id = (Number)(this.route.snapshot.paramMap.get('lead_id')) ?? 0;
    if (lead_id != 0 && lead_id != null) {
      this.bindLeadTypebyId(lead_id);
    }

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  bindLeadType() {
    this._counsellorService.getLeadType().subscribe(
      (response: lead_type[]) => {
        this.leadTypeList = response;
        if (this.leadTypeList.length == 0) {
          this._messageService.addMessage("warning", "Please firstly define Lead Type.");
        } 
      },
      (error) => {
        console.log("Error in lead Type: ", error);
      }
    );
  }

  bindLeadTypebyId(lead_id:number) {
    this._counsellorService.getLeadbyId(lead_id).subscribe(
      (response: leads) => {
        this.lead = response; 
        this.lead.date = this.datepipe.transform(this.lead.date, 'yyyy-MM-dd') ?? new Date(); 
        this.lead.next_followup = this.datepipe.transform(this.lead.next_followup, 'yyyy-MM-dd') ?? new Date();  
      },
      (error) => {
        console.log("Error in lead Type: ", error);
      }
    );
  }

  submitLead() {
    if (this.lead.lead_id === 0) {
      this._counsellorService.insertLead(this.lead).subscribe(
        (response) => {
          this.clear(); 
        },
        (error) => {
          console.log("Error in submitting lead: ", error);
        }
      );
    } else { 
      this._counsellorService.updateLead(this.lead).subscribe(
        (response) => {
          this.router.navigate(['/counsellor-leads/view-leads']);
          this.clear(); 
        },
        (error) => {
          console.log("Error in updating lead: ", error);
        }
      );
    }
  }  

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

  clear() {
    this.lead = {
      lead_id: 0,
      lead_type_id: 0,
      name: '',
      father_name: '',
      mother_name: '',
      phone: '',
      address: '',
      date: new Date(),
      next_followup: new Date(),
      comment: '',
      isActive: true,
      school_id: ''
    };
  }
}

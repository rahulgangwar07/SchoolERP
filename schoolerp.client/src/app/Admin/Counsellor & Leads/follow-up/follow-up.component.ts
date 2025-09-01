import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CounsellorService } from '../../../Services/counsellor.service';
import { follow_up } from '../../../models/counsellorLead';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  leadId: number = 0;
  followupData: follow_up[] = [];

  newFollowup: follow_up = {
    followup_id: 0,
    lead_id: 0,
    followup_date: new Date(),
    followup_action: '',
    followup_result: '',
    isActive: true,
    school_id: ''
  };

  constructor(private route: ActivatedRoute, private _counsellorService: CounsellorService) { }

  ngOnInit(): void { 
    this.leadId = (Number)(this.route.snapshot.paramMap.get('lead_id')) ?? 0;
      
    this.bindFollowups();
  }

  submitFollowup(): void {
    this.newFollowup.lead_id = this.leadId;

    this._counsellorService.insertFollowup(this.newFollowup).subscribe(response => { 
      this.followupData.push(response);
      this.clear();
    });
  }

  bindFollowups() {
    this.newFollowup.lead_id = this.leadId;
    this._counsellorService.getFollowupbylead(this.leadId).subscribe(
      (followups: follow_up[]) => {
        this.followupData = followups
        console.log("Follow Ups: ", followups);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  clear() {
    this.newFollowup = {
      followup_id: 0,
      lead_id: 0,
      followup_date: new Date(),
      followup_action: '',
      followup_result: '',
      isActive: true,
      school_id: ''
    };
  }

}

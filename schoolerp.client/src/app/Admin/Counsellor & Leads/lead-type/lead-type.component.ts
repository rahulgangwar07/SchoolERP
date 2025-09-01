import { Component, HostListener, OnInit } from '@angular/core';
import { CounsellorService } from '../../../Services/counsellor.service';
import { lead_type } from '../../../models/counsellorLead';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-lead-type',
  templateUrl: './lead-type.component.html',
  styleUrl: './lead-type.component.css'
})
export class LeadTypeComponent implements OnInit {

  leadType: lead_type = {
    lead_type_id: 0,
    name: '',
    category_type: 'lead',
    isActive: true,
    school_id: '',
  }

  leadTypeList: lead_type[] = [];

  toggleIndex: number | any = null;

  themeSetting: any;

  constructor(private _counsellorService: CounsellorService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.bindLeadType();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  bindLeadType() {
    this._counsellorService.getLeadType().subscribe(
      (response: lead_type[]) => {
        console.log("Lead Type List: ", response);
        this.leadTypeList = response;
      },
      (error) => {
        console.log("Error in lead Type: ",error);
      }
    );
  }

 
  submitLead() {
    if (this.leadType.lead_type_id == 0) {
      this._counsellorService.insertLeadType(this.leadType).subscribe(
        (response: lead_type) => {
          this.clear();
          this.leadTypeList.push(response);
          console.log("Lead Type Submitted: ", response);
        },
        (error) => {
          console.log("Error in lead Type: ", error);
        });
    }
    else {
      this._counsellorService.updateLeadType(this.leadType).subscribe(
        (response: lead_type) => {
          this.clear();
          const index = this.leadTypeList.findIndex(lead => lead.lead_type_id === response.lead_type_id);
          if (index !== -1) {
            this.leadTypeList[index] = response; 
          }
          console.log("Lead Type Submitted: ", response);
        },
        (error) => {
          console.log("Error in lead Type: ", error);
        });
    }
  }

  editleadType(lead_type_id: number) {
    this._counsellorService.getLeadTypebyId(lead_type_id).subscribe(
      (lead_type: lead_type) => {
        this.leadType = lead_type;
        this.toggleIndex = null;
        console.log("Lead Type: ", lead_type);
      },
      (error) => {
        console.log("Error in lead Type: ", error);
      });
  }
  
  deleteleadType(lead_type_id: number, index: number) { 
    this._counsellorService.deleteLeadType(lead_type_id).subscribe(
      (lead_type: lead_type) => {
        this.leadTypeList.splice(index, 1);
        this.toggleIndex = null;
      },
      (error) => {
        console.log("Error in lead Type: ", error);
      });
  }


  toggleBtn(index: number) {
     
    this.toggleIndex = this.toggleIndex === index ? null : index; 
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.action-container') && !clickedElement.closest('.action-list')) {
      this.toggleIndex = null;
    }
  }

  clear() {
    this.leadType.lead_type_id = 0;
    this.leadType.name = '';
    this.leadType.category_type = 'lead';  
  }

}

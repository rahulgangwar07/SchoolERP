import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';
import { follow_up, lead_type, leads } from '../models/counsellorLead';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {

  private apiurlL = environment.apiUrl + '/Lead';
  private apiurlF = environment.apiUrl + '/Followup';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  //Lead Type Services

 
  getLeadType() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<lead_type[]>(`${this.apiurlL}/get-lead-type?school_id=${school_id}`);
  }

  getLeadTypebyId(lead_type_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<lead_type>(`${this.apiurlL}/get-lead-type-by-id?school_id=${school_id}&lead_type_id=${lead_type_id}`);
  }

  insertLeadType(lead_type: lead_type) { 
    const school_id = this._authService.getSchoolID();
    lead_type.school_id = school_id;
    return this.http.post<lead_type>(`${this.apiurlL}/post-lead-type?school_id=${school_id}`, lead_type);
  }

  updateLeadType(lead_type: lead_type) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<lead_type>(`${this.apiurlL}/update-lead-type?school_id=${school_id}`, lead_type);
  }

  deleteLeadType(lead_type_id: number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.delete<lead_type>(`${this.apiurlL}/delete-lead-type?school_id=${school_id}&lead_type_id=${lead_type_id}`);
  }

  //Lead Services

  getLeads() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<leads[]>(`${this.apiurlL}/get-leads?school_id=${school_id}`);
  }

  getLeadbyId(lead_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<leads>(`${this.apiurlL}/get-lead-by-id?school_id=${school_id}&lead_id=${lead_id}`);
  }

  insertLead(lead: leads) {
    const school_id = this._authService.getSchoolID(); 
    lead.school_id = school_id; 
    return this.http.post<leads>(`${this.apiurlL}/post-leads?school_id=${school_id}`, lead);
  }

  updateLead(lead: leads) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<leads>(`${this.apiurlL}/update-leads?school_id=${school_id}`, lead);
  }

  deleteLead(lead_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<leads>(`${this.apiurlL}/delete-lead?school_id=${school_id}&lead_id=${lead_id}`);
  }

  //Follow Up Services

  getFollowup() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<follow_up[]>(`${this.apiurlF}/get-follow-up?school_id=${school_id}`);
  }

  getFollowupbyId(followup_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<follow_up>(`${this.apiurlF}/get-follow-up-by-id?school_id=${school_id}&follow_up_id=${followup_id}`);
  }

  getFollowupbylead(lead:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<follow_up[]>(`${this.apiurlF}/get-follow-up-by-lead-id?school_id=${school_id}&lead_id=${lead}`);
  }

  insertFollowup(followup: follow_up) {
    const school_id = this._authService.getSchoolID();
    followup.school_id = school_id;
    return this.http.post<follow_up>(`${this.apiurlF}/post-follow-up?school_id=${school_id}`, followup);
  }

  updateFollowup(followup: follow_up) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<follow_up>(`${this.apiurlF}/update-follow-up?school_id=${school_id}`, followup);
  }

  deleteFollowup(followup_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<follow_up>(`${this.apiurlF}/delete-follow-up?school_id=${school_id}&follow_up_id=${followup_id}`);
  }

 
   

}

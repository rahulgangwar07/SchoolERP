import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Macro, SMSGatewaySettings, SMSTemplates, SMSTemplatesDTOs, templateTypes } from '../../models/sms';
import { AuthServiceService } from '../AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class SmsSettingService {

  private apiurl = environment.apiUrl + '/SMSSetting';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getAllMacros() {
    return this.http.get<Macro[]>(`${this.apiurl}/get-all-macros`);
  }

  templateType() {
    return this.http.get<templateTypes[]>(`${this.apiurl}/template-types`);
  }

  templateMacroUsage() {
    return this.http.get<any>(`${this.apiurl}/template-macro-usage`);
  }

  templateMacroUsagebyId(template_type_id:number) {
    return this.http.get<any>(`${this.apiurl}/macro-usage-by-template-id?template_type_id=${template_type_id}`);
  }

  getTemplates() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any[]>(`${this.apiurl}/get-templates?school_id=${school_id}`)
  } 

  getTemplatesbyId(template_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<SMSTemplates>(`${this.apiurl}/get-template-by-id?school_id=${school_id}&id=${template_id}`)
  }

  insertTemplate(data: SMSTemplatesDTOs) {
    const school_id = this._authService.getSchoolID();
    const user_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/post-templates?school_id=${school_id}&create_by=${user_id}`, data)
  }

  deleteTemplate(id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<SMSTemplates>(`${this.apiurl}/delete-template?school_id=${school_id}&id=${id}`)
  }


  getGatewaySetting() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<SMSGatewaySettings>(`${this.apiurl}/get-gateway-setting?school_id=${school_id}`);
  }
   
  insertGatewaySetting(data: SMSGatewaySettings) {
    const school_id = this._authService.getSchoolID();
    const user_id = this._authService.getUserID();
    data.school_id = school_id;
    data.created_by = user_id ?? "";
    data.updated_by = user_id ?? "";
    return this.http.post<SMSGatewaySettings>(`${this.apiurl}/post-gateway-setting?school_id=${school_id}`, data);
  }

}

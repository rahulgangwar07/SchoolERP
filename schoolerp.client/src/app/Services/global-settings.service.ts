import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  private apiurl = environment.apiUrl + '/GlobalSettings';
  private settingReloadSubject = new BehaviorSubject<void>(undefined);
  settingReload$ = this.settingReloadSubject.asObservable();

  private currentThemeSubject = new BehaviorSubject<any>(null);  
  currentTheme$ = this.currentThemeSubject.asObservable();

  setTheme(theme: string) {
    this.currentThemeSubject.next(theme); 
  }
   
  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }

  notifyHeaderReload() { 
    this.settingReloadSubject.next();
  }

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }


  //Settings
  getSettings() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getSettings?school_id=${school_id}`);
  }

  //header settings
  getGlobalHeader() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getHeaderSettings?school_id=${school_id}`);
  }

  postGlobalHeader(header: any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    return this.http.post(`${this.apiurl}/postHeaderSetting?school_id=${school_id}&created_by=${created_by}`, header);
  }

  //signature settings
  getSignatureSettings() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getSignatureSettings?school_id=${school_id}`);
  }


  posSignatureSetting(type: string, file: File) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiurl}/posSignatureSetting?school_id=${school_id}&created_by=${created_by}&type=${type}`, formData);
  }

  //support contact
  getSupportContactSetting() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getSupportContact?school_id=${school_id}`);
  }


  postSupportContantSettings(data:any) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id; 

    return this.http.post(`${this.apiurl}/postSupportSetting?school_id=${school_id}`, data);
  }
  

  //support contact
  getApplicationTheme() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getApplicationTheme?school_id=${school_id}`);
  }


  postApplicationTheme(data:any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();

    return this.http.post(`${this.apiurl}/postApplicationTheme?school_id=${school_id}&created_by=${created_by}`, data);
  }



}

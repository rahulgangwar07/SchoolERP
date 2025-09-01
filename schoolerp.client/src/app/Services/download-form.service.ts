import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';
import { downloadForm, downloadFormDTOs } from '../models/downloadForm';

@Injectable({
  providedIn: 'root'
})
export class DownloadFormService {

  private apiurl = environment.apiUrl + "/DownloadForm";

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getForms() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<downloadForm[]>(`${this.apiurl}/get-download-forms?school_id=${school_id}`);
  }
  
  getFormbyId(form_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<downloadForm>(`${this.apiurl}/get-download-forms-by-id?school_id=${school_id}&form_id=${form_id}`);
  }
  
  getFormbyType(form_type:string) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.get<downloadForm>(`${this.apiurl}/get-download-forms-by-type?school_id=${school_id}&form_type=${form_type}`);
  }

  insertForms(form: downloadFormDTOs) { 
    const school_id = this._authService.getSchoolID();
    const formData = new FormData();
    formData.append('form_id', form.form_id.toString());
    formData.append('form_name', form.form_name);
    if (form.form_url) {
      formData.append('form_url', form.form_url, form.form_url.name);  
    }
    formData.append('form_type', form.form_type);
    formData.append('school_id', school_id);
    return this.http.post<downloadForm>(`${this.apiurl}/post-download-form?school_id=${school_id}`, formData);
  }
  
  updateForm(form: downloadForm) {
    const school_id = this._authService.getSchoolID();
    return this.http.put<downloadForm[]>(`${this.apiurl}/update-download-form?school_id=${school_id}`, form);
  }
  
  deleteForm(form_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<downloadForm>(`${this.apiurl}/delete-form?school_id=${school_id}&form_id=${form_id}`);
  }

}

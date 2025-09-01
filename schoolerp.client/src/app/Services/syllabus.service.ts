import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {
  private apiurl = environment.apiUrl + '/Syllabus'

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getChapters() {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-chapter?school_id=${school_id}`);
  }
  getChaptersbyClass(clsId: number, subj: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get(`${this.apiurl}/get-chapterbyClass?school_id=${school_id}&class_id=${clsId}&subject_id=${subj}`);
  }

  addChapter(data:any) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post(`${this.apiurl}/add-chapter?school_id=${school_id}`,data);
  }

  
  getSyllabus(clsId: number) {
    const school_id = this._authService.getSchoolID();
    if (clsId == 0) {
      return this.http.get(`${this.apiurl}/get-syllabus?school_id=${school_id}&class_id=0`);
    }
    else {
      return this.http.get(`${this.apiurl}/get-syllabus?school_id=${school_id}&class_id=${clsId}`);
    } 
  }

  addSyllabus(data: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post(`${this.apiurl}/add-syllabus?school_id=${school_id}`, data);
  }

  deleteSyllabus(syllabusId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-syllabus?school_id=${school_id}&syllabus_id=${syllabusId}`);
  }

}

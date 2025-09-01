import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
 

  private apiurl = environment.apiUrl + '/ModuleMapping';
  //private apiurl = 'https://localhost:7030/api/ModuleMapping';

  constructor(private http: HttpClient) { }

  getModule(user_id: number, school_id: string) {
    return this.http.get<any>(`${this.apiurl}/getModule/${user_id}?school_id=${school_id}`);
  }

  getModulewithSubmodule() {
    return this.http.get<any>(`${this.apiurl}/getmodulewithSubmodule`);
  }

  getmodulebyFaculty(des_id: Number, school_id: string) {
    return this.http.get<any>(`${this.apiurl}/getfacultyModule/${des_id}?school_id=${school_id}`);
  }

  addModules(subid: number[], desig_id: number, school_id: string) {
    const payload = {
      desig_id: desig_id,
      school_id: school_id,
      subids: subid
    };
      
    return this.http.post<any>(`${this.apiurl}/addsubModule`, payload);
  }


  deleteModule(pModuleID: Number, subid: Number, desig_id: number, school_id: string) {
    return this.http.delete<any>(`${this.apiurl}/deleteModule/${pModuleID}/${subid}/${desig_id}?school_id=${school_id}`);
  }

  addAllModules(pModuleID: Number, desig_id: number, subids: Set<number>, school_id: string) { 
    return this.http.post<any>(`${this.apiurl}/addAllModules/${pModuleID}/${desig_id}?school_id=${school_id}`, Array.from(subids));
  }

  deleteAllModule(pModuleID: Number, desig_id: number,school_id:string) {
    return this.http.delete<any>(`${this.apiurl}/deleteAllModule/${pModuleID}/${desig_id}?school_id=${school_id}`)
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './AuthServiceService';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private apiurl = environment.apiUrl + '/Permission';
  //private apiurl = 'https://localhost:7030/api/Permission';
   
  private moduleIdSubject = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private _authService: AuthServiceService
  ) { }
   


  getPermissions() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getModuleForPermission?school_Id=${school_id}`)
  }

  postPermission(desig_id: number, module: any) {
    const school_id = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurl}/postPermissions?school_id=${school_id}&desig_id=${desig_id}`,module);
  }

  assignsubModule(desig_id:number,module_id:number) {
    const school_id = this._authService.getSchoolID(); 
    return this.http.post<any>(`${this.apiurl}/assignsubModule?school_id=${school_id}&desig_id=${desig_id}&module_id=${module_id}`,null)
    //assignModule
  }
   
  checkPermission(route: string) {
    const school_id = this._authService.getSchoolID();
    const desig_id = this._authService.getDsignationID(); 
    return this.http.get<any>(`${this.apiurl}?school_id=${school_id}&desig_id=${desig_id}&route=${route}`);
  }
   

}

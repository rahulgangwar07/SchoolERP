import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionService {

  private apiurlFeeCollection = environment.apiUrl + '/FeeCollection'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getStudentData(session:string,actionType: string, value: string) {
    const schoolid = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlFeeCollection}/fee-student-data?schoolId=${schoolid}&session=${session}&actionType=${actionType}&value=${value}`,);
  }
   

  getFeeCollectionData(session: string, actionType: string, value: string) {
    const schoolid = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlFeeCollection}/fee-collection-data/${schoolid}/${session}/${actionType}/${value}`,);
  }

  getMonthlyFee(session: string, clsId: number, monthIds: number[]) {
    const schoolid = this._authService.getSchoolID();

    let params = new HttpParams()
      .set('school_id', schoolid)
      .set('session', session)
      .set('class_id', clsId);

    monthIds.forEach(id => {
      params = params.append('monthIds', id.toString());
    });

    return this.http.get<any>(`${this.apiurlFeeCollection}/get-monthly-fees`, { params });
  }


}

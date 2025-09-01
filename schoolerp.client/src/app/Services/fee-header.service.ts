import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { fee_head_mapping, fee_head_master, fee_head_master_DTOs, fee_type_master } from '../models/account';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class FeeHeaderService {

  private apiurl = environment.apiUrl + '/FeeHeaderSettings'; 
  private apiurlStruture = environment.apiUrl + '/FeeStruture'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getFeeType() {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<fee_type_master[]>(`${this.apiurl}/get-fee-type?school_id=${schoolId}`);
  }

  postFeeType(data: fee_type_master) {
    const schoolId = this._authService.getSchoolID();
    data.school_id = schoolId;
    return this.http.post<fee_type_master>(`${this.apiurl}/insert-fee-type`, data);
  }

  deleteFeeType(feeId: number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.delete<fee_type_master>(`${this.apiurl}/delete-fee-type?school_id=${schoolId}&fee_type_id=${feeId}`);
  }
  

  getFeeHead() {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<fee_head_master_DTOs[]>(`${this.apiurl}/get-fee-head?school_id=${schoolId}`);
  }
  
  postFeeHead(data: fee_head_master) {
    const schoolId = this._authService.getSchoolID();
    data.school_id = schoolId;
    return this.http.post<fee_head_master>(`${this.apiurl}/insert-fee-head`, data);
  }

  deleteFeeHead(feeheadId: number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.delete<fee_head_master>(`${this.apiurl}/delete-fee-head?school_id=${schoolId}&fee_head_id=${feeheadId}`);
  }


  getFeeHeadMappings(session:string) {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<fee_head_mapping[]>(`${this.apiurl}/get-feehead-mapping?school_id=${schoolId}&session=${session}`);
  }

  getFeeTypefromfeeheadMapping(session:string,fee_head_id:number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<number>(`${this.apiurl}/get-feetype-from-mapping?school_id=${schoolId}&session=${session}&fee_head_id=${fee_head_id}`);
  }

  postFeeHeadMapping(data: fee_head_mapping) {
    const schoolId = this._authService.getSchoolID();
    data.school_id = schoolId;
    return this.http.post<fee_head_mapping>(`${this.apiurl}/insert-feehead-mapping`, data);
  }

  deleteFeeHeadMapping(id: number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/delete-feehead-mapping?school_id=${schoolId}&fee_head_mapping_id=${id}`);
  }




  getFeeStruture(session:string,class_id:number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlStruture}/get-fee-installment-structure?school_id=${schoolId}&session=${session}&class_id=${class_id}`);
  }

  getFeeInstallment(session:string,class_id:number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurlStruture}/get-classwise-feeInstallment?school_id=${schoolId}&session=${session}&class_id=${class_id}`);
  }

  postFeeInstallment(session: string,clsId:number,installmentData:any) {
    const schoolId = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurlStruture}/insert-FeeInstallmentData?school_id=${schoolId}&session=${session}&class_id=${clsId}`, installmentData);
  }

  deleteFeeInstallment(session: string, clsId: number) {
    const schoolId = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurlStruture}/clear-fee-installment?school_id=${schoolId}&session=${session}&class_id=${clsId}`);
  }

  createStudentLedgers(session: string) {
    const schoolId = this._authService.getSchoolID();
    return this.http.post<any>(`${this.apiurlStruture}/createStudentLedgers?school_id=${schoolId}&session=${session}`,null);
  }




}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';
import { LibraryBook, LibraryIssue } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private apiurl = environment.apiUrl + '/Library';

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  //getGlobalHeader() {
  //  const school_id = this._authService.getSchoolID();
  //  return this.http.get<any>(`${this.apiurl}/getHeaderSettings?school_id=${school_id}`);
  //} for example, this method is commented out as it is not used in the current context.
   
  getLibraryBooks() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBooks?school_id=${school_id}`);
  }

  getLibraryMembers() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryMembers?school_id=${school_id}`);
  }

  getLibraryIssues() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssues?school_id=${school_id}`);
  }

  getLibraryFines() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryFines?school_id=${school_id}`);
  }

  getLibraryIssueReturnBookbyDate(itemType: string, date: Date | null) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssueReturnBookbyDate?school_id=${school_id}&tpye=${itemType}&itemType=${itemType}&date=${date}`);
  }

  addLibraryBook(book: LibraryBook) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    book.school_id = school_id;
    console.log("LibraryBook: ",book);
    return this.http.post(`${this.apiurl}/addLibraryBook?school_id=${school_id}&created_by=${created_by}`, book);
  }

  addLibraryMember(member: any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    member.school_id = school_id;
    return this.http.post(`${this.apiurl}/addLibraryMember?school_id=${school_id}&created_by=${created_by}`, member);
  }

  addLibraryIssue(issue: any) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const created_by = this._authService.getUserID();
    issue.created_by = created_by;
    issue.session = session;
    issue.school_id = school_id;
    return this.http.post(`${this.apiurl}/addLibraryIssue`, issue);
  }

  addLibraryFine(fine: any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    return this.http.post(`${this.apiurl}/addLibraryFine?school_id=${school_id}&created_by=${created_by}`, fine);
  }

  updateLibraryBook(book: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID();
    return this.http.put<any>(`${this.apiurl}/updateLibraryBook?school_id=${school_id}&updated_by=${updated_by}`, book);
  }

  updateLibraryMember(member: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID();
    return this.http.put<any>(`${this.apiurl}/updateLibraryMember?school_id=${school_id}&updated_by=${updated_by}`, member);
  }

  updateLibraryIssue(issue: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID();
    return this.http.put<any>(`${this.apiurl}/updateLibraryIssue?school_id=${school_id}&updated_by=${updated_by}`, issue);
  }

  updateLibraryBookSubmitData(issue: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID(); 
    issue.issue_id = issue.issueId;
    issue.accession_no = issue.accessionNo;
    issue.created_by = issue.createdBy;
    issue.school_id = issue.schoolId;
    return this.http.put<any>(`${this.apiurl}/UpdateLibraryBookSubmitData?school_id=${school_id}&updated_by=${updated_by}`, issue);
  }

  updateLibraryFine(fine: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID();
    return this.http.put<any>(`${this.apiurl}/updateLibraryFine?school_id=${school_id}&updated_by=${updated_by}`, fine);
  }

  deleteLibraryBook(bookId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/deleteLibraryBook/${bookId}?school_id=${school_id}`);
  }

  deleteLibraryMember(memberId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/deleteLibraryMember?school_id=${school_id}&member_id=${memberId}`);
  }

  deleteLibraryIssue(issueId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/DeleteLibraryIssue?school_id=${school_id}&issue_id=${issueId}`);
  }
   

  deleteLibraryFine(fineId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/deleteLibraryFine?school_id=${school_id}&fine_id=${fineId}`);
  }

  getLibraryBookById(bookId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookById/${bookId}?school_id=${school_id}`);
  }
  

  getLibraryBookByAccession(accno: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookByAccNo/${accno}?school_id=${school_id}`);
  }

  getLibraryMemberById(memberId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryMemberById/${memberId}?school_id=${school_id}`);
  }

  getLibraryIssueById(issueId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssueById?school_id=${school_id}&issue_id=${issueId}`);
  }

  getLibraryFineById(fineId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryFineById?school_id=${school_id}&fine_id=${fineId}`);
  }



  /// Methods to get library data by member or search terms

  getLibraryBooksByMember(memberId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBooksByMember?school_id=${school_id}&member_id=${memberId}`);
  }

  getLibraryIssuesByMember(memberId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssuesByMember?school_id=${school_id}&member_id=${memberId}`);
  }

  getSearchedIssuebook(searchData: any) {
    const school_id = this._authService.getSchoolID();
    console.log("search Data: ", searchData);
    let params = new HttpParams()
      .set('school_id', school_id)
      .set('userType', searchData.userType || '')
      .set('fullName', searchData.fullName || '')
      .set('classs', searchData.class || '0');
       
    return this.http.get<any>(`${this.apiurl}/getLibrarySearcheIssuebook`, { params });
  }
  getLibraryFinesByMember(memberId: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryFinesByMember?school_id=${school_id}&member_id=${memberId}`);
  }

  getLibraryBooksBySearch(searchTerm: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBooksBySearch?school_id=${school_id}&searchTerm=${searchTerm}`);
  }

  getLibraryMembersBySearch(searchTerm: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryMembersBySearch?school_id=${school_id}&searchTerm=${searchTerm}`);
  }

  getLibraryIssuesBySearch(searchTerm: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssuesBySearch?school_id=${school_id}&searchTerm=${searchTerm}`);
  }

  getLibraryFinesBySearch(searchTerm: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryFinesBySearch?school_id=${school_id}&searchTerm=${searchTerm}`);
  }

  getLibraryStatistics() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryStatistics?school_id=${school_id}`);
  }

  getLibraryBookTypes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookTypes?school_id=${school_id}`);
  }

  getLibraryMemberTypes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryMemberTypes?school_id=${school_id}`);
  }

  getLibraryIssueStatuses() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryIssueStatuses?school_id=${school_id}`);
  }

  getLibraryFineStatuses() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryFineStatuses?school_id=${school_id}`);
  }

  getLibrarySettings() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibrarySettings?school_id=${school_id}`);
  }

  updateLibrarySettings(settings: any) {
    const school_id = this._authService.getSchoolID();
    const updated_by = this._authService.getUserID();
    return this.http.put<any>(`${this.apiurl}/updateLibrarySettings?school_id=${school_id}&updated_by=${updated_by}`, settings);
  }

  deleteLibrarySettings() {
    const school_id = this._authService.getSchoolID();
    return this.http.delete(`${this.apiurl}/deleteLibrarySettings?school_id=${school_id}`);
  }

  getLibraryBookLanguages() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookLanguages?school_id=${school_id}`);
  }

  getLibraryBookSubjects() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookSubjects?school_id=${school_id}`);
  }

  getLibraryBookClasses() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookClasses?school_id=${school_id}`);
  }

  getLibraryBookRacks() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookRacks?school_id=${school_id}`);
  }

  getLibraryBookPositions() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookPositions?school_id=${school_id}`);
  }

  getLibraryBookVolumes() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookVolumes?school_id=${school_id}`);
  }

  getLibraryBookEditions() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookEditions?school_id=${school_id}`);
  }

  getLibraryBookPublishers() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookPublishers?school_id=${school_id}`);
  }

  getLibraryBookAuthors() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/getLibraryBookAuthors?school_id=${school_id}`);
  }

  importBooks(formData:any) {
    const school_id = this._authService.getSchoolID();
    const created_by = this._authService.getUserID();
    return this.http.post(`${this.apiurl}/UploadBooks?school_id=${school_id}`, formData);
  }
   

}

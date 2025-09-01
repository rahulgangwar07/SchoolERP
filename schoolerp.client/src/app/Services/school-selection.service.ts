import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolSelectionService {
   
  private selectedSchoolSubject = new BehaviorSubject<string>("0");  
  selectedSchool = this.selectedSchoolSubject.asObservable();

  constructor() { }
   
  setSelectedSchool(school_id: string): void {
    this.selectedSchoolSubject.next(school_id);   
  }
 
  getSelectedSchool(): string {
    return this.selectedSchoolSubject.getValue();   
  }


}

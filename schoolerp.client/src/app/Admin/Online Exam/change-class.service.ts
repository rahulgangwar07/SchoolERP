import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeClassService {

  constructor() { }

  private class_id = new BehaviorSubject<number>(0);
  currentValue = this.class_id.asObservable();

  changeClassId(cls_id:number) {
    this.class_id.next(cls_id);
  }

}

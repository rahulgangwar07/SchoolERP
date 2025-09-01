// sidebar-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  // BehaviorSubject holds the state of the sidebar (initially collapsed)
  private sidebarState = new BehaviorSubject<boolean>(false); // false means collapsed, true means expanded

  // Observable to listen to changes in sidebar state
  sidebarState$ = this.sidebarState.asObservable();

  // Method to toggle sidebar state
  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  // Optionally, directly set the state
  setSidebarState(state: boolean) {
    this.sidebarState.next(state);
  }
}

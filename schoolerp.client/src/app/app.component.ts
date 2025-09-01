import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SidebarStateService } from './Services/sidebar-state.service';
import { Subscription } from 'rxjs';
import { GlobalSettingsService } from './Services/global-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  settingToggle: boolean = false;
  helpSupportToggle: boolean = false;

  isSidebarFull: boolean = false;
  private sidebarStateSubscription: Subscription | undefined;
  themeSetting:any

  constructor(private router: Router, private _sidebarStateService: SidebarStateService, private settingsService: GlobalSettingsService) { }

  ngOnInit() {
    // Listen to route change events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.handleRouteChange(event.url);
      }
    });
    this.sidebarStateSubscription = this._sidebarStateService.sidebarState$.subscribe(
      (state: boolean) => {
        this.isSidebarFull = state;

      }
    );
    this.loadSettings();
    this.settingsService.settingReload$.subscribe(() => { 
      this.loadSettings();
    });

  }

  // Handle route changes
  handleRouteChange(url: string) {
    this._sidebarStateService.setSidebarState(false);
    console.log("Current route:", url); 
  }

  isLoginPage(): boolean {
    const loginPaths = ['/login', '/superadmin-login', '/', '/forget-password','/unauthorized']; 
    return loginPaths.includes(this.router.url);
  }

  title = 'schoolerp.client';

  setting() {
    this.settingToggle = !this.settingToggle;
    if (this.settingToggle) {
      this.helpSupportToggle = false;
    }
  }
  
  helpSupport() {
    this.helpSupportToggle = !this.helpSupportToggle;
    if (this.helpSupportToggle) {
      this.settingToggle = false;
    }
  }

  @HostListener("click", ['$event'])
  onClick(event: MouseEvent) {
    const selectedElement = event.target as HTMLElement;
    if (!selectedElement.closest('.setting-container-1') && !selectedElement.closest('.setting-container-2')) {
      this.settingToggle = false;
      this.helpSupportToggle = false;
    }
    if (selectedElement.closest('li')) {
      this.settingToggle = false;
      this.helpSupportToggle = false;
    }
  }

  private loadSettings(): void {
    this.settingsService.getApplicationTheme().subscribe({
      next: (res) => { 
        this.themeSetting = res;
        this.settingsService.setTheme(this.themeSetting); 
      },
      error: (err) => console.error('Error fetching global header:', err)
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed to prevent memory leaks
    if (this.sidebarStateSubscription) {
      this.sidebarStateSubscription.unsubscribe();
    }
  }

}

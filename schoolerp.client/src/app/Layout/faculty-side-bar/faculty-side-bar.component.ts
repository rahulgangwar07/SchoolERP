
import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../Services/module.service';
import { AuthServiceService } from '../../Services/AuthServiceService';
import { Subscription } from 'rxjs';
import { SidebarStateService } from '../../Services/sidebar-state.service';
import { PermissionsService } from '../../Services/permissions.service'; 
import { GlobalSettingsService } from '../../Services/global-settings.service';
import { ImageServiceService } from '../../Services/image-service.service';

@Component({
  selector: 'app-faculty-side-bar',
  templateUrl: './faculty-side-bar.component.html',
  styleUrls: ['./faculty-side-bar.component.css']
})
export class FacultySideBarComponent implements OnInit {

  modules: any = [];
  userRole: string | null = "";


  sidebarSettings: any;

    isSidebarFull: boolean = false;  
  private sidebarStateSubscription: Subscription | undefined;


  constructor(private _moduleService: ModuleService, private _authService: AuthServiceService,
    private _sidebarStateService: SidebarStateService, private _permissionService: PermissionsService,
    private settingsService: GlobalSettingsService, private imageService: ImageServiceService) { }

  ngOnInit() { 
    
    this.sidebarStateSubscription = this._sidebarStateService.sidebarState$.subscribe(
      (state: boolean) => {
        this.isSidebarFull = state;
      }
    );

    // Fetch modules based on user role
    this.userRole = this._authService.getUserRole();
    if (this.userRole != "SuperAdmin") {
       
      const school_id: string = this._authService.getSchoolID().toString();
      this._moduleService.getModule(Number(this._authService.getUserID()), school_id ).subscribe(
        (response) => {
          this.modules = response; 
        },
        (error) => {
          console.log("Error found in module loading", error);
        }
      );
    }
    this.settingsService.settingReload$.subscribe(() => {
      this.loadSettings();
    });

    this.loadSettings();
   
  } 
  toggleSubMenu(event: any) {
    const parentElement = event.target.closest('li');
    parentElement.classList.toggle('active');
  }

  // Toggle Sub-Submenu visibility (Nested menu items)
  toggleSubSubMenu(event: any, submodule: any) { 
    const submoduleElement = event.target.closest('li');
    submoduleElement.classList.toggle('active');

    const childUlElement = submoduleElement.querySelector('ul');
    if (childUlElement) {
      childUlElement.classList.toggle('newclass');
    }

    // Toggle grandchild submodules visibility
    if (submodule.childSubModules?.length > 0) {
      submodule.childSubModules.forEach((child: any) => {
        child.show = !child.show;  
      });
    }
  }

  // Load global header settings
  private loadSettings(): void {
    this.settingsService.getSettings().subscribe({
      next: (res) => {
        res.header_image = this.imageService.getImageUrlSettings(res.header_image);
        res.logo_url = this.imageService.getImageUrlSettings(res.logo_url);
        this.sidebarSettings = res;  
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

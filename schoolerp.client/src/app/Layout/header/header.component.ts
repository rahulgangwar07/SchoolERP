import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../Services/school.service';
import { SchoolSelectionService } from '../../Services/school-selection.service';
import { AuthServiceService } from '../../Services/AuthServiceService';
import { SidebarStateService } from '../../Services/sidebar-state.service';
import { ImageServiceService } from '../../Services/image-service.service';
import { GlobalSettingsService } from '../../Services/global-settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  schoolList: any[] = [];
  selectedSchoolId: string = "0";
  userRole: string = "";
  headerSettings: any;

  constructor(
    private schoolService: SchoolService,
    private schoolSelectionService: SchoolSelectionService,
    private authService: AuthServiceService,
    private sidebarStateService: SidebarStateService,
    private imageService: ImageServiceService,
    private settingsService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.loadSchoolList();
    this.subscribeToSelectedSchool();
    this.subscribeToUserRole();

    this.settingsService.settingReload$.subscribe(() => {
      this.loadHeaderSettings();  
    });

    this.loadHeaderSettings();
  }

  // Load list of schools from API
  private loadSchoolList(): void {
    this.schoolService.getAllSchools().subscribe({
      next: (response) => this.schoolList = response,
      error: (err) => console.error('Error fetching school list:', err)
    });
  }

  // Listen for selected school changes
  private subscribeToSelectedSchool(): void {
    this.schoolSelectionService.selectedSchool.subscribe((schoolId: string) => {
      this.selectedSchoolId = schoolId;
    });
  }

  // Get user role from AuthService (BehaviorSubject or localStorage fallback)
  private subscribeToUserRole(): void {
    this.userRole = this.authService.getUserRole();  // fallback

    this.authService.userRole$.subscribe((role: string) => {
      this.userRole = role || this.authService.getUserRole();
    });
  }

  // Load global header settings
  private loadHeaderSettings(): void {
    this.settingsService.getGlobalHeader().subscribe({
      next: (res) => {
        res.header_image = this.imageService.getImageUrlSettings(res.header_image);
        res.logo_url = this.imageService.getImageUrlSettings(res.logo_url);
        this.headerSettings = res; 
      },
      error: (err) => console.error('Error fetching global header:', err)
    });
  }

  // Handle school dropdown change
  onSchoolChange(event: Event): void {
    const schoolId = (event.target as HTMLSelectElement).value;
    if (schoolId) {
      this.schoolSelectionService.setSelectedSchool(schoolId);
    }
  }

  // Toggle sidebar state
  toggleSidebar(): void {
    this.sidebarStateService.toggleSidebar();
  }
}

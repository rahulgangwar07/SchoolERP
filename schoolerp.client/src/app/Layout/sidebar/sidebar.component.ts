import { Component, OnInit } from '@angular/core'; 
import { GlobalSettingsService } from '../../Services/global-settings.service';
import { ImageServiceService } from '../../Services/image-service.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  headerSettings: any;

  constructor(private settingsService: GlobalSettingsService, private imageService: ImageServiceService) { }

  ngOnInit() {
    this.settingsService.settingReload$.subscribe(() => {
      this.loadHeaderSettings();
    });

    this.loadHeaderSettings();
  }

  isAdmin(): boolean  {
    return true;
  }

  isTeacher(): boolean {
    return true;
  }

  isStudent(): boolean {
    return true;
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



}

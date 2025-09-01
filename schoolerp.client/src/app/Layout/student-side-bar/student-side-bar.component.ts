import { Component, OnInit } from '@angular/core';
import { SidebarStateService } from '../../Services/sidebar-state.service';
import { Subscription } from 'rxjs';
import { ImageServiceService } from '../../Services/image-service.service';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-student-side-bar',
  templateUrl: './student-side-bar.component.html',
  styleUrl: './student-side-bar.component.css'
})
export class StudentSideBarComponent implements OnInit {
  isSidebarFull: boolean = false;
  private sidebarStateSubscription: Subscription | undefined;
  isProfileOpen = false;

  profile: any = {};

  constructor(private _sidebarStateService: SidebarStateService, private _imageService: ImageServiceService, private _studentService: StudentService) {

  }

  ngOnInit() {
    this.sidebarStateSubscription = this._sidebarStateService.sidebarState$.subscribe(
      (state: boolean) => {
        this.isSidebarFull = state;
      });
    this._studentService.getStudentProfile().subscribe(
      (success) => {
        this.profile = success; 
        if (this.profile.stuImage) {
          this.profile.stuImage = this._imageService.getImageUrlStudent(this.profile.stuImage);
        } 
        
      },
      (error) => {
        console.log("Error found: ",error);
      }
    );
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleSubMenu(event: any) {
    const parentElement = event.target.closest('li');
    parentElement.classList.toggle('active');
  }


}

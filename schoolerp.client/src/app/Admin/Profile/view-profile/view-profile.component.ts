  import { Component, OnInit } from '@angular/core';
  import { ProfileService } from '../../../Services/profile.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';

  @Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css']
  })
  export class ViewProfileComponent implements OnInit {

    profile: any;
    showModal: boolean = false;
    userId: number = 0;
    school_id: string = "";
    confirmPassword: string = '';
    passwordMismatch: boolean = false;

    constructor(private _profileService: ProfileService, private _authService: AuthServiceService) {

    }

    ngOnInit() {
      this.userId = Number(this._authService.getUserID());
      this.school_id = this._authService.getSchoolID();


      this._profileService.getProfile(this.userId, this.school_id).subscribe(
        (response) => {
          this.profile = response; 
        },
        (error) => {
          console.log("Error in view profile: ", error);
        }
      );
    }

    openModal() { 
      this.showModal = true;
    }

    closeModal(show: boolean) { 
      this.showModal = show;
    }

    updateProfile(updatedProfile: any) {
      // Call the API to update the profile
      this._profileService.updateProfile(updatedProfile.faculty_id,updatedProfile).subscribe(
        (response) => { 
          this.profile = updatedProfile;  
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }

    updatePassword() {
      if (this.profile.password !== this.confirmPassword) {
        this.passwordMismatch = true;  // Flag set when passwords don't match
        return;
      } else {
        this.passwordMismatch = false;  // Reset flag when passwords match
      }
      this._profileService.updatePassword(this.profile.faculty_id, this.profile).subscribe(
        (response) => {
          console.log('Profile updated successfully!', response);
           
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }


  // Initialize the faculty profile data
  //faculty = {
  //  name: 'Dr. John Doe',
  //  id: 'F12345',
  //  email: 'john.doe@university.edu',
  //  phone: '+1234567890',
  //  department: 'Computer Science',
  //  address: '1234 University St, City, Country',
  //  dob: '1985-05-15'
  //};

  //// Track whether the form is in edit mode
  //isEditMode = false;

  //// Toggle between edit and view mode
  //toggleEditMode() {
  //  this.isEditMode = !this.isEditMode;
  //}

  //// Save changes and exit edit mode
  //saveChanges() {
  //  this.isEditMode = false;
  //}
}

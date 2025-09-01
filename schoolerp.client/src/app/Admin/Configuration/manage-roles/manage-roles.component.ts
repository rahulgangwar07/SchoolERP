import { Component, OnInit } from '@angular/core'; 
import { DesignationService } from '../../../Services/designation.service';
import { FacultyService } from '../../../Services/faculty.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.css'
})
export class ManageRolesComponent implements OnInit {
  facultyData: any;
  designationData: any;
  facultyId: number | null = 0;
  selectedDesignationId: number | null = null;  // To track selected designation
  ErrorText: string | null = "";

  themeSetting: any;
   

  constructor(private _facultyService: FacultyService, private _designationServie: DesignationService, private _settingService: GlobalSettingsService) { }

  ngOnInit() { 

    this.loadFaculties();
    this.loadDesignations(); 

    this.themeSetting = this._settingService.getCurrentTheme();
  }

  loadFaculties() {
    this._facultyService.getAllFaculty().subscribe(
      (response) => {
        this.facultyData = response;
      },
      (error) => {
        console.log("Error in fetching faculty data: ", error);
      }
    );
  }

  loadDesignations() {
    // Fetch designation data
    this._designationServie.getAllDesignation().subscribe(
      (response) => {
        this.designationData = response;
      },
      (error) => {
        console.log("Error in fetching designation data: ", error);
      }
    );
  }

  facultyChange() { 
    this._designationServie.checkDesignation(Number(this.facultyId)).subscribe(
      (response) => { 
        this.selectedDesignationId = response; 
      },
      (error) => {
        console.log("Error found: ", error);
        this.selectedDesignationId = null;
      }
    );
    this.ErrorText = '';  

  }

  changeSelection(event: any) {
    const designationId = Number(event.target.value);

    // When a designation checkbox is clicked, set the selected designation
    if (event.target.checked) {
      this.selectedDesignationId = designationId;
    } else {
      this.selectedDesignationId = null;  
    }

    // Ensure that only one checkbox is checked at a time
    this.designationData.forEach((designation: any) => {
      designation.checked = designation.designation_id === this.selectedDesignationId;
    }); 
  }

  onSubmit(event: any) {
    event.preventDefault();  // Prevent form submission if validation fails
    this.ErrorText = '';   
     
    if (!this.facultyId || !this.selectedDesignationId) {
      if (!this.facultyId && !this.selectedDesignationId) {
        this.ErrorText = "Please select a Faculty and Designation.";
      } else if (!this.facultyId) {
        this.ErrorText = "Please select a Faculty.";
      } else if (!this.selectedDesignationId) {
        this.ErrorText = "Please select a Designation.";
      }
      return;   
    }

    this._designationServie.assignDesignation(Number(this.facultyId), Number(this.selectedDesignationId))
      .subscribe(
        (response) => {
          this.ErrorText = "Data Sumitted Successfully";
        },
        (error) => {
          console.log("Error found when Submitted Data: ", error);
        }

    );
    //alert(`Role Assigned: Faculty ID - ${this.facultyId}, Designation ID - ${this.selectedDesignationId}`);

    this.facultyId = 0;   
    this.selectedDesignationId = null;  
    this.ErrorText = '';   
  }


}

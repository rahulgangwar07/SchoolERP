import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DesignationService } from '../../../../Services/designation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../../Services/faculty.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { Permissions } from '../../../../models/permissions';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-new-faculty',
  templateUrl: './add-new-faculty.component.html',
  styleUrls: ['./add-new-faculty.component.css']
})
export class AddNewFacultyComponent implements OnInit {

  desigList: any;
  facultyForm: FormGroup | any;
  id: string | null = '0';
  facImage: string | undefined | null;
  facSignature: string | undefined | null;
  photoFile: File | undefined = undefined;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  permissions: Permissions | undefined;
  themeSetting: any;

  constructor(private _designationService: DesignationService, private _facultyService: FacultyService,
    private fb: FormBuilder, private _imageService: ImageServiceService,
    private route: ActivatedRoute, private router: Router, private _permissionService: PermissionsService,
    private _messageService: SuccessMessagePopupService, private _settingService: GlobalSettingsService) {
    this.facultyForm = this.fb.group({
      faculty_id: ['0'],
      first_name: ['', Validators.required],
      last_name: [''],
      username: ['', Validators.required],
      userType: [''],
      date_of_joining: [''],
      gender: ['', Validators.required],
      dob: [''],
      phone: ['', Validators.required],
      whatsapp_no: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      designation: ['', Validators.required],
      speciality: [''],
      qualification: [''],
      spouse_name: [''],
      mother_name: [''],
      birthday: [''],
      father_name: [''],
      address: [''],
      local_address: [''],
      experience: [0],
      bank_name: [''],
      account_no: [''],
      ifsc_code: [''],
      aadhar_no: [''],
      pan_card: [''],
      passport: [''],
      dl_details: [''],
      pf_account_no: [''], 
      school_id: [''],
      image: [''],
      signature: [''],
      status: ['']
    });
  }
   
 

  ngOnInit(): void {

    this.bindPermission();

    this._designationService.getAllDesignation().subscribe(
      (response) => {
        this.desigList = response;  
      },
      (error) => {
        console.log("Error is: ", error);
      }
    );
    this.id = this.route.snapshot.paramMap.get('faculty_id');
    if (this.id != null && this.id != "0") {
      this._facultyService.getFacultybyId((Number)(this.id)).subscribe(
        (response) => {
          this.facultyForm.patchValue(response); 
          
          if (this.facultyForm.get('image').value) {
            this.facImage = this._imageService.getImageUrlFaculty(this.facultyForm.get('image').value)
            
          }
          if (this.facultyForm.get('signature').value) {
            this.facSignature = this._imageService.getImageUrlFaculty(this.facultyForm.get('signature').value);
          }
           
        },
        (error) => {
          console.log("Error is: ", error);
        }
      );
    }  

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  transformFormData(formData: any) {
    Object.keys(formData).forEach(key => {
      if (formData[key] === '' || formData[key] === '0') {
        formData[key] = null; // Replace empty string with null
      }
    });
    return formData;
  }

  bindPermission() {
    const route = this.router.url;
    this._permissionService.checkPermission(route).subscribe(
      (permission) => {
        this.permissions = permission;
      },
      (error) => {
        console.log("Error in fetching Permission! ", error);
      }
    );
  }

  onSubmit() {
    if (this.facultyForm.valid) {
      const facultyData = { ...this.facultyForm.value };

      // Send the base64 image as part of the data
      this._facultyService.postFaculty(this.transformFormData(facultyData)).subscribe(
        (response) => { 
          if (response.message == "Data Updated") { 
            if (facultyData.designation == 8) {
              this.router.navigate(['/teacher-staff/view-staff']); 
            }
            else {
              this.router.navigate(['/teacher-staff/view-teacher']); 
            }
          }
          else {
            this.facultyForm.reset();
            this._messageService.addMessage('success', 'Teacher has been successfully created.');
          } 
        },
        (error) => {
          console.log("Error: ", error);
          this._messageService.addMessage('error', 'There was an error creating the teacher. Please Contact Administrator.');
        }
      );
    } else {
      console.log("Form is invalid!");
    }
  }

  onFileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.facultyForm.patchValue({
          image: reader.result as string 
        }); 
      };
    }
  }

  onSignatureChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.facultyForm.patchValue({
          signature: reader.result as string // Set the Base64 string to the form field
        }); 
      };
    }
  }


  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}

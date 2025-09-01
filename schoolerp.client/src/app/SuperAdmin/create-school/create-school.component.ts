
import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../Services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageServiceService } from '../../Services/image-service.service';
import { StateCityService } from '../../Services/state-city.service';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {

  selectedFile: File | null = null;
  show_div: boolean = false;
  submitBtn: string = "Create School";
  states: any;
  selectedState: Number = 0;

  // Email validation pattern
  readonly emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  school: any = {
    id: '0',
    schoolName: '',
    schoolId: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    website: '',
    establishmentDate: '',
    schoolBoard: '',
    schoolStatus: true,
    schoolType: '',
    schoolLogo: '',
    schoolDescription: '',
    totalArea: 0,
    schoolFacilities: '',
    transportationAvailable: true,
    emergencyContact: ''
  };

  imgSrc: any;

  constructor(
    private _schoolService: SchoolService,
    private route: ActivatedRoute,
    private router: Router,
    private _imageService: ImageServiceService,
    private _cityState: StateCityService
  ) { }

  ngOnInit() {
    const schoolId = this.route.snapshot.paramMap.get('id');  // Get 'id' from the route

    if (schoolId && schoolId !== '0') {
      this._schoolService.getSchoolById(schoolId.toString()).subscribe(
        (schoolData): void => {
          this.school = schoolData;
          this.school.schoolLogo = this._imageService.getImageUrl(this.school.schoolLogo);
          this.school.establishmentDate = this.formatDate(this.school.establishmentDate);
          this.submitBtn = "Update School"; 
        },
        (error) => {
          console.error('Error fetching school:', error);
        }
      );
      this.show_div = true;
    } else {
      this.show_div = false;
    }

    this._cityState.getState().subscribe(
      (response) => {
        this.states = response;
      },
      (error) => {
        console.log("This is showing an error: ", error);
      }
    );
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);  
    const day = ('0' + formattedDate.getDate()).slice(-2);  

    return `${year}-${month}-${day}`;  
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    if (this.selectedFile) { 
      this.school.schoolLogo = this.selectedFile.name;
    }
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.school.schoolLogo = URL.createObjectURL(fileInput.target.files[0]);
    }
  }
   
  validateEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  onSubmit() {
    const formData: FormData = new FormData();

    // Validate email
    if (!this.validateEmail(this.school.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Append all fields except 'schoolLogo'
    Object.keys(this.school).forEach(key => {
      if (key !== 'schoolLogo') {
        formData.append(key, this.school[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('schoolLogo', this.selectedFile, this.selectedFile.name);
    }

    if (this.school.id !== '0') {
      this._schoolService.putSchool(formData, this.school.id).subscribe(
        (data) => {
          console.log("School updated", data);
          this.router.navigate(['/super-admin/view-school']);
          this.clear();
        },
        (error) => {
          console.error("Error updating school", error);
          this.submitBtn = "Update School";
          this.show_div = true;
        }
      );
    } else {
      this._schoolService.postSchool(formData).subscribe(
        (response) => {
          this.submitBtn = "Create School";
          this._schoolService.sendpasswordviaMail(response.school_id, response.email, response.username, response.password)
            .subscribe(
              (response) => {
                console.log("Password Send Successfully: ",response);
              },
              (error) => {
                console.log("Error on password sending! ",error);
              }
          );

          this.router.navigate(['/super-admin/view-school']);
          this.clear();
          this.show_div = false;
        },
        (error) => {
          console.error("Error creating school", error);
        }
      );
    }
  }

  clear() {
    this.school = {
      id: '0',
      schoolName: '',
      schoolId: '',
      address: '',
      city: '',
      state: '0',
      country: '',
      postalCode: '',
      phoneNumber: '',
      email: '',
      website: '',
      establishmentDate: '',
      schoolBoard: '',
      schoolStatus: true,
      schoolType: '',
      schoolLogo: '',
      schoolDescription: '',
      totalArea: 0,
      schoolFacilities: '',
      transportationAvailable: true,
      emergencyContact: ''
    };
  }
}

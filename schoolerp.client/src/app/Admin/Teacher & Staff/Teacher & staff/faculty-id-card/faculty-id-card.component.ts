import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-faculty-id-card',
  templateUrl: './faculty-id-card.component.html',
  styleUrls: ['./faculty-id-card.component.css']
})
export class FacultyIdCardComponent implements OnInit {
  facultyList: any = [];
  selectedFaculties: boolean[] = []; // To keep track of selected checkboxes
  selectedFacultiesData: any[] = [];
  icard_visible: boolean = false;

  constructor(private _facultyService: FacultyService, private _imageService: ImageServiceService, private router: Router) { }

  ngOnInit() {
    this.bindfacultyList();
  }

  bindfacultyList() {
    this._facultyService.getAllFaculty().subscribe(
      (response) => {
        this.facultyList = response;
        this.facultyList.forEach((img: { image: any; }) => {
          img.image = this._imageService.getImageUrlFaculty(img.image);
        });
        this.selectedFaculties = new Array(this.facultyList.length).fill(false);  
      },
      (error) => {
        console.log("Error found when fetching faculty list: ", error);
      }
    );
  }

  // This method handles the "Select All" checkbox
  mainCheckbox() {
    const allSelected = this.selectedFaculties.every(item => item);  
    this.selectedFaculties = this.selectedFaculties.map(() => !allSelected);
  }
   
  toggleCheckbox(index: number) {
    this.selectedFaculties[index] = !this.selectedFaculties[index]; 
  }

  generateIdCard() {
    const selectedFaculties = this.facultyList.filter((fac: { status: string; },index: number) => {
      return this.selectedFaculties[index] && fac.status !== 'Suspended';
    })
    if (selectedFaculties.length === 0) {
      return;
    }
    this.selectedFacultiesData = selectedFaculties;
    this.icard_visible = true;
    //this.router.navigate(["teacher-staff/id-card/icard-list"]); 
  }
   


  get isAllSelected(): boolean {
    return this.selectedFaculties.every(item => item); 
  }
}

import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { VisitorService } from '../../../Services/visitor.service';
import { visitor } from '../../../models/visitor';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageServiceService } from '../../../Services/image-service.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrl: './add-visitor.component.css'
})
export class AddVisitorComponent implements OnInit {

  visitorForm: visitor = {
    visitor_id: 0,  // placeholder, update this if required
    visitor_name: '',
    visitor_contact: '',
    visitor_email: '',
    meeting_with: '',
    purpose_of_visit: '',
    appointment_date: new Date(),
    check_in_time: new Date(),
    check_out_time: new Date(),
    visitor_status: 'In Progress',  
    addres: '',
    visitor_image: '',
    school_id: '',   
    created_at: new Date(),
    updated_at: new Date()
  };

  visitor_img: File | any;

  visitor_id: number = 0;
  vImage: string = "";
  themeSetting: any;

  constructor(private _visitorService: VisitorService, private route: ActivatedRoute,
    private _imageService: ImageServiceService, private router: Router, private _settingService: GlobalSettingsService) { }

  ngOnInit(): void {
    this.visitor_id = (Number)(this.route.snapshot.paramMap.get('visitor_id')) ?? 0;
    if (this.visitor_id != 0) {
      this._visitorService.getVisitorbyId(this.visitor_id).subscribe(
        (visitor: visitor) => {

          visitor.appointment_date = formatDate(visitor.appointment_date, 'yyyy-MM-dd', 'en');
          visitor.check_in_time = formatDate(visitor.check_in_time, 'HH:mm', 'en');
          visitor.check_out_time = formatDate(visitor.check_out_time, 'HH:mm', 'en');
          this.visitorForm = visitor;
          this.vImage = this._imageService.getImageUrlVisitors(visitor.visitor_image) ?? ""; 
        },
        (error) => {
          console.log("Error: ",error);
        }
      );
    }

    this.themeSetting = this._settingService.getCurrentTheme();
    
  }
   
  onSubmit(): void {
    if (this.visitorForm.visitor_name && this.visitorForm.visitor_contact) {
      if (this.visitor_id == 0) { 
        this._visitorService.addVisitor(this.visitorForm, this.visitor_img).subscribe(
          response => { 
            this.clear();
          },
          error => {
            console.error('Error adding visitor', error);
          }
        );
      } else { 
        this._visitorService.updateVisitor(this.visitorForm, this.visitor_img).subscribe(
          response => { 
            this.clear();
            this.router.navigate(['/visitors/view-visitor']);
          },
          error => {
            console.error('Error updating visitor', error);
          }
        );
      }
    }
  }


  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.visitor_img = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.vImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }



  clear(): void {
    this.visitorForm = {
      visitor_id: 0,
      visitor_name: '',
      visitor_contact: '',
      visitor_email: '',
      meeting_with: '',
      purpose_of_visit: '',
      appointment_date: new Date(),
      check_in_time: new Date(),
      check_out_time: new Date(),
      visitor_status: 'Checked In',
      addres: '',
      visitor_image: '',
      school_id: '',
      created_at: new Date(),
      updated_at: new Date()
    };
     
    const fileInput = document.getElementById('liveImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';  
    }
  }

}

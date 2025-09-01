import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../../Services/registration.service';

@Component({
    selector: 'app-view-report',
    templateUrl: './view-report.component.html',
    styleUrls: ['./view-report.component.css'],
    standalone: false
})
export class ViewReportComponent implements OnInit {

  // Create a student object to hold the data
  student: any = {};  // Initially empty object to hold student data

  uid: number = 0;
  status: string = "Pending";

  constructor(private route: ActivatedRoute, private _registrationService: RegistrationService) { }

  ngOnInit() {
    // Get UID from URL
    this.uid = (Number)(this.route.snapshot.paramMap.get('uid'));

    if (this.uid && this.uid !== 0) {
      this._registrationService.getStudentbyId(this.uid, this.status).subscribe(
        (response) => { 
          this.student = response;   
        },
        (error) => {
          console.log("Error is: ", error);
        }
      );
    }
  }
}

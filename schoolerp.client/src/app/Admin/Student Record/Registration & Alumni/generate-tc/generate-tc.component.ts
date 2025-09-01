import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../../Services/registration.service';

@Component({
    selector: 'app-generate-tc',
    templateUrl: './generate-tc.component.html',
    styleUrls: ['./generate-tc.component.css'],
    standalone: false
})
export class GenerateTcComponent implements OnInit {

  uid: number | any;
  stuId: number | any;

  studentData: any;
   
  tcData: any = {
    tcNo: '',
    admissionNo: '',
    first_name: '',
    pen_card: '',
    mother_name: '',
    father_name: '',
    nationality: 'INDIAN',
    caste: 'General',
    first_admission_date: '',
    dob: '',
    class_id: '',
    subjects: '',
    exam_result: '',
    failed_info: '',
    promotion: '',
    dues_paid: '',
    fee_concession: '',
    working_days: '',
    days_present: '',
    extra_curricular: '',
    activities: '',
    conduct: '',
    application_date: '',
    issue_date: '',
    reason_for_leaving: '',
    remarks: '',
    prepared_by: '',
    class_teacher: '',
    principal_signature: ''
  };

  constructor(private route: ActivatedRoute, private _registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.stuId = this.route.snapshot.paramMap.get('stuId');

    if (this.uid == 0 || this.stuId == 0) {
      console.log("Something went wrong!");
    } else {
      this._registrationService.generateTC(this.uid, this.stuId).subscribe(
        (data) => {
          this.studentData = data;  
          this.tcData.tcNo = `TC${this.stuId}`; 
          this.tcData.admissionNo = data.registration_no || 'Not Available';
          this.tcData.first_name = data.first_name || 'N/A';
          this.tcData.father_name = data.father_name || 'N/A';
          this.tcData.mother_name = data.mother_name || 'N/A';
          this.tcData.caste = data.caste || 'General';
          this.tcData.dob = data.dob || 'Not Available';  
          this.tcData.class_id = data.class_name || 'Not Available';
          this.tcData.first_admission_date = data.adm_date || 'Not Available';

       
          this.tcData.subjects = 'SST, Hindi, English, Science';  
          this.tcData.exam_result = 'Passed'; 
        },
        (error) => {
          console.error('Error fetching student data for TC:', error);
        }
      );
    }
  }

  saveTC(): void { 
    console.log('Transfer Certificate Data:', this.tcData); 
  }
   

  print() {
    const data = window.open();
    data?.document.write("<html><head><style>");
    data?.document.write(`
    @media print {
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
      }
      .header-img {
        max-width: 100px; 
        margin-bottom: 15px;
      }
      h6, h5, h3 {
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
      }
      h5 {
        margin-top: 20px;
        text-align: left;
        font-size: 16px;
      }
      label {
        font-weight: bold;
        margin-bottom: 5px;
        display: block;
      }
      input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f9f9f9;
      }
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      .col-md-6 {
        width: 48%;
      }
      .text-center {
        text-align: center;
      }
      .text-right {
        text-align: right;
      }
      .btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        text-align: center;
      }
      .btn:hover {
        background-color: #0056b3;
      }
      .font-weight-bold {
        font-weight: bold;
      }
      .content-div {
        border: 1px solid #ddd;
        padding: 20px;
        margin: 20px;
      }
      .layout-header {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #007bff;
      }
      .layout-header h6 {
        margin: 0;
      }
      .layout-header .col-md-7 {
        padding-left: 0;
      }
      .layout-header .col-md-5 {
        text-align: right;
      }
      /* Remove print button */
      .btn {
        display: none;
      }
      /* Adjust last row margin */
      .row:last-child {
        margin-bottom: 0;
      }
      /* Remove border for printing */
      .content-div {
        border: none;
        margin: 0;
        padding: 0;
      }
    }
  `);
    data?.document.write("</style></head><body><h2>");
    data?.document.write("</h2>");

    const printarea = document.getElementById("contentDiv")?.innerHTML;
    if (printarea) {
      data?.document.write(printarea);
    } else {
      data?.document.write("No data available..");
    }

    data?.document.write("</body></html>");
    data?.print();
    data?.document.close();
  }


}

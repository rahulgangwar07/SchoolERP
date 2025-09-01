import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { ImageServiceService } from '../../Services/image-service.service';

@Component({
  selector: 'app-stu-profile',
  templateUrl: './stu-profile.component.html',
  styleUrls: ['./stu-profile.component.css']
})
export class StuProfileComponent implements OnInit {

  profile: any = {};   
  confirmPsw: string = "";

  constructor(private _studentService: StudentService, private _imageService: ImageServiceService) { }

  ngOnInit() { 
    this._studentService.getStudentProfile().subscribe(
      (success) => { 
        this.profile = success;
        console.log("Profile Data fetched: ", success);
        if (!this.profile.password) {
          this.profile.password = '';  
        }
        if (this.profile.stuImage) {
          this.profile.stuImage = this._imageService.getImageUrlStudent(this.profile.stuImage);
        }
        

        console.log("this.profile: ", this.profile);
      },
      (error) => {
        console.log("Error fetching profile: ", error);
      }
    );
  }

  updatePassword() { 
    if (this.profile.password === this.confirmPsw) { 
      if (this.checkStrong(this.profile.password)) {
        this._studentService.changeStuPassword(this.confirmPsw).subscribe(
          (success) => {
            console.log("Student Password Changed Successfully! ", success);
          },
          (error) => {
            console.log("Student Password not Changed! ", error);
          }
        );
      } else {
        alert("Password must be strong! It should include: \n- At least 10 characters \n- A mix of uppercase letters and numbers.\n");
      }
    } else {
      alert("Password and Confirm Password do not match!");
    }
  }


  checkStrong(password: string): boolean {
    const lengthCriteria = password.length >= 8; 
    const uppercaseCriteria = /[A-Z]/.test(password); 
    const numberCriteria = /[0-9]/.test(password);   
    return lengthCriteria && uppercaseCriteria && numberCriteria;
  }  

}

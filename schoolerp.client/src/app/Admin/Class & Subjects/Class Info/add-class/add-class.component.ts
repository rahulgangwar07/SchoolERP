import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubjectsService } from '../../../../Services/subjects.service';

interface ClassDetail {
  class_id: number;
  class_name: string;
  dis_name: string;
  subject: any[];
  opt_subject: any[];
}

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.css'
})
export class AddClassComponent implements OnInit {

  showUpdatediv: boolean = false;
  classList: any;

  classdetail: ClassDetail = {
    class_id:0,
    class_name: '',
    dis_name: '',
    subject: [],
    opt_subject: [] 
  }

 

  constructor(private _classService: ClassService, private _subjectService: SubjectsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');

    if (classId && classId !== "0") {
      this.showUpdatediv = true;

      this._classService.getClassbyId(Number(classId)).subscribe(
        (response) => { 
          if (response && response.classes && response.classes.length > 0) {
 
            this.classdetail = response.classes[0];

            // Safely assign subjects if they exist
            this.classdetail.subject = response.subjects || [];
            this.classdetail.opt_subject = response.optsubjects || [];
             
          } else {
            console.log("No class found with this ID.");
          }
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
    } else {
      this.showUpdatediv = false;
    }

    // Fetch the class list after checking classId
    this._classService.getClass().subscribe(
      (response) => {
        if (response && Array.isArray(response)) {
          this.classList = response;
        } else {
          console.log("Invalid class list response:", response);
        }
      },
      (error) => {
        console.log("Error fetching class list: ", error);
      }
    );
  }


  submit(form: any) { 
     
    let subjectInfo = [
      ...this.classdetail.subject.filter(s => s.check === true),
      ...this.classdetail.opt_subject.filter(s => s.check === true)
    ]; 
    if (form.valid) {
      this._classService.addClass(this.classdetail).subscribe(
        (success) => {
        
          this._subjectService.insertClassSubject(this.classdetail.class_id, subjectInfo).subscribe(
            (response) => { 
              this.router.navigate(['class/view']);
            },
            (error) => {
              console.log("Subject insertion error: ", error);
            }
          );
           
          form.reset();
          this.clear(); 
        },
        (error) => {
          console.log("Class not Submitted! ", error);
        }
      );
    } else {
      alert("Form not valid");
    }
  }


  deleteClass(clsId: number, event: any) { 
    if (clsId != 0) {
      this._classService.deleteClass(clsId).subscribe(
        (response) => {
          this._classService.getClass().subscribe(
            (response) => {
              this.classList = response;
              this.router.navigate([`class/add/${clsId}`]); 
            },
            (error) => {
              console.log("error ", error)
            }
          );
        },
        (error) => {
          console.log("Error found! ", error);
        }
      );
    }
  }

  clear() {
    this.classdetail = {
      class_id: 0,
      class_name: '',
      dis_name: '',
      subject: this.classdetail.subject.map(sub => ({ ...sub, check: false })),  // Reset checkboxes
      opt_subject: this.classdetail.opt_subject.map(sub => ({ ...sub, check: false }))
    }
  }

 
}

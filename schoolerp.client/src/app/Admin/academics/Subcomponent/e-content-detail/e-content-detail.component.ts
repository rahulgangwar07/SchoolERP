import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-e-content-detail',
  templateUrl: './e-content-detail.component.html',
  styleUrl: './e-content-detail.component.css'
})
export class EContentDetailComponent implements OnInit {
  classList: any[] = [];
  classId: number = 0;
  className: string = "";

  constructor(private _classService: ClassService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the class ID from the route parameter
    const cls = this.route.snapshot.paramMap.get('cls_id');
    this.classId = cls ? Number(cls) : 0;

    this.bindClassList();
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response; 
        const selectedClass = this.classList.find(cls => cls.class_id === this.classId);
 
        if (selectedClass) {
          this.className = selectedClass.class_name;
        } else {
          this.className = 'Class not found';
        }
         
      },
      (error) => {
        console.log("Error found: ", error);
      }
    );
  }

  bindSubjectsClasswise(event: any) {
    // You can implement functionality for class-specific subjects here
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { exam_type } from '../../../models/examination';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-exam-category',
  templateUrl: './exam-category.component.html',
  styleUrls: ['./exam-category.component.css']
})
export class ExamCategoryComponent {

  menuItems = [
    { key: '/exam/category/term', label: '1. Define Exam Term' },
    { key: '/exam/category/type', label: '2. Define Exam Type' },
    { key: '/exam/category/name', label: '3. Define Exam Name' },
    { key: '/exam/category/set', label: '4. Define Exam Set' },
    { key: '/exam/category/weightage', label: '5. Define Weightage' },
    { key: '/exam/category/marks', label: '6. Define Max/Min Marks' },
    { key: '/exam/category/assign', label: '7. Assign Exam Set' },
  ];

  constructor(private router: Router) {
    this.router.navigate(['/exam/category/marks']);
  }

  activeItem = 'term'; 

 
}

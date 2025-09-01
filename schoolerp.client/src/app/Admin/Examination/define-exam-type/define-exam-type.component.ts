import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { exam_type } from '../../../models/examination';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';

declare const bootstrap: any;

@Component({
  selector: 'app-define-exam-type',
  templateUrl: './define-exam-type.component.html',
  styleUrl: './define-exam-type.component.css'
})
export class DefineExamTypeComponent implements OnInit {
  categories: exam_type[] = [];
  currentScholasticIndex: number | null = null;
  currentOnlineIndex: number | null = null;

  isEditMode = false;

  form: exam_type = {
    exam_type_id: 0,
    exam_type_name: '',
    description: '',
    exam_type_cat: 1,
    orderid: 0,
    school_id: ''
  };


  @Output() moduleChange = new EventEmitter<string>();

  switchToExamTerm() {
    this.moduleChange.emit('term');
  }

  constructor(private _examCategoryService: ExamSettingsService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this._examCategoryService.GetExamTypes().subscribe(
      (res) => this.categories = res,
      (err) => console.error('Error fetching categories:', err)
    );
  }

  get scholasticCategories(): exam_type[] {
    return this.categories.filter(c => c.exam_type_cat === 1);
  }

  get onlineCategories(): exam_type[] {
    return this.categories.filter(c => c.exam_type_cat === 2);
  }

  openModal(editMode: boolean = false, cat?: exam_type): void {
    this.isEditMode = editMode;
    if (editMode && cat) {
      this.form = {
        exam_type_id: cat.exam_type_id,
        exam_type_name: cat.exam_type_name,
        description: cat.description,
        exam_type_cat: cat.exam_type_cat,
        orderid: cat.orderid,
        school_id: cat.school_id
      };
    } else {
      this.form = {
        exam_type_id: 0,
        exam_type_name: '',
        description: '',
        exam_type_cat: 1,
        orderid: 0,
        school_id: ''
      };
    }

    const modalElement = document.getElementById('examCategoryModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal(): void {
    const modalElement = document.getElementById('examCategoryModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  submitForm(): void {
    const payload: exam_type = {
      exam_type_id: this.form.exam_type_id,
      exam_type_name: this.form.exam_type_name,
      description: this.form.description,
      exam_type_cat: this.form.exam_type_cat,
      orderid: this.form.orderid,
      school_id: this.form.school_id
    };

    if (this.isEditMode) {
      this._examCategoryService.UpdateExamType(payload.exam_type_id, payload).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    } else {
      this._examCategoryService.SaveExamType(payload).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  editCategory(cat: exam_type): void {
    this.openModal(true, cat);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this._examCategoryService.DeleteExamType(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  toggleAction(index: number, type: 'scholastic' | 'online'): void {
    if (type === 'scholastic') {
      this.currentScholasticIndex = this.currentScholasticIndex === index ? null : index;
      this.currentOnlineIndex = null;
    } else {
      this.currentOnlineIndex = this.currentOnlineIndex === index ? null : index;
      this.currentScholasticIndex = null;
    }
  }


  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // If the click is outside both action containers, close both
    if (!target.closest('.action-container')) {
      this.currentScholasticIndex = null;
      this.currentOnlineIndex = null;
    }
  }


}

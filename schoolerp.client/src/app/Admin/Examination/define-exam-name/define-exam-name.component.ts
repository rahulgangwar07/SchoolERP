import { Component, HostListener, OnInit } from '@angular/core';
import { exam_name, exam_term, exam_type } from '../../../models/examination';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';
import { SessionService } from '../../../Services/session.service';
import { DatePipe } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-define-exam-name',
  templateUrl: './define-exam-name.component.html',
  styleUrls: ['./define-exam-name.component.css']
})
export class DefineExamNameComponent implements OnInit {
  sessionList: any[] = [];
  exams: exam_name[] = [];
  examTerm: exam_term[] = [];
  examTypes: exam_type[] = [];
  currentIndex: number | null = null;
  isEditMode = false;

  form: exam_name = this.getEmptyForm();

  constructor(
    private _examService: ExamSettingsService,
    private _sessionService: SessionService,private datePipe: DatePipe
  ) { }

  ngOnInit(): void { 
    this.getSessions();
    this.loadExamTypes();
    this.loadExamNames();
    
  }

  getEmptyForm(): exam_name {
    return {
      exam_name_id: 0,
      term_id: 0,
      exam_type_id: 0,
      exam_title: '',
      start_date: new Date(),
      end_date: new Date(),
      is_active: true,
      order_id: 1,
      session: '',
      school_id: ''
    };
  }

  getSessions(): void {
    this._sessionService.getSession().subscribe({
      next: res => this.sessionList = res,
      error: err => console.error("Error fetching sessions", err)
    });
  }

  loadExamNames(): void {
    this._examService.GetExamNames().subscribe({
      next: res => this.exams = res,
      error: err => console.error('Error loading exam names:', err)
    });
  }

  loadExamTypes(): void {
    this._examService.GetExamTypeByCatId(1).subscribe({
      next: res => {
        this.examTypes = res
      },
      error: err => console.error('Error loading exam types:', err)
    });
  }

  loadExamTerms(): void {
    if (!this.form.session) return;
    this._examService.GetExamTermBySession(this.form.session).subscribe({
      next: res => {
        this.examTerm = res;
        if (this.examTerm.length > 0) {
          this.form.term_id = this.examTerm[0].exam_term_id;
        }
          //console.log("this.examTerm: ",res);
      },
      error: err => console.error('Error loading exam terms:', err)
    });
  }

  getExamTypeName(id: number): string {
    const type = this.examTypes.find(t => t.exam_type_id === id);
    return type ? type.exam_type_name : 'N/A';
  }

  changeSession(): void {
    this.loadExamTerms();
  }

  openModal(editMode: boolean = false, exam?: exam_name): void { 
    this.isEditMode = editMode; 

    if (editMode && exam) {
      const formattedExam: exam_name = {
        ...exam,
        start_date: exam.start_date ? this.datePipe.transform(exam.start_date, 'yyyy-MM-dd') : null,
        end_date: exam.end_date ? this.datePipe.transform(exam.end_date, 'yyyy-MM-dd') : null
      };
      this.form = { ...formattedExam };
    } else {
      this.form = this.getEmptyForm();
      this.form.session = this._sessionService.getActiveSession() || '';
    }

    if (this.form.session) {
      this.loadExamTerms();
    }

    const modalElement = document.getElementById('examNameModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

    this.currentIndex = null;
  }

  closeModal(): void {
    const modalElement = document.getElementById('examNameModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

    submitForm(): void {
      if (!this.form.exam_title || !this.form.session || !this.form.exam_type_id || !this.form.term_id) {
        alert("Please fill all required fields.");
        return;
      }

      if (this.isEditMode) {
        this._examService.UpdateExamName(this.form.exam_name_id, this.form).subscribe({
          next: () => {
            this.loadExamNames();
            this.closeModal();
          },
          error: err => alert('Update failed: ' + err.message)
        });
      } else {
        this._examService.SaveExamName(this.form).subscribe({
          next: () => {
            this.loadExamNames();
            this.closeModal();
          },
          error: err => alert('Creation failed: ' + err.message)
        });
      }
    }

  editExam(exam: exam_name): void {
    this.openModal(true, exam);
  }

  deleteExam(id: number,index:number): void {
    if (confirm('Are you sure you want to delete this exam name?')) {
      this._examService.DeleteExamName(id).subscribe({
        next: () => {
          this.loadExamNames();
          this.exams.splice(index, 1);
          this.currentIndex = null;
        },
        error: err => alert('Deletion failed: ' + err.message)
      });
    }
  }

  toggleAction(index: number): void {
    this.currentIndex = this.currentIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-container')) {
      this.currentIndex = null;
    }
  }
}

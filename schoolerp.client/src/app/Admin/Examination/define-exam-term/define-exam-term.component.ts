import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';
import { exam_term } from '../../../models/examination';
import { SessionService } from '../../../Services/session.service';

@Component({
  selector: 'app-define-exam-term',
  templateUrl: './define-exam-term.component.html',
  styleUrls: ['./define-exam-term.component.css']
})
export class DefineExamTermComponent implements OnInit {

  examTerms: any[] = [];

  sessionList: any[] = [];

  currentIndex: number | null = null;

  examTerm: exam_term = {
    id:0,
    exam_term_id: 0,
    term_name: '',
    start_date: new Date(),
    end_date: new Date(),
    isActive:true,
    session: '',
    school_id: ''
  };

  @Output() moduleChange = new EventEmitter<string>();

  switchToExamTerm() {
    this.moduleChange.emit('type');
  }

  constructor(private _examSettingsService: ExamSettingsService, private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.getSessions();
    this.getExamTerms();
  }

  getSessions() {
    this._sessionService.getSession().subscribe(
      res => {
/*        console.log("Response: ", res);*/
        this.sessionList = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  // Fetch exam terms from the backend
  getExamTerms(): void {
    this._examSettingsService.GetExamTerms().subscribe(
      (res) => {
/*        console.log('Exam Terms:', res);*/
        this.examTerms = res; // Assign response to examTerms
      },
      (err) => {
        console.error('Error fetching exam terms:', err);
      }
    );
  }

  // Edit exam term
  editExamCategory(termId: number): void {
    this._examSettingsService.GetExamTermById(termId).subscribe(
      term => {
        console.log("Term Data: ", term);
        term.start_date = term.start_date?.substring(0, 10);
        term.end_date = term.end_date?.substring(0, 10);
        this.examTerm = term;
      },
      err => {
        console.log("Error: ",err);
      }
    );
    // Implement your logic to edit the exam category
    // You can use a modal or navigate to another route for editing
  }

  submit() {
    if (this.examTerm.id == 0) {
      this._examSettingsService.SaveExamTerm(this.examTerm).subscribe(
        res => { 
          this.getExamTerms();
          this.clear();
        },
        err => {
          if (err.status === 409) {
            // Conflict: Duplicate term
            alert("A term with this name already exists for the selected session and school.");
          } else {
            console.log("Error is : ", err);
            alert("An error occurred while creating the exam term. Please try again.");
          }
        }
      );
    } else {
      this._examSettingsService.UpdateExamTerm(this.examTerm.id,this.examTerm).subscribe(
        res => {
          console.log("Response: ", res);
          this.getExamTerms();
          this.clear();
        },
        err => {
          if (err.status === 409) {
            // Conflict: Duplicate term
            alert("A term with this name already exists for the selected session and school.");
          } else {
            console.log("Error is : ", err);
            alert("An error occurred while creating the exam term. Please try again.");
          }
        }
      );
    }
    
  }

  // Delete exam term
  deleteExamCategory(termId: number): void {
    console.log('Deleting term with ID:', termId);
    this._examSettingsService.DeleteExamTerm(termId).subscribe(
      (res) => {
        console.log('Deleted successfully:', res);
        this.getExamTerms(); // Refresh the list
      },
      (err) => {
        console.error('Error deleting exam term:', err);
      }
    );
  }

  clear() {
    this.examTerm = {
      id:0,
      exam_term_id: 0,
      term_name: '',
      start_date: new Date(),
      end_date: new Date(),
      isActive:true,
      session: '',
      school_id: ''
    };
  }


  toggleAction(index: number) {
    this.currentIndex = this.currentIndex == index ? null : index;
  }


  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.action-container')) {
      this.currentIndex = null;
    }
  }

}

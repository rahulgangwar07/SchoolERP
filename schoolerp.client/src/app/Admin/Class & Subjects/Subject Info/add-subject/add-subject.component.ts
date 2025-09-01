import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectsService } from '../../../../Services/subjects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent implements OnInit {

  constructor(private _subjectService: SubjectsService, private router: Router, private route: ActivatedRoute, private _settingService: GlobalSettingsService) { }

  sForm = {
    subject_id:0,
    subject_name: '',
    subjectCode: '',
    priority:0,
    optional: false
  }

  themeSetting: any;
  

  @ViewChild('formdata') form!: NgForm;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];   
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.sForm.subject_id = params['sub_id'];
    });

    if (this.sForm.subject_id != 0 && this.sForm.subject_id != null) {
      this._subjectService.getSingleSubject(this.sForm.subject_id).subscribe(
        (subject) => { 
          this.sForm.subject_name = subject.subject_name;
          this.sForm.subjectCode = subject.subjectCode;
          this.sForm.priority = subject.priority;
          this.sForm.optional = subject.optional;
        },
        (error) => {
          console.log("Error in fetching single Subject: ",error);
        }
      );
    }

    this.themeSetting = this._settingService.getCurrentTheme();
    console.log("this.themeSetting: ", this.themeSetting);

  }

  submitForm() { 
    if (this.form.valid) {
      this._subjectService.insertSubject(this.sForm).subscribe(
        (success) => { 
          this.form.reset();

          if (this.sForm.subject_id != 0) {
            this.router.navigate(['/subject/view']); 
          }
          else { 
            this.addMessage('success', 'Subject has been successfully added.');
            this.sForm.subject_id = 0;
          }
           
        },
        (error) => {
          console.log("Error found on Subject Submission: ",error);
        }
      );
    } 
  }

  addMessage(type: string, content: string) {
    const messageExists = this.messages.some(msg => msg.content === content);
    if (messageExists) {
      this.messages = this.messages.filter(msg => msg.content !== content);
    }

    this.messages.push({ type, content });
    this.showSuccessPopup = true;
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

}

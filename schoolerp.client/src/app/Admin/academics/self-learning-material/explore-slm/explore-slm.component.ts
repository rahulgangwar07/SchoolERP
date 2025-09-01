import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { SubjectsService } from '../../../../Services/subjects.service';
import { ActivatedRoute } from '@angular/router';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-explore-slm',
  templateUrl: './explore-slm.component.html',
  styleUrl: './explore-slm.component.css'
})
export class ExploreSlmComponent implements OnInit {
  classid: number = 0;
  clsname: string = "";
  subjectList: any[] = []; 
  classList: any[] = []; 

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  constructor(private _classService: ClassService, private _subjectService: SubjectsService, private route: ActivatedRoute,
    private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const clsId = params['clsId'];
      const clsname = params['clsname'];
      this.classid = clsId;
      this.clsname = clsname;
    });

    this.bindClass();
    this.bindSubjectsClasswise();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
  }

  bindClass() {
    this._classService.getActiveClass().subscribe(
      (success) => {
        this.classList = success;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error found in classList fetching! ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindSubjectsClasswise( ) { 
      this.bindSubjectClasswise(this.classid); 

  }
   
  bindSubjectClasswise(cls_id: number) {
    this._subjectService.getSubjectsbyClass(cls_id).subscribe(
      (success) => {
        this.subjectList = success;
        console.log("this.subjectList: ", this.subjectList);
        if (this.subjectList.length === 0) {
          this._messageService.addMessage("warning", "No subjects found for the selected class. Please add subjects.");
        }
      },
      (error) => {
        console.log("Error found on subject binding! ", error);
        this._messageService.addMessage("error", "An error occurred while fetching subjects for the class.");
      }
    );
  }
   

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }


}
 

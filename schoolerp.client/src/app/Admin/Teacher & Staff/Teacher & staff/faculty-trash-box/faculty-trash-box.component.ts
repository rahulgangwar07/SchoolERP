import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FacultyService } from '../../../../Services/faculty.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-faculty-trash-box',
  templateUrl: './faculty-trash-box.component.html',
  styleUrl: './faculty-trash-box.component.css'
})
export class FacultyTrashBoxComponent implements OnInit {

  facultyList: any;
  showActionpopup: number | any;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(private _facultyService: FacultyService,private _messageService:SuccessMessagePopupService) {

  }

  ngOnInit() {
    this.bindfacultyList();
    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });

  }

  bindfacultyList() {
    this._facultyService.getWithdrawnFaculty().subscribe(
      (response) => {
        this.facultyList = response;
        if (this.facultyList.length == 0) {
          this._messageService.addMessage("warning", "No faculties found in the trash box.");
        }
      },
      (error) => {
        console.log("Error found when i am fetching alumni faculty: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the faculties from the trash box.");
      }
    );
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn-action') && !target.closest('.actiondiv')) {
      this.showActionpopup = null;
    }
  }

  openButtons(index: number) {
    this.showActionpopup = (this.showActionpopup === index)? null:index;
  }

  restoreFaculty(id: number) {
    this._facultyService.changeFacStatus(id, "Active").subscribe(
      (response) => {
        this._messageService.addMessage('restore', 'Faculty has been successfully restored.');
        this.bindfacultyList();
      },
      (error) => {
        console.error("Error restoring faculty:", error);
        this._messageService.addMessage('error', 'An error occurred while restoring faculty.');
      }
    );
  }

  movetoAlumni(id: number) {
    this._facultyService.changeFacStatus(id, "Withdrawn").subscribe(
      (response) => {
        this._messageService.addMessage('success', 'Faculty has been successfully moved to Alumni.');
        this.bindfacultyList();
      },
      (error) => {
        console.error("Error moving faculty to Alumni:", error);
        this._messageService.addMessage('error', 'An error occurred while moving faculty to Alumni.');
      }
    ); 
  }
 
  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }
   
  print() {
    window.print();
  }

}

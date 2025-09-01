import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SubjectsService } from '../../../../Services/subjects.service';
import { Router } from '@angular/router';
import { ClassService } from '../../../../Services/class.service'; 
import { PermissionsService } from '../../../../Services/permissions.service';
import { Permissions } from '../../../../models/permissions';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.css'
})
export class ViewSubjectComponent implements OnInit {
  //arr: number[] = [1, 2, 3, 4, 5];

  subjectList: any[] = []; 
  classList: any[] = [];
  toggleIndex: number | any = null;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = []; 

  permissions!: Permissions; 

  constructor(private _subjectService: SubjectsService, private _classService: ClassService, private router: Router
    , private _permissionService: PermissionsService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindPermission(); 
    this.bindClass();
    this.bindSubjects();

    //this._messageService
  }

  bindSubjects() {
    this._subjectService.getSubjects().subscribe(
      (success) => {
        this.subjectList = success;
        if (this.subjectList.length == 0) { 
          this.addMessage("warning", "No subjects found! Please add some subjects.");
        }
      },
      (error) => {
        console.log("Error found in subject List: ", error); 
        this.addMessage("error", "An error occurred while fetching the subject list");   
      }
    );
  }


  bindPermission() {
    const route = this.router.url;
    this._permissionService.checkPermission(route).subscribe(
      (permission) => {
        this.permissions = permission;
      },
      (error) => {
        console.log("Error in fetching Permission! ", error);
      }
    );
  }

  bindSubjectClasswise(cls_id: number) {
    this._subjectService.getSubjectsbyClass(cls_id).subscribe(
      (success) => {
        this.subjectList = success;
        if (this.subjectList.length === 0) {
          this.addMessage("warning", "No subjects found for the selected class. Please add subjects.");
        }
      },
      (error) => {
        console.log("Error found on subject binding! ", error);
        this.addMessage("error", "An error occurred while fetching subjects for the class.");
      }
    );
  }


  bindClass() {
    this._classService.getActiveClass().subscribe(
      (success) => {
        this.classList = success; 
        if (this.classList.length === 0) {
          this.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error found in classList fetching! ", error);
        this.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }


  actionToggle(index: number) {  
    this.toggleIndex = this.toggleIndex === index ? null : index;  
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.action-btn-toggle') && !clickedElement.closest('.action-btn-list')) {
      this.toggleIndex = null;
    }
  }

  bindSubjectsClasswise(event: any) {
    const class_id = event.target.value;
    if (class_id == 0) {
      this.bindSubjects();
    }
    else {
      this.bindSubjectClasswise(class_id);
    }
    
  }

  editSubject(sub_id: number) {
    this.router.navigate(['subject/add'], {
      queryParams: { sub_id: sub_id }
    });

  }

  deleteSubject(sub_id: number) {
    if (confirm("Are you sure you want to delete this subject?")) {
      this._subjectService.deleteSubjects(sub_id).subscribe(
            (success) => {
          this.bindSubjects(); 
          this.addMessage('delete', 'Subject has been deleted!');
            },
            (error) => {
              console.log("Error found when i am deleting record! ", error);
              this.addMessage('success', 'Student attendance has been successfully submitted.');
            }
          );
    } 
  }


  addMessage(type: string, content: string) {
    const messageExists = this.messages.some(msg => msg.content === content);
    if (!messageExists) {
      this.messages.push({ type, content });
      this.showSuccessPopup = true;
    }
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

}

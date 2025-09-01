import { Component, OnInit } from '@angular/core';
import { SubjectsService } from '../../../../Services/subjects.service';
import { ClassService } from '../../../../Services/class.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';

@Component({
  selector: 'app-optional-subject',
  templateUrl: './optional-subject.component.html',
  styleUrls: ['./optional-subject.component.css']
})
export class OptionalSubjectComponent implements OnInit {

  subjectHeader: any;
  subjectData: any;

  classList: any[] = [];
  selectedClassId = 0;
  sectionList: any[] = [];
  sec_id: number = 0;

  showSuccessPopup: boolean = false;   
  messages: { type: string, content: string }[] = [];

  constructor(
    private _subjectService: SubjectsService,
    private _classService: ClassService,
    private _messageService: SuccessMessagePopupService
  ) { }

  ngOnInit() {
    this.bindClassList();
     
    this._messageService.messages$.subscribe((messages: any[]) => {
      this.messages = messages;
      this.showSuccessPopup = messages.length > 0;  
    });
  }

  bindClassList() {
    this._classService.getActiveClass().subscribe(
      (classes: any) => {
        this.classList = classes;
        if (this.classList.length === 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("Error in classList: ", error);
        this._messageService.addMessage("error", "An error occurred while fetching the class list.");
      }
    );
  }

  bindSectionList() {
    this._classService.getActiveSection(this.selectedClassId).subscribe(
      (success) => {
        this.sectionList = success;
        this.sec_id = 0;
        this.bindOptionalSubject(this.selectedClassId);
      },
      (error) => {
        console.log("This classList: ", error);
      }
    );
  }

  bindOptionalSubject(class_id: number) {
    this._subjectService.getStudentOptionalSubject(class_id, this.sec_id).subscribe(
      (data) => {
        this.subjectHeader = data.optionalSubjectsHeader;
        this.subjectData = data.optionalSubjectDtosList;
      },
      (error) => {
        console.log("Error found! ", error);
        this.subjectHeader = "";
        this.subjectData = [];
      }
    );
  }

  classChange(event: any) {
    this.selectedClassId = event.target.value;
    const cls_name = event.target.options[event.target.selectedIndex].getAttribute('data-name');
    this.bindSectionList();
  }

  sectionChange() {
    this.bindOptionalSubject(this.selectedClassId);
  }

  insertoptSubject(stu_id: number, subject_id: number) {
    this._subjectService.insertDeleteStudentOptionalSubject(stu_id, subject_id).subscribe(
      (response) => { },
      (error) => {
        console.log("Error in submision of opt subject! ", error);
      }
    );
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

  print(): void {
    const printContent = document.getElementById("printableArea");

    if (printContent) {
      const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');

      if (WindowPrt) {
        const printContentClone = printContent.cloneNode(true) as HTMLElement;

        const checkboxes = printContentClone.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox: HTMLInputElement | any) => {
          let originalCheckbox = document.querySelector(`input[type="checkbox"][value="${checkbox.value}"]`) as HTMLInputElement;
          if (originalCheckbox) {
            const dataCheckValue = originalCheckbox.getAttribute('data-check');
            if (dataCheckValue == 'true') {
              checkbox.setAttribute('checked', 'checked');
            }
          }
        });

        WindowPrt.document.write(`
        <html>
          <head>
            <style>
              .assigned-subjects-list {
                margin-top: 30px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .assigned-subjects-list table {
                width: 100%;
                border-collapse: collapse;
              }
              .assigned-subjects-list table th,
              .assigned-subjects-list table td {
                padding: 5px;
                border: 1px solid #ddd;
                text-align: center;
              }
              .assigned-subjects-list table th {
                background-color: #f8f9fa;
              }
              .name-div label {
                margin: 0;
              }
              .name-div p {
                font-size: 12px;
                color: #ff5d0d;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            ${printContentClone.innerHTML}
          </body>
        </html>
      `);

        setTimeout(() => {
          WindowPrt.print();
          WindowPrt.document.close();
          WindowPrt.focus();
          WindowPrt.close();
        }, 500);
      } else {
        console.error('Unable to open print window.');
      }
    } else {
      console.error('The printable content area could not be found.');
    }
  }
}

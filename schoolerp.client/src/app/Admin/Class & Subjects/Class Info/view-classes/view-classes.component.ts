import { AfterViewChecked, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ClassService } from '../../../../Services/class.service';
import { FacultyService } from '../../../../Services/faculty.service';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../Services/permissions.service';
import { SuccessMessagePopupService } from '../../../../Services/success-message-popup.service';
import { Permissions } from '../../../../models/permissions';

@Component({
  selector: 'app-view-classes',
  templateUrl: './view-classes.component.html',
  styleUrl: './view-classes.component.css'
})
export class ViewClassesComponent implements OnInit, AfterViewChecked {

  classList: any;
  filteredClassList: any;
  classId: number = 0;
  totalClasses: number = 0;
  totalStudents: number = 0;
  showActionList: number | null = null;
  showSecPopup: boolean = false;
  teacherList: any[] = [];
  showSubPopup: boolean = false;

  showTeacherPopup: boolean = false;
  popupMessageTeacher: string = '';

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];   

  permissions!: Permissions;

  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;

  constructor(private _classService: ClassService, private _facultyService: FacultyService, private router: Router,
    private _permissionService: PermissionsService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindPermission();
    this.funClassList();
    this.bindTeacher();

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length>0
    });
  }

  ngAfterViewChecked() { 
    if (this.showSuccessPopup && this.successMessagePopup) {
      this.successMessagePopup.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  funClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
        this.filteredClassList = response;
        const activeClasses = this.classList.filter((classes: { status: boolean; }) => classes.status === true);
        this.totalClasses = activeClasses.length;
        this.totalStudents = this.classList.reduce((acc: any, classes: { stuCount: any; }) => acc + classes.stuCount, 0); 
        if (this.classList.length == 0) {
          this._messageService.addMessage("warning", "No active classes found. Please add some classes.");
        }
      },
      (error) => {
        console.log("error ", error)
      }
    );
  }

  bindTeacher() {
    this._facultyService.getOnlyTeacher().subscribe(
      (teachers) => {
        this.teacherList = teachers;
      },
      (error) => {
        console.log("Error found when fetching teacher details. ", error);
      }
    );
  }

  deleteClass(classId: number) {
    this._classService.deleteClass(classId).subscribe(
      (response) => {
        this.funClassList();
        this.showActionList = null; 
          this._messageService.addMessage('delete', 'Class has been successfully delete!'); 
         
      },
      (error) => {
        console.log("Error found! ", error);
        this._messageService.addMessage('error', 'Error on class deletion!');
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

  togglebtn(index: number) {
    this.showSuccessPopup = false;
    this.showActionList = this.showActionList === index ? null : index;
  }

  closeTeacherPopup() {
    this.showTeacherPopup = false;
  }

  subjectClick(classId: number) {
    this.classId = classId;
    this.showSubPopup = true;
  }

  changeInput(event: any) {
    const val = event.target.value.toLowerCase();
    this.filteredClassList = this.classList.filter((cls: { class_name: string; }) => {
      return cls.class_name.toLowerCase().includes(val);
    });
  }

  assignClassTeacher(event: any, class_id: number) {
    if (event.target.value != 0) {
      const faculty_id = event.target.value;
      this._facultyService.insertClassTeacher(faculty_id, class_id).subscribe(
        (success) => {
          this.popupMessageTeacher = 'Class Teacher Assigned!!';
          this.showTeacherPopup = true;
          this._messageService.addMessage('success', 'Class Teacher Assigned Successfully!');
        },
        (error) => {
          console.log("Error found when assigning class teacher: ", error);
        }
      );
    }
  }

  openSection(classId: number) {
    this.classId = classId;
    this.showSecPopup = true;
  }

  closeSecPopup(event: boolean) {
    this.showSecPopup = event;
    this.funClassList();
  }

  closeSubPopup(event: boolean) {
    this.showSubPopup = event;
    this.funClassList();
  }
 

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.actionbtn') && !clickedElement.closest('.optionList')) {
      this.showActionList = null;
    }
  }

  print(classList: any) {
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow?.document.write('<html><head><title>Print Slip</title></head><body>');
    const printSection = document.getElementById('print-section')?.innerHTML;
    if (printSection) {
      printWindow?.document.write(printSection);
    } else {
      printWindow?.document.write('No content to print');
    }
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }
}


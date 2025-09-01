import { Component, OnInit } from '@angular/core';
import { SmsSettingService } from '../../../../Services/Messages/sms-setting.service';
import { MessagingService } from '../../../../Services/Messages/messaging.service';
import { SMSLogDtos, SMSTemplates } from '../../../../models/sms';
import { ClassService } from '../../../../Services/class.service';
import { SubjectsService } from '../../../../Services/subjects.service';
import { FacultyService } from '../../../../Services/faculty.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-compose-sms',
  templateUrl: './compose-sms.component.html',
  styleUrls: ['./compose-sms.component.css']
})
export class ComposeSmsComponent implements OnInit {

  smsTemplates: SMSTemplates[] = [];
  classList: any[] = [];
  sectionList: any[] = [];
  studentList: any[] = [];
  teacherList: any[] = [];
     
  selectedClassId: number = 0;
  selectedSectionId: number = 0;
  mobileNos: string = "";

  themeSetting: any;

  smsLogDTO: SMSLogDtos = {
    id : 0,
    template_id : '',
    sentby: '',
    messageTo : '',
    orignal_Message : '',
    mobileNos: '',
    class_ids: '' 
  }

  constructor(
    private messagingService: MessagingService,
    private smsSettingService: SmsSettingService,
    private classService: ClassService,
    private subjectsService: SubjectsService,
    private facultyService: FacultyService, private _settingService: GlobalSettingsService
  ) { }

  ngOnInit(): void {
    this.loadSmsTemplates();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  loadSmsTemplates(): void {
    this.smsSettingService.getTemplates().subscribe({
      next: (templates) => this.smsTemplates = templates,
      error: (err) => console.error("Failed to load templates", err)
    });
  }

  onMessageToChange(): void {
    this.mobileNos = "";
    if (this.smsLogDTO.messageTo === 'singleClass' || this.smsLogDTO.messageTo === 'multipleClass') {
      this.loadClassList();
    }

    if (this.smsLogDTO.messageTo === 'teachers') {
      this.loadTeacherList();   
    }
  }

  onTemplateChange(event: any): void {
    const selected = this.smsTemplates.find(t => t.id == event.target.value);
    this.smsLogDTO.orignal_Message = selected?.template_Content ?? '';
    this.smsLogDTO.template_id = selected?.template_id ?? '';
  }

  onClassChange(): void { 
    this.loadSectionList();
    this.loadStudentList();
  }

  onSectionChange(): void {
    this.loadStudentList();
  }

  onStudentSelectAll(event: any): void {
    const checked = event.target.checked;
    this.studentList.forEach(student => student.checked = checked);  
    this.contacts(this.studentList);
  }

  onStudentSelect(event: any, student: any): void {
    student.checked = event.target.checked; 
    this.contacts(this.studentList);
  }

  onTeachersSelectAll(event: any): void {
    const checked = event.target.checked;
    this.teacherList.forEach(c => c.checked = checked); 
   this.contacts(this.teacherList);
  }
  
  onTeachersSelect(event: any, teacher: any): void {
    teacher.checked = event.target.checked; 
   this.contacts(this.teacherList);
  }


  contacts(list: any[]): void {
    const validContacts = list
      .filter(item => !!item.phone && item.phone.trim() !== "" && item.checked)
      .map(item => item.phone); 
    this.mobileNos = validContacts.join(","); 
  }

  classes(list: any[]): void {
    const validContacts = list
      .filter(item => item.class_id && item.checked)
      .map(item => item.class_id);
    this.smsLogDTO.class_ids = validContacts.join(","); 
  }


  onClassSelectAll(event: any): void {
    const checked = event.target.checked;
    this.classList.forEach(c => c.checked = checked); 
    this.classes(this.classList);
  }
  
  onClassSelect(event: any,cls:any): void {
    cls.checked = event.target.checked;
    this.classes(this.classList);
  }

  loadClassList(): void {
    this.classService.getActiveClass().subscribe({
      next: (classes) => {
        this.classList = classes.map((c: any) => ({ ...c, checked: true }));
        if (this.smsLogDTO.messageTo === 'multipleClass')
          this.classes(this.classList); 
      },
      error: (err) => console.error("Failed to load classes", err)
    });
  }

  loadSectionList(): void {
    this.classService.getActiveSection(this.selectedClassId).subscribe({
      next: (sections) => this.sectionList = sections,
      error: (err) => console.error("Failed to load sections", err)
    });
  }

  loadStudentList(): void {
    if (!this.selectedClassId) return;

    this.subjectsService.getStudentOptionalSubject(this.selectedClassId, this.selectedSectionId).subscribe({
      next: (response) => { 
        const list = response?.optionalSubjectDtosList || [];
        this.studentList = list.map((student: any) => ({ ...student, checked: true })); 
        this.contacts(this.studentList);
      },
      error: (err) => console.error("Failed to load students", err)
    });
  }

  loadTeacherList(): void {
    this.facultyService.getAllFaculty().subscribe({
      next: (teachers) => {
        this.teacherList = teachers,
          this.teacherList.map(t => t.checked = true);
          this.contacts(this.teacherList);
      },
      error: (err) => console.error("Failed to load teachers", err)
    });
  }

  sendSMS() {    
    this.smsLogDTO.mobileNos = this.mobileNos;

    if (this.smsLogDTO.messageTo == "" || this.smsLogDTO.template_id == "") {
      return;
    }
    if ((this.smsLogDTO.messageTo == "teachers" || this.smsLogDTO.messageTo == "singleClass" || this.smsLogDTO.messageTo == "custom")
      && this.smsLogDTO.mobileNos == "") {
      return;
    }

    this.messagingService.insertSMS(this.smsLogDTO).subscribe(
      (next) => { 
        this.clear();
      },
      (error) => { console.log("Error in messaging. ",error); }
    );
     
  }

  clear() {
    this.smsLogDTO = {
      id:0,
      template_id : '',
      sentby: '',
      messageTo: '',
      orignal_Message: '',
      mobileNos: '',
      class_ids: '' 
    }
  }

}

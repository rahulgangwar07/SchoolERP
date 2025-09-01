import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticesService } from '../../../../Services/Messages/notices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../../Services/class.service';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrl: './add-notice.component.css'
})
export class AddNoticeComponent implements OnInit {
  noticeForm: FormGroup;
  classIds: number[] = [];
  classList: any[] = [];
  secList: any[] = [];
  file!: File;

  notice_id: number = 0;
  themeSetting: any;

  constructor(private fb: FormBuilder, private _noticeService: NoticesService, private route: ActivatedRoute
    , private _classService: ClassService, private router: Router, private _settingService: GlobalSettingsService) {
        this.noticeForm = this.fb.group({
          notice_id: [0],
          subject: ['', Validators.required],
          notice: ['', Validators.required],
          notice_for: ['all'],
          notice_type: ['general'],
          class_ids: [''],
          sec_id: [''],
          video_link: [''],
          file_path: [''], 
          created_By: [''],  
          created_At: [new Date()],
          isActive: [true],
          school_id: [''], 
        });
      }

  ngOnInit(): void {
    
    this.notice_id = (Number)(this.route.snapshot.paramMap.get('notice_id'));
    this.loadClasses();

    this.noticeForm.get('notice_for')?.valueChanges.subscribe( value => {
      if (value == 'singleClass' || value == 'multipleClass') {
        this.noticeForm.get('class_ids')?.setValidators(Validators.required);
      } else {
        this.noticeForm.get('class_ids')?.clearValidators();
        this.classIds = [];
        this.noticeForm.get('class_ids')?.setValue('');
      }
      this.noticeForm.get('class_ids')?.updateValueAndValidity(); 
    });

    if (this.notice_id != 0) {
      this.loadNoticebyId();
    }

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  loadNoticebyId() {
    this._noticeService.getNoticebyId(this.notice_id).subscribe(
      (next) => { 
        this.noticeForm.patchValue({
          notice_id: next.notice_id,
          subject: next.subject,
          notice: next.notice,
          notice_for: next.notice_for,
          notice_type: next.notice_type,
          class_ids: next.class_ids,
          sec_id: next.sec_id ?? "",
          video_link: next.video_link,
          file_path: "",
          created_By: next.created_By,
          created_At: next.created_At,
          isActive: next.isActive,
          school_id: next.school_id, 
        });
        if (next.notice_for == 'multipleClass') {
          this.classIds = next.class_ids.split(",").map((id: string) => +id); 
          this.noticeForm.get('class_ids')?.setValue(this.classIds.join(','));
        }
        if (next.notice_for == 'singleClass') {
          const val = this.noticeForm.get('class_ids')?.value; 
          this.loadSections(); 
        }
      },
      (error) => { console.log("Error in notice fetching: ",error); }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  loadClasses() {
    this._classService.getActiveClass().subscribe(
      (next) => { this.classList = next; },
      (error) => { console.log("Error in Class fetching: ", error); }
    );
  }
   

  loadSections() {
    const clsId = this.noticeForm.get('class_ids')?.value;
    if (!clsId.includes(",")) {
      this._classService.getActiveSection(clsId).subscribe(
        (next) => { this.secList = next; },
        (error) => { console.log("Error in Class fetching: ", error); }
      );
    }
  }

  onClassChange(event: any) {
    const value = parseInt(event.target.value);

    if (event.target.checked) {
      if (!this.classIds.includes(value)) {
        this.classIds.push(value);
      }
    } else {
      this.classIds = this.classIds.filter(id => id !== value);
    }

    this.noticeForm.get('class_ids')?.setValue(this.classIds.join(','));
  }

  onSectionChange() {
    this.loadSections();
  }

  changeNotice() { 
    this.noticeForm.get('class_ids')?.setValue('');  
  }

  onSubmit() {
    if (this.noticeForm.valid) {   
        this._noticeService.insertNotice(this.noticeForm.value, this.file).subscribe(
          (success) => {
            const id = this.noticeForm.get('notice_id')?.value;
            if (id != 0) {
              this.router.navigate(['/notice-board/view-notice']); return; 
            } 
            this.noticeForm.reset({
              notice_id: 0,
              subject: '',
              notice: '',
              notice_for: 'all',
              notice_type: 'general',
              class_ids: '',
              sec_id: '',
              video_link: '',
              file_path: '',
              created_By: '',  
              created_At: new Date(),
              isActive: true,
              school_id: '',  
            }); 
          },
          (error) => { console.log("Error: ", error); }
        ); 
    }
    
  }

}

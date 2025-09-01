import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticesService } from '../../../../Services/Messages/notices.service'; 
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { ActivatedRoute, Router } from '@angular/router';
import { important_Programs } from '../../../../models/notice';
import { GlobalSettingsService } from '../../../../Services/global-settings.service';

@Component({
  selector: 'app-add-programs',
  templateUrl: './add-programs.component.html',
  styleUrls: ['./add-programs.component.css']
})
export class AddProgramsComponent implements OnInit {

  program!: FormGroup;
  program_id: number = 0;
  file !: File;

  themeSetting: any;

  constructor(
    private fb: FormBuilder, private route: ActivatedRoute,
    private _programService: NoticesService, private router: Router,
    private _auth: AuthServiceService, private _settingService: GlobalSettingsService
  ) {
    this.program = this.fb.group({
      program_id: [0],
      title: ['', Validators.required],
      description: [''], 
      program_For: ['All'],
      filePath: [''],
      created_On: [new Date().toISOString().substring(0, 10)],
      isActive: [true],
      school_id: [this._auth.getSchoolID()]
    });
  }

  ngOnInit(): void {

    this.program_id = (Number)(this.route.snapshot.paramMap.get('program_id'));

    if (this.program_id != 0) {
      this.loadExistingProgram();
    }

    this.themeSetting = this._settingService.getCurrentTheme();

  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  onSubmit(): void { 
    if (this.program.valid) {

      const formData = new FormData();
      for (const key in this.program.value) {
        if (this.program.value.hasOwnProperty(key)) {
          formData.append(key, this.program.value[key]);
        }
      }
       
      if (this.file) {
        formData.append('file', this.file);
      }

      this._programService.insertPrograms(formData).subscribe(
        res => {
          const val = this.program.get('program_id')?.value;
          if (val != 0) {
            this.router.navigate(['/notice-board/important-lists-dates']);
            return;
          }
          alert("Program added successfully."); 
          this.program.reset({
            program_id: 0,
            program_For: 'All',
            isActive: true,
            school_id: this._auth.getSchoolID(),
            created_On: new Date().toISOString().substring(0, 10)
          });

        },
        err => {
          console.error("Insert Error:", err);
        }
      );
    } else {
      alert("Please fill required fields.");
    }
  }

  loadExistingProgram() {
    
    this._programService.getProgrambyid(this.program_id).subscribe(
      (s: important_Programs) => { 
        const formattedDate = s.created_On ? new Date(s.created_On).toISOString().substring(0, 10) : '';
        this.program.patchValue({
          program_id: s.program_id,
          title: s.title,
          description: s.description,
          program_For: s.program_For,
          filePath: s.filePath,
          created_On: formattedDate,
          isActive: s.isActive,
          school_id: s.school_id
        }); 
      },
      (error) => { console.log("Error: ",error); }
    );

  }



}

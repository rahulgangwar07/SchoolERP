import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from '../../../Services/subjects.service';
import { ClassService } from '../../../Services/class.service';
import { SessionService } from '../../../Services/session.service';
import * as html2pdf from 'html2pdf.js';
import { CertificateService } from '../../../Services/certificate.service';
import { certificate_t, issue_cert } from '../../../models/certificate';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-view-certificate',
  templateUrl: './view-certificate.component.html',
  styleUrl: './view-certificate.component.css'
})
export class ViewCertificateComponent implements OnInit {

  selectedClassId: number = 0;
  selectedSectionId: number = 0;
    selectedSession: string = ""; 
  template_id: number = 0;
  studentList: any[] = [];
  filteredStudentList: any[] = [];
  classList: any[] = [];
  sectionList: any[] = [];
  sessionList: any[] = [];

  template!: certificate_t;

  constructor(private route: ActivatedRoute,
    private subjectsService: SubjectsService, private _sessionService: SessionService, private _imageService: ImageServiceService,
    private classService: ClassService, private _certificateService: CertificateService) { } 

  ngOnInit() {

    this.template_id = (Number)(this.route.snapshot.paramMap.get('template_id'));
    this.loadCertificateList();
    this.loadSessionList();
    this.loadClassList();
  }

  loadCertificateList() {
    this._certificateService.getCertificatebyId(this.template_id).subscribe(
      res => {
        console.log("this.template : ", res);
        res.header = this._imageService.getImageUrlCertificate(res.header);
        res.footer = this._imageService.getImageUrlCertificate(res.footer);
        this.template = res;
      },
      err => console.log("Error : ",err)
    );
  }

  onStatusChange() {

  }

  onFilterChange() {

  }

  onClassChange() {
    this.loadSectionList();
    this.loadStudentList();
  }

  loadSessionList() {
    this.selectedSession = this._sessionService.getActiveSession().toString();
    this._sessionService.getSession().subscribe(
      res => {
        this.sessionList = res; 
      },
      err => console.log("Error: ",err)
    );
  }

  loadStudentList(): void {
    if (!this.selectedClassId) return;

    this.subjectsService.getStudentOptionalSubject(this.selectedClassId, this.selectedSectionId).subscribe({
      next: (response) => { 
        this.studentList = response.optionalSubjectDtosList;
        this.studentList.forEach(s => {
          s.checked = false;
          s.remarks = "";
        });
        this.filteredStudentList = this.studentList;
        console.log("filteredStudentList: ", this.filteredStudentList);
      },
      error: (err) => console.error("Failed to load students", err)
    });
  }

  loadClassList(): void {
    this.classService.getActiveClass().subscribe({
      next: (classes) => {
        this.classList = classes;  
      },
      error: (err) => console.error("Failed to load classes", err)
    });
  }

  loadSectionList(): void {
    this.classService.getActiveSection(this.selectedClassId).subscribe({
      next: (sections) => {
        this.sectionList = sections;  },
      error: (err) => console.error("Failed to load sections", err)
    });
  }

  generatePDF() {
    const element = document.getElementById('certificateTemplate');
    if (!element) return;

    element.style.display = 'block';

    const images = Array.from(element.getElementsByTagName('img'));
    const imageLoadPromises = images.map((img) => {
      return new Promise((resolve) => {
        if (img.complete) resolve(true);
        else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        }
      });
    });

    Promise.all(imageLoadPromises).then(() => {
      const opt = {
        margin: 0.5,
        filename: `Certificates_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save().then(() => {
        element.style.display = 'none';

        // Save to DB
        this.filteredStudentList.filter(stu => stu.checked).forEach(stu => {
          const certData: issue_cert = {
            issue_id: 0,
            stu_id: stu.stu_id,
            template_id: this.template_id,
            issue_date: new Date(),
            issued_by: 1,  
            issued_role: 'Admin',  
            reason: 'Certificate issued',
            remarks: stu.remarks,
            generated_file_path: '', 
            is_active: true,
            session: this.selectedSession,
            school_id: 'SCHOOL_001' 
          };

          this._certificateService.issueCertificate(certData).subscribe({
            next: res => console.log('Saved certificate:', res),
            error: err => console.error('Error saving cert:', err)
          });
        });
      });
    });
  }

  previewCertificates() {
    const element = document.getElementById('certificateTemplate');
    if (!element) return;

    element.style.display = 'block';
     
    setTimeout(() => {
      element.style.display = 'none';
    }, 10000);  
  }

  
  replaceMacros(template: string, student: any): string {
    return template
      .replace(/__NAME__/g, student.stu_name)
      .replace(/__CLASS__/g, this.getClassNameById(this.selectedClassId)).replace(/__FNAME__/g, student.father_name)
      .replace(/__TODAY__/g, new Date().toLocaleDateString());
  }

  getClassNameById(id: number): string { 
    const cls = this.classList.find(c => c.class_id == id); 
    return cls ? cls.dis_name : '';
  }

  changeAllInput(event: any) { 
    this.studentList.forEach(s => s.checked = event.target.checked);
    this.filteredStudentList = this.studentList; 
  }

  changeAllReason() {
    const val = this.studentList[0].remarks;
    console.log("val: ", val);
    this.studentList.forEach(s => s.remarks = val);
  }
 

}

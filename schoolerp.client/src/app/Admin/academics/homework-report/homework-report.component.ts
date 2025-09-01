import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AcademicsService } from '../../../Services/academics.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homework-report',
  templateUrl: './homework-report.component.html',
  styleUrl: './homework-report.component.css'
})
export class HomeworkReportComponent implements OnInit {
  assignmentId: string = "0";
  clsId: string = "0";
  userRole: string = "Student";
  userId: string = "0";
  videoTutorial: any;
  subjects: { [key: number]: string } = {};
  studentList: any[] = [];

  toggleIndex: number | any = null;

  stu_reply: string = "";
  stuReply = {
    reply_id : 0,
    assignment_id: '',
    uid: '',
    stu_reply: '',
    stu_permission: 'check',
    faculty_id: 0,
    faculty_reply: ''  

  }

  constructor(
    private _authService: AuthServiceService,
    private _academicService: AcademicsService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    this.userId = this._authService.getUserID() ?? "0";
    this.assignmentId = this.router.snapshot.paramMap.get('ass_id') ?? "0";
    this.clsId = this.router.snapshot.paramMap.get('cls_id') ?? "0"; 
    this.bindVideoTutorial();
    this.bindStudentReport();
    if (this.userRole == "Student") {
      this.getStudentReport(0);
    }
  }
    
  bindVideoTutorial() {
    this._academicService.getVideoTutorialbyId(Number(this.assignmentId)).subscribe(
      (tutorials) => { 
        this.subjects = tutorials.subjects;
         
        if (tutorials.videoTutorial) {
          const tutorial = tutorials.videoTutorial; 
          const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedLink(tutorial.videoLink));
           
          this.videoTutorial = {
            ...tutorial,
            videoLink: sanitizedUrl
          }; 
        }
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  bindStudentReport() {
    this._academicService.getAssignmentReport((Number)(this.clsId)).subscribe(
      (students) => {
        this.studentList = students; 
      },
      (error) => {
        console.log("Error in assignment: ",error);
      }
    );
  }

  getStudentReport(reply_id:number) {
    const uid = this._authService.getUserID();
    this._academicService.getAssignmentReply(reply_id, this.assignmentId, this.userId).subscribe(
      (response) => {
        if (response != null) { 
          this.stuReply.reply_id = response.reply_id;
            this.stuReply.assignment_id = response.assignment_id;
            this.stuReply.stu_permission = response.stu_permission;
            this.stuReply.stu_reply = response.stu_reply;
            this.stuReply.faculty_id = response.faculty_id;
            this.stuReply.faculty_reply = response.faculty_reply; 
        } 
      },
      (error) => {
        console.log("Error found! ",error);
      }
    );
  }

  submitData(type: string) { 
    this.stuReply.assignment_id = this.assignmentId;
    const uid = this._authService.getUserID() ?? "0"; 
    this.stuReply.uid = uid;
    this._academicService.submitAssignmentReply(type,this.stuReply).subscribe(
      (success) => {
        this.stuReply.reply_id = success.reply_id; 
        this.bindStudentReport();
        this.toggleIndex = null;
      },
      (error) => {
        console.log("Error found in data submittion! ");
      }
    );
  }

  convertToEmbedLink(url: string): string {
    if (!url || !this.isValidUrl(url)) {
      return 'https://via.placeholder.com/560x315?text=Video+Not+Available';
    }

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = this.extractYouTubeVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    if (url.endsWith('.mp4')) {
      return url;
    }

    return 'https://via.placeholder.com/560x315?text=Video+Not+Available';
  }

  extractYouTubeVideoId(url: string): string {
    const youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubePattern);
    return match ? match[1] : '';
  }


  isValidUrl(url: string): boolean {
    const validUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/;
    return validUrlPattern.test(url);
  }

  showSubjects(subj: any) {
    const sub_names = subj.map((subject: any) => {
      const subject_name = this.subjects[subject.subject_id];
      return subject_name ? subject_name : 'Notes';
    });
    return sub_names;
  }

  subjectName(subj_id: number): string {
    return this.subjects[subj_id] || 'Notes';  
  }

  toggleAssignment(index: number, reply_id:number) {
    this.toggleIndex = this.toggleIndex === index ? null : index;
    this.getStudentReport(reply_id);
  }




}

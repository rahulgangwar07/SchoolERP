import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { AcademicsService } from '../../../Services/academics.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-tutorial',
  templateUrl: './video-tutorial.component.html',
  styleUrls: ['./video-tutorial.component.css']
})
export class VideoTutorialComponent implements OnInit {
  userRole: string = "Admin";
  userId: string = "2";
  videoTutorial: any;
  subjects: { [key: number]: string } = {};
 
  constructor(
    private _authService: AuthServiceService,
    private _academicService: AcademicsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    if (this.userRole == "Student") {
      this.userId = this._authService.getClassId();
    } else {
      this.userId = this._authService.getUserID() ?? "2";
    }
    this.bindVideoTutorial();
  }
   

  bindVideoTutorial() {
    this._academicService.getVideoTutorial(this.userRole, this.userId).subscribe(
      (tutorials) => {
        this.subjects = tutorials.subjects;
        this.videoTutorial = tutorials.videoTutorials.map((tutorial: { videoLink: string; }) => {
          const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedLink(tutorial.videoLink));
          return {
            ...tutorial,
            videoLink: sanitizedUrl
          };
        });
        console.log("Tutorials: ", this.videoTutorial);
      },
      (error) => {
        console.log("Error: ", error);
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


}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private apiUrl = environment.apiUrl+ "/Image";
  //private apiUrl = 'https://localhost:7030';

  constructor(private _authService: AuthServiceService) { }

 


  getImageUrl(imageName: string): string {
    const school_id = this._authService.getSchoolID();
    return `${this.apiUrl}/uploads/${imageName}`;
  }

  getAllImages(imageName: string,folder:string): string | null {
    if (!imageName) {
      return null;
    } 
    const token = this._authService.generateImageAccessToken(imageName, folder);
    return `${this.apiUrl}/getImage/${token}`;
  }
  getImageUrlStudent(imageName: string): string | null {
    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, 'student');
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlFaculty(imageName: string | null): string | null {
    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "faculty");
    return `${this.apiUrl}/getImage/${token}`;
  }
  getImageUrlAcademics(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "academics");
    return `${this.apiUrl}/getImage/${token}`;
  }
  getImageUrlSyllabus(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "syllabus");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlVisitors(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "visitors");
    return `${this.apiUrl}/getImage/${token}`;
  } 

  getImageUrlGallery(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "gallery");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlCertificate(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "certificates");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlPrograms(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "programs");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlNotices(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "notices");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlDownloadForm(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "forms");
    return `${this.apiUrl}/getImage/${token}`;
  }

  getImageUrlSettings(imageName: string | null): string | null {

    if (!imageName) {
      return null;
    }
    const token = this._authService.generateImageAccessToken(imageName, "settings");
    return `${this.apiUrl}/getImage/${token}`;
  }




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthServiceService } from './AuthServiceService';
import { galleryCategory, imageGallery, imageGImage } from '../models/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiurl = environment.apiUrl + '/Gallery'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getgalleryCategory() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<galleryCategory[]>(`${this.apiurl}/get-gallery-category?school_id=${school_id}`)
  }

  getgalleryCategorybyId(category_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<galleryCategory>(`${this.apiurl}/get-gallery-category-by-id?school_id=${school_id}&cat_id=${category_id}`)
  }
  
  insertgalleryCategory(data: galleryCategory) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    return this.http.post<galleryCategory>(`${this.apiurl}/insert-gallery-category?school_id=${school_id}`,data)
  }
  
  deletegalleryCategory(category_id:number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-gallery-category?school_id=${school_id}&cat_id=${category_id}`)
  }


  getImageWCategory() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-image-with-category?school_id=${school_id}`)
  }

  getimageGallery(category_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<imageGallery[]>(`${this.apiurl}/get-image-gallery?school_id=${school_id}&cat_id=${category_id}`)
  }

  insertimageGallery(data: imageGallery, file: File) {
    const school_id = this._authService.getSchoolID();
    data.school_id = school_id;
    const formData = new FormData();
    console.log("Gallery Data: ",data);
    console.log("file: ",file);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const typedKey = key as keyof imageGallery; 
        const value = data[typedKey]; 
        formData.append(typedKey, value as string | Blob);
      }
    }
     
    formData.append('image', file, file.name);  

    return this.http.post<any>(`${this.apiurl}/insert-image-gallery`, formData);
  }


  deleteimageGallery(img_id: number) {
    const school_id = this._authService.getSchoolID();
    return this.http.delete<any>(`${this.apiurl}/delete-image-gallery?school_id=${school_id}&img_id=${img_id}`)
  }
  

  getSchoolAllimages() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-school-all-images?school_id=${school_id}`)
  }

}

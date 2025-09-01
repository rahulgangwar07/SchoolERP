import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../../../Services/gallery.service';
import { imageGallery } from '../../../models/gallery';
import { ImageServiceService } from '../../../Services/image-service.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';

@Component({
  selector: 'app-sub-photo-gallery',
  templateUrl: './sub-photo-gallery.component.html',
  styleUrl: './sub-photo-gallery.component.css'
})
export class SubPhotoGalleryComponent implements OnInit {

  category_id: number = 0;
  imageGallery: imageGallery[] = [];
  userRole: string = "Admin";

  constructor(private route: ActivatedRoute, private router: Router, private _galleryService: GalleryService,
    private _imageService: ImageServiceService, private _authService: AuthServiceService) {

  }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    this.category_id = (Number)(this.route.snapshot.paramMap.get('cat_id')) ?? 0;
    if (this.category_id == 0) {
      this.router.navigate(['/leave-gallery/photo-gallery']);
    }
    else {
      this.bindImageGallery();
    } 
  }

  bindImageGallery() {
    this._galleryService.getimageGallery(this.category_id).subscribe(
      (g: imageGallery[]) => {
        console.log("g: ", g);
        this.imageGallery = g;
        this.imageGallery = this.imageGallery.map((d: any) => {
          d.img_url = this._imageService.getImageUrlGallery(d.img_url);
          return d;
        });
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  deleteImage(img_id: number, index: number) {
    this._galleryService.deleteimageGallery(img_id).subscribe(
      (success) => { 
        this.imageGallery.splice(index, 1);
      },
      (error) => {
        console.log("Error: ",error);
      }
    ); 
  }

}

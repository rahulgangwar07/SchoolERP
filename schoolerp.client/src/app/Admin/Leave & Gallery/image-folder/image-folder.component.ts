import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../Services/gallery.service';
import { ImageServiceService } from '../../../Services/image-service.service';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrl: './image-folder.component.css'
})
export class ImageFolderComponent implements OnInit {

  allImages: any[] = [];
  toggleIndex: number | null = null;

  constructor(private _galleryService: GalleryService, private _imageService: ImageServiceService) { }

  ngOnInit() {
    this.bindGallery();
  }

  bindGallery() {
    this._galleryService.getSchoolAllimages().subscribe(
      (img) => {
        this.allImages = img;

        // Ensure `this.allImages` is processed correctly
        this.allImages = this.allImages.map((ai: { folder_name: string, images: Array<{ url: string | null, url_name: string }> }) => {
          // Process the images array inside each folder
          if (Array.isArray(ai.images)) {
            ai.images = ai.images.map((a: { url: string | null, url_name: string }) => { 
              a.url_name = a.url ?? "";

              if (a.url) {
                a.url = this._imageService.getAllImages(a.url, ai.folder_name);
              }
              return a;
            });
          }
          return ai;
        });

        console.log("Images: ", this.allImages);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }


  toggleList(index:number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }

  isImage(fileName: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  }

  isPDF(fileName: string): boolean {
    return fileName.toLowerCase().endsWith('.pdf');
  }

}

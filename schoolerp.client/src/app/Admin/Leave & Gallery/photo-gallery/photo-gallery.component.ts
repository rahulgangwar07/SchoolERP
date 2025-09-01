import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../Services/gallery.service';
import { galleryCategory, imageGallery } from '../../../models/gallery';
import { ImageServiceService } from '../../../Services/image-service.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  showPopup: boolean = false;
  categories: galleryCategory[] = [];
  images: any[] = [];
  userRole: string = "Admin";

  themeSetting: any;

  category: galleryCategory = {
    category_id: 0,
    category_name: '',
    isActive: true,
    created_at: new Date(),
    updated_at: new Date(),
    school_id: ''
  };

  imageG: imageGallery = {
    img_id: 0,
    img_url: '',
    category_id: 0,
    title: '',
    description: '',
    isActive: true,
    uploaded_at: new Date(),
    school_id: ''
  };

  file: File | null = null;

  constructor(private _galleryService: GalleryService, private _imageService: ImageServiceService,
    private _authService: AuthServiceService, private _settingService: GlobalSettingsService) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    this.loadCategories();
    this.loadImages();
    this.themeSetting = this._settingService.getCurrentTheme();
  }

  loadCategories() { 
    this._galleryService.getgalleryCategory().subscribe(
      (response: galleryCategory[]) => {
        this.categories = response;
      },
      (error) => {
        console.log("Error loading categories: ", error);
      }
    );
  }

  loadImages() {
    // Load images for the gallery
    this._galleryService.getImageWCategory().subscribe(
      (response) => {
        this.images = response;
        this.images = this.images.map(gImages => { 
          gImages.imageGalleries.map((img: any) => {
            img.img_url = this._imageService.getImageUrlGallery(img.img_url);
          return img;
          });
          return gImages;
        });

        console.log("Images: ", this.images);
      },
      (error) => {
        console.log("Error loading images: ", error);
      }
    );
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  uploadCategory() {
    const val = this.category.category_id;
    if (this.category.category_name !== '') {
      this._galleryService.insertgalleryCategory(this.category).subscribe(
        (response: galleryCategory) => {
          if (val == 0) {
            this.categories.push(response);
          } else {
            this.loadCategories();
          }
          
          this.category.category_name = '';  
          console.log("Category uploaded successfully: ", response);
        },
        (error) => {
          console.log("Error uploading category: ", error);
        }
      );
    }
  }

  editCategory(cat: galleryCategory) {
    this._galleryService.getgalleryCategorybyId(cat.category_id).subscribe(
      (data) => {
        this.category = data;
      },
      (error) => {
        console.log("Error in fetching category: ",error);
      }
    );

    console.log('Editing category: ', cat);
  }

  deleteCategory(categoryId: number) {
    this._galleryService.deletegalleryCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter(cat => cat.category_id !== categoryId);
        console.log('Category deleted successfully');
      },
      (error) => {
        console.log("Error deleting category: ", error);
      }
    );
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage() {
    if (this.file && this.imageG.category_id !== 0) {
      const formData = new FormData(); 
       
      //formData.append('image', this.file);
      //formData.append('category_id', this.imageG.category_id.toString());

      this._galleryService.insertimageGallery(this.imageG, this.file).subscribe(
          (response: imageGallery) => {
          this.images.push(response);
          this.loadImages();
          this.clear();
          },
          (error) => {
            console.log("Error uploading image: ", error);
          }
        );
      } else {
        alert('Please select an image and category.');
      }
    }
     

  clear() {
    this.imageG.category_id = 0;
    this.file = null;
    const fileInput = document.getElementById('upload-img') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

}

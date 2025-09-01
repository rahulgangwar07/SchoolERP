import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuPhotoGalleryComponent } from './stu-photo-gallery.component';

describe('StuPhotoGalleryComponent', () => {
  let component: StuPhotoGalleryComponent;
  let fixture: ComponentFixture<StuPhotoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuPhotoGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuPhotoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

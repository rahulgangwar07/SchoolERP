import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFolderComponent } from './image-folder.component';

describe('ImageFolderComponent', () => {
  let component: ImageFolderComponent;
  let fixture: ComponentFixture<ImageFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageFolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

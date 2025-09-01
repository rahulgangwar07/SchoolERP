import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCorrectionComponent } from './copy-correction.component';

describe('CopyCorrectionComponent', () => {
  let component: CopyCorrectionComponent;
  let fixture: ComponentFixture<CopyCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyCorrectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

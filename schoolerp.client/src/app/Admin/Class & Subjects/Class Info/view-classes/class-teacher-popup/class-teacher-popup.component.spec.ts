import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTeacherPopupComponent } from './class-teacher-popup.component';

describe('ClassTeacherPopupComponent', () => {
  let component: ClassTeacherPopupComponent;
  let fixture: ComponentFixture<ClassTeacherPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassTeacherPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassTeacherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

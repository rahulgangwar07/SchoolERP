import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuStudyMaterialComponent } from './stu-study-material.component';

describe('StuStudyMaterialComponent', () => {
  let component: StuStudyMaterialComponent;
  let fixture: ComponentFixture<StuStudyMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuStudyMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuStudyMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuSelfLearningMaterialComponent } from './stu-self-learning-material.component';

describe('StuSelfLearningMaterialComponent', () => {
  let component: StuSelfLearningMaterialComponent;
  let fixture: ComponentFixture<StuSelfLearningMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuSelfLearningMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuSelfLearningMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

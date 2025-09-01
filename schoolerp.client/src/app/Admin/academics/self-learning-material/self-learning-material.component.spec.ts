import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLearningMaterialComponent } from './self-learning-material.component';

describe('SelfLearningMaterialComponent', () => {
  let component: SelfLearningMaterialComponent;
  let fixture: ComponentFixture<SelfLearningMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfLearningMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfLearningMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

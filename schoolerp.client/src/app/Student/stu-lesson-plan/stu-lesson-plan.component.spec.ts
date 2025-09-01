import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuLessonPlanComponent } from './stu-lesson-plan.component';

describe('StuLessonPlanComponent', () => {
  let component: StuLessonPlanComponent;
  let fixture: ComponentFixture<StuLessonPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuLessonPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuLessonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

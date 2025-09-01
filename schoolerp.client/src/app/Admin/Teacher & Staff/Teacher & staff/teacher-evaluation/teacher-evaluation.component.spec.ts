import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvaluationComponent } from './teacher-evaluation.component';

describe('TeacherEvaluationComponent', () => {
  let component: TeacherEvaluationComponent;
  let fixture: ComponentFixture<TeacherEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

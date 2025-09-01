import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRoutineComponent } from './teacher-routine.component';

describe('TeacherRoutineComponent', () => {
  let component: TeacherRoutineComponent;
  let fixture: ComponentFixture<TeacherRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherRoutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

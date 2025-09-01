import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuExamScheduleComponent } from './stu-exam-schedule.component';

describe('StuExamScheduleComponent', () => {
  let component: StuExamScheduleComponent;
  let fixture: ComponentFixture<StuExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

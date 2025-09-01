import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoExamScheduleComponent } from './view-co-exam-schedule.component';

describe('ViewCoExamScheduleComponent', () => {
  let component: ViewCoExamScheduleComponent;
  let fixture: ComponentFixture<ViewCoExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCoExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

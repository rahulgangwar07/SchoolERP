import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoExamScheduleComponent } from './add-co-exam-schedule.component';

describe('AddCoExamScheduleComponent', () => {
  let component: AddCoExamScheduleComponent;
  let fixture: ComponentFixture<AddCoExamScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCoExamScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoExamScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

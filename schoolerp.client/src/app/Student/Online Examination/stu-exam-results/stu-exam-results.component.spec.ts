import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuExamResultsComponent } from './stu-exam-results.component';

describe('StuExamResultsComponent', () => {
  let component: StuExamResultsComponent;
  let fixture: ComponentFixture<StuExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuExamResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

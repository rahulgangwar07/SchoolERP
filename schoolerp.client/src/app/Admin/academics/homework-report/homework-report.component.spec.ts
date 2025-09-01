import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkReportComponent } from './homework-report.component';

describe('HomeworkReportComponent', () => {
  let component: HomeworkReportComponent;
  let fixture: ComponentFixture<HomeworkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeworkReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeworkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

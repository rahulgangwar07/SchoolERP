import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityReportBranchComponent } from './activity-report-branch.component';

describe('ActivityReportBranchComponent', () => {
  let component: ActivityReportBranchComponent;
  let fixture: ComponentFixture<ActivityReportBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityReportBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityReportBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

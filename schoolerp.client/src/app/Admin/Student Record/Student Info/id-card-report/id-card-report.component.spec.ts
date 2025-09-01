import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardReportComponent } from './id-card-report.component';

describe('IdCardReportComponent', () => {
  let component: IdCardReportComponent;
  let fixture: ComponentFixture<IdCardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdCardReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdCardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

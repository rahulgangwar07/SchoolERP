import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellReportSellCounterComponent } from './sell-report-sell-counter.component';

describe('SellReportSellCounterComponent', () => {
  let component: SellReportSellCounterComponent;
  let fixture: ComponentFixture<SellReportSellCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellReportSellCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellReportSellCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

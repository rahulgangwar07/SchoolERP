import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockSellCounterComponent } from './view-stock-sell-counter.component';

describe('ViewStockSellCounterComponent', () => {
  let component: ViewStockSellCounterComponent;
  let fixture: ComponentFixture<ViewStockSellCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStockSellCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStockSellCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

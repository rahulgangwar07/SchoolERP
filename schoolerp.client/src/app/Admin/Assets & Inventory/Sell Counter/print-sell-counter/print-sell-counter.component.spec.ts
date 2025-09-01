import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSellCounterComponent } from './print-sell-counter.component';

describe('PrintSellCounterComponent', () => {
  let component: PrintSellCounterComponent;
  let fixture: ComponentFixture<PrintSellCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintSellCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintSellCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundableAmountComponent } from './refundable-amount.component';

describe('RefundableAmountComponent', () => {
  let component: RefundableAmountComponent;
  let fixture: ComponentFixture<RefundableAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundableAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundableAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

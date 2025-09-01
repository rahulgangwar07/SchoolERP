import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsOutboxPopupComponent } from './sms-outbox-popup.component';

describe('SmsOutboxPopupComponent', () => {
  let component: SmsOutboxPopupComponent;
  let fixture: ComponentFixture<SmsOutboxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsOutboxPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsOutboxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

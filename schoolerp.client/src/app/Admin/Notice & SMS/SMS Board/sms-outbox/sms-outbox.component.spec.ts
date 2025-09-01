import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsOutboxComponent } from './sms-outbox.component';

describe('SmsOutboxComponent', () => {
  let component: SmsOutboxComponent;
  let fixture: ComponentFixture<SmsOutboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmsOutboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsOutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

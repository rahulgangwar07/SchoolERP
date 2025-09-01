import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeSmsComponent } from './compose-sms.component';

describe('ComposeSmsComponent', () => {
  let component: ComposeSmsComponent;
  let fixture: ComponentFixture<ComposeSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposeSmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

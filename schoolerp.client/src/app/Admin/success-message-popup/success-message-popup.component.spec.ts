import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessagePopupComponent } from './success-message-popup.component';

describe('SuccessMessagePopupComponent', () => {
  let component: SuccessMessagePopupComponent;
  let fixture: ComponentFixture<SuccessMessagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessMessagePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

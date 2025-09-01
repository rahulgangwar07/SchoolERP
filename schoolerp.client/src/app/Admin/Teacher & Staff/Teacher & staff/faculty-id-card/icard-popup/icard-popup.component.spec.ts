import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcardPopupComponent } from './icard-popup.component';

describe('IcardPopupComponent', () => {
  let component: IcardPopupComponent;
  let fixture: ComponentFixture<IcardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IcardPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

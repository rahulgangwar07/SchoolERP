import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecPopupComponent } from './sec-popup.component';

describe('SecPopupComponent', () => {
  let component: SecPopupComponent;
  let fixture: ComponentFixture<SecPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

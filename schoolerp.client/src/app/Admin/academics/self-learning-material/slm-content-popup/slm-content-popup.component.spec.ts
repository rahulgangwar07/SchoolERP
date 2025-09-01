import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlmContentPopupComponent } from './slm-content-popup.component';

describe('SlmContentPopupComponent', () => {
  let component: SlmContentPopupComponent;
  let fixture: ComponentFixture<SlmContentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlmContentPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlmContentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaidComponent } from './fee-paid.component';

describe('FeePaidComponent', () => {
  let component: FeePaidComponent;
  let fixture: ComponentFixture<FeePaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeePaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeePaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

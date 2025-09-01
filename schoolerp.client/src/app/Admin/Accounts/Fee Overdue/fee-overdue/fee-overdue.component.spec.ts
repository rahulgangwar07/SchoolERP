import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeOverdueComponent } from './fee-overdue.component';

describe('FeeOverdueComponent', () => {
  let component: FeeOverdueComponent;
  let fixture: ComponentFixture<FeeOverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeOverdueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

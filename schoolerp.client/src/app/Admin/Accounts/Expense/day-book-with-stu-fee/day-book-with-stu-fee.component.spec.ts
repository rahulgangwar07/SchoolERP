import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBookWithStuFeeComponent } from './day-book-with-stu-fee.component';

describe('DayBookWithStuFeeComponent', () => {
  let component: DayBookWithStuFeeComponent;
  let fixture: ComponentFixture<DayBookWithStuFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayBookWithStuFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayBookWithStuFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

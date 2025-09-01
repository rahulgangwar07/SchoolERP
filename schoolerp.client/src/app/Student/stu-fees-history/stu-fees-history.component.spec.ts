import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuFeesHistoryComponent } from './stu-fees-history.component';

describe('StuFeesHistoryComponent', () => {
  let component: StuFeesHistoryComponent;
  let fixture: ComponentFixture<StuFeesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuFeesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuFeesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

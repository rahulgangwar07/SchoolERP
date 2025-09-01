import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuApplyForLeaveComponent } from './stu-apply-for-leave.component';

describe('StuApplyForLeaveComponent', () => {
  let component: StuApplyForLeaveComponent;
  let fixture: ComponentFixture<StuApplyForLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuApplyForLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuApplyForLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

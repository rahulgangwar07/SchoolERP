import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuNoticeBoardComponent } from './stu-notice-board.component';

describe('StuNoticeBoardComponent', () => {
  let component: StuNoticeBoardComponent;
  let fixture: ComponentFixture<StuNoticeBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuNoticeBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuNoticeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

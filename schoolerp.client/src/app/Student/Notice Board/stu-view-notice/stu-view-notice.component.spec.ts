import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuViewNoticeComponent } from './stu-view-notice.component';

describe('StuViewNoticeComponent', () => {
  let component: StuViewNoticeComponent;
  let fixture: ComponentFixture<StuViewNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuViewNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuViewNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

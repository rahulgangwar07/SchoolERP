import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuVideoTutorialComponent } from './stu-video-tutorial.component';

describe('StuVideoTutorialComponent', () => {
  let component: StuVideoTutorialComponent;
  let fixture: ComponentFixture<StuVideoTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuVideoTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuVideoTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

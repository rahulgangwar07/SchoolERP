import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuMyExamsComponent } from './stu-my-exams.component';

describe('StuMyExamsComponent', () => {
  let component: StuMyExamsComponent;
  let fixture: ComponentFixture<StuMyExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuMyExamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuMyExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuClassRoutineComponent } from './stu-class-routine.component';

describe('StuClassRoutineComponent', () => {
  let component: StuClassRoutineComponent;
  let fixture: ComponentFixture<StuClassRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuClassRoutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuClassRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

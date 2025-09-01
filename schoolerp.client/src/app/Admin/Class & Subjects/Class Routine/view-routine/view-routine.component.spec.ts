import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoutineComponent } from './view-routine.component';

describe('ViewRoutineComponent', () => {
  let component: ViewRoutineComponent;
  let fixture: ComponentFixture<ViewRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRoutineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentsComponent } from './edit-assignments.component';

describe('EditAssignmentsComponent', () => {
  let component: EditAssignmentsComponent;
  let fixture: ComponentFixture<EditAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAssignmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

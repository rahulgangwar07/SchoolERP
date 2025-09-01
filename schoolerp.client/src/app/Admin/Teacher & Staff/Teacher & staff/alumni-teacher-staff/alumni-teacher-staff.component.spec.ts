import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniTeacherStaffComponent } from './alumni-teacher-staff.component';

describe('AlumniTeacherStaffComponent', () => {
  let component: AlumniTeacherStaffComponent;
  let fixture: ComponentFixture<AlumniTeacherStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumniTeacherStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumniTeacherStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

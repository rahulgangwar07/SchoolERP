import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTeacherStaffComponent } from './import-teacher-staff.component';

describe('ImportTeacherStaffComponent', () => {
  let component: ImportTeacherStaffComponent;
  let fixture: ComponentFixture<ImportTeacherStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportTeacherStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportTeacherStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

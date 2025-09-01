import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceRowDataComponent } from './attendance-row-data.component';

describe('AttendanceRowDataComponent', () => {
  let component: AttendanceRowDataComponent;
  let fixture: ComponentFixture<AttendanceRowDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceRowDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceRowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

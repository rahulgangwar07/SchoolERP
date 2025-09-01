import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFacultyComponent } from './add-new-faculty.component';

describe('AddNewFacultyComponent', () => {
  let component: AddNewFacultyComponent;
  let fixture: ComponentFixture<AddNewFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewFacultyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

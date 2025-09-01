import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrashBoxComponent } from './student-trash-box.component';

describe('StudentTrashBoxComponent', () => {
  let component: StudentTrashBoxComponent;
  let fixture: ComponentFixture<StudentTrashBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTrashBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTrashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyTrashBoxComponent } from './faculty-trash-box.component';

describe('FacultyTrashBoxComponent', () => {
  let component: FacultyTrashBoxComponent;
  let fixture: ComponentFixture<FacultyTrashBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyTrashBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyTrashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

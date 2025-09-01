import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyIdCardComponent } from './faculty-id-card.component';

describe('FacultyIdCardComponent', () => {
  let component: FacultyIdCardComponent;
  let fixture: ComponentFixture<FacultyIdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyIdCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyIdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

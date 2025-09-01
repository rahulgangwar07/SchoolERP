import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAlumniComponent } from './view-alumni.component';

describe('ViewAlumniComponent', () => {
  let component: ViewAlumniComponent;
  let fixture: ComponentFixture<ViewAlumniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAlumniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

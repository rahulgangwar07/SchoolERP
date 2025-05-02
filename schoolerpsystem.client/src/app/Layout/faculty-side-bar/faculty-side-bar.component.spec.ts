import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySideBarComponent } from './faculty-side-bar.component';

describe('FacultySideBarComponent', () => {
  let component: FacultySideBarComponent;
  let fixture: ComponentFixture<FacultySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultySideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolshipComponent } from './schoolship.component';

describe('SchoolshipComponent', () => {
  let component: SchoolshipComponent;
  let fixture: ComponentFixture<SchoolshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

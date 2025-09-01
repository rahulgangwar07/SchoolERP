import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHostalComponent } from './view-hostal.component';

describe('ViewHostalComponent', () => {
  let component: ViewHostalComponent;
  let fixture: ComponentFixture<ViewHostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHostalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

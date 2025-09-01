import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineWeightageComponent } from './define-weightage.component';

describe('DefineWeightageComponent', () => {
  let component: DefineWeightageComponent;
  let fixture: ComponentFixture<DefineWeightageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineWeightageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineWeightageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

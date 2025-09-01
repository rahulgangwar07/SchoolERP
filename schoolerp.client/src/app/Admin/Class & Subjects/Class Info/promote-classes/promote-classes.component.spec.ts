import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteClassesComponent } from './promote-classes.component';

describe('PromoteClassesComponent', () => {
  let component: PromoteClassesComponent;
  let fixture: ComponentFixture<PromoteClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoteClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateFineComponent } from './late-fine.component';

describe('LateFineComponent', () => {
  let component: LateFineComponent;
  let fixture: ComponentFixture<LateFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LateFineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

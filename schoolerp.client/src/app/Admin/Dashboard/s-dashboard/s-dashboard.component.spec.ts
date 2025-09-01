import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SDashboardComponent } from './s-dashboard.component';

describe('SDashboardComponent', () => {
  let component: SDashboardComponent;
  let fixture: ComponentFixture<SDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

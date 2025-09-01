import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EContentDetailComponent } from './e-content-detail.component';

describe('EContentDetailComponent', () => {
  let component: EContentDetailComponent;
  let fixture: ComponentFixture<EContentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EContentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EContentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

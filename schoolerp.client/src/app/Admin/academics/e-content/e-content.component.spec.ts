import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EContentComponent } from './e-content.component';

describe('EContentComponent', () => {
  let component: EContentComponent;
  let fixture: ComponentFixture<EContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

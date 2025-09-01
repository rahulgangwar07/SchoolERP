import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTcComponent } from './generate-tc.component';

describe('GenerateTcComponent', () => {
  let component: GenerateTcComponent;
  let fixture: ComponentFixture<GenerateTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateTcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

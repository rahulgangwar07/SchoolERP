import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDemandSlipComponent } from './print-demand-slip.component';

describe('PrintDemandSlipComponent', () => {
  let component: PrintDemandSlipComponent;
  let fixture: ComponentFixture<PrintDemandSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintDemandSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDemandSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

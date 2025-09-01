import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDemandSlipComponent } from './create-demand-slip.component';

describe('CreateDemandSlipComponent', () => {
  let component: CreateDemandSlipComponent;
  let fixture: ComponentFixture<CreateDemandSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDemandSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDemandSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

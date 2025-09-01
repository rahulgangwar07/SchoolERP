import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeHeadMappingComponent } from './fee-head-mapping.component';

describe('FeeHeadMappingComponent', () => {
  let component: FeeHeadMappingComponent;
  let fixture: ComponentFixture<FeeHeadMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeHeadMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeHeadMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

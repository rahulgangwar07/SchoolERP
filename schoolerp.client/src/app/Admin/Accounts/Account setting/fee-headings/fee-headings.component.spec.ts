import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeHeadingsComponent } from './fee-headings.component';

describe('FeeHeadingsComponent', () => {
  let component: FeeHeadingsComponent;
  let fixture: ComponentFixture<FeeHeadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeeHeadingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

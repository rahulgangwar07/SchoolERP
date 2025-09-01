import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbseRegComponent } from './cbse-reg.component';

describe('CbseRegComponent', () => {
  let component: CbseRegComponent;
  let fixture: ComponentFixture<CbseRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CbseRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbseRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

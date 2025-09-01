import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPriodComponent } from './view-priod.component';

describe('ViewPriodComponent', () => {
  let component: ViewPriodComponent;
  let fixture: ComponentFixture<ViewPriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

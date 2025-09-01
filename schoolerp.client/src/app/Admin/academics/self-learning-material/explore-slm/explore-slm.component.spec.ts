import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSlmComponent } from './explore-slm.component';

describe('ExploreSlmComponent', () => {
  let component: ExploreSlmComponent;
  let fixture: ComponentFixture<ExploreSlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreSlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

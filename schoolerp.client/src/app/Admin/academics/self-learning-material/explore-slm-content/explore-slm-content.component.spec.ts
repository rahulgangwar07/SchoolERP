import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSlmContentComponent } from './explore-slm-content.component';

describe('ExploreSlmContentComponent', () => {
  let component: ExploreSlmContentComponent;
  let fixture: ComponentFixture<ExploreSlmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreSlmContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSlmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

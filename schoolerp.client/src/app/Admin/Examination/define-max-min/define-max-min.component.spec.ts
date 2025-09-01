import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineMaxMinComponent } from './define-max-min.component';

describe('DefineMaxMinComponent', () => {
  let component: DefineMaxMinComponent;
  let fixture: ComponentFixture<DefineMaxMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineMaxMinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineMaxMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

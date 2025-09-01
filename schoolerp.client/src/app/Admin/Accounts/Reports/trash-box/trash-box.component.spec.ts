import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashBoxComponent } from './trash-box.component';

describe('TrashBoxComponent', () => {
  let component: TrashBoxComponent;
  let fixture: ComponentFixture<TrashBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

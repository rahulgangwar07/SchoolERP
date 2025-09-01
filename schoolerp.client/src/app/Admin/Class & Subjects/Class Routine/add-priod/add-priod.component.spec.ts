import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriodComponent } from './add-priod.component';

describe('AddPriodComponent', () => {
  let component: AddPriodComponent;
  let fixture: ComponentFixture<AddPriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

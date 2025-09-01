import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorListAComponent } from './vendor-list.component';

describe('VendorListComponent', () => {
  let component: VendorListAComponent;
  let fixture: ComponentFixture<VendorListAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorListAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorListAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

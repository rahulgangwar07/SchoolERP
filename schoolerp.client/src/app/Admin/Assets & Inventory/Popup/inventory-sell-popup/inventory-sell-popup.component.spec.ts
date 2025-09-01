import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySellPopupComponent } from './inventory-sell-popup.component';

describe('InventorySellPopupComponent', () => {
  let component: InventorySellPopupComponent;
  let fixture: ComponentFixture<InventorySellPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventorySellPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

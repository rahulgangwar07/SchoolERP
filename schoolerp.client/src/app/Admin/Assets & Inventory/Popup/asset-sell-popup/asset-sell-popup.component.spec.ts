import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSellPopupComponent } from './asset-sell-popup.component';

describe('AssetSellPopupComponent', () => {
  let component: AssetSellPopupComponent;
  let fixture: ComponentFixture<AssetSellPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetSellPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSellPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetDeployeReportComponent } from './view-asset-deploye-report.component';

describe('ViewAssetDeployeReportComponent', () => {
  let component: ViewAssetDeployeReportComponent;
  let fixture: ComponentFixture<ViewAssetDeployeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAssetDeployeReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssetDeployeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

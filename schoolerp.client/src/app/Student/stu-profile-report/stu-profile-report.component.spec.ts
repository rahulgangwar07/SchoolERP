import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuProfileReportComponent } from './stu-profile-report.component';

describe('StuProfileReportComponent', () => {
  let component: StuProfileReportComponent;
  let fixture: ComponentFixture<StuProfileReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuProfileReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuProfileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

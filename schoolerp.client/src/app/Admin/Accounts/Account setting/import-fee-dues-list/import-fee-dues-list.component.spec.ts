import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFeeDuesListComponent } from './import-fee-dues-list.component';

describe('ImportFeeDuesListComponent', () => {
  let component: ImportFeeDuesListComponent;
  let fixture: ComponentFixture<ImportFeeDuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportFeeDuesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportFeeDuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

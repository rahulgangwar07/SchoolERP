import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationDownloadFormComponent } from './registration-download-form.component';

describe('RegistrationDownloadFormComponent', () => {
  let component: RegistrationDownloadFormComponent;
  let fixture: ComponentFixture<RegistrationDownloadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationDownloadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationDownloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

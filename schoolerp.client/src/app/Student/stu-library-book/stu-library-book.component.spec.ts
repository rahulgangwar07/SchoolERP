import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuLibraryBookComponent } from './stu-library-book.component';

describe('StuLibraryBookComponent', () => {
  let component: StuLibraryBookComponent;
  let fixture: ComponentFixture<StuLibraryBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuLibraryBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuLibraryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyDataSyncComponent } from './tally-data-sync.component';

describe('TallyDataSyncComponent', () => {
  let component: TallyDataSyncComponent;
  let fixture: ComponentFixture<TallyDataSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TallyDataSyncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallyDataSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

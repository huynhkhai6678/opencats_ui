import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentCallsComponent } from './dashboard-recent-calls.component';

describe('DashboardRecentCallsComponent', () => {
  let component: DashboardRecentCallsComponent;
  let fixture: ComponentFixture<DashboardRecentCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecentCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

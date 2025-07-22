import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHiringOverviewComponent } from './dashboard-hiring-overview.component';

describe('DashboardHiringOverviewComponent', () => {
  let component: DashboardHiringOverviewComponent;
  let fixture: ComponentFixture<DashboardHiringOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHiringOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHiringOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

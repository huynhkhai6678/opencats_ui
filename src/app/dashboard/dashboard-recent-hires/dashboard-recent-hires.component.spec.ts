import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentHiresComponent } from './dashboard-recent-hires.component';

describe('DashboardRecentHiresComponent', () => {
  let component: DashboardRecentHiresComponent;
  let fixture: ComponentFixture<DashboardRecentHiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentHiresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecentHiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

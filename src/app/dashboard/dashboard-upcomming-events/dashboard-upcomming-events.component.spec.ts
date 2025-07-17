import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpcommingEventsComponent } from './dashboard-upcomming-events.component';

describe('DashboardUpcommingEventsComponent', () => {
  let component: DashboardUpcommingEventsComponent;
  let fixture: ComponentFixture<DashboardUpcommingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUpcommingEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUpcommingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpcommingCallsComponent } from './dashboard-upcomming-calls.component';

describe('DashboardUpcommingCallsComponent', () => {
  let component: DashboardUpcommingCallsComponent;
  let fixture: ComponentFixture<DashboardUpcommingCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUpcommingCallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUpcommingCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

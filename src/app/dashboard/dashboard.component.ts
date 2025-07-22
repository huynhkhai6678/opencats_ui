import { Component } from '@angular/core';
import { DashboardRecentCallsComponent } from './dashboard-recent-calls/dashboard-recent-calls.component';
import { DashboardRecentHiresComponent } from './dashboard-recent-hires/dashboard-recent-hires.component';
import { DashboardUpcommingEventsComponent } from './dashboard-upcomming-events/dashboard-upcomming-events.component';
import { DashboardUpcommingCallsComponent } from './dashboard-upcomming-calls/dashboard-upcomming-calls.component';
import { DashboardHiringOverviewComponent } from './dashboard-hiring-overview/dashboard-hiring-overview.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardHiringOverviewComponent,
    DashboardRecentCallsComponent,
    DashboardRecentHiresComponent,
    DashboardUpcommingEventsComponent,
    DashboardUpcommingCallsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

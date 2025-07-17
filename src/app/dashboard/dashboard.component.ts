import { Component } from '@angular/core';
import { DashboardRecentCallsComponent } from './dashboard-recent-calls/dashboard-recent-calls.component';
import { DashboardRecentHiresComponent } from './dashboard-recent-hires/dashboard-recent-hires.component';
import { DashboardUpcommingEventsComponent } from './dashboard-upcomming-events/dashboard-upcomming-events.component';
import { DashboardUpcommingCallsComponent } from './dashboard-upcomming-calls/dashboard-upcomming-calls.component';

@Component({
  selector: 'app-dashboard',
  imports: [
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

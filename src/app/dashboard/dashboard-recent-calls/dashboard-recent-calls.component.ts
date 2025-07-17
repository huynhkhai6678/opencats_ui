import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CalendarEvent } from '../../calendar/calendar-event.model';

@Component({
  selector: 'app-dashboard-recent-calls',
  imports: [
    MessageModule,
    DatePipe,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './dashboard-recent-calls.component.html',
  styleUrl: './dashboard-recent-calls.component.scss'
})
export class DashboardRecentCallsComponent {
  readonly apiUrl = environment.apiUrl;
  events = httpResource<CalendarEvent[]>(
    () => {
      return `${this.apiUrl}dashboard/recent-calls`;
    },
    {
      parse: (response : any) => response.data
    }
  )
}

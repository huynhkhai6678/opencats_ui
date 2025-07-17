import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { CalendarEvent } from '../../calendar/calendar-event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-upcomming-events',
  imports: [
    MessageModule,
    TableModule,
    DatePipe
  ],
  templateUrl: './dashboard-upcomming-events.component.html',
  styleUrl: './dashboard-upcomming-events.component.scss'
})
export class DashboardUpcommingEventsComponent {
  readonly apiUrl = environment.apiUrl;
  events = httpResource<CalendarEvent[]>(
    () => {
      return `${this.apiUrl}dashboard/upcomming-events`;
    },
    {
      parse: (response : any) => response.data
    }
  )
}

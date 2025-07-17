import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CalendarEvent } from '../../calendar/calendar-event.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard-upcomming-calls',
  imports: [
    MessageModule,
    DatePipe,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './dashboard-upcomming-calls.component.html',
  styleUrl: './dashboard-upcomming-calls.component.scss'
})
export class DashboardUpcommingCallsComponent {
  readonly apiUrl = environment.apiUrl;
  events = httpResource<CalendarEvent[]>(
    () => {
      return `${this.apiUrl}dashboard/upcomming-calls`;
    },
    {
      parse: (response : any) => response.data
    }
  )
} 

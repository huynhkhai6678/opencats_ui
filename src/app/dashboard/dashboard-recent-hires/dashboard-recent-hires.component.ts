import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard-recent-hires',
  imports: [
    MessageModule,
    DatePipe,
    ButtonModule,
    TableModule
  ],
  templateUrl: './dashboard-recent-hires.component.html',
  styleUrl: './dashboard-recent-hires.component.scss'
})
export class DashboardRecentHiresComponent {
  readonly apiUrl = environment.apiUrl;
  events = httpResource<any[]>(
    () => {
      return `${this.apiUrl}dashboard/recent-hires`;
    },
    {
      parse: (response : any) => response.data
    }
  )
}

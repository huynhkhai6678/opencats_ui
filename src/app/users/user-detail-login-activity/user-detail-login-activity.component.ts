import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-detail-login-activity',
  imports: [
    DatePipe,
    ButtonModule,
    TableModule
  ],
  templateUrl: './user-detail-login-activity.component.html',
  styleUrl: './user-detail-login-activity.component.scss'
})
export class UserDetailLoginActivityComponent {
  readonly apiUrl = environment.apiUrl;
  userId = input<number>(0);
  activities = httpResource<any[]>(
    () => {
      if (this.userId() === 0) {
        return;
      }
      return `${this.apiUrl}users/${this.userId()}/activities`;
    },
    {
      parse: (response : any) => response.data
    }
  )
}

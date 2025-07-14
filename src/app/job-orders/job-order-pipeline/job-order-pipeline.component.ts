import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-order-pipeline',
  imports: [
    FormsModule,
    RatingModule,
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule
  ],
  templateUrl: './job-order-pipeline.component.html',
  styleUrl: './job-order-pipeline.component.scss'
})
export class JobOrderPipelineComponent {
  faTrash = faTrash;
  faPencil = faPencil;

  readonly apiUrl = environment.apiUrl;
  joborderId = input<number>(0);
  activities = httpResource<any[]>(
    () => {
      if (this.joborderId() === 0) {
        return;
      }
      return `${this.apiUrl}job-orders/${this.joborderId()}/pipelines`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  apiService = inject(ApiService);
  messageService = inject(MessageService);

  onRating(event : RatingRateEvent, id: number) {
    this.apiService.post(`candidate-joborder/${id}/update-rating`, { rating_value : event.value}).subscribe((res : any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
    });
  }

  create() {
    console.log('llll');
  }

  edit(id: number) {
    console.log('llll');
  }

  delete(id: number) {
    console.log('llll');
  }
}

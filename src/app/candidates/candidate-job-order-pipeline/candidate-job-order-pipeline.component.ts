import { Component, inject, input } from '@angular/core';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-candidate-job-order-pipeline',
  imports: [
    FormsModule,
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    RouterLink,
    RatingModule
  ],
  templateUrl: './candidate-job-order-pipeline.component.html',
  styleUrl: './candidate-job-order-pipeline.component.scss'
})
export class CandidateJobOrderPipelineComponent {
  faTrash = faTrash;
  faPencil = faPencil;
  readonly apiUrl = environment.apiUrl;
  candidateId = input<number>(0);
  activities = httpResource<any[]>(
    () => {
      if (this.candidateId() === 0) {
        return;
      }
      return `${this.apiUrl}candidates/${this.candidateId()}/pipelines`;
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

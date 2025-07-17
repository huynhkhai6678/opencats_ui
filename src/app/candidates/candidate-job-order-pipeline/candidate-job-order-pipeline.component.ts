import { Component, inject, input, ViewChild } from '@angular/core';
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
import { JobOrderPipelineModalComponent } from '../../job-orders/job-order-pipeline-modal/job-order-pipeline-modal.component';
import { BaseComponent } from '../../base/base.component';
import { PipelineModalComponent } from '../../shared/pipeline-modal/pipeline-modal.component';

@Component({
  selector: 'app-candidate-job-order-pipeline',
  imports: [
    FormsModule,
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    RouterLink,
    RatingModule,
    PipelineModalComponent,
    JobOrderPipelineModalComponent
  ],
  templateUrl: './candidate-job-order-pipeline.component.html',
  styleUrl: './candidate-job-order-pipeline.component.scss'
})
export class CandidateJobOrderPipelineComponent extends BaseComponent {
  readonly apiUrl = environment.apiUrl;
  override url = 'candidate-joborder';
  readonly faTrash = faTrash;
  readonly faPencil = faPencil;

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

  @ViewChild(JobOrderPipelineModalComponent) pipelineModal!: JobOrderPipelineModalComponent;
  @ViewChild(PipelineModalComponent) updatePipelineModal!: JobOrderPipelineModalComponent;

  onRating(event : RatingRateEvent, id: number) {
    this.apiService.post(`candidate-joborder/${id}/update-rating`, { rating_value : event.value}).subscribe((res : any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
    });
  }

  create() {
    this.pipelineModal.visible.set(true);
    this.pipelineModal.initFormData(false);
    this.pipelineModal.pipelineForm.controls['candidate_id'].setValue(Number(this.candidateId()));
  }

  edit(id: number) {
    this.updatePipelineModal.header.set('Update status pipeline');
    this.updatePipelineModal.visible.set(true);
    this.updatePipelineModal.id.set(id);
    this.updatePipelineModal.initFormData();
    this.updatePipelineModal.pipelineForm.controls['change_status'].setValue(true);
    this.updatePipelineModal.pipelineForm.controls['create_activity'].setValue(true);
  }

  deletePipeline(event: Event, id: number) {
    this.id.set(id);
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.reload();
    });
  }

  reload() {
    this.activities.reload();
  }
}

import { DatePipe } from '@angular/common';
import { Component, inject, input, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { JobOrderPipelineModalComponent } from '../job-order-pipeline-modal/job-order-pipeline-modal.component';
import { BaseComponent } from '../../base/base.component';
import { PipelineModalComponent } from '../../shared/pipeline-modal/pipeline-modal.component';

@Component({
  selector: 'app-job-order-pipeline',
  imports: [
    FormsModule,
    RatingModule,
    DatePipe,
    ButtonModule,
    TableModule,
    FontAwesomeModule,
    PipelineModalComponent,
    JobOrderPipelineModalComponent
  ],
  templateUrl: './job-order-pipeline.component.html',
  styleUrl: './job-order-pipeline.component.scss'
})
export class JobOrderPipelineComponent extends BaseComponent {
  override url = 'candidate-joborder';
  faTrash = faTrash;
  faPencil = faPencil;

  readonly apiUrl = environment.apiUrl;
  joborderId = input<number>(0);
  pipelines = httpResource<any[]>(
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

  @ViewChild(JobOrderPipelineModalComponent) createPipelineModal!: JobOrderPipelineModalComponent;
  @ViewChild(PipelineModalComponent) updatePipelineModal!: JobOrderPipelineModalComponent;

  onRating(event : RatingRateEvent, id: number) {
    this.apiService.post(`candidate-joborder/${id}/update-rating`, { rating_value : event.value}).subscribe((res : any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
    });
  }

  create() {
    this.createPipelineModal.visible.set(true);
    this.createPipelineModal.initFormData();
    this.createPipelineModal.pipelineForm.controls['joborder_id'].setValue(Number(this.joborderId()));
  }

  edit(id: number) {
    this.updatePipelineModal.header.set('Update status pipeline');
    this.updatePipelineModal.visible.set(true);
    this.updatePipelineModal.id.set(id);
    this.updatePipelineModal.initFormData();
    this.updatePipelineModal.pipelineForm.controls['change_status'].setValue(true);
    this.updatePipelineModal.pipelineForm.controls['create_activity'].setValue(true);
  }

  deletePipeline(event : Event, id: number) {
    this.id.set(id);
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.reload();
    });
  }

  reload() {
    this.pipelines.reload();
  }
}

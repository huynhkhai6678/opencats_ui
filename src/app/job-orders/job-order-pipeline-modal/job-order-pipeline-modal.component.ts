import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Candidate } from '../../candidates/candidate.model';
import { BaseComponent } from '../../base/base.component';
import { JobOrder } from '../job-order.model';

@Component({
  selector: 'app-job-order-pipeline-modal',
  imports: [
    MessageModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './job-order-pipeline-modal.component.html',
  styleUrl: './job-order-pipeline-modal.component.scss'
})
export class JobOrderPipelineModalComponent extends BaseComponent implements OnInit {
  override url = 'pipelines';
  candidates = signal<Candidate[]>([]);
  joborders = signal<JobOrder[]>([]);
  isJobOrder = signal<boolean>(true);

  pipelineForm! : FormGroup;
  visible = model<boolean>(false);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.pipelineForm = this.fb.group({
      status: [100, []],
      candidate_id: [0, [Validators.required]],
      joborder_id: ['', [Validators.required]],
    });
  }

  initFormData(isJoborder = true) {
    this.isJobOrder.set(isJoborder);
    if (isJoborder) {
      this.apiService.get('candidates/get-selection').subscribe((res : any) => {
        this.candidates.set(res['data']);
      });
    } else {
      this.apiService.get('job-orders/get-selection').subscribe((res: any) => {
        this.joborders.set(res['data']);
        const data = res['data'];
        this.joborders.set(data.map((item : any) => ({
          joborder_id: item.joborder_id,
          full_name: `${item.title} - ${item.company?.name || ''}`
        })));
      })
    }
    this.pipelineForm.controls['status'].setValue(100);
  }

  override onSubmit(valid : boolean, value : any) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.apiService.post('candidate-joborder', value).subscribe((res: any) => {
      this.isSubmitted = false;
      this.pipelineForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: res['message'] });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}

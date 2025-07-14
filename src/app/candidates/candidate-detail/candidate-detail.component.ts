import { Component, inject, signal, ViewChild } from '@angular/core';
import { CandidateModalComponent } from '../candidate-modal/candidate-modal.component';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate.model';
import { BaseComponent } from '../../base/base.component';
import { AttachmentComponent } from '../../shared/attachment/attachment.component';
import { CandidateJobOrderPipelineComponent } from '../candidate-job-order-pipeline/candidate-job-order-pipeline.component';
import { CandidateActivitiesComponent } from '../candidate-activities/candidate-activities.component';

@Component({
  selector: 'app-candidate-detail',
  imports: [
    CandidateModalComponent,
    AttachmentComponent,
    ButtonModule,
    DatePipe,
    CandidateJobOrderPipelineComponent,
    CandidateActivitiesComponent
  ],
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.scss'
})
export class CandidateDetailComponent extends BaseComponent {
  @ViewChild(CandidateModalComponent) jobOrderModal!: CandidateModalComponent;

  override url = 'candidates';
  override id = signal<number>(0);
  data = signal<Candidate | null>(null);

  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      this.id.set(params['id']);
      this.getData();
    });
  }

  getData() {
    this.apiService.get(`${this.url}/${this.id()}/detail`).subscribe((res : any)=> {
      this.data.set(res['data']);
    });
  }

  edit() {
    this.jobOrderModal.visible.set(true);
    this.jobOrderModal.id.set(this.id());
    this.jobOrderModal.initFormData();
  }

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.router.navigate(['home/candidates']);
    });
  }
}

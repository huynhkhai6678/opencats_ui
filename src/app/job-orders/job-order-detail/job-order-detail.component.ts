import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { JobOrderModalComponent } from '../job-order-modal/job-order-modal.component';
import { JobOrder } from '../job-order.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { AttachmentComponent } from '../../shared/attachment/attachment.component';

@Component({
  selector: 'app-job-order-detail',
  imports: [
    RouterLink,
    DatePipe,
    ButtonModule,
    AttachmentComponent,
    JobOrderModalComponent
  ],
  templateUrl: './job-order-detail.component.html',
  styleUrl: './job-order-detail.component.scss'
})
export class JobOrderDetailComponent extends BaseComponent implements OnInit {
  
  @ViewChild(JobOrderModalComponent) jobOrderModal!: JobOrderModalComponent;

  override url = 'job-orders';
  override id = signal<number>(0);
  data = signal<JobOrder | null>(null);

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
      this.router.navigate(['home/job-orders']);
    });
  }
}

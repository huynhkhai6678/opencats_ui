import { Component, input, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { httpResource } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { JobOrderModalComponent } from '../../../job-orders/job-order-modal/job-order-modal.component';

@Component({
  selector: 'app-company-detail-job-order',
  imports: [
    FontAwesomeModule,
    DatePipe,
    RouterLink,
    ButtonModule,
    TableModule,
    JobOrderModalComponent
  ],
  templateUrl: './company-detail-job-order.component.html',
  styleUrl: './company-detail-job-order.component.scss'
})
export class CompanyDetailJobOrderComponent {
  readonly apiUrl = environment.apiUrl;
  readonly faPencilAlt = faPencilAlt;

  @ViewChild(JobOrderModalComponent) jobOrderModal!: JobOrderModalComponent;

  companyId = input<number>(0);
  jobOrders = httpResource<any[]>(
    () => {
      if (this.companyId() === 0) {
        return;
      }
      return `${this.apiUrl}companies/${this.companyId()}/job-orders`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  openEditJobOrder(id: number) {
    this.jobOrderModal.id.set(id);
    this.jobOrderModal.header.set('Edit Job Order');
    this.jobOrderModal.visible.set(true);
    this.jobOrderModal.initFormData();
  }
}

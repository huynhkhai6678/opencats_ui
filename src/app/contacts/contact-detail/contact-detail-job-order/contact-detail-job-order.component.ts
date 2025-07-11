import { DatePipe } from '@angular/common';
import { Component, input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { JobOrderModalComponent } from '../../../job-orders/job-order-modal/job-order-modal.component';
import { environment } from '../../../../environments/environment';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-contact-detail-job-order',
  imports: [
    FontAwesomeModule,
    DatePipe,
    RouterLink,
    ButtonModule,
    TableModule,
    JobOrderModalComponent
  ],
  templateUrl: './contact-detail-job-order.component.html',
  styleUrl: './contact-detail-job-order.component.scss'
})
export class ContactDetailJobOrderComponent {
  readonly apiUrl = environment.apiUrl;
  readonly faPencilAlt = faPencilAlt;

  @ViewChild(JobOrderModalComponent) jobOrderModal!: JobOrderModalComponent;

  companyId = input<number>(0);
  jobOrders = httpResource<any[]>(
    () => {
      if (this.companyId() === 0) {
        return;
      }
      return `${this.apiUrl}contacts/${this.companyId()}/job-orders`;
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

import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { JobOrderModalComponent } from './job-order-modal/job-order-modal.component';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-orders',
  imports: [
    RouterLink,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    JobOrderModalComponent,
    DatePipe
  ],
  templateUrl: './job-orders.component.html',
  styleUrl: './job-orders.component.scss'
})
export class JobOrdersComponent {
  records: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  apiService = inject(ApiService);

  @ViewChild(JobOrderModalComponent) jobOrderModal!: JobOrderModalComponent;

  ngOnInit(): void {
    this.lastEvent = {
      first: 0,
      rows: 10,
      sortField: 'company_id',
      sortOrder: 1,
      globalFilter: ''
    };
  }

  loadData(event: any) {
    this.loading = true;

    const page = event.first! / event.rows!;
    const size = event.rows!;
    const sortField = event.sortField || 'company_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';

    this.apiService.getPaginatedData('job-orders', { page, size, sortField, sortOrder, filter }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }

  create() {
    this.jobOrderModal.header.set('Create job order');
    this.jobOrderModal.visible.set(true);
    this.jobOrderModal.initFormData();
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }
}

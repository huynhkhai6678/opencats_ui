import { Component, inject, input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { JobOrder } from '../../../job-orders/job-order.model';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-detail-job-order',
  imports: [
    TableModule,
    DatePipe,
    RouterLink,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './list-detail-job-order.component.html',
  styleUrl: './list-detail-job-order.component.scss'
})
export class ListDetailJobOrderComponent {
  records: JobOrder[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  id = input.required<number>();
  apiService = inject(ApiService);

  ngOnInit(): void {
    this.lastEvent = {
      first: 0,
      rows: 10,
      sortField: 'date_created',
      sortOrder: 1,
      globalFilter: ''
    };
  }

  loadData(event: any) {
    this.loading = true;

    const page = event.first! / event.rows!;
    const size = event.rows!;
    const sortField = event.sortField || 'activity_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';

    this.apiService.getPaginatedData(`list-entries/${this.id()}/job-order`, { page, size, sortField, sortOrder, filter }).subscribe(res => {
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

  reloadTable() {
    this.loadData(this.lastEvent);
  }
}

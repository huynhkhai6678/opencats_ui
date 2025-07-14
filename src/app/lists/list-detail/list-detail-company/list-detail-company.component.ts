import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Company } from '../../../companies/company-detail/company.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-list-detail-company',
  imports: [
    TableModule,
    DatePipe,
    RouterLink,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './list-detail-company.component.html',
  styleUrl: './list-detail-company.component.scss'
})
export class ListDetailCompanyComponent {
  records: Company[] = [];
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

    this.apiService.getPaginatedData(`list-entries/${this.id()}/company`, { page, size, sortField, sortOrder, filter }).subscribe(res => {
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

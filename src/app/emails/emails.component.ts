import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EmailTemplate } from './email.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-emails',
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
  ],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent implements OnInit {
  records: EmailTemplate[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

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
    const sortField = event.sortField || 'email_template_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';

    this.apiService.getPaginatedData('emails', { page, size, sortField, sortOrder, filter }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }
}

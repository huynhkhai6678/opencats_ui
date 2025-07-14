import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Activity } from '../activities/activity.model';
import { ApiService } from '../services/api.service';
import { ListModalComponent } from './list-modal/list-modal.component';

@Component({
  selector: 'app-lists',
  imports: [
    TableModule,
    DatePipe,
    RouterLink,
    InputTextModule,
    ButtonModule,
    ListModalComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {
  records: Activity[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  apiService = inject(ApiService);

  @ViewChild(ListModalComponent) listModal!: ListModalComponent;

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

    this.apiService.getPaginatedData('lists', { page, size, sortField, sortOrder, filter }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  create() {
    this.listModal.header.set('Add Candidate');
    this.listModal.visible.set(true);
    this.listModal.initFormData();
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }
}

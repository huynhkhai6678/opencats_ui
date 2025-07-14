import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { UserDetail } from './user-detail.model';
import { ApiService } from '../services/api.service';
import { UserModalComponent } from './user-modal/user-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    RouterLink,
    FormsModule,
    TableModule,
    DatePipe,
    ButtonModule,
    SelectModule,
    InputTextModule,
    UserModalComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  records: UserDetail[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  apiService = inject(ApiService);
  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

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
    const sortField = event.sortField || 'user_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';

    this.apiService.getPaginatedData('users', { page, size, sortField, sortOrder, filter }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  create() {
    this.userModal.header.set('Create user');
    this.userModal.visible.set(true);
    this.userModal.initFormData();
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }
}

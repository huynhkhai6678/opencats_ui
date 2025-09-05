import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';
import { UserLogin } from './login-activity.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-login-activities',
  imports: [
    FormsModule,
    TableModule,
    DatePipe,
    BadgeModule,
    ButtonModule,
    SelectModule,
    InputTextModule
  ],
  templateUrl: './login-activities.component.html',
  styleUrl: './login-activities.component.scss'
})
export class LoginActivitiesComponent {
  records: UserLogin[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  statusValues = signal<{name: string; value: number | null}[]>([
    {
      name: 'All',
      value: null
    },
    {
      name: 'Login successfully',
      value: 1
    },
    {
      name: 'Login unsuccessfully',
      value: 0
    }
  ]);

  apiService = inject(ApiService);
  filterOptions = {
    successful: null,
  }

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
    const filterOptions = this.filterOptions;

    this.apiService.getPaginatedData('login-activities', { page, size, sortField, sortOrder, filter, filterOptions }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  onFilterChange(event : SelectChangeEvent) {
   this.loadData({ ...this.lastEvent, filterOptions: this.filterOptions });
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }
}

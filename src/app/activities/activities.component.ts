import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Activity } from './activity.model';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import moment from 'moment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activities',
  imports: [
    FormsModule,
    CommonModule,
    TableModule,
    DatePipe,
    RouterLink,
    SelectModule,
    InputTextModule,
    ButtonModule,
    SafeHtmlPipe    
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  records: Activity[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  filterDate : string[] = [];
  dateOptions = signal<{name: string; value: string[]}[]>([]);

  apiService = inject(ApiService);

  ngOnInit(): void {
    this.lastEvent = {
      first: 0,
      rows: 10,
      sortField: 'date_created',
      sortOrder: 1,
      globalFilter: ''
    };

    this.generateDateFilter();
  }

  loadData(event: any) {
    this.loading = true;

    const today = moment();
    const thisMonthStart = today.clone().startOf('month');
    const thisMonthEnd = today.clone().endOf('month');

    const page = event.first! / event.rows!;
    const size = event.rows!;
    const sortField = event.sortField || 'activity_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';  
    const startDate = event.startDate === undefined ? thisMonthStart.toISOString() :  event.startDate;
    const endDate = event.endDate === undefined ? thisMonthEnd.toISOString() : event.endDate;

    this.apiService.getPaginatedData('activities', { page, size, sortField, sortOrder, filter, startDate, endDate }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.lastEvent = event;
      this.loading = false;
    });
  }

  onDateChange(event : SelectChangeEvent) {
    const value = event.value;
    this.loadData({ ...this.lastEvent, startDate: value[0], endDate: value[1] });
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }

  generateDateFilter() {
    const today = moment();

    // Yesterday (start of day to end of day)
    const yesterdayStart = today.clone().subtract(1, 'days').startOf('day');
    const yesterdayEnd = today.clone().subtract(1, 'days').endOf('day');

    // Last Week (7 days ago)
    const lastWeekStart = today.clone().subtract(7, 'days').startOf('day');
    const lastWeekEnd = today.clone().subtract(7, 'days').endOf('day');

    // This Month (from the 1st to today)
    const thisMonthStart = today.clone().startOf('month');
    const thisMonthEnd = today.clone().endOf('month');

    // Last Month (entire previous month)
    const lastMonthStart = today.clone().subtract(1, 'months').startOf('month');
    const lastMonthEnd = today.clone().subtract(1, 'months').endOf('month');

    // Last 6 Months
    const lastSixMonthsStart = today.clone().subtract(6, 'months').startOf('day');
    const lastSixMonthsEnd = today.clone().endOf('day');

    this.filterDate = [thisMonthStart.toISOString(), thisMonthEnd.toISOString()];
    this.lastEvent.startDate = thisMonthStart.toISOString();
    this.lastEvent.endDate = thisMonthEnd.toISOString();

    this.dateOptions.set([
      {
        name: 'Today',
        value: [today.startOf('day').toISOString(), today.endOf('day').toISOString()]
      },
      {
        name: 'Yesterday',
        value: [yesterdayStart.toISOString(), yesterdayEnd.toISOString()]
      },
      {
        name: 'Last week',
        value: [lastWeekStart.toISOString(), lastWeekEnd.toISOString()]
      },
      {
        name: 'This month',
        value: [thisMonthStart.toISOString(), thisMonthEnd.toISOString()]
      },
      {
        name: 'Last month',
        value: [lastMonthStart.toISOString(), lastMonthEnd.toISOString()]
      },
      {
        name: 'Last 6 month',
        value: [lastSixMonthsStart.toISOString(), lastSixMonthsEnd.toISOString()]
      },
      {
        name: 'All',
        value: ['', '']
      }
    ])
  }
}

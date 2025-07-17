import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BaseComponent } from '../base/base.component';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-headhunts',
  imports: [
    FormsModule,
    RouterLink,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToggleSwitchModule,
    DatePipe
  ],
  templateUrl: './headhunts.component.html',
  styleUrl: './headhunts.component.scss'
})
export class HeadhuntsComponent extends BaseComponent implements OnInit {
  records: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

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

    this.apiService.getPaginatedData('headhunts', { page, size, sortField, sortOrder, filter }).subscribe(res => {
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

  changeValue(event : ToggleSwitchChangeEvent, id: number) {
    this.apiService.post(`headhunts/${id}/update-verified`, { 
      checked : event.checked
    }).subscribe((response : any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response['message'] });
    });
  }
}

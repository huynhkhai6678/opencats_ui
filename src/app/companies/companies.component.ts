import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';
import { ButtonModule } from 'primeng/button';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-companies',
  imports: [
    FormsModule,
    RouterLink,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    CompanyModalComponent,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  readonly faPaperclip = faPaperclip;

  records: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  apiService = inject(ApiService);

  @ViewChild(CompanyModalComponent) companyModal!: CompanyModalComponent;
  filterOptions = {
    is_my_company: false,
    is_hot_company: false,
  }

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
    const filterOptions = this.filterOptions;

    this.apiService.getPaginatedData('companies', { page, size, sortField, sortOrder, filter, filterOptions }).subscribe(res => {
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
    this.companyModal.visible.set(true);
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }

  setFilter() {
    this.loadData({ ...this.lastEvent, filterOptions: this.filterOptions });
  }

  export() {
    this.apiService.downloadFile('companies/export').subscribe(
      (fileBlob: any) => {
        saveAs(fileBlob, 'companies.csv');
      }
    );
  }
}

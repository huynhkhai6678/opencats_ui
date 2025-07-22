import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CandidateModalComponent } from './candidate-modal/candidate-modal.component';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-candidates',
  imports: [
    RouterLink,
    FormsModule,
    FontAwesomeModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    DatePipe,
    CandidateModalComponent
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit {
  readonly faPaperclip = faPaperclip;

  records: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  apiService = inject(ApiService);
  filterOptions = {
    is_my_company: false,
    is_hot_company: false,
  }

  @ViewChild(CandidateModalComponent) candidateModal!: CandidateModalComponent;

  ngOnInit(): void {
    this.lastEvent = {
      first: 0,
      rows: 10,
      sortField: 'candidate_id',
      sortOrder: 1,
      globalFilter: ''
    };
  }

  loadData(event: any) {
    this.loading = true;

    const page = event.first! / event.rows!;
    const size = event.rows!;
    const sortField = event.sortField || 'candidate_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';
    const filterOptions = this.filterOptions;

    this.apiService.getPaginatedData('candidates', { page, size, sortField, sortOrder, filter, filterOptions }).subscribe(res => {
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
    this.candidateModal.header.set('Add Candidate');
    this.candidateModal.visible.set(true);
    this.candidateModal.initFormData();
  }

  reloadTable() {
    this.loadData(this.lastEvent);
  }

  setFilter() {
    this.loadData({ ...this.lastEvent, filterOptions: this.filterOptions });
  }
  
  export() {
    this.apiService.downloadFile('candidates/export').subscribe(
      (fileBlob: any) => {
        saveAs(fileBlob, 'candidates.csv');
      }
    );
  }
}

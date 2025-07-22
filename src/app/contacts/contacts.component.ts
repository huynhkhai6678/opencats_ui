import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApiService } from '../services/api.service';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contacts',
  imports: [
    DatePipe,
    RouterLink,
    FontAwesomeModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    ContactModalComponent
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  readonly faPaperclip = faPaperclip;

  records: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;
  currentLazyLoadEvent = null;

  apiService = inject(ApiService);

  @ViewChild(ContactModalComponent) contactModal!: ContactModalComponent;

  ngOnInit(): void {
    this.lastEvent = {
      first: 0,
      rows: 10,
      sortField: 'contact_id',
      sortOrder: 1,
      globalFilter: ''
    };
  }

  loadData(event: any) {
    this.loading = true;

    const page = event.first! / event.rows!;
    const size = event.rows!;
    const sortField = event.sortField || 'contact_id';
    const sortOrder = event.sortOrder === 1 ? 'desc' : 'asc';
    const filter = event.globalFilter || '';

    this.apiService.getPaginatedData('contacts', { page, size, sortField, sortOrder, filter }).subscribe(res => {
      this.records = res.data;
      this.totalRecords = res.total;
      this.currentLazyLoadEvent = event;
      this.loading = false;
    });
  }

  onGlobalFilter(event: any) {
    const value = event.target.value;
    this.loadData({ ...this.lastEvent, globalFilter: value });
  }

  create() {
    this.contactModal.visible.set(true);
    this.contactModal.initFormData();
  }

  reloadTable() {
    this.loadData(this.currentLazyLoadEvent);
  }

  export() {
    this.apiService.downloadFile('contacts/export').subscribe(
      (fileBlob: any) => {
        saveAs(fileBlob, 'contacts.csv');
      }
    );
  }
}

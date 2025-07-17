import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { EmailTemplate } from './email.model';
import { ApiService } from '../services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-emails',
  imports: [
    ButtonModule,
    TableModule,
    InputTextModule,
    FontAwesomeModule,
    EmailModalComponent
  ],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent extends BaseComponent implements OnInit {
  readonly faTrash = faTrash;
  readonly faPencil = faPencil;

  records: EmailTemplate[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  lastEvent : any = null;

  @ViewChild(EmailModalComponent) emailModal!: EmailModalComponent;

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

   edit(id: number) {
    this.emailModal.header.set('Update email template');
    this.emailModal.visible.set(true);
    this.emailModal.id.set(id);
    this.emailModal.initFormData();
  }

  deleteEmail(event : Event, id: number) {
    this.id.set(id);
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.reload();
    });
  }

  reload() {
    this.loadData(this.lastEvent);
  }
}

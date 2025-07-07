import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Company } from './company.model';
import { DatePipe } from '@angular/common';
import { CompanyDetailContactComponent } from './company-detail-contact/company-detail-contact.component';
import { ButtonModule } from 'primeng/button';
import { CompanyModalComponent } from '../company-modal/company-modal.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-company-detail',
  imports: [
    DatePipe,
    ButtonModule,
    RouterModule,
    CompanyModalComponent,
    ConfirmDialogModule,
    ToastModule,
    CompanyDetailContactComponent
  ],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(CompanyModalComponent) companyModal!: CompanyModalComponent;

  override url = 'companies';
  override id = signal<number>(0);
  data = signal<Company | null>(null);

  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      this.id.set(params['id']);
      this.getData();
    });
  }

  getData() {
    this.apiService.get(`${this.url}/${this.id()}`).subscribe((res : any)=> {
      this.data.set(res['data']);
    });
  }

  edit() {
    this.companyModal.visible.set(true);
    this.companyModal.id.set(this.id());
    this.companyModal.initDataForEdit();
  }

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.router.navigate(['home/companies']);
    });
  }
}

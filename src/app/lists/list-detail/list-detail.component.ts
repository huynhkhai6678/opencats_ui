import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ListModalComponent } from '../list-modal/list-modal.component';
import { ApiService } from '../../services/api.service';
import { ListDetailCandidateComponent } from './list-detail-candidate/list-detail-candidate.component';
import { DATA_ITEM_TYPE } from '../list-type.constant';
import { ListDetailCompanyComponent } from './list-detail-company/list-detail-company.component';
import { ListDetailContactComponent } from './list-detail-contact/list-detail-contact.component';
import { ListDetailJobOrderComponent } from './list-detail-job-order/list-detail-job-order.component';
import { SavedList } from './list.model';

@Component({
  selector: 'app-list-detail',
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    ListModalComponent,
    ListDetailCandidateComponent,
    ListDetailCompanyComponent,
    ListDetailContactComponent,
    ListDetailJobOrderComponent
  ],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.scss'
})
export class ListDetailComponent implements OnInit {
  id = signal<number>(0);
  list = signal<SavedList | null>(null);

  DATA_ITEM_TYPE = DATA_ITEM_TYPE;

  apiService = inject(ApiService);
  activatedRoute = inject(ActivatedRoute);

  @ViewChild(ListModalComponent) listModal!: ListModalComponent;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(params['id']);

      this.apiService.get(`lists/${this.id()}/details`).subscribe((res : any) => {
        this.list.set(res['data']);
      });
    })
  }

  create() {
    this.listModal.header.set('Add Candidate');
    this.listModal.visible.set(true);
    this.listModal.initFormData();
  }

  reloadTable() {
    console.log(this.reloadTable)
  }
}

import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { BaseComponent } from '../../base/base.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../company.model';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact-detail',
  imports: [
    ContactModalComponent,
    DatePipe,
    RouterLink,
    ButtonModule
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent extends BaseComponent implements OnInit {
  @ViewChild(ContactModalComponent) contactModal!: ContactModalComponent;

  override url = 'contacts';
  override id = signal<number>(0);
  data = signal<Contact | null>(null);

  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      this.id.set(params['id']);
      this.getData();
    });
  }

  getData() {
    this.apiService.get(`${this.url}/${this.id()}/detail`).subscribe((res : any)=> {
      this.data.set(res['data']);
    });
  }

  edit() {
    this.contactModal.visible.set(true);
    this.contactModal.id.set(this.id());
    this.contactModal.header.set('Edit Contact');
    this.contactModal.initFormData();
  }

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.router.navigate(['home/contacts']);
    });
  }
}

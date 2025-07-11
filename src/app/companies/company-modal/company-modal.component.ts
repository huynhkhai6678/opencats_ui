import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { BaseComponent } from '../../base/base.component';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { SelectOption } from '../../model/select.model';

@Component({
  selector: 'app-company-modal',
  imports: [
    MessageModule,
    CheckboxModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './company-modal.component.html',
  styleUrl: './company-modal.component.scss'
})
export class CompanyModalComponent extends BaseComponent implements OnInit {
  override url = 'companies';
  companyForm! : FormGroup;
  visible = model<boolean>(false);

  ownerList = signal<SelectOption[]>([]);
  contactList = signal<SelectOption[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      phone1: [''],
      phone2: [''],
      fax_number: [''],
      address: [''],
      city: [''],
      state: [''],
      url: [''],
      zip: [''],
      company_department_id: [''],
      notes: [''],
      key_technologies : [''],
      is_hot: [0],
      billing_contact: [-1],
      owner: [null]
    });
  }

  initDataForEdit() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      if(response['data']) {
        this.companyForm.patchValue(response['data']);

        const listOnwer = response['owner_list'];
        this.ownerList.set(listOnwer.map((item : any)=> { 
          return {
            label : item.first_name + ' ' + item.last_name,
            value : item.user_id
        }}));

        let listContact = response['contact_list'];
        listContact = listContact.map((item : any)=> { 
          return {
            label : item.first_name + ' ' + item.last_name,
            value : item.contact_id
        }});

        this.contactList.set(listContact);
      }
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.companyForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}

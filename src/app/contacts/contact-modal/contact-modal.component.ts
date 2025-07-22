import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Company } from '../../companies/company-detail/company.model';
import { SelectOption } from '../../model/select.model';
import { CompanyDepartment } from '../../model/company-department.model';

@Component({
  selector: 'app-contact-modal',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    DialogModule,
    SelectModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TextareaModule
  ],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent extends BaseComponent implements OnInit {
  override url = 'contacts';
  companyForm! : FormGroup;
  visible = model<boolean>(false);

  companyList = signal<Company[]>([]);
  reportList = signal<SelectOption[]>([]);
  departmentList = signal<CompanyDepartment[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      company_id: [1, [Validators.required]],
      title : ['', [Validators.required]],
      company_department_id : [0],
      reports_to: [null],
      is_hot : [0],
      email1 : ['', [Validators.email]],
      email2 : ['', [Validators.email]],
      phone_work : [''],
      phone_cell : [''],
      phone_other : [''],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      notes: [''],
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      if(response['data']) {
        this.companyForm.patchValue(response['data']);
      }
      this.companyList.set(response['companies']);
      this.initDepartmentAndReportList(response);
    });
  }

  initDepartmentAndReportList(response : any) {
    this.departmentList.set(response['departments']);

    let listContact = response['reports'] || [];
    this.reportList.set(listContact.map((item : any)=> { 
      return {
        label : item.last_name + ', ' + item.first_name,
        value : item.contact_id
    }}));
  }

  changeCompany(event : SelectChangeEvent) {
    this.apiService.get(`${this.url}/${event.value}/company-contact`).subscribe((res : any) => {
      this.initDepartmentAndReportList(res);
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.resetForm();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }

  resetForm() {
    this.companyForm.reset();
    this.companyForm.controls['company_department_id'].setValue(0);
    this.companyForm.controls['is_hot'].setValue(0);
    this.companyForm.controls['company_id'].setValue(1);
  }
}

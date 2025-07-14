import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { EditorModule } from 'primeng/editor';
import { BaseComponent } from '../../base/base.component';
import { SelectOption } from '../../model/select.model';
import { DatePickerModule } from 'primeng/datepicker';
import { Company } from '../../companies/company-detail/company.model';
import { CompanyDepartment } from '../../model/company-department.model';
import { JobCategory } from '../../model/job-category.model';
import { User } from '../../model/user.model';
import moment from 'moment';

@Component({
  selector: 'app-job-order-modal',
  imports: [
    MessageModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    EditorModule,
    DatePickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './job-order-modal.component.html',
  styleUrl: './job-order-modal.component.scss'
})
export class JobOrderModalComponent extends BaseComponent implements OnInit {
  override url = 'job-orders';
  jobOrderForm! : FormGroup;
  visible = model<boolean>(false);

  ownerList = signal<SelectOption[]>([]);
  contactList = signal<SelectOption[]>([]);
  types = signal<SelectOption[]>([
    {
      value: 'C',
      label: 'Project/Contract'
    },
    {
      value: 'FT',
      label: 'Full-time'
    },
    {
      value: 'FTR',
      label: 'Full-time Remote'
    },
    {
      value: 'PT',
      label: 'Part-time'
    }
  ]);
  companies = signal<Company[]>([]);
  departments = signal<CompanyDepartment[]>([]);
  categories = signal<JobCategory[]>([]);
  users = signal<User[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.jobOrderForm = this.fb.group({
      title: ['', [Validators.required]],
      company_id: [1, [Validators.required]],
      company_department_id: ['', []],
      recruiter: [1, [Validators.required]],
      owner: [1, [Validators.required]],
      duration: [''],
      start_date: ['', [Validators.required]],
      job_category: [''],
      salary: [''],
      type: [''],
      rate_max: [''],
      openings: [1],
      client_job_id: [''],
      commission: [''],
      is_hot: [0],
      contact_id: [0],
      city: [''],
      state: [''],
      brief_description: [''],
      description: [''],
      notes: ['']
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      this.companies.set(response['companies']);
      this.departments.set(response['departments']);
      this.categories.set(response['categories']);
      this.users.set(response['users']);

      let listContact = response['contacts'];
      this.contactList.set(listContact.map((item : any)=> { 
        return {
          label : item.first_name + ' ' + item.last_name,
          value : item.contact_id
      }}));

      let userList = response['users'];
      this.users.set(userList.map((item : any)=> { 
        return {
          label : item.first_name + ' ' + item.last_name,
          value : item.user_id
      }}));

      if(response['data']) {
        let jobOrder = response['data'];
        jobOrder.start_date = moment(jobOrder.start_date).toDate();
        this.jobOrderForm.patchValue(jobOrder);
      }
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.jobOrderForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}

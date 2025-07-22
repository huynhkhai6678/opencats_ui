import { Component, EventEmitter, inject, model, Output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { CandidateSource } from '../../model/candidate-source.model';
import * as pdfjsLib from 'pdfjs-dist';
import moment from 'moment';

@Component({
  selector: 'app-candidate-modal',
  imports: [
    MessageModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FileUploadModule
  ],
  templateUrl: './candidate-modal.component.html',
  styleUrl: './candidate-modal.component.scss'
})
export class CandidateModalComponent extends BaseComponent {
  override url = 'candidates';
  candidateForm! : FormGroup;
  visible = model<boolean>(false);

  languages = signal<{name: string}[]>([
    {
      name: 'Vietnamese'
    },
    {
      name: 'Japanese'
    },
    {
      name: 'English'
    },
    {
      name: 'French'
    },
    {
      name: 'Korean'
    }
  ]);
  sources = signal<CandidateSource[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  constructor() {
    super();
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      web_site: [''],
      phone_work: ['', [Validators.required]],
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      best_time_to_call: [''],
      job_title: ['', [Validators.required]],
      exp_years: [''],
      can_relocate: [0],
      date_available: [''],
      current_employer: [''],
      current_pay: [''],
      desired_pay: [''],
      language: [['Vietnamese']],
      source: [''],
      key_skills: ['', [Validators.required]],
      notes: [''],
      file: [null],
      file_content: ['']
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      if(response['data']) {
        let candidate = response['data'];
        candidate.language = candidate.language.split(',');
        candidate.date_available = moment(candidate.date_available).format('DD/MM/YYYY');
        this.candidateForm.patchValue(candidate);
      }

      this.sources.set(response['sources']);
    });
  }

  override onSubmit(valid : boolean, value : any) {
    this.formService.checkInvalidFields(this.candidateForm);
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    if (this.id()) {
      value.language = value.language.join(',');
      this.formService.submitForm('candidates', this.id(), value).subscribe({
        next : (response) => {
          this.onSubmitSuccess(response.message);
        }
      })
    } else {
      this.formService.submitFormWithFile('candidates', this.id(), value).subscribe({
        next : (response) => {
          this.onSubmitSuccess(response.message);
        }
      })
    }
  }

  onSubmitSuccess(message : string) {
    this.isSubmitted = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    this.visible.set(false);
    this.resetForm();
    this.reloadTable.emit(true);
  }

  resetForm() {
    this.candidateForm.reset();
    this.candidateForm.controls['language'].setValue(['Vietnamese']);
    this.candidateForm.controls['exp_years'].setValue('');
    this.candidateForm.controls['can_relocate'].setValue(0);
  }

  onUpload(event : FileSelectEvent) {
    const file: File = event.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();

      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          text += strings.join(' ') + '\n';
        }

        this.candidateForm.controls['file'].setValue(file);
        this.candidateForm.controls['file_content'].setValue(text);
      };

      reader.readAsArrayBuffer(file);
    }
  }
}

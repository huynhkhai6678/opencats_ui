import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-base',
  imports: [],
  template: '',
})
export class BaseComponent {
  isSubmitted = false;
  url = '';
  title = '';
  id = signal<number>(0);
  header = signal<string>('');

  readonly apiService = inject(ApiService);
  readonly formService = inject(FormService);
  readonly confirmationService = inject(ConfirmationService);
  readonly messageService = inject(MessageService);

  onSubmit(
    valid : boolean,
    value : any,
    onSubmitCallback? : (message : string) => void,
    onErrorCallback? : (message : string) => void
  ) {
    this.isSubmitted = true;
    if (!valid) {
      return;
    }

    this.formService.submitForm(this.url, this.id(), value).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        if (onSubmitCallback) {
          onSubmitCallback(res.message);
        }
      },
      error: (res) => {
        if (onErrorCallback) {
          onErrorCallback(res.error.message);
        }
      }
    })
  }

  delete(event: Event, onSubmitCallback? : (message : string) => void) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.apiService.delete(`${this.url}/${this.id()}`).subscribe((res : any) => {
          if (onSubmitCallback) {
            onSubmitCallback(res.message);
          }
        })
      },
    });
  }

  isInvalid(exampleForm : FormGroup, controlName: string) {
    const control = exampleForm.get(controlName);
    return control?.invalid && (control.touched || this.isSubmitted);
  }
}

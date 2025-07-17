import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-email-modal',
  imports: [
    MessageModule,
    DatePickerModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule
  ],
  templateUrl: './email-modal.component.html',
  styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent extends BaseComponent implements OnInit {
    override url = 'emails';
    emailForm! : FormGroup;
    visible = model<boolean>(false);
    placeholders = model<string[]>([]);
    originalData = model<any>();
  
    @Output() reloadTable = new EventEmitter();
    fb = inject(FormBuilder);
  
    ngOnInit(): void {
      this.emailForm = this.fb.group({
        text : ['', [Validators.required]],
        disabled: [false],
      });
    }
  
    initFormData() {
      this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {  
        if(response['data']) {
          this.originalData.set(response['data']);
          this.emailForm.patchValue(response['data']);
          const text = response['data']['possible_variables'];
          const pattern = /%[A-Za-z0-9]+%/g;
          const placeholders = text.match(pattern);
          this.placeholders.set(placeholders);
        }
      });
    }
  
    override onSubmit(valid : boolean, value : any) {
      super.onSubmit(valid, value, (message : string) => {
        this.emailForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
        this.visible.set(false);
        this.reloadTable.emit(true);
      });
    }

    applyCode(placeholder : string) {
      const textarea: HTMLTextAreaElement = document.querySelector('#myTextarea')!;
      const cursorPos = textarea.selectionStart;
      const currentText = this.emailForm.get('text')?.value;

      const newText = currentText.slice(0, cursorPos) + placeholder + currentText.slice(cursorPos);
      this.emailForm.get('text')?.setValue(newText);
      textarea.selectionStart = textarea.selectionEnd = cursorPos + placeholder.length;
      textarea.focus();
    }

    reset() {
      this.emailForm.patchValue(this.originalData());
    }
}

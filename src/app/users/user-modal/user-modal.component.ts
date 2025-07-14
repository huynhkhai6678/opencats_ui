import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-user-modal',
  imports: [
    CommonModule,
    DialogModule,
    MessageModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent extends BaseComponent implements OnInit {
  override url = 'users';
  userModal! : FormGroup;
  visible = model<boolean>(false);

  accessLevel = signal<any[]>([]);

  @Output() reloadTable = new EventEmitter();
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.userModal = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      user_name: ['', [Validators.required]],
      is_reset_password: [true],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      access_level : [310]
    });
  }

  initFormData() {
    this.formService.getInitData(`${this.url}/${this.id()}`).subscribe((response : any) => {
      if(response['data']) {
        this.userModal.patchValue(response['data']);
      }
      this.accessLevel.set(response['access_level']);
    });

    if (this.id() > 0) {
      this.userModal.controls['password'].setValidators([]);
      this.userModal.controls['password'].updateValueAndValidity();
      this.userModal.controls['confirm_password'].setValidators([]);
      this.userModal.controls['confirm_password'].updateValueAndValidity();
      this.userModal.controls['is_reset_password'].setValue(false);
    }
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, (message : string) => {
      this.userModal.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
      this.reloadTable.emit(true);
    });
  }
}

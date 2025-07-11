import { Component, inject, model, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-home-header-change-password',
  imports: [
    MessageModule,
    DialogModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-header-change-password.component.html',
  styleUrl: './home-header-change-password.component.scss'
})
export class HomeHeaderChangePasswordComponent extends BaseComponent implements OnInit {
  override url = 'auth/change-password';
  changePasswordForm! : FormGroup;
  visible = model<boolean>(false);

  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  override onSubmit(valid : boolean, value : any) {
    super.onSubmit(valid, value, 
    (message : string) => {
      this.changePasswordForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
      this.visible.set(false);
    },
    (message: string) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    }
  );
  }
}

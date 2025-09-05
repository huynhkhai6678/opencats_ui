import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm! : FormGroup;
  alerMessage = '';

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(value : any, valid : boolean) {
    this.alerMessage = '';
    if (!valid) {
      return;
    }
    this.isSubmitted = true;

    this.authService.login(value).subscribe({
      next : (res: any) => {
        this.isSubmitted = false;
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.data);
        if (this.authService.isHeadhunt()) {
          return this.router.navigate(['home/job-orders']);
        }
        return this.router.navigate(['home']);
      },
      error: (error) => {
        this.alerMessage = error.error.message;
      }
    });
  }
}

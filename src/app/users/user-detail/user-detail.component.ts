import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { UserDetail } from '../user-detail.model';
import { UserDetailLoginActivityComponent } from '../user-detail-login-activity/user-detail-login-activity.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    UserModalComponent,
    ButtonModule,
    DatePipe,
    UserDetailLoginActivityComponent
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  
  @ViewChild(UserModalComponent) userModal!: UserModalComponent;

  override url = 'users';
  override id = signal<number>(0);
  data = signal<UserDetail | null>(null);

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
    this.userModal.visible.set(true);
    this.userModal.id.set(this.id());
    this.userModal.initFormData();
  }

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.router.navigate(['home/users']);
    });
  }
}

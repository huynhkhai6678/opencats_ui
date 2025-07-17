import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BaseComponent } from '../../base/base.component';
import { HeadhuntCandidatesComponent } from '../headhunt-candidates/headhunt-candidates.component';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-headhunt-detail',
  imports: [
    FormsModule,
    DatePipe,
    ButtonModule,
    ToggleSwitchModule,
    HeadhuntCandidatesComponent
  ],
  templateUrl: './headhunt-detail.component.html',
  styleUrl: './headhunt-detail.component.scss'
})
export class HeadhuntDetailComponent extends BaseComponent implements OnInit {
  override url = 'headhunts';
  override id = signal<number>(0);
  data = signal<any>(null);

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

  override delete(event : Event) {
    super.delete(event, (message : string) => {
      this.messageService.add({ severity: 'success', summary: 'Delete Confirmed', detail: message });
      this.router.navigate(['home/job-orders']);
    });
  }

  changeValue(event : ToggleSwitchChangeEvent) {
    this.apiService.post(`${this.url}/${this.id()}/update-employee`, { 
      checked : event.checked
    }).subscribe((response : any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: response['message'] });
      this.getData();
    });
  }
}

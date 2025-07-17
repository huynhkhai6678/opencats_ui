import { Component, input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-headhunt-candidates',
  imports: [
    DatePipe,
    ButtonModule,
    TableModule
  ],
  templateUrl: './headhunt-candidates.component.html',
  styleUrl: './headhunt-candidates.component.scss'
})
export class HeadhuntCandidatesComponent {
  readonly apiUrl = environment.apiUrl;
  userId = input.required<number>();
  candidates = httpResource<any[]>(
    () => {
      if (this.userId() === 0) {
        return;
      }
      return `${this.apiUrl}headhunts/${this.userId()}/candidates`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  reloadData() {
    this.candidates.reload();
  }
}

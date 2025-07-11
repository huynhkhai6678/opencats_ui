import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-detail-contact',
  imports: [
    FontAwesomeModule,
    DatePipe,
    RouterLink,
    ButtonModule,
    TableModule
  ],
  templateUrl: './company-detail-contact.component.html',
  styleUrl: './company-detail-contact.component.scss'
})
export class CompanyDetailContactComponent {
  readonly apiUrl = environment.apiUrl;
  readonly faPencilAlt = faPencilAlt;
  readonly faEnvelope = faEnvelope;

  companyId = input<number>(0);
  contacts = httpResource<any[]>(
    () => {
      if (this.companyId() === 0) {
        return;
      }
      return `${this.apiUrl}companies/${this.companyId()}/contacts`;
    },
    {
      parse: (response : any) => response.data
    }
  )
}

import { DatePipe } from '@angular/common';
import { Component, model, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';
import { httpResource } from '@angular/common/http';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-headhunt-kpi',
  imports: [
    FormsModule,
    ButtonModule,
    SelectModule,
    TableModule
  ],
  templateUrl: './headhunt-kpi.component.html',
  styleUrl: './headhunt-kpi.component.scss'
})
export class HeadhuntKpiComponent implements OnInit {
  readonly apiUrl = environment.apiUrl;
  filterMonths = model<number>(0);

  months = signal<any[]>([]);
  headhunts = httpResource<any[]>(
    () => {
      return `${this.apiUrl}headhunts/kpi?month=${this.filterMonths()}`;
    },
    {
      parse: (response : any) => response.data
    }
  )

  ngOnInit(): void {
    this.getPreviousSixMonths();
  }

  reloadData() {
    this.headhunts.reload();
  }

  getPreviousSixMonths() {
    const months: { label: string, value: number }[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 6; i++) {
      currentDate.setMonth(currentDate.getMonth() - 1);

      // Get the month and year
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();

      // Format the label as "Jul-2025"
      const label = `${month}-${year}`;
      const value = i;
      months.push({ label, value });
    }

    this.months.set(months);
  }
}

import { Component, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import { ChartConstructorType, HighchartsChartComponent, providePartialHighcharts } from 'highcharts-angular';

@Component({
  selector: 'app-reports',
  imports: [
    HighchartsChartComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers : [
    providePartialHighcharts({
      modules: () => {
        return [
          import('highcharts/esm/modules/exporting'),
        ];
      },
    }),
  ]
})
export class ReportsComponent {
  apiUrl = environment.apiUrl;
  apiService = inject(ApiService);

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Reports Overview'
    },
    yAxis: {
      title: {
        text: 'Values'
      },
      type: 'logarithmic'
    },
    plotOptions: {
      bar: {
        pointPadding: 0.1,
        groupPadding: 0.05,
        minPointLength: 20,
         events: {
          click: function (e) {
            // const seriesName = e.point.series.name;
            // if (seriesName != 'New Submissions' && seriesName != 'New Placements') {
            //   return;
            // }
            
            // alert(`You clicked on the bar for "${seriesName}"`);
          }
        }
      }
    },
    exporting: {
      enabled: true
    }
  };

  chartConstructor: ChartConstructorType = 'chart';
  updateFlag: boolean = false;

  ngOnInit() {
    this.apiService.get(`reports`).subscribe(
      (response: any) => {
        const categories = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month', 'This Year', 'Last Year', 'To Date'];
        const series = this.transformData(response.data);

        // Update chart options
        this.chartOptions = {
          ...this.chartOptions,
          xAxis: { ...this.chartOptions.xAxis, categories },
          series: series,
        };
        this.updateFlag = true;
      },
      error => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  transformData(data : any) {
    const categories = [
      'today', 'lastYear', 'lastMonth', 'lastWeek', 'yesterday', 'thisYear', 'thisMonth', 'thisWeek', 'toDate'
    ];
    return [
      {
        name: 'New Job Orders',
        type: 'bar',
        data: categories.map(category => data.joborder[category])
      },
      {
        name: 'New Candidates',
        type: 'bar',
        data: categories.map(category => data.candidate[category])
      },
      {
        name: 'New Companies',
        type: 'bar',
        data: categories.map(category => data.company[category])
      },
      {
        name: 'New Submissions',
        type: 'bar',
        data: categories.map(category => data.submission[category])
      },
       {
        name: 'New Placements',
        type: 'bar',
        data: categories.map(category => data.placement[category])
      },
      {
        name: 'New Contacts',
        type: 'bar',
        data: categories.map(category => data.contact[category])
      },
    ] as Highcharts.SeriesOptionsType[];
  }
}

import { Component, inject } from '@angular/core';
import { ChartConstructorType, HighchartsChartComponent, providePartialHighcharts } from 'highcharts-angular';
import { MessageModule } from 'primeng/message';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-hiring-overview',
  imports: [
    MessageModule,
    HighchartsChartComponent
  ],
  templateUrl: './dashboard-hiring-overview.component.html',
  styleUrl: './dashboard-hiring-overview.component.scss',
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
export class DashboardHiringOverviewComponent {
  apiUrl = environment.apiUrl;
  apiService = inject(ApiService);

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
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
            const seriesName = e.point.series.name;
            if (seriesName != 'New Submissions' && seriesName != 'New Placements') {
              return;
            }
            
            alert(`You clicked on the bar for "${seriesName}"`);
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
    this.apiService.get(`dashboard/hiring-overview`).subscribe(
      (response: any) => {
        const categories = ['Today', 'Yesterday', 'This Week', 'Last Week', 'To Date'];
        const series = this.transformData(response.data);
        console.log('Transformed Series:', series);

        // Update chart options
        this.chartOptions = {
          ...this.chartOptions,
          xAxis: { ...this.chartOptions.xAxis, categories },
          series: series,
        };
        this.updateFlag = true;
        console.log('Hiring Overview Data:', response.data);

      },
      error => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  transformData(data : any) {
    const categories = ['today', 'yesterday', 'this_week', 'last_week', 'all_time'];
    
    return [
      {
        name: 'Summitted',
        type: 'column',
        data: categories.map(category => data.submitted[category])
      },
      {
        name: 'Interviewing',
        type: 'column',
        data: categories.map(category => data.interviewing[category])
      },
      {
        name: 'Placed',
        type: 'column',
        data: categories.map(category => data.placed[category])
      }
    ] as Highcharts.SeriesOptionsType[];
  }
}

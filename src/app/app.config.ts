import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import bluePreset from '../../blue-preset';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHighcharts } from 'highcharts-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideAnimationsAsync(),
      providePrimeNG({
        theme: {
          preset: bluePreset,
          options : {
            darkModeSelector: '.my-app-dark'
          }
        }
    }),
    provideHighcharts({
      instance: () => import('highcharts'),
      modules: () => {
        return [
          import('highcharts/esm/modules/accessibility'),
          import('highcharts/esm/modules/exporting'),
          import('highcharts/esm/modules/export-data'),
        ];
      },
    }),
    provideHttpClient(
      withInterceptors([JwtInterceptor]), 
      withFetch()
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};

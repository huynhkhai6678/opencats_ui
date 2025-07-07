import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/dashboard.component').then(mod => mod.DashboardComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'companies',
        loadComponent: () => import('../companies/companies.component').then(mod => mod.CompaniesComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'companies/:id',
        loadComponent: () => import('../companies/company-detail/company-detail.component').then(mod => mod.CompanyDetailComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'contacts',
        loadComponent: () => import('../contacts/contacts.component').then(mod => mod.ContactsComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'contacts/:id',
        loadComponent: () => import('../contacts/contact-detail/contact-detail.component').then(mod => mod.ContactDetailComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];
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
        path: 'job-orders',
        loadComponent: () => import('../job-orders/job-orders.component').then(mod => mod.JobOrdersComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'job-orders/:id',
        loadComponent: () => import('../job-orders/job-order-detail/job-order-detail.component').then(mod => mod.JobOrderDetailComponent),
        canActivate: [],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'candidates',
        loadComponent: () => import('../candidates/candidates.component').then(mod => mod.CandidatesComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Candidates' 
        }
      },
      {
        path: 'candidates/:id',
        loadComponent: () => import('../candidates/candidate-detail/candidate-detail.component').then(mod => mod.CandidateDetailComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Candidates' 
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
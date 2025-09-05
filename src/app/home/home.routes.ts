import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { adminGuard } from '../guards/admin.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/dashboard.component').then(mod => mod.DashboardComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Dashboard' 
      },
      {
        path: 'companies',
        loadComponent: () => import('../companies/companies.component').then(mod => mod.CompaniesComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Companies' 
      },
      {
        path: 'companies/:id',
        loadComponent: () => import('../companies/company-detail/company-detail.component').then(mod => mod.CompanyDetailComponent),
        canActivate: [
          adminGuard
        ],
          title: 'Dtalent - Companies' 
      },
      {
        path: 'contacts',
        loadComponent: () => import('../contacts/contacts.component').then(mod => mod.ContactsComponent),
        canActivate: [
          adminGuard
        ],
        data: { 
          title: 'messages.dashboard' 
        }
      },
      {
        path: 'contacts/:id',
        loadComponent: () => import('../contacts/contact-detail/contact-detail.component').then(mod => mod.ContactDetailComponent),
        canActivate: [
          adminGuard
        ],
        data: { 
          title: 'Dtalent - Contacts' 
        }
      },
      {
        path: 'job-orders',
        loadComponent: () => import('../job-orders/job-orders.component').then(mod => mod.JobOrdersComponent),
        canActivate: [],
        title: 'Dtalent - Job Orders' 
      },
      {
        path: 'job-orders/:id',
        loadComponent: () => import('../job-orders/job-order-detail/job-order-detail.component').then(mod => mod.JobOrderDetailComponent),
        canActivate: [],
        title: 'Dtalent - Job Orders' 
      },
      {
        path: 'candidates',
        loadComponent: () => import('../candidates/candidates.component').then(mod => mod.CandidatesComponent),
        canActivate: [],
        title: 'Dtalent - Candidates' 
      },
      {
        path: 'candidates/:id',
        loadComponent: () => import('../candidates/candidate-detail/candidate-detail.component').then(mod => mod.CandidateDetailComponent),
        canActivate: [],
        title: 'Dtalent - Candidates' 
      },
      {
        path: 'activities',
        loadComponent: () => import('../activities/activities.component').then(mod => mod.ActivitiesComponent),
        canActivate: [],
        title: 'Dtalent - Activities' 
      },
      {
        path: 'lists',
        loadComponent: () => import('../lists/lists.component').then(mod => mod.ListsComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Lists' 
      },
      {
        path: 'lists/:id',
        loadComponent: () => import('../lists/list-detail/list-detail.component').then(mod => mod.ListDetailComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Detai' 
      },
      {
        path: 'settings/login-activities',
        loadComponent: () => import('../login-activities/login-activities.component').then(mod => mod.LoginActivitiesComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Login Activities' 
      },
      {
        path: 'settings/users',
        loadComponent: () => import('../users/users.component').then(mod => mod.UsersComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Users' 
      },
      {
        path: 'settings/users/:id',
        loadComponent: () => import('../users/user-detail/user-detail.component').then(mod => mod.UserDetailComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Users' 
      },
      {
        path: 'settings/emails',
        loadComponent: () => import('../emails/emails.component').then(mod => mod.EmailsComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Users' 
      },
      {
        path: 'calendar',
        loadComponent: () => import('../calendar/calendar.component').then(mod => mod.CalendarComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - List Users' 
      },
      {
        path: 'headhunts',
        loadComponent: () => import('../headhunts/headhunts.component').then(mod => mod.HeadhuntsComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Headhunts' 
      },
      {
        path: 'headhunts/kpi',
        loadComponent: () => import('../headhunts/headhunt-kpi/headhunt-kpi.component').then(mod => mod.HeadhuntKpiComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Headhunts KPI' 
      },
      {
        path: 'headhunts/:id',
        loadComponent: () => import('../headhunts/headhunt-detail/headhunt-detail.component').then(mod => mod.HeadhuntDetailComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Headhunts' 
      },
      {
        path: 'reports',
        loadComponent: () => import('../reports/reports.component').then(mod => mod.ReportsComponent),
        canActivate: [
          adminGuard
        ],
        title: 'Dtalent - Reports' 
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];
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
        path: 'activities',
        loadComponent: () => import('../activities/activities.component').then(mod => mod.ActivitiesComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Activities' 
        }
      },
      {
        path: 'lists',
        loadComponent: () => import('../lists/lists.component').then(mod => mod.ListsComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Lists' 
        }
      },
      {
        path: 'lists/:id',
        loadComponent: () => import('../lists/list-detail/list-detail.component').then(mod => mod.ListDetailComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Detai' 
        }
      },
      {
        path: 'settings/login-activities',
        loadComponent: () => import('../login-activities/login-activities.component').then(mod => mod.LoginActivitiesComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Login Activities' 
        }
      },
      {
        path: 'settings/users',
        loadComponent: () => import('../users/users.component').then(mod => mod.UsersComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Users' 
        }
      },
      {
        path: 'settings/users/:id',
        loadComponent: () => import('../users/user-detail/user-detail.component').then(mod => mod.UserDetailComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Users' 
        }
      },
      {
        path: 'settings/emails',
        loadComponent: () => import('../emails/emails.component').then(mod => mod.EmailsComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Users' 
        }
      },
      {
        path: 'calendar',
        loadComponent: () => import('../calendar/calendar.component').then(mod => mod.CalendarComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - List Users' 
        }
      },
      {
        path: 'headhunts',
        loadComponent: () => import('../headhunts/headhunts.component').then(mod => mod.HeadhuntsComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Headhunts' 
        }
      },
      {
        path: 'headhunts/:id',
        loadComponent: () => import('../headhunts/headhunt-detail/headhunt-detail.component').then(mod => mod.HeadhuntDetailComponent),
        canActivate: [],
        data: { 
          title: 'Dtalent - Headhunts' 
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
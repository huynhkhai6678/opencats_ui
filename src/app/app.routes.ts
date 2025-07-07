import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(mod => mod.homeRoutes),
        canActivate: [authGuard] 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./auth/login/login.component').then(mod => mod.LoginComponent),
        title: 'Testing' 
    },
    { 
        path: 'forbidden', 
        loadComponent: () => import('./error/forbidden/forbidden.component').then(mod => mod.ForbiddenComponent) 
    },
    { 
        path: 'not-found', 
        loadComponent: () => import('./error/not-found/not-found.component').then(mod => mod.NotFoundComponent) 
    }
];

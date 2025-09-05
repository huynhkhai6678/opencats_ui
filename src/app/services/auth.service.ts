import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    readonly ADMIN_ACCESS_LEVEL = 500;
    readonly HEADHHUNT_ACCESS_LEVEL = 310;

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {}

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    getUser(): any | null {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    isAdmin(): boolean {
        const user = this.getUser();
        if (user) {
            return user.access_level == this.ADMIN_ACCESS_LEVEL;
        } 
        return false;
    }

    isHeadhunt(): boolean {
        const user = this.getUser();
        if (user) {
            return user.access_level == this.HEADHHUNT_ACCESS_LEVEL;
        } 
        return false;
    }

    saveToken(token: string): void {
        localStorage.setItem('jwtToken', token);
    }

    saveUser(user: object): void {
        localStorage.setItem('user', JSON.stringify(user));    
    }

    login(data : any) {
        return this.apiService.post('auth/login', data);
    }

    forgotPassword(data : any) {
        return this.apiService.post('auth/forgot-password', data);
    }

    resetPassword(data : any) {
        return this.apiService.post('auth/reset-password', data);
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
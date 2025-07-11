import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    readonly ADMIN_TYPE = 1;
    readonly DOCTOR_TYPE = 2;
    readonly PATIENT_TYPE = 3;
    readonly SUPER_ADMIN_TYPE = 5;

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

    isSuperAdmin(): boolean {
        const user = this.getUser();
        if (user) {
            return user.type == this.SUPER_ADMIN_TYPE;
        } 
        return false;
    }

    isAdmin(): boolean {
        const user = this.getUser();
        if (user) {
            return user.type == this.ADMIN_TYPE;
        } 
        return false;
    }

    isDoctor(): boolean {
        const user = this.getUser();
        if (user) {
            return user.type == this.DOCTOR_TYPE;
        } 
        return false;
    }

    isPatient(): boolean {
        const user = this.getUser();
        if (user) {
            return user.type == this.PATIENT_TYPE;
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
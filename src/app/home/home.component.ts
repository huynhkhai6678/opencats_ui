import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-home',
  imports: [
    MenubarModule,
    RouterModule,
    HomeHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  items = signal<MenuItem[]>([]);

  ngOnInit(): void {
    this.items.set([
        {
            label: 'Router',
            icon: 'pi pi-palette',
            items: [
                {
                    label: 'Installation',
                    routerLink: '/installation'
                },
                {
                    label: 'Configuration',
                    routerLink: '/configuration'
                }
            ]
        },
        {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
                this.router.navigate(['/installation']);
            }
        },
        {
            label: 'External',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Angular',
                    url: 'https://angular.io/'
                },
                {
                    label: 'Vite.js',
                    url: 'https://vitejs.dev/'
                }
            ]
        }
    ])
  }
}

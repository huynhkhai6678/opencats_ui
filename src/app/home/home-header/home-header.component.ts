import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeHeaderChangePasswordComponent } from './home-header-change-password/home-header-change-password.component';

@Component({
  selector: 'app-home-header',
  imports: [
    FontAwesomeModule,
    MenuModule,
    RouterLinkActive,
    RouterLink,
    ButtonModule,
    HomeHeaderChangePasswordComponent
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
  faUser = faUser;
  authService = inject(AuthService);
  
  @ViewChild(HomeHeaderChangePasswordComponent) changePasswordModal!: HomeHeaderChangePasswordComponent;

  readonly user = this.authService.getUser();

  allRoutes = [
    {
      name: "Dashboard",
      link: "/home/dashboard"
    },
    {
      name: "Activities",
      link: "/home/activities"
    },
    {
      name: "Job Orders",
      link: "/home/job-orders"
    },
    {
      name: "Candidates",
      link: "/home/candidates"
    },
    {
      name: "Companies",
      link: "/home/companies"
    },
    {
      name: "Contacts",
      link: "/home/contacts"
    },
    {
      name: "Lists",
      link: "/home/lists"
    },
    {
      name: "Calendar",
      link: "/home/calendar"
    },
    {
      name: "Reports",
      link: "/home/reports"
    },
    {
      name: "Settings",
      link: "/home/settings"
    },
    {
      name: "Headhunts",
      link: "/home/headhunt"
    }
  ];

  profileMenus: MenuItem[] = [
    {
      items: [
        {
          label: 'Change Password',
          command: () => this.changePassword(),
        },
        {
          label: 'Log out',
          command: () => this.logout(),
        }
      ]
    },
  ];
  
  routes = signal<HomeRouterLink[]>([]);

  ngOnInit(): void {
    this.routes.set(this.allRoutes);
  }

  changePassword() {
    this.changePasswordModal.visible.set(true);
  }

  logout() {
    this.authService.logout();
  }
}


export interface HomeRouterLink {
  name: string;
  link: string;
}

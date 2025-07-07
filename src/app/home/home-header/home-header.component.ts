import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-home-header',
  imports: [
    TieredMenuModule,
    RouterLinkActive,
    RouterLink,
    ButtonModule
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent implements OnInit {
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

  settingItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: ['/home']
    },
    {
      label: 'Contact',
      routerLink: ['/contact']
    }
  ];
  
  routes = signal<HomeRouterLink[]>([]);

  ngOnInit(): void {
    this.routes.set(this.allRoutes);
  }
}


export interface HomeRouterLink {
  name: string;
  link: string;
}

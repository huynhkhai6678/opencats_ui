import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeHeaderComponent } from "./home-header/home-header.component";
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
export class HomeComponent {
}

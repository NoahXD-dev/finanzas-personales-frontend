import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { Button } from 'flowbite-angular/button';
import { Icon } from 'flowbite-angular/icon';
import { wallet } from 'flowbite-angular/icon/solid/e-commerce';
import { chartPie } from 'flowbite-angular/icon/solid/general';
import {
  Sidebar,
  SidebarContent,
  SidebarItem,
} from 'flowbite-angular/sidebar';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    Icon,
    Button,
    Sidebar,
    SidebarContent,
    SidebarItem,
  ],
  providers: [provideIcons({ chartPie, wallet })],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly user = this.auth.user;

  logout(): void {
    this.auth.logout().subscribe({
      complete: () => {
        void this.router.navigate(['/login']);
      },
    });
  }
}

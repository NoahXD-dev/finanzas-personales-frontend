import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  provideFlowbiteSidebarState,
  SidebarToggle,
} from 'flowbite-angular/sidebar';

import { AuthService } from '../../core/auth/auth.service';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SidebarToggle, AppSidebarComponent],
  providers: [provideFlowbiteSidebarState()],
  host: {
    class: 'flex min-h-screen w-full',
  },
  templateUrl: './app-shell.component.html',
})
export class AppShellComponent implements OnInit {
  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.loadMe();
  }
}

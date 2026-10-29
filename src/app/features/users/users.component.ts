import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Button } from 'flowbite-angular/button';
import { Table, TableBody, TableHead } from 'flowbite-angular/table';

import { ManagedUser } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  imports: [Button, Table, TableHead, TableBody],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);

  protected readonly usersResource = rxResource({
    stream: () => this.usersService.findAll(),
    defaultValue: [] as ManagedUser[],
  });

  protected readonly savingId = signal<string | null>(null);
  protected readonly actionError = signal<string | null>(null);

  protected roleLabel(role: ManagedUser['role']): string {
    return role === 'super' ? 'Super' : 'Usuario';
  }

  protected statusLabel(status: boolean): string {
    return status ? 'Activo' : 'Inactivo';
  }

  protected canToggleStatus(user: ManagedUser): boolean {
    return !(user.role === 'super' && user.status);
  }

  protected toggleStatus(user: ManagedUser): void {
    if (!this.canToggleStatus(user) || this.savingId() !== null) {
      return;
    }
    const nextStatus = !user.status;
    this.actionError.set(null);
    this.savingId.set(user.id);
    this.usersService.setUserStatus(user.id, nextStatus).subscribe({
      next: () => {
        this.savingId.set(null);
        this.usersResource.reload();
      },
      error: (error: Error) => {
        this.savingId.set(null);
        this.actionError.set(error.message);
      },
    });
  }
}

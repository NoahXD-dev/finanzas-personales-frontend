import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, finalize, map, tap } from 'rxjs';

import { GraphqlClient } from '../graphql/graphql.client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  type LoginGqlResponse,
  type LogoutGqlResponse,
  type MeGqlResponse,
} from './auth.graphql';
import type { AuthPayload, AuthUser, LoginInput, UserRole } from './auth.model';
import { TokenStore } from './token.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly graphql = inject(GraphqlClient);
  private readonly tokenStore = inject(TokenStore);

  private readonly userState = signal<AuthUser | null>(null);
  private meLoaded = false;

  readonly user = this.userState.asReadonly();
  readonly token = computed(() => this.tokenStore.get());
  readonly isAuthenticated = computed(() => this.token() !== null);

  login(input: LoginInput): Observable<AuthPayload> {
    return this.graphql
      .mutate<LoginGqlResponse>(
        LOGIN_MUTATION,
        { input },
        { skipAuth: true },
      )
      .pipe(
        map((data) => ({
          accessToken: data.login.accessToken,
          user: this.toAuthUser(data.login.user),
        })),
        tap((payload) => this.setSession(payload.accessToken, payload.user)),
      );
  }

  logout(): Observable<boolean> {
    return this.graphql.mutate<LogoutGqlResponse>(LOGOUT_MUTATION).pipe(
      map((data) => data.logout),
      finalize(() => this.clearSession()),
    );
  }

  loadMe(): void {
    if (this.meLoaded || this.tokenStore.get() === null) {
      return;
    }
    this.meLoaded = true;
    this.graphql.query<MeGqlResponse>(ME_QUERY).subscribe({
      next: (data) => {
        this.userState.set(this.toAuthUser(data.me));
      },
      error: () => {
        this.clearSession();
      },
    });
  }

  clearSession(): void {
    this.tokenStore.clear();
    this.userState.set(null);
    this.meLoaded = false;
  }

  private setSession(accessToken: string, user: AuthUser): void {
    this.tokenStore.set(accessToken);
    this.userState.set(user);
    this.meLoaded = true;
  }

  private toAuthUser(row: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
  }): AuthUser {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role as UserRole,
      status: row.status,
    };
  }
}

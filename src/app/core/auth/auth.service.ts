import { Injectable, computed, inject, signal } from '@angular/core';
import {
  Observable,
  finalize,
  map,
  of,
  shareReplay,
  tap,
  catchError,
} from 'rxjs';

import { GraphqlClient } from '../graphql/graphql.client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  type LoginGqlResponse,
  type LogoutGqlResponse,
  type MeGqlResponse,
  type RegisterGqlResponse,
} from './auth.graphql';
import type {
  AuthPayload,
  AuthUser,
  LoginInput,
  RegisterInput,
  UserRole,
} from './auth.model';
import { TokenStore } from './token.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly graphql = inject(GraphqlClient);
  private readonly tokenStore = inject(TokenStore);

  private readonly userState = signal<AuthUser | null>(null);
  private meRequest: Observable<AuthUser | null> | null = null;

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
        map((data) => this.toPayload(data.login)),
        tap((payload) => this.setSession(payload.accessToken, payload.user)),
      );
  }

  register(input: RegisterInput): Observable<AuthPayload> {
    return this.graphql
      .mutate<RegisterGqlResponse>(
        REGISTER_MUTATION,
        { input },
        { skipAuth: true },
      )
      .pipe(
        map((data) => this.toPayload(data.register)),
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
    this.ensureUser().subscribe();
  }

  ensureUser(): Observable<AuthUser | null> {
    const current = this.userState();
    if (current !== null) {
      return of(current);
    }
    if (this.tokenStore.get() === null) {
      return of(null);
    }
    if (this.meRequest === null) {
      this.meRequest = this.graphql.query<MeGqlResponse>(ME_QUERY).pipe(
        map((data) => {
          const user = this.toAuthUser(data.me);
          this.userState.set(user);
          return user;
        }),
        catchError(() => {
          this.clearSession();
          return of(null);
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.meRequest;
  }

  clearSession(): void {
    this.tokenStore.clear();
    this.userState.set(null);
    this.meRequest = null;
  }

  private setSession(accessToken: string, user: AuthUser): void {
    this.tokenStore.set(accessToken);
    this.userState.set(user);
    this.meRequest = null;
  }

  private toPayload(row: LoginGqlResponse['login']): AuthPayload {
    return {
      accessToken: row.accessToken,
      user: this.toAuthUser(row.user),
    };
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

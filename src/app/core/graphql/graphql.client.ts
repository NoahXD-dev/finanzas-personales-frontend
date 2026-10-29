import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { SKIP_AUTH } from '../auth/auth.context';
import { AuthService } from '../auth/auth.service';
import { TokenStore } from '../auth/token.store';
import { environment } from '../../../environments/environment';
import { GraphqlClientError } from './graphql.error';
import {
  GraphqlRequestOptions,
  GraphqlResponse,
} from './graphql.types';

@Injectable({ providedIn: 'root' })
export class GraphqlClient {
  private readonly http = inject(HttpClient);
  private readonly tokenStore = inject(TokenStore);
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);

  query<T>(
    query: string,
    variables?: Record<string, unknown>,
    options?: GraphqlRequestOptions,
  ): Observable<T> {
    return this.request<T>(query, variables, options);
  }

  mutate<T>(
    mutation: string,
    variables?: Record<string, unknown>,
    options?: GraphqlRequestOptions,
  ): Observable<T> {
    return this.request<T>(mutation, variables, options);
  }

  private request<T>(
    document: string,
    variables?: Record<string, unknown>,
    options?: GraphqlRequestOptions,
  ): Observable<T> {
    const skipAuth = options?.skipAuth === true;
    const context = new HttpContext().set(SKIP_AUTH, skipAuth);
    const hadToken = !skipAuth && this.tokenStore.get() !== null;

    return this.http
      .post<GraphqlResponse<T>>(
        environment.graphqlUrl,
        { query: document, variables },
        { context },
      )
      .pipe(
        map((response) => {
          if (response.errors?.length) {
            const codes = response.errors
              .map((error) => error.extensions?.code)
              .filter((code): code is string => typeof code === 'string');
            const message = response.errors
              .map((error) => error.message)
              .join(', ');
            throw new GraphqlClientError(message, codes);
          }
          if (response.data === undefined) {
            throw new GraphqlClientError(
              'La respuesta GraphQL no incluye datos.',
            );
          }

          return response.data;
        }),
        tap({
          error: (error: unknown) => {
            if (
              error instanceof GraphqlClientError &&
              hadToken &&
              error.hasCode('UNAUTHORIZED')
            ) {
              this.injector.get(AuthService).clearSession();
              void this.router.navigate(['/login']);
            }
          },
        }),
      );
  }
}

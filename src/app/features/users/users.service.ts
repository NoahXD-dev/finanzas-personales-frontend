import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { GraphqlClient } from '../../core/graphql/graphql.client';
import { ManagedUser } from './user.model';
import {
  SET_USER_STATUS_MUTATION,
  USERS_QUERY,
  mapUserRow,
  type SetUserStatusGqlResponse,
  type UsersGqlResponse,
} from './users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly graphql = inject(GraphqlClient);

  findAll(): Observable<ManagedUser[]> {
    return this.graphql.query<UsersGqlResponse>(USERS_QUERY).pipe(
      map((data) => data.users.map(mapUserRow)),
    );
  }

  setUserStatus(id: string, status: boolean): Observable<ManagedUser> {
    return this.graphql
      .mutate<SetUserStatusGqlResponse>(SET_USER_STATUS_MUTATION, {
        id: Number(id),
        status,
      })
      .pipe(map((data) => mapUserRow(data.setUserStatus)));
  }
}

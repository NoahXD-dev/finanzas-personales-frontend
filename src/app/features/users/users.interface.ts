import { ManagedUser } from './user.model';

export const USERS_QUERY = `
  query Users {
    users {
      id
      name
      email
      role
      status
    }
  }
`;

export const SET_USER_STATUS_MUTATION = `
  mutation SetUserStatus($id: Int!, $status: Boolean!) {
    setUserStatus(id: $id, status: $status) {
      id
      name
      email
      role
      status
    }
  }
`;

export interface UsersGqlResponse {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
  }[];
}

export interface SetUserStatusGqlResponse {
  setUserStatus: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
  };
}

export type UserGqlRow = UsersGqlResponse['users'][number];

export function mapUserRow(row: UserGqlRow): ManagedUser {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    role: row.role as ManagedUser['role'],
    status: row.status,
  };
}

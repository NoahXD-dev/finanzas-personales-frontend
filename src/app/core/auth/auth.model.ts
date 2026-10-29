export type UserRole = 'user' | 'super';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: boolean;
}

export interface AuthPayload {
  accessToken: string;
  user: AuthUser;
}

export interface LoginInput {
  email: string;
  password: string;
}

import type { UserRole } from '../../core/auth/auth.model';

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: boolean;
}

import { HttpContextToken } from '@angular/common/http';

/** When true, the auth interceptor must not attach Authorization. */
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

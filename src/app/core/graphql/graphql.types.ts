export interface GraphqlErrorExtensions {
  code?: string;
}

export interface GraphqlError {
  message: string;
  extensions?: GraphqlErrorExtensions;
}

export interface GraphqlResponse<T> {
  data?: T;
  errors?: GraphqlError[];
}

export interface GraphqlRequestOptions {
  skipAuth?: boolean;
}

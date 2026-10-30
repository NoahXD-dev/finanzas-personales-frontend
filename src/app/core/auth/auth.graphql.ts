export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        name
        email
        role
        status
      }
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      user {
        id
        name
        email
        role
        status
      }
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

export const ME_QUERY = `
  query Me {
    me {
      id
      name
      email
      role
      status
    }
  }
`;

export interface LoginGqlResponse {
  login: {
    accessToken: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      status: boolean;
    };
  };
}

export interface RegisterGqlResponse {
  register: LoginGqlResponse['login'];
}

export interface LogoutGqlResponse {
  logout: boolean;
}

export interface MeGqlResponse {
  me: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: "admin" | "co-admin" | "user";
  permissions?: string[];
  api_token?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  identifier: string; // email or username
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

import { apiRequest } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: "user" | "admin";
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user: User;
}

interface MeResponse {
  success: boolean;
  user: User;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export async function register(
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      phone,
      password,
    }),
  });
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getCurrentUser(
  token: string
): Promise<MeResponse> {
  return apiRequest<MeResponse>("/auth/me", {
    method: "GET",
    token,
  });
}

export async function updateProfile(
  token: string,
  name: string,
  phone: string
): Promise<UpdateProfileResponse> {
  return apiRequest<UpdateProfileResponse>("/auth/profile", {
    method: "PUT",
    token,
    body: JSON.stringify({
      name,
      phone,
    }),
  });
}
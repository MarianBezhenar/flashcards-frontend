import { apiClient } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
  const fullName = `${formData.firstName.trim()} ${formData.secondName.trim()}`;
  const response = await apiClient.post('/auth/register', {
    name: fullName,
    email: formData.email,
    password: formData.password,
  });
  return response.data;
};

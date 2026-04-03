import apiClient from "./axiosInstance";

export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    password: string;
}

export const login = (data: LoginDto) =>
    apiClient.post("/api/auth/login", data);

export const register = (data: RegisterDto) =>
    apiClient.post("/users/register", data);

export const getMe = () => apiClient.get('/users/my-profile');

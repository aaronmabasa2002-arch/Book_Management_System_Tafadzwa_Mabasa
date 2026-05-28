import { apiClient } from './client'
import type { User } from '../types/auth'

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  fullName: string
  email: string
  password: string
}

type AuthResponse = {
  accessToken: string
  user: User
}

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload)
    return data
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      '/auth/register',
      payload,
    )
    return data
  },

  async profile(): Promise<User> {
    const { data } = await apiClient.get<User>('/auth/profile')
    return data
  },
}

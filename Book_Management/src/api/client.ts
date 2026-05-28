import axios from 'axios'
import { loadSession } from './session'

const baseURL = import.meta.env.VITE_API_URL ?? '/api'

let accessToken: string | null = loadSession()?.accessToken ?? null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

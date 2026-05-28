import type { User } from '../types/auth'

export const SESSION_KEY = 'lindroid_session'

export type Session = {
  accessToken: string
  user: User
}

export const loadSession = (): Session | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Session
    if (!parsed?.accessToken || !parsed?.user?.email) return null
    return parsed
  } catch {
    return null
  }
}

export const saveSession = (session: Session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY)
}

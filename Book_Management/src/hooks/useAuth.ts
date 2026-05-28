import { useCallback, useState } from 'react'
import { authApi, type LoginPayload, type RegisterPayload } from '../api/authApi'
import { getErrorMessage } from '../api/getErrorMessage'
import type { Session } from '../api/session'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (payload: LoginPayload): Promise<Session> => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.login(payload)
      return { accessToken: data.accessToken, user: data.user }
    } catch (err) {
      const message = getErrorMessage(err, 'Sign in failed.')
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(
    async (payload: RegisterPayload): Promise<Session> => {
      setLoading(true)
      setError(null)
      try {
        const data = await authApi.register(payload)
        return { accessToken: data.accessToken, user: data.user }
      } catch (err) {
        const message = getErrorMessage(err, 'Registration failed.')
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const clearError = useCallback(() => setError(null), [])

  return { login, register, loading, error, clearError }
}

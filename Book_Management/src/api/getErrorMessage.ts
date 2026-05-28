import axios from 'axios'

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong.') => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Unable to reach the server. Make sure the NestJS backend is running on port 3000.'
    }
    const data = error.response.data as {
      message?: string | string[]
      error?: string
    }
    if (Array.isArray(data?.message)) return data.message.join(', ')
    if (typeof data?.message === 'string') return data.message
    if (typeof data?.error === 'string') return data.error
    return error.message || fallback
  }

  if (error instanceof Error) return error.message
  return fallback
}

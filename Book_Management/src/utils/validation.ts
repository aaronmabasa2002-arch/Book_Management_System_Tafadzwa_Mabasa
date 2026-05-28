export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validatePassword = (password: string, minLength = 8) =>
  password.length >= minLength

import { useState } from 'react'
import AlertBanner from './components/AlertBanner'
import { useApp } from './context/AppContext'
import { useAuth } from './hooks/useAuth'
import { useForm } from './hooks/useForm'
import { getErrorMessage } from './api/getErrorMessage'
import { validateEmail, validatePassword } from './utils/validation'
import './App.css'

type FormState = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

const initialFormState: FormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
}

const validateRegister = (form: FormState) => {
  const errors: Partial<Record<keyof FormState, string>> = {}

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (!validatePassword(form.password)) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the terms.'
  }

  return errors
}

type RegisterPageProps = {
  onSwitchToLogin?: () => void
  onBackToHome?: () => void
}

const RegisterPage = ({ onSwitchToLogin, onBackToHome }: RegisterPageProps) => {
  const { login: setSession } = useApp()
  const { register, loading, error, clearError } = useAuth()
  const [success, setSuccess] = useState(false)

  const {
    values: form,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  } = useForm(initialFormState, validateRegister)

  const onSubmit = handleSubmit(async (values) => {
    clearError()
    try {
      await register({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
      })
      setSuccess(true)
      // Instead of setSession(session), we redirect to login
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin()
      }, 2000)
      reset()
    } catch (err) {
      throw new Error(getErrorMessage(err, 'Registration failed.'))
    }
  })

  const displayError = apiError || error

  return (
    <div className="auth-shell">
      {onBackToHome && (
        <button
          type="button"
          className="auth-back-home"
          onClick={onBackToHome}
        >
          ← Back to home
        </button>
      )}
      <div className="auth-card">
        <div className="title-group">
          <span className="eyebrow">Lindroid Zimbabwe</span>
          <h1>Create your account</h1>
          <p>
            Register securely to manage books, library users, and activity from a
            single dashboard.
          </p>
        </div>

        {displayError && (
          <AlertBanner message={displayError} onDismiss={clearError} />
        )}

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <label className="form-field">
              <span>Full name</span>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                disabled={isSubmitting || loading}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby="fullName-error"
              />
              {errors.fullName && (
                <span className="field-error" id="fullName-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </label>

            <label className="form-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                disabled={isSubmitting || loading}
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-error"
              />
              {errors.email && (
                <span className="field-error" id="email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                disabled={isSubmitting || loading}
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-error"
              />
              {errors.password && (
                <span className="field-error" id="password-error" role="alert">
                  {errors.password}
                </span>
              )}
            </label>

            <label className="form-field">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                disabled={isSubmitting || loading}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby="confirmPassword-error"
              />
              {errors.confirmPassword && (
                <span
                  className="field-error"
                  id="confirmPassword-error"
                  role="alert"
                >
                  {errors.confirmPassword}
                </span>
              )}
            </label>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={form.agreeToTerms}
              onChange={handleChange}
              disabled={isSubmitting || loading}
              aria-invalid={Boolean(errors.agreeToTerms)}
            />
            <span>
              I agree to the platform terms and privacy policy.
            </span>
          </label>
          {errors.agreeToTerms && (
            <span className="field-error checkbox-error" role="alert">
              {errors.agreeToTerms}
            </span>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? 'Creating account…' : 'Create account'}
          </button>

          {success && (
            <div className="form-success" role="status">
              Account created successfully. Redirecting to your dashboard…
            </div>
          )}

          <p className="auth-switch">
            Already have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onSwitchToLogin}
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage

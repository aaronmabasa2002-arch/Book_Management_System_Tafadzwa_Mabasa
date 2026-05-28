import { useState } from 'react'
import AlertBanner from './components/AlertBanner'
import { useApp } from './context/AppContext'
import { useAuth } from './hooks/useAuth'
import { useForm } from './hooks/useForm'
import { getErrorMessage } from './api/getErrorMessage'
import { validateEmail, validatePassword } from './utils/validation'
import './App.css'

type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

const initialForm: LoginForm = {
  email: '',
  password: '',
  rememberMe: false,
}

const validateLogin = (form: LoginForm) => {
  const errors: Partial<Record<keyof LoginForm, string>> = {}

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

  return errors
}

type LoginPageProps = {
  onSwitchToRegister?: () => void
  onBackToHome?: () => void
}

const LoginPage = ({ onSwitchToRegister, onBackToHome }: LoginPageProps) => {
  const { login: setSession } = useApp()
  const { login, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    values: form,
    errors,
    apiError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm(initialForm, validateLogin)

  const onSubmit = handleSubmit(async (values) => {
    clearError()
    try {
      const session = await login({
        email: values.email.trim(),
        password: values.password,
      })
      setSuccess(true)
      setSession(session)
    } catch (err) {
      throw new Error(getErrorMessage(err, 'Sign in failed.'))
    }
  })

  const displayError = apiError || error

  return (
    <div className="auth-shell login-shell">
      {onBackToHome && (
        <button
          type="button"
          className="auth-back-home"
          onClick={onBackToHome}
        >
          ← Back to home
        </button>
      )}
      <div className="auth-card login-card">
        <aside className="login-brand-panel" aria-label="Lindroid Zimbabwe">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-icon">LZ</span>
          </div>
          <span className="eyebrow brand-eyebrow">Lindroid Zimbabwe</span>
          <h1>Book Management System</h1>
          <p className="brand-lead">
            Sign in to manage your library catalogue, track loans, and keep
            your collection organised from one secure dashboard.
          </p>
          <ul className="login-features">
            <li>
              <span className="feature-dot" aria-hidden="true" />
              Real-time inventory and availability
            </li>
            <li>
              <span className="feature-dot" aria-hidden="true" />
              Member loans and returns tracking
            </li>
            <li>
              <span className="feature-dot" aria-hidden="true" />
              Reports built for Zimbabwean libraries
            </li>
          </ul>
        </aside>

        <section className="login-form-panel">
          <header className="login-form-header">
            <h2>Welcome back</h2>
            <p>Enter your credentials to access your account.</p>
          </header>

          {displayError && (
            <AlertBanner
              message={displayError}
              onDismiss={clearError}
            />
          )}

          <form className="auth-form login-form" onSubmit={onSubmit} noValidate>
            <label className="form-field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="demo@lindroid.co.zw"
                autoComplete="email"
                disabled={isSubmitting || loading}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="form-field">
              <span>Password</span>
              <div className="password-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting || loading}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <span className="field-error" id="password-error" role="alert">
                  {errors.password}
                </span>
              )}
            </label>

            <div className="login-options">
              <label className="checkbox-field remember-field">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  disabled={isSubmitting || loading}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="submit-btn login-submit"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? 'Signing in…' : 'Sign in'}
            </button>

            {success && (
              <div className="form-success" role="status">
                Signed in successfully. Redirecting to your dashboard…
              </div>
            )}
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="link-button"
              onClick={onSwitchToRegister}
            >
              Create one
            </button>
          </p>
        </section>
      </div>

      <footer className="login-footer">
        <span>© {new Date().getFullYear()} Lindroid Zimbabwe</span>
        <span className="footer-divider" aria-hidden="true">
          ·
        </span>
        <span>Secure book management for libraries nationwide</span>
      </footer>
    </div>
  )
}

export default LoginPage

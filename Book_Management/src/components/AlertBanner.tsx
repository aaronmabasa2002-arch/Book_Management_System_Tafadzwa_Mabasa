type AlertBannerProps = {
  variant?: 'error' | 'info' | 'success'
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

const AlertBanner = ({
  variant = 'error',
  message,
  onRetry,
  onDismiss,
}: AlertBannerProps) => {
  return (
    <div className={`alert-banner alert-banner--${variant}`} role="alert">
      <p>{message}</p>
      <div className="alert-banner__actions">
        {onRetry && (
          <button type="button" className="btn-ghost" onClick={onRetry}>
            Try again
          </button>
        )}
        {onDismiss && (
          <button type="button" className="btn-ghost" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}

export default AlertBanner

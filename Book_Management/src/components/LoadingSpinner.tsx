type LoadingSpinnerProps = {
  label?: string
  size?: 'sm' | 'md'
}

const LoadingSpinner = ({
  label = 'Loading…',
  size = 'md',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`loading-spinner loading-spinner--${size}`}
      role="status"
      aria-live="polite"
    >
      <span className="spinner-ring" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingSpinner

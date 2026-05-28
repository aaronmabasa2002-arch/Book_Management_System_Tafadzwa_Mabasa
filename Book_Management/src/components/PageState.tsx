import AlertBanner from './AlertBanner'
import LoadingSpinner from './LoadingSpinner'

type PageStateProps = {
  loading?: boolean
  error?: string | null
  loadingLabel?: string
  onRetry?: () => void
  children: React.ReactNode
}

const PageState = ({
  loading,
  error,
  loadingLabel,
  onRetry,
  children,
}: PageStateProps) => {
  if (loading) {
    return (
      <div className="page-state page-state--loading">
        <LoadingSpinner label={loadingLabel} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-state page-state--error">
        <AlertBanner message={error} onRetry={onRetry} />
      </div>
    )
  }

  return <>{children}</>
}

export default PageState

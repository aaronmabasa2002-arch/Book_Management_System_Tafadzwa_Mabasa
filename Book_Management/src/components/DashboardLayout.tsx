import { useState, type ReactNode } from 'react'
import { useApp } from '../context/AppContext'

type NavItem = {
  id: 'dashboard' | 'books' | 'add-book'
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◫' },
  { id: 'books', label: 'All Books', icon: '▤' },
  { id: 'add-book', label: 'Add Book', icon: '＋' },
]

type DashboardLayoutProps = {
  title: string
  subtitle?: string
  children: ReactNode
  action?: ReactNode
}

const DashboardLayout = ({
  title,
  subtitle,
  children,
  action,
}: DashboardLayoutProps) => {
  const { user, view, setView, logout } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const displayName =
    user?.fullName?.trim() || user?.email?.split('@')[0] || 'User'
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const navigate = (id: NavItem['id']) => {
    setView(id)
    setSidebarOpen(false)
  }

  return (
    <div className={`dashboard-shell${sidebarOpen ? ' sidebar-open' : ''}`}>
      <button
        type="button"
        className="sidebar-toggle"
        aria-expanded={sidebarOpen}
        aria-controls="dashboard-sidebar"
        onClick={() => setSidebarOpen((open) => !open)}
      >
        {sidebarOpen ? 'Close menu' : 'Open menu'}
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        id="dashboard-sidebar"
        className="dashboard-sidebar"
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden="true">
            LZ
          </span>
          <div>
            <span className="sidebar-eyebrow">Lindroid Zimbabwe</span>
            <strong>Book Manager</strong>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item${view === item.id ? ' active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span className="user-avatar" aria-hidden="true">
              {initials}
            </span>
            <div className="user-meta">
              <strong>{displayName}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
          <button type="button" className="logout-btn" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
          </div>
          {action}
        </header>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout

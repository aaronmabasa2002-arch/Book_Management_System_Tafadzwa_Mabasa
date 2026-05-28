import DashboardLayout from '../components/DashboardLayout'
import PageState from '../components/PageState'
import { useApp } from '../context/AppContext'

const Dashboard = () => {
  const { books, booksLoading, booksError, refetchBooks, setView, user } =
    useApp()

  const totalCopies = books.reduce((sum, book) => sum + book.quantity, 0)
  const available = books.filter((book) => book.status === 'available').length
  const borrowed = books.filter((book) => book.status === 'borrowed').length
  const reserved = books.filter((book) => book.status === 'reserved').length
  const recentBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5)

  const greetingName =
    user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'there'

  return (
    <DashboardLayout
      title={`Good day, ${greetingName}`}
      subtitle="Overview of your library catalogue at a glance."
      action={
        <button
          type="button"
          className="btn-primary"
          onClick={() => setView('add-book')}
        >
          Add new book
        </button>
      }
    >
      <PageState
        loading={booksLoading}
        error={booksError}
        loadingLabel="Loading dashboard…"
        onRetry={() => void refetchBooks()}
      >
        <section className="stats-grid" aria-label="Library statistics">
          <article className="stat-card">
            <span className="stat-label">Total titles</span>
            <strong className="stat-value">{books.length}</strong>
            <span className="stat-hint">Unique books in catalogue</span>
          </article>
          <article className="stat-card stat-available">
            <span className="stat-label">Available</span>
            <strong className="stat-value">{available}</strong>
            <span className="stat-hint">Ready to lend</span>
          </article>
          <article className="stat-card stat-borrowed">
            <span className="stat-label">Borrowed</span>
            <strong className="stat-value">{borrowed}</strong>
            <span className="stat-hint">Currently on loan</span>
          </article>
          <article className="stat-card stat-reserved">
            <span className="stat-label">Reserved</span>
            <strong className="stat-value">{reserved}</strong>
            <span className="stat-hint">Held for members</span>
          </article>
          <article className="stat-card stat-copies">
            <span className="stat-label">Total copies</span>
            <strong className="stat-value">{totalCopies}</strong>
            <span className="stat-hint">Physical units in stock</span>
          </article>
        </section>

        <section className="dashboard-panels">
          <div className="panel-card">
            <div className="panel-header">
              <h2>Recently updated</h2>
              <button
                type="button"
                className="link-button"
                onClick={() => setView('books')}
              >
                View all
              </button>
            </div>
            {recentBooks.length === 0 ? (
              <p className="empty-state">
                No books yet. Add your first title to get started.
              </p>
            ) : (
              <ul className="recent-list">
                {recentBooks.map((book) => (
                  <li key={book.id}>
                    <div>
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </div>
                    <span className={`status-badge status-${book.status}`}>
                      {book.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel-card quick-actions">
            <h2>Quick actions</h2>
            <div className="action-buttons">
              <button
                type="button"
                className="action-tile"
                onClick={() => setView('books')}
              >
                <span className="action-icon" aria-hidden="true">
                  ▤
                </span>
                <span>Browse catalogue</span>
              </button>
              <button
                type="button"
                className="action-tile"
                onClick={() => setView('add-book')}
              >
                <span className="action-icon" aria-hidden="true">
                  ＋
                </span>
                <span>Register a book</span>
              </button>
            </div>
          </div>
        </section>
      </PageState>
    </DashboardLayout>
  )
}

export default Dashboard

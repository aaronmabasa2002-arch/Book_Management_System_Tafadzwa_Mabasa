import { useMemo, useState } from 'react'
import AlertBanner from '../components/AlertBanner'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import DashboardLayout from '../components/DashboardLayout'
import PageState from '../components/PageState'
import { useApp } from '../context/AppContext'
import { getErrorMessage } from '../api/getErrorMessage'
import type { Book } from '../types/book'

const BookList = () => {
  const {
    books,
    booksLoading,
    booksError,
    booksMutating,
    refetchBooks,
    setView,
    startEditBook,
    deleteBook,
  } = useApp()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Book['status']>('all')
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return books.filter((book) => {
      const matchesStatus =
        statusFilter === 'all' || book.status === statusFilter
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
      return matchesStatus && matchesSearch
    })
  }, [books, search, statusFilter])

  const handleDeleteConfirm = async () => {
    if (!bookToDelete) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      await deleteBook(bookToDelete.id)
      setBookToDelete(null)
    } catch (err) {
      setDeleteError(getErrorMessage(err, 'Failed to delete book.'))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DashboardLayout
      title="Book catalogue"
      subtitle="Search, filter, edit, and remove titles from your library."
      action={
        <button
          type="button"
          className="btn-primary"
          onClick={() => setView('add-book')}
        >
          Add book
        </button>
      }
    >
      <PageState
        loading={booksLoading}
        error={booksError}
        loadingLabel="Loading catalogue…"
        onRetry={() => void refetchBooks()}
      >
        {deleteError && (
          <AlertBanner
            message={deleteError}
            onDismiss={() => setDeleteError(null)}
          />
        )}

        <div className="list-toolbar">
          <label className="search-field">
            <span className="visually-hidden">Search books</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, author, ISBN, or genre…"
              disabled={booksMutating}
            />
          </label>
          <label className="filter-field">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as typeof statusFilter)
              }
              disabled={booksMutating}
            >
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="reserved">Reserved</option>
            </select>
          </label>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="empty-panel">
            <p>No books match your search.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setView('add-book')}
            >
              Add your first book
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="books-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td data-label="Title">
                      <strong>{book.title}</strong>
                    </td>
                    <td data-label="Author">{book.author}</td>
                    <td data-label="ISBN">
                      <code>{book.isbn}</code>
                    </td>
                    <td data-label="Genre">{book.genre}</td>
                    <td data-label="Year">{book.publishedYear}</td>
                    <td data-label="Qty">{book.quantity}</td>
                    <td data-label="Status">
                      <span className={`status-badge status-${book.status}`}>
                        {book.status}
                      </span>
                    </td>
                    <td data-label="Actions" className="row-actions">
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => startEditBook(book.id)}
                        disabled={booksMutating}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost btn-ghost-danger"
                        onClick={() => {
                          setDeleteError(null)
                          setBookToDelete(book)
                        }}
                        disabled={booksMutating}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PageState>

      {bookToDelete && (
        <DeleteConfirmModal
          bookTitle={bookToDelete.title}
          isDeleting={isDeleting}
          onConfirm={() => void handleDeleteConfirm()}
          onCancel={() => !isDeleting && setBookToDelete(null)}
        />
      )}
    </DashboardLayout>
  )
}

export default BookList

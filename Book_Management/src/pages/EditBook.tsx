import { useEffect, useState } from 'react'
import AlertBanner from '../components/AlertBanner'
import BookFormFields, {
  validateBookForm,
  type BookFieldErrors,
} from '../components/BookFormFields'
import DashboardLayout from '../components/DashboardLayout'
import LoadingSpinner from '../components/LoadingSpinner'
import { useApp } from '../context/AppContext'
import { getErrorMessage } from '../api/getErrorMessage'
import type { BookFormData } from '../types/book'

const EditBook = () => {
  const {
    editBookId,
    getBookById,
    updateBook,
    setView,
    booksLoading,
    booksMutating,
  } = useApp()
  const book = editBookId ? getBookById(editBookId) : undefined

  const [form, setForm] = useState<BookFormData | null>(null)
  const [errors, setErrors] = useState<BookFieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genre: book.genre,
        publishedYear: book.publishedYear,
        quantity: book.quantity,
        status: book.status,
        description: book.description,
      })
    }
  }, [book])

  if (booksLoading) {
    return (
      <DashboardLayout title="Edit book" subtitle="">
        <div className="page-state page-state--loading">
          <LoadingSpinner label="Loading book details…" />
        </div>
      </DashboardLayout>
    )
  }

  if (!book || !form) {
    return (
      <DashboardLayout title="Book not found" subtitle="">
        <div className="empty-panel">
          <p>This book may have been removed or the link is invalid.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setView('books')}
          >
            Back to catalogue
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [name]:
              name === 'publishedYear' || name === 'quantity'
                ? Number(value)
                : value,
          }
        : previous,
    )
    setApiError(null)
    if (errors[name as keyof BookFormData]) {
      setErrors((previous) => {
        const next = { ...previous }
        delete next[name as keyof BookFormData]
        return next
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form || !editBookId) return

    const validation = validateBookForm(form)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setSuccess(false)
      return
    }

    setIsSubmitting(true)
    setApiError(null)

    try {
      await updateBook(editBookId, {
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        isbn: form.isbn.trim(),
        genre: form.genre.trim(),
        description: form.description.trim(),
      })
      setSuccess(true)
      setErrors({})
    } catch (err) {
      setSuccess(false)
      setApiError(getErrorMessage(err, 'Failed to update book.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout
      title="Edit book"
      subtitle={`Update details for “${book.title}”.`}
    >
      {apiError && <AlertBanner message={apiError} onDismiss={() => setApiError(null)} />}

      <form className="book-form-card" onSubmit={handleSubmit} noValidate>
        <BookFormFields
          form={form}
          errors={errors}
          onChange={handleChange}
          disabled={isSubmitting || booksMutating}
        />

        {success && (
          <div className="form-success" role="status">
            Changes saved successfully.
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setView('books')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || booksMutating}
          >
            {isSubmitting ? 'Saving…' : 'Update book'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  )
}

export default EditBook

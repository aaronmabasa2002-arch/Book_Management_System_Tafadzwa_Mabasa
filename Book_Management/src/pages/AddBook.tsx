import { useState } from 'react'
import AlertBanner from '../components/AlertBanner'
import BookFormFields, {
  emptyBookForm,
  validateBookForm,
  type BookFieldErrors,
} from '../components/BookFormFields'
import DashboardLayout from '../components/DashboardLayout'
import { useApp } from '../context/AppContext'
import { getErrorMessage } from '../api/getErrorMessage'
import type { BookFormData } from '../types/book'

const AddBook = () => {
  const { addBook, setView, booksMutating } = useApp()
  const [form, setForm] = useState<BookFormData>(emptyBookForm)
  const [errors, setErrors] = useState<BookFieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]:
        name === 'publishedYear' || name === 'quantity'
          ? Number(value)
          : value,
    }))
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
    const validation = validateBookForm(form)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setSuccess(false)
      return
    }

    setIsSubmitting(true)
    setApiError(null)
    setErrors({})

    try {
      await addBook({
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        isbn: form.isbn.trim(),
        genre: form.genre.trim(),
        description: form.description.trim(),
      })
      setSuccess(true)
      setForm(emptyBookForm())
    } catch (err) {
      setSuccess(false)
      setApiError(getErrorMessage(err, 'Failed to add book.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout
      title="Add a book"
      subtitle="Register a new title in your library catalogue."
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
            Book added successfully. You can add another or return to the
            catalogue.
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
            {isSubmitting ? 'Saving…' : 'Save book'}
          </button>
        </div>
      </form>
    </DashboardLayout>
  )
}

export default AddBook

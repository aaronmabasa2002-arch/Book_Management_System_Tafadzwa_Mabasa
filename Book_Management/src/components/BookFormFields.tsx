import type { BookFormData, BookStatus } from '../types/book'

export type BookFieldErrors = Partial<Record<keyof BookFormData, string>>

type BookFormFieldsProps = {
  form: BookFormData
  errors: BookFieldErrors
  disabled?: boolean
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void
}

const statusOptions: { value: BookStatus; label: string }[] = [
  { value: 'available', label: 'Available' },
  { value: 'borrowed', label: 'Borrowed' },
  { value: 'reserved', label: 'Reserved' },
]

const BookFormFields = ({
  form,
  errors,
  disabled = false,
  onChange,
}: BookFormFieldsProps) => {
  return (
    <div className="book-form-grid">
      <label className="form-field">
        <span>Title *</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          disabled={disabled}
          placeholder="e.g. Nervous Conditions"
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && (
          <span className="field-error" role="alert">
            {errors.title}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>Author *</span>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={onChange}
          disabled={disabled}
          placeholder="e.g. Tsitsi Dangarembga"
          aria-invalid={Boolean(errors.author)}
        />
        {errors.author && (
          <span className="field-error" role="alert">
            {errors.author}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>ISBN *</span>
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={onChange}
          disabled={disabled}
          placeholder="978-0000000000"
          aria-invalid={Boolean(errors.isbn)}
        />
        {errors.isbn && (
          <span className="field-error" role="alert">
            {errors.isbn}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>Genre *</span>
        <input
          type="text"
          name="genre"
          value={form.genre}
          onChange={onChange}
          disabled={disabled}
          placeholder="e.g. Fiction"
          aria-invalid={Boolean(errors.genre)}
        />
        {errors.genre && (
          <span className="field-error" role="alert">
            {errors.genre}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>Published year *</span>
        <input
          type="number"
          name="publishedYear"
          value={form.publishedYear || ''}
          onChange={onChange}
          disabled={disabled}
          min={1000}
          max={new Date().getFullYear()}
          placeholder="1988"
          aria-invalid={Boolean(errors.publishedYear)}
        />
        {errors.publishedYear && (
          <span className="field-error" role="alert">
            {errors.publishedYear}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>Quantity *</span>
        <input
          type="number"
          name="quantity"
          value={form.quantity || ''}
          onChange={onChange}
          disabled={disabled}
          min={0}
          placeholder="1"
          aria-invalid={Boolean(errors.quantity)}
        />
        {errors.quantity && (
          <span className="field-error" role="alert">
            {errors.quantity}
          </span>
        )}
      </label>

      <label className="form-field">
        <span>Status *</span>
        <select
          name="status"
          value={form.status}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(errors.status)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field form-field-full">
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          disabled={disabled}
          rows={4}
          placeholder="Brief summary or notes about this title…"
        />
      </label>
    </div>
  )
}

export const emptyBookForm = (): BookFormData => ({
  title: '',
  author: '',
  isbn: '',
  genre: '',
  publishedYear: new Date().getFullYear(),
  quantity: 1,
  status: 'available',
  description: '',
})

export const validateBookForm = (form: BookFormData): BookFieldErrors => {
  const errors: BookFieldErrors = {}
  const currentYear = new Date().getFullYear()

  if (!form.title.trim()) errors.title = 'Title is required.'
  if (!form.author.trim()) errors.author = 'Author is required.'
  if (!form.isbn.trim()) errors.isbn = 'ISBN is required.'
  if (!form.genre.trim()) errors.genre = 'Genre is required.'

  if (!form.publishedYear || form.publishedYear < 1000) {
    errors.publishedYear = 'Enter a valid year.'
  } else if (form.publishedYear > currentYear) {
    errors.publishedYear = `Year cannot be after ${currentYear}.`
  }

  if (form.quantity < 0) {
    errors.quantity = 'Quantity cannot be negative.'
  }

  return errors
}

export default BookFormFields
